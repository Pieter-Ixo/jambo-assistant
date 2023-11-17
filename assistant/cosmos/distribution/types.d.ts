export type MsgSetWithdrawAddressParams = {
  withdrawAddress: string;
};

export type MsgWithdrawDelegatorRewardParams = {
  validatorAddress: string;
};

export type QueryParamsParams = {};

export type QueryDelegationRewardsParams = {
  delegatorAddress?: string;
  validatorAddress: string;
};

export type QueryDelegationTotalRewardsParams = {
  delegatorAddress?: string;
};

export type QueryDelegatorValidatorsParams = {
  delegatorAddress?: string;
};

export type QueryDelegatorWithdrawAddressParams = {
  delegatorAddress?: string;
};

export type TxParams = MsgSetWithdrawAddressParams | MsgWithdrawDelegatorRewardParams;

export type QueryParams =
  | QueryParamsParams
  | QueryDelegationRewardsParams
  | QueryDelegationTotalRewardsParams
  | QueryDelegatorValidatorsParams
  | QueryDelegatorWithdrawAddressParams;
