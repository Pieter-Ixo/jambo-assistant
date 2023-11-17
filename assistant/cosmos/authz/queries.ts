import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/authz/v1beta1/query';

import * as AssistantTypes from 'assistant/types/assistant';

export async function queryGrants(
  queryClient: AssistantTypes.QueryClient,
  { granter, grantee, msgTypeUrl }: SDKQueryTypes.QueryGrantsRequest,
) {
  const result = await queryClient.cosmos.authz.v1beta1.grants({
    granter,
    grantee,
    msgTypeUrl,
  });
  return result;
}

export async function queryGranterGrants(
  queryClient: AssistantTypes.QueryClient,
  { granter }: SDKQueryTypes.QueryGranterGrantsRequest,
) {
  const result = await queryClient.cosmos.authz.v1beta1.granterGrants({
    granter,
  });
  return result;
}

export async function queryGranteeGrants(
  queryClient: AssistantTypes.QueryClient,
  { grantee }: SDKQueryTypes.QueryGranteeGrantsRequest,
) {
  const result = await queryClient.cosmos.authz.v1beta1.granteeGrants({
    grantee,
  });
  return result;
}
