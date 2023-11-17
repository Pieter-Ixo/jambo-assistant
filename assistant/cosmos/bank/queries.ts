import * as SDKQueryTypes from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/query';

import { QueryClient } from 'assistant/types/query';

export async function queryBalance(queryClient: QueryClient, { address, denom }: SDKQueryTypes.QueryBalanceRequest) {
  const result = await queryClient.cosmos.bank.v1beta1.balance({
    address,
    denom,
  });
  return result?.balance;
}

export async function queryAllBalances(queryClient: QueryClient, { address }: SDKQueryTypes.QueryAllBalancesRequest) {
  const result = await queryClient.cosmos.bank.v1beta1.allBalances({
    address,
  });
  return result?.balances;
}
