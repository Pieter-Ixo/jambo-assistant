import * as SDKTxTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/tx';
import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/query';

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
    case Constants.TX.msgSend: // TODO: convert denom to minimalDenom
      // TODO: check wallet balance before sending (for denom and amount validation)
      const msgSend = Transactions.generateMsgSendTrx({
        toAddress: (params as Types.MsgSendParams).toAddress,
        fromAddress: user.address ?? '',
        amount: (params as Types.MsgSendParams).amount,
      } as SDKTxTypes.MsgSend);
      return msgSend;
    case Constants.TX.msgMultiSend: // TODO: convert denom to minimalDenom
      // TODO: check wallet balance before sending (for denom and amount validation)
      const msgMultiSend = Transactions.generateMsgMultiSendTrx({
        inputs: Utils.generateMultiSendInputsFromOutputs(
          user?.address ?? '',
          (params as Types.MsgMultiSendParams).outputs,
        ),
        outputs: (params as Types.MsgMultiSendParams).outputs,
      } as SDKTxTypes.MsgMultiSend);
      return msgMultiSend;
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
    case Constants.QUERY.queryBalance:
      const queryBalance = await Queries.queryBalance(
        queryClient as AssistantTypes.QueryClient,
        {
          address: (params as Types.QueryBalanceParams)?.address ?? user.address ?? '',
          denom: (params as Types.QueryBalanceParams).denom,
        } as SDKQueryTypes.QueryBalanceRequest,
      );
      const queryBalanceResult = await Utils.extractWalletBalanceFromCoin(queryBalance!, queryClient!);
      return typeof queryBalanceResult === 'string' ? queryBalanceResult : JSON.stringify(queryBalanceResult);
    case Constants.QUERY.queryAllBalances:
      const queryAllBalances = await Queries.queryAllBalances(
        queryClient as AssistantTypes.QueryClient,
        {
          address: (params as Types.QueryAllBalancesParams)?.address ?? user.address ?? '',
        } as SDKQueryTypes.QueryAllBalancesRequest,
      );
      const queryAllBalancesResult = await Utils.extractWalletBalancesFromCoins(queryAllBalances ?? [], queryClient!);
      return JSON.stringify(queryAllBalancesResult);
    default:
      throw new Error('Unknown query');
  }
}
