import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/token/v1beta1/query';

import * as AssistantTypes from 'assistant/types/assistant';

export async function queryParams(queryClient: AssistantTypes.QueryClient, {}: SDKQueryTypes.QueryParamsRequest) {
  const result = await queryClient.ixo.token.v1beta1.params({});
  return result;
}

export async function queryTokenList(
  queryClient: AssistantTypes.QueryClient,
  { minter }: SDKQueryTypes.QueryTokenListRequest,
) {
  const result = await queryClient.ixo.token.v1beta1.tokenList({ minter });
  return result;
}

export async function queryTokenDoc(
  queryClient: AssistantTypes.QueryClient,
  { minter, contractAddress }: SDKQueryTypes.QueryTokenDocRequest,
) {
  const result = await queryClient.ixo.token.v1beta1.tokenDoc({ minter, contractAddress });
  return result;
}

export async function queryTokenMetadata(
  queryClient: AssistantTypes.QueryClient,
  { id }: SDKQueryTypes.QueryTokenMetadataRequest,
) {
  const result = await queryClient.ixo.token.v1beta1.tokenMetadata({ id });
  return result;
}
