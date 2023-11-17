import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryValidators(queryClient: QueryClient, { status }: SDKQueryTypes.QueryValidatorsRequest) {
  const result = await queryClient.cosmos.staking.v1beta1.validators({ status });
  return result?.validators;
}

export async function queryValidator(queryClient: QueryClient, { validatorAddr }: SDKQueryTypes.QueryValidatorRequest) {
  const result = await queryClient.cosmos.staking.v1beta1.validator({ validatorAddr });
  return result?.validator;
}

export async function queryValidatorDelegations(
  queryClient: QueryClient,
  { validatorAddr }: SDKQueryTypes.QueryValidatorDelegationsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.validatorDelegations({ validatorAddr });
  return result?.delegationResponses;
}

export async function queryValidatorUnbondingDelegations(
  queryClient: QueryClient,
  { validatorAddr }: SDKQueryTypes.QueryValidatorUnbondingDelegationsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.validatorUnbondingDelegations({ validatorAddr });
  return result?.unbondingResponses;
}

export async function queryDelegation(
  queryClient: QueryClient,
  { validatorAddr, delegatorAddr }: SDKQueryTypes.QueryDelegationRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.delegation({ validatorAddr, delegatorAddr });
  return result?.delegationResponse;
}

export async function queryUnbondingDelegation(
  queryClient: QueryClient,
  { validatorAddr, delegatorAddr }: SDKQueryTypes.QueryUnbondingDelegationRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.delegation({ validatorAddr, delegatorAddr });
  return result?.delegationResponse;
}

export async function queryDelegatorDelegations(
  queryClient: QueryClient,
  { delegatorAddr }: SDKQueryTypes.QueryDelegatorDelegationsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.delegatorDelegations({ delegatorAddr });
  return result?.delegationResponses;
}

export async function queryDelegatorUnbondingDelegations(
  queryClient: QueryClient,
  { delegatorAddr }: SDKQueryTypes.QueryDelegatorUnbondingDelegationsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.delegatorUnbondingDelegations({ delegatorAddr });
  return result?.unbondingResponses;
}

export async function queryRedelegations(
  queryClient: QueryClient,
  { delegatorAddr, srcValidatorAddr, dstValidatorAddr }: SDKQueryTypes.QueryRedelegationsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.redelegations({
    delegatorAddr,
    srcValidatorAddr,
    dstValidatorAddr,
  });
  return result?.redelegationResponses;
}

export async function queryDelegatorValidators(
  queryClient: QueryClient,
  { delegatorAddr }: SDKQueryTypes.QueryDelegatorValidatorsRequest,
) {
  const result = await queryClient.cosmos.staking.v1beta1.delegatorValidators({ delegatorAddr });
  return result?.validators;
}

// export async function queryHistoricalInfo(
//   queryClient: QueryClient,
//   { height }: SDKQueryTypes.QueryHistoricalInfoRequest,
// ) {
//   const result = await queryClient.cosmos.staking.v1beta1.historicalInfo({ height });
//   return result;
// }

// export async function queryPool(queryClient: QueryClient, {}: SDKQueryTypes.QueryPoolRequest) {
//   const result = await queryClient.cosmos.staking.v1beta1.pool({});
//   return result;
// }

// export async function queryParams(queryClient: QueryClient, {}: QueryParamsRequest) {
//   const result = await queryClient.cosmos.staking.v1beta1.params({});
//   return result?.params;
// }
