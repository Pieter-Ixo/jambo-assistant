export type MsgDelegateParams = {
  validatorAddress: string;
  amount: string;
  denom: string;
};

export type MsgBeginRedelegateParams = {
  validatorSrcAddress: string;
  validatorDstAddress: string;
  amount: string;
  denom: string;
};

export type MsgUndelegateParams = {
  validatorAddress: string;
  amount: string;
  denom: string;
};

export type QueryValidatorsParams = {
  status?: string;
};

export type QueryValidatorParams = {
  validatorAddr: string;
};

export type QueryValidatorDelegationsParams = {
  validatorAddr: string;
};

export type QueryValidatorUnbondingDelegationsParams = {
  validatorAddr: string;
};

export type QueryDelegationParams = {
  delegatorAddr?: string;
  validatorAddr: string;
};

export type QueryUnbondingDelegationParams = {
  delegatorAddr?: string;
  validatorAddr: string;
};

export type QueryDelegatorDelegationsParams = {
  delegatorAddr?: string;
};

export type QueryDelegatorUnbondingDelegationsParams = {
  delegatorAddr?: string;
};

export type QueryRedelegationsParams = {
  delegatorAddr?: string;
  srcValidatorAddr: string;
  dstValidatorAddr: string;
};

export type QueryDelegatorValidatorsParams = {
  delegatorAddr?: string;
};

export type QueryHistoricalInfoParams = {
  height?: string;
};

export type QueryPoolParams = {};

export type QueryParamsParams = {};

export type TxParams = MsgDelegateParams | MsgBeginRedelegateParams | MsgUndelegateParams;

export type QueryParams =
  | QueryValidatorsParams
  | QueryValidatorParams
  | QueryValidatorDelegationsParams
  | QueryValidatorUnbondingDelegationsParams
  | QueryDelegationParams
  | QueryUnbondingDelegationParams
  | QueryDelegatorDelegationsParams
  | QueryDelegatorUnbondingDelegationsParams
  | QueryRedelegationsParams
  | QueryDelegatorValidatorsParams
  | QueryHistoricalInfoParams
  | QueryPoolParams
  | QueryParamsParams;
