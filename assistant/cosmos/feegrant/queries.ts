import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/feegrant/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryAllowance(
  queryClient: QueryClient,
  { granter, grantee }: SDKQueryTypes.QueryAllowanceRequest,
) {
  const result = await queryClient.cosmos.feegrant.v1beta1.allowance({
    granter,
    grantee,
  });
  return result.allowance;
}

export async function queryAllowances(queryClient: QueryClient, { grantee }: SDKQueryTypes.QueryAllowancesRequest) {
  const result = await queryClient.cosmos.feegrant.v1beta1.allowances({
    grantee,
  });
  return result.allowances;
}

export async function queryAllowancesByGranter(
  queryClient: QueryClient,
  { granter }: SDKQueryTypes.QueryAllowancesByGranterRequest,
) {
  const result = await queryClient.cosmos.feegrant.v1beta1.allowancesByGranter({
    granter,
  });
  return result.allowances;
}
