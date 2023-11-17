import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/staking/v1beta1/query';

import * as Types from './types';
import * as Queries from './queries';
import * as Constants from './constants';
import * as Transactions from './transactions';

import * as AssistantTypes from 'assistant/types/assistant';

export async function transactions(
  name: string,
  params: Types.TxParams,
  user: AssistantTypes.User,
  { queryClient }: AssistantTypes.Clients,
) {
  switch (name) {
    case Constants.TX.msgDelegate:
      const msgDelegate = Transactions.generateMsgDelegateTrx({
        delegatorAddress: user.address ?? '',
        validatorAddress: (params as Types.MsgDelegateParams).validatorAddress,
        amount: {
          amount:
            (params as Types.MsgDelegateParams).denom === 'uixo'
              ? (params as Types.MsgDelegateParams).amount
              : (parseInt((params as Types.MsgDelegateParams).amount) * Math.pow(10, 6)).toString(),
          denom: 'uixo',
        },
      } as SDKTxTypes.MsgDelegate);
      return msgDelegate;
    case Constants.TX.msgBeginRedelegate:
      const msgBeginRedelegate = Transactions.generateMsgBeginRedelegateTrx({
        delegatorAddress: user.address ?? '',
        validatorSrcAddress: (params as Types.MsgBeginRedelegateParams).validatorSrcAddress,
        validatorDstAddress: (params as Types.MsgBeginRedelegateParams).validatorDstAddress,
        amount: {
          amount:
            (params as Types.MsgDelegateParams).denom === 'uixo'
              ? (params as Types.MsgBeginRedelegateParams).amount
              : (parseInt((params as Types.MsgDelegateParams).amount) * Math.pow(10, 6)).toString(),
          denom: 'uixo',
        },
      } as SDKTxTypes.MsgBeginRedelegate);
      return msgBeginRedelegate;
    case Constants.TX.msgUndelegate:
      const msgUndelegate = Transactions.generateMsgUndelegateTrx({
        delegatorAddress: user.address ?? '',
        validatorAddress: (params as Types.MsgUndelegateParams).validatorAddress,
        amount: {
          amount:
            (params as Types.MsgDelegateParams).denom === 'uixo'
              ? (params as Types.MsgUndelegateParams).amount
              : (parseInt((params as Types.MsgDelegateParams).amount) * Math.pow(10, 6)).toString(),
          denom: 'uixo',
        },
      } as SDKTxTypes.MsgUndelegate);
      return msgUndelegate;
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
    case Constants.QUERY.queryValidators:
      const queryValidators = await Queries.queryValidators(
        queryClient as AssistantTypes.QueryClient,
        {
          status: (params as Types.QueryValidatorsParams)?.status ?? '',
        } as SDKQueryTypes.QueryValidatorsRequest,
      );
      return JSON.stringify(queryValidators);
    case Constants.QUERY.queryValidator:
      const queryValidator = await Queries.queryValidator(
        queryClient as AssistantTypes.QueryClient,
        {
          validatorAddr: (params as Types.QueryValidatorParams)?.validatorAddr ?? '',
        } as SDKQueryTypes.QueryValidatorRequest,
      );
      return JSON.stringify(queryValidator);
    // case Constants.QUERY.queryValidatorDelegations:
    //   const queryValidatorDelegations = await Queries.queryValidatorDelegations(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       validatorAddr: (params as Types.QueryValidatorDelegationsParams)?.validatorAddr ?? '',
    //     } as SDKQueryTypes.QueryValidatorDelegationsRequest,
    //   );
    //   return JSON.stringify(queryValidatorDelegations);
    // case Constants.QUERY.queryValidatorUnbondingDelegations:
    //   const queryValidatorUnbondingDelegations = await Queries.queryValidatorUnbondingDelegations(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       validatorAddr: (params as Types.QueryValidatorUnbondingDelegationsParams)?.validatorAddr ?? '',
    //     } as SDKQueryTypes.QueryValidatorUnbondingDelegationsRequest,
    //   );
    //   return JSON.stringify(queryValidatorUnbondingDelegations);
    case Constants.QUERY.queryDelegation:
      const queryDelegation = await Queries.queryDelegation(
        queryClient as AssistantTypes.QueryClient,
        {
          validatorAddr: (params as Types.QueryDelegationParams)?.validatorAddr ?? '',
          delegatorAddr: (params as Types.QueryDelegationParams)?.delegatorAddr ?? user.address ?? '',
        } as SDKQueryTypes.QueryDelegationRequest,
      );
      return JSON.stringify(queryDelegation);
    case Constants.QUERY.queryUnbondingDelegation:
      const queryUnbondingDelegation = await Queries.queryUnbondingDelegation(
        queryClient as AssistantTypes.QueryClient,
        {
          validatorAddr: (params as Types.QueryUnbondingDelegationParams)?.validatorAddr ?? '',
          delegatorAddr: (params as Types.QueryUnbondingDelegationParams)?.delegatorAddr ?? user.address ?? '',
        } as SDKQueryTypes.QueryUnbondingDelegationRequest,
      );
      return JSON.stringify(queryUnbondingDelegation);
    case Constants.QUERY.queryDelegatorDelegations:
      const queryDelegatorDelegations = await Queries.queryDelegatorDelegations(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddr: (params as Types.QueryDelegatorDelegationsParams)?.delegatorAddr ?? user.address ?? '',
        } as SDKQueryTypes.QueryDelegatorDelegationsRequest,
      );
      return JSON.stringify(queryDelegatorDelegations);
    case Constants.QUERY.queryDelegatorUnbondingDelegations:
      const queryDelegatorUnbondingDelegations = await Queries.queryDelegatorUnbondingDelegations(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddr:
            (params as Types.QueryDelegatorUnbondingDelegationsParams)?.delegatorAddr ?? user.address ?? '',
        } as SDKQueryTypes.QueryDelegatorUnbondingDelegationsRequest,
      );
      return JSON.stringify(queryDelegatorUnbondingDelegations);
    case Constants.QUERY.queryRedelegations:
      const queryRedelegations = await Queries.queryRedelegations(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddr: (params as Types.QueryRedelegationsParams)?.delegatorAddr ?? user.address ?? '',
          srcValidatorAddr: (params as Types.QueryRedelegationsParams)?.srcValidatorAddr ?? '',
          dstValidatorAddr: (params as Types.QueryRedelegationsParams)?.dstValidatorAddr ?? '',
        } as SDKQueryTypes.QueryRedelegationsRequest,
      );
      return JSON.stringify(queryRedelegations);
    case Constants.QUERY.queryDelegatorValidators:
      const queryDelegatorValidators = await Queries.queryDelegatorValidators(
        queryClient as AssistantTypes.QueryClient,
        {
          delegatorAddr: (params as Types.QueryDelegatorValidatorsParams)?.delegatorAddr ?? user.address ?? '',
        } as SDKQueryTypes.QueryDelegatorValidatorsRequest,
      );
      return JSON.stringify(queryDelegatorValidators);
    // case Constants.QUERY.queryHistoricalInfo:
    //   const queryHistoricalInfo = await Queries.queryHistoricalInfo(
    //     queryClient as AssistantTypes.QueryClient,
    //     {
    //       height: (params as Types.QueryHistoricalInfoParams)?.height
    //         ? longify((params as Types.QueryHistoricalInfoParams)?.height as string)
    //         : undefined,
    //     } as SDKQueryTypes.QueryHistoricalInfoRequest,
    //   );
    //   return JSON.stringify(queryHistoricalInfo);
    // case Constants.QUERY.queryPool:
    //   const queryPool = await Queries.queryPool(queryClient as AssistantTypes.QueryClient, {} as SDKQueryTypes.QueryPoolRequest);
    //   return JSON.stringify(queryPool);
    // case Constants.QUERY.queryParams:
    //   const queryParams = await Queries.queryParams(queryClient as AssistantTypes.QueryClient, {} as SDKQueryTypes.QueryParamsRequest);
    //   return JSON.stringify(queryParams);
    default:
      throw new Error('Unknown query');
  }
}
