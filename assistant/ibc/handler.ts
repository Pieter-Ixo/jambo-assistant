import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/applications/transfer/v1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/applications/transfer/v1/query';
import * as CoreSDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/core/channel/v1/query';

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
    case Constants.TX.msgTransfer:
      const msgTransfer = Transactions.generateMsgTransferTrx({
        sourcePort: (params as Types.MsgTransferParams).sourcePort,
        sourceChannel: (params as Types.MsgTransferParams).sourceChannel,
        token: (params as Types.MsgTransferParams).token,
        sender: (params as Types.MsgTransferParams).sender ?? user?.address ?? '',
        receiver: (params as Types.MsgTransferParams).receiver,
        timeoutHeight: (params as Types.MsgTransferParams).timeoutHeight,
        timeoutTimestamp: (params as Types.MsgTransferParams).timeoutTimestamp,
        memo: (params as Types.MsgTransferParams).memo,
      } as SDKTxTypes.MsgTransfer);
      return msgTransfer;
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
    case Constants.QUERY.queryDenomTrace:
      const queryDenomTrace = await Queries.queryDenomTrace(
        queryClient as AssistantTypes.QueryClient,
        {
          hash: (params as Types.QueryDenomTraceParams).hash,
        } as SDKQueryTypes.QueryDenomTraceRequest,
      );
      return JSON.stringify(queryDenomTrace);
    case Constants.QUERY.queryDenomTraces:
      const queryDenomTraces = await Queries.queryDenomTraces(
        queryClient as AssistantTypes.QueryClient,
        {} as SDKQueryTypes.QueryDenomTracesRequest,
      );
      return JSON.stringify(queryDenomTraces);
    case Constants.QUERY.queryParams:
      const queryParams = await Queries.queryParams(
        queryClient as AssistantTypes.QueryClient,
        {} as SDKQueryTypes.QueryParamsRequest,
      );
      return JSON.stringify(queryParams);
    case Constants.QUERY.queryDenomHash:
      const queryDenomHash = await Queries.queryDenomHash(
        queryClient as AssistantTypes.QueryClient,
        {
          trace: (params as Types.QueryDenomHashParams).trace,
        } as SDKQueryTypes.QueryDenomHashRequest,
      );
      return JSON.stringify(queryDenomHash);
    // case Constants.QUERY.queryEscrowAddress:
    //   const queryEscrowAddress = await Queries.queryEscrowAddress(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       portId: (params as Types.QueryEscrowAddressParams).portId,
    //       channelId: (params as Types.QueryEscrowAddressParams).channelId,
    //     } as SDKQueryTypes.QueryEscrowAddressRequest,
    //   );
    //   return JSON.stringify(queryEscrowAddress);
    case Constants.QUERY.queryChannel:
      const queryChannel = await Queries.queryChannel(
        queryClient as AssistantTypes.QueryClient,
        {
          portId: (params as Types.QueryChannelParams).portId,
          channelId: (params as Types.QueryChannelParams).channelId,
        } as CoreSDKQueryTypes.QueryChannelRequest,
      );
      return JSON.stringify(queryChannel);
    case Constants.QUERY.queryChannels:
      const queryChannels = await Queries.queryChannels(
        queryClient as AssistantTypes.QueryClient,
        {} as CoreSDKQueryTypes.QueryChannelsRequest,
      );
      return JSON.stringify(queryChannels);
    default:
      throw new Error('Unknown query');
  }
}
