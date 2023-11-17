import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryParams(queryClient: QueryClient, {}: SDKQueryTypes.QueryParamsRequest) {
  const result = await queryClient.cosmos.bank.v1beta1.params({});
  return result;
}

export async function queryDelegationRewards(
  queryClient: QueryClient,
  { delegatorAddress, validatorAddress }: SDKQueryTypes.QueryDelegationRewardsRequest,
) {
  const result = await queryClient.cosmos.distribution.v1beta1.delegationRewards({
    delegatorAddress,
    validatorAddress,
  });
  return ((result ?? {})?.rewards ?? [])?.map((r) => ({
    ...(r ?? {}),
    amount: (r?.amount ?? '').slice(0, (r?.amount ?? '').length - 18),
  }));
}

export async function queryDelegationTotalRewards(
  queryClient: QueryClient,
  { delegatorAddress }: SDKQueryTypes.QueryDelegationTotalRewardsRequest,
) {
  const result = await queryClient.cosmos.distribution.v1beta1.delegationTotalRewards({
    delegatorAddress,
  });
  const totalRewards = result.total.find((total) => total.denom === 'uixo');
  return {
    total: totalRewards
      ? {
          amount: (((result ?? {})?.total ?? [])?.find((total) => total.denom === 'uixo') ?? {})?.amount?.slice(
            0,
            totalRewards?.amount?.length - 18,
          ),
          denom: (((result ?? {})?.total ?? [])?.find((total) => total.denom === 'uixo') ?? {})?.denom,
        }
      : undefined,
    rewards: result.rewards.map((reward) => {
      const delegationReward = reward.reward.find((reward) => reward.denom === 'uixo');

      return {
        validatorAddress: reward.validatorAddress,
        reward: delegationReward
          ? {
              amount: (delegationReward ?? {})?.amount?.slice(0, delegationReward.amount.length - 18),
              denom: (delegationReward ?? {})?.denom ?? 'uixo',
            }
          : undefined,
      };
    }),
  };
}

// export async function queryDelegatorValidators(
//   queryClient: QueryClient,
//   { delegatorAddress }: SDKQueryTypes.QueryDelegatorValidatorsRequest,
// ) {
//   const result = await queryClient.cosmos.distribution.v1beta1.delegatorValidators({
//     delegatorAddress,
//   });
//   return result;
// }

export async function queryDelegatorWithdrawAddress(
  queryClient: QueryClient,
  { delegatorAddress }: SDKQueryTypes.QueryDelegatorWithdrawAddressRequest,
) {
  const result = await queryClient.cosmos.distribution.v1beta1.delegatorWithdrawAddress({
    delegatorAddress,
  });
  return result;
}
