import { Coin } from '@ixo/impactxclient-sdk/types/codegen/cosmos/base/v1beta1/coin';
import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/distribution/v1beta1/query';

import * as Utils from './utils';
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
    case Constants.TX.msgSetWithdrawAddress:
      const msgSetWithdrawAddress = Transactions.generateMsgSetWithdrawAddressTrx({
        delegatorAddress: user?.address ?? '',
        withdrawAddress: (params as Types.MsgSetWithdrawAddressParams).withdrawAddress,
      } as SDKTxTypes.MsgSetWithdrawAddress);
      return msgSetWithdrawAddress;
    case Constants.TX.msgWithdrawDelegatorReward:
      const msgWithdrawDelegatorReward = Transactions.generateMsgWithdrawDelegatorRewardTrx({
        delegatorAddress: user?.address ?? '',
        validatorAddress: (params as Types.MsgWithdrawDelegatorRewardParams).validatorAddress,
      } as SDKTxTypes.MsgWithdrawDelegatorReward);
      return msgWithdrawDelegatorReward;
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
    // case Constants.QUERY.queryParams:
    //   const queryParams = await Queries.queryParams(queryClient as AssistantTypes.QueryClient, {} as SDKQueryTypes.QueryParamsRequest);
    //   return JSON.stringify(queryParams);
    case Constants.QUERY.queryDelegationRewards:
      const queryDelegationRewards = await Queries.queryDelegationRewards(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddress: (params as Types.QueryDelegationRewardsParams)?.delegatorAddress ?? user?.address ?? '',
          validatorAddress: (params as Types.QueryDelegationRewardsParams).validatorAddress,
        } as SDKQueryTypes.QueryDelegationRewardsRequest,
      );
      const queryDelegationRewardsResult = Utils.extractWalletBalancesFromCoins(
        queryDelegationRewards,
        queryClient as AssistantTypes.QueryClient,
      );
      return typeof queryDelegationRewardsResult === 'string'
        ? queryDelegationRewardsResult
        : JSON.stringify(queryDelegationRewardsResult);
    case Constants.QUERY.queryDelegationTotalRewards:
      const queryDelegationTotalRewards = await Queries.queryDelegationTotalRewards(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddress: (params as Types.QueryDelegationTotalRewardsParams).delegatorAddress ?? user?.address ?? '',
        } as SDKQueryTypes.QueryDelegationTotalRewardsRequest,
      );
      const queryDelegationTotalRewardsResult = {
        total: Utils.extractWalletBalanceFromCoin(
          queryDelegationTotalRewards?.total as Coin,
          queryClient as AssistantTypes.QueryClient,
        ),
        rewards: queryDelegationTotalRewards?.rewards?.map((reward) => ({
          ...reward,
          reward: Utils.extractWalletBalanceFromCoin(reward.reward as Coin, queryClient as AssistantTypes.QueryClient),
        })),
      };
      return JSON.stringify(queryDelegationTotalRewardsResult);
    // case Constants.QUERY.queryDelegatorValidators:
    //   const queryDelegatorValidators = await Queries.queryDelegatorValidators(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       delegatorAddress: (params as Types.QueryDelegatorValidatorsParams).delegatorAddress ?? user?.address ?? '',
    //     } as SDKQueryTypes.QueryDelegatorValidatorsRequest,
    //   );
    //   return JSON.stringify(queryDelegatorValidators);
    case Constants.QUERY.queryDelegatorWithdrawAddress:
      const queryDelegatorWithdrawAddress = await Queries.queryDelegatorWithdrawAddress(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddress:
            (params as Types.QueryDelegatorWithdrawAddressParams).delegatorAddress ?? user?.address ?? '',
        } as SDKQueryTypes.QueryDelegatorWithdrawAddressRequest,
      );
      return JSON.stringify(queryDelegatorWithdrawAddress);
    default:
      throw new Error('Unknown query');
  }
}
