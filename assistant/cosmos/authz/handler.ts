import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/query';

import * as Types from './types';
import * as Queries from './queries';
import * as Constants from './constants';
import * as Transactions from './transactions';

import * as AssistantTypes from 'assistant/types/assistant';

export async function transactions(
  name: string,
  params: Types.TxParams,
  user: AssistantTypes.User,
  {}: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.TX.msgGrant:
      const msgGrant = Transactions.generateMsgGrantTrx({
        granter: user.address ?? '',
        grantee: (params as Types.MsgGrantParams).grantee,
        grant: (params as Types.MsgGrantParams).grant,
      } as SDKTxTypes.MsgGrant);
      return msgGrant;
    // case Constants.TX.msgExec:
    //   const msgExec = Transactions.generateMsgExecTrx({
    //     grantee: (params as Types.MsgExecParams).grantee,
    //     msgs: (params as Types.MsgExecParams).msgs,
    //   } as SDKTxTypes.MsgExec);
    //   return msgExec;
    case Constants.TX.msgRevoke:
      const msgRevoke = Transactions.generateMsgRevokeTrx({
        granter: user.address ?? '',
        grantee: (params as Types.MsgRevokeParams).grantee,
        msgTypeUrl: (params as Types.MsgRevokeParams).msgTypeUrl,
      } as SDKTxTypes.MsgRevoke);
      return msgRevoke;
    default:
      throw new Error('Unknown transaction');
  }
}

export async function queries(
  name: string,
  params: Types.QueryParams,
  user: AssistantTypes.User,
  { queryClient }: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.QUERY.queryGrants:
      const queryGrants = Queries.queryGrants(
        queryClient as AssistantTypes.QueryClient,
        {
          granter: (params as Types.QueryGrantsParams)?.granter ?? user.address ?? '',
          grantee: (params as Types.QueryGrantsParams)?.grantee ?? user.address ?? '',
          msgTypeUrl: (params as Types.QueryGrantsParams)?.msgTypeUrl,
        } as SDKQueryTypes.QueryGrantsRequest,
      );
      return JSON.stringify(queryGrants);
    case Constants.QUERY.queryGranterGrants:
      const queryGranterGrants = Queries.queryGranterGrants(
        queryClient as AssistantTypes.QueryClient,
        {
          granter: (params as Types.QueryGranterGrantsParams)?.granter ?? user.address ?? '',
        } as SDKQueryTypes.QueryGranterGrantsRequest,
      );
      return JSON.stringify(queryGranterGrants);
    case Constants.QUERY.queryGranteeGrants:
      const queryGranteeGrants = Queries.queryGranteeGrants(
        queryClient as AssistantTypes.QueryClient,
        {
          grantee: (params as Types.QueryGranteeGrantsParams)?.grantee ?? user.address ?? '',
        } as SDKQueryTypes.QueryGranteeGrantsRequest,
      );
      return JSON.stringify(queryGranteeGrants);
    default:
      throw new Error('Unknown query');
  }
}
