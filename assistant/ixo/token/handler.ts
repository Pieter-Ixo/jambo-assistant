import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/token/v1beta1/tx';
// import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/token/v1beta1/query';

import * as Types from './types';
// import * as Queries from './queries';
import * as Graphql from './graphql';
import * as Constants from './constants';
import * as Transactions from './transactions';

import * as AssistantTypes from 'assistant/types/assistant';

export async function transactions(
  name: string,
  params: Types.TxParams,
  user: AssistantTypes.User,
  { queryClient, graphqlClient }: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.TX.msgTransferToken:
      const msgTransferToken = Transactions.generateMsgTransferTokenTrx({
        owner: user.address ?? '',
        recipient: (params as Types.MsgTransferTokenParams).recipient,
        tokens: [
          {
            id: (params as Types.MsgTransferTokenParams).tokenName,
            amount: (params as Types.MsgTransferTokenParams).amount,
          },
        ], // TODO: query and then generate tokens
      } as SDKTxTypes.MsgTransferToken);
      return msgTransferToken;
    case Constants.TX.msgRetireToken:
      const msgRetireToken = Transactions.generateMsgRetireTokenTrx({
        owner: user.address ?? '',
        tokens: [
          {
            id: (params as Types.MsgRetireTokenParams).tokenName,
            amount: (params as Types.MsgRetireTokenParams).amount,
          },
        ], // TODO: query and then generate tokens
        jurisdiction: (params as Types.MsgRetireTokenParams).jurisdiction ?? 'Global',
        reason: (params as Types.MsgRetireTokenParams).reason ?? 'Offset with Oxi',
      } as SDKTxTypes.MsgRetireToken);
      return msgRetireToken;
    default:
      throw new Error('Unknown transaction');
  }
}

export async function queries(
  name: string,
  params: Types.QueryParams,
  user: AssistantTypes.User,
  { graphqlClient }: AssistantTypes.Clients,
) {
  switch (name) {
    // case Constants.QUERY.queryParams:
    //   const queryParams = await Queries.queryParams(queryClient as AssistantTypes.QueryClient, {} as SDKQueryTypes.QueryParamsRequest);
    //   return JSON.stringify(queryParams);
    // case Constants.QUERY.queryTokenList:
    //   const queryTokenList = await Queries.queryTokenList(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       minter: user.address ?? '',
    //     } as SDKQueryTypes.QueryTokenListRequest,
    //   );
    //   return JSON.stringify(queryTokenList);
    // case Constants.QUERY.queryTokenDoc:
    //   const queryTokenDoc = await Queries.queryTokenDoc(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       minter: user.address ?? '',
    //       contractAddress: (params as Types.QueryTokenDocParams).contractAddress,
    //     } as SDKQueryTypes.QueryTokenDocRequest,
    //   );
    //   return JSON.stringify(queryTokenDoc);
    // case Constants.QUERY.queryTokenMetadata:
    //   const queryTokenMetadata = await Queries.queryTokenMetadata(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       id: (params as Types.QueryTokenMetadataParams).id,
    //     } as SDKQueryTypes.QueryTokenMetadataRequest,
    //   );
    //   return JSON.stringify(queryTokenMetadata);
    case Constants.QUERY.getAccountImpactTokensByAddress:
      const getAccountImpactTokensByAddress = await Graphql.getAccountImpactTokensByAddress(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          address: (params as Types.GetAccountImpactTokensByAddressParams).address,
        } as Types.GetAccountImpactTokensByAddressParams,
      );
      return JSON.stringify(getAccountImpactTokensByAddress);
    case Constants.QUERY.getImpactTokensTotalForEntitiesByAddress:
      const getImpactTokensTotalForEntitiesByAddress = await Graphql.getImpactTokensTotalForEntitiesByAddress(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          address: (params as Types.GetImpactTokensTotalForEntitiesByAddressParams).address,
        } as Types.GetImpactTokensTotalForEntitiesByAddressParams,
      );
      return JSON.stringify(getImpactTokensTotalForEntitiesByAddress);
    case Constants.QUERY.getImpactTokensTotalByAddress:
      const getImpactTokensTotalByAddress = await Graphql.getImpactTokensTotalByAddress(
        graphqlClient as AssistantTypes.GraphqlClient,
        {
          address: (params as Types.GetImpactTokensTotalByAddressParams).address,
        } as Types.GetImpactTokensTotalByAddressParams,
      );
      return JSON.stringify(getImpactTokensTotalByAddress);
    default:
      throw new Error('Unknown query');
  }
}
