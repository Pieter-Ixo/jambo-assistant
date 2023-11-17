import { customQueries } from '@ixo/impactxclient-sdk';
import { Coin } from '@cosmjs/proto-signing';

import { QueryClient } from 'assistant/types/assistant';

export function extractWalletBalanceFromCoin(coin: Coin, queryClient: QueryClient) {
  let amount = Number(coin?.amount ?? 0);
  let denom = coin?.denom;
  let displayDenom = coin?.denom;

  if (!denom) return 'No Coin';

  const token = customQueries.currency.findTokenFromDenom(denom);
  if (token?.coinDenom) {
    displayDenom = token.coinDenom;
    amount = amount / Math.pow(10, token.coinDecimals ?? 0);
  }

  return {
    amount,
    denom,
    displayDenom,
  };
}

export function extractWalletBalancesFromCoins(coins: Coin[], queryClient: QueryClient) {
  const balances = coins.map((coin) => {
    const balance = extractWalletBalanceFromCoin(coin, queryClient);
    return balance;
  });
  return balances;
}
