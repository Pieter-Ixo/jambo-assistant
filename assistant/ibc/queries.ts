import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/applications/transfer/v1/query';
import * as CoreSDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ibc/core/channel/v1/query';

import { QueryClient } from 'assistant/types/query';

export function queryDenomTrace(queryClient: QueryClient, { hash }: SDKQueryTypes.QueryDenomTraceRequest) {
  const result = queryClient.ibc.applications.transfer.v1.denomTrace({ hash });
  return result;
}

export function queryDenomTraces(queryClient: QueryClient, {}: SDKQueryTypes.QueryDenomTracesRequest) {
  const result = queryClient.ibc.applications.transfer.v1.denomTraces({});
  return result;
}

export function queryParams(queryClient: QueryClient, {}: SDKQueryTypes.QueryParamsRequest) {
  const result = queryClient.ibc.applications.transfer.v1.params({});
  return result;
}

export function queryDenomHash(queryClient: QueryClient, { trace }: SDKQueryTypes.QueryDenomHashRequest) {
  const result = queryClient.ibc.applications.transfer.v1.denomHash({ trace });
  return result;
}

export function queryEscrowAddress(
  queryClient: QueryClient,
  { portId, channelId }: SDKQueryTypes.QueryEscrowAddressRequest,
) {
  const result = queryClient.ibc.applications.transfer.v1.escrowAddress({ portId, channelId });
  return result;
}

export async function queryChannel(
  queryClient: QueryClient,
  { portId, channelId }: CoreSDKQueryTypes.QueryChannelRequest,
) {
  const result = await queryClient.ibc.core.channel.v1.channel({ portId, channelId });
  return result;
}

export async function queryChannels(queryClient: QueryClient, {}: CoreSDKQueryTypes.QueryChannelsRequest) {
  const result = await queryClient.ibc.core.channel.v1.channels({});
  return result;
}
