import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/ixo/entity/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryParams(queryClient: QueryClient, {}: SDKQueryTypes.QueryParamsRequest) {
  const result = await queryClient.ixo.entity.v1beta1.params({});
  return result;
}

export async function queryEntity(queryClient: QueryClient, { id }: SDKQueryTypes.QueryEntityRequest) {
  const result = await queryClient.ixo.entity.v1beta1.entity({
    id,
  });
  return result;
}

export async function queryEntityMetadata(queryClient: QueryClient, { id }: SDKQueryTypes.QueryEntityMetadataRequest) {
  const result = await queryClient.ixo.entity.v1beta1.entityMetaData({
    id,
  });
  return result;
}

export async function queryEntityIidDocument(
  queryClient: QueryClient,
  { id }: SDKQueryTypes.QueryEntityIidDocumentRequest,
) {
  const result = await queryClient.ixo.entity.v1beta1.entityIidDocument({
    id,
  });
  return result;
}

export async function queryEntityVerified(queryClient: QueryClient, { id }: SDKQueryTypes.QueryEntityVerifiedRequest) {
  const result = await queryClient.ixo.entity.v1beta1.entityVerified({
    id,
  });
  return result;
}

export async function queryEntityList(queryClient: QueryClient, {}: SDKQueryTypes.QueryEntityListRequest) {
  const result = await queryClient.ixo.entity.v1beta1.entityList({});
  return result;
}
