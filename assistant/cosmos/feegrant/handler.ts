import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/feegrant/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/feegrant/v1beta1/query';

import * as Types from './types';
import * as Queries from './queries';
import * as Constants from './constants';
import * as Transactions from './transactions';

import * as AssistantTypes from 'assistant/types/assistant';

// eslint-disable-next-line import/no-anonymous-default-export
export async function transactions(
  name: string,
  params: Types.TxParams,
  user: AssistantTypes.User,
  { queryClient }: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.TX.msgGrantAllowance:
      const msgGrantAllowance = Transactions.generateMsgGrantAllowanceTrx({
        granter: user.address ?? '',
        grantee: (params as Types.MsgGrantAllowanceParams).grantee,
        allowance: Transactions.generateBasicAllowance(
          {
            spendLimit: (params as Types.MsgGrantAllowanceParams).allowance.spendLimit,
            expiration: (params as Types.MsgGrantAllowanceParams).allowance.expiration,
          },
          true,
        ),
      } as SDKTxTypes.MsgGrantAllowance);
      return msgGrantAllowance;
    case Constants.TX.msgRevokeAllowance:
      const msgRevokeAllowance = Transactions.generateMsgRevokeAllowanceTrx({
        granter: user.address ?? '',
        grantee: (params as Types.MsgRevokeAllowanceParams).grantee,
      } as SDKTxTypes.MsgRevokeAllowance);
      return msgRevokeAllowance;
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
    case Constants.QUERY.queryAllowance:
      const queryAllowance = await Queries.queryAllowance(
        queryClient as AssistantTypes.QueryClient,
        {
          granter: (params as Types.QueryAllowanceParams).granter ?? user.address ?? '',
          grantee: (params as Types.QueryAllowanceParams).grantee ?? user.address ?? '',
        } as SDKQueryTypes.QueryAllowanceRequest,
      );
      return !queryAllowance ? 'No feegrant found' : JSON.stringify(queryAllowance);
    case Constants.QUERY.queryAllowances:
      const queryAllowances = await Queries.queryAllowances(
        queryClient as AssistantTypes.QueryClient,
        {
          grantee: (params as Types.QueryAllowancesParams).grantee ?? user?.address ?? '',
        } as SDKQueryTypes.QueryAllowancesRequest,
      );
      return !queryAllowances ? 'No feegrant found' : JSON.stringify(queryAllowances);
    case Constants.QUERY.queryAllowancesByGranter:
      const queryAllowancesByGranter = await Queries.queryAllowancesByGranter(
        queryClient as AssistantTypes.QueryClient,
        {
          granter: (params as Types.QueryAllowancesByGranterParams)?.granter ?? user?.address ?? '',
        } as SDKQueryTypes.QueryAllowancesByGranterRequest,
      );
      return !queryAllowancesByGranter ? 'No feegrant found' : JSON.stringify(queryAllowancesByGranter);
    default:
      throw new Error('Unknown query');
  }
}
