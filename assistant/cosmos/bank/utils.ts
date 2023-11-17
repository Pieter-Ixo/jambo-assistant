import { Input, Output } from '@ixo/impactxclient-sdk/types/codegen/cosmos/bank/v1beta1/bank';
import { cosmos, customQueries } from '@ixo/impactxclient-sdk';
import { Coin } from '@cosmjs/proto-signing';

import { QueryClient } from 'assistant/types/assistant';

export function generateMultiSendInputsFromOutputs(address: string, outputs: Output[]): Input[] {
  const input = outputs
    .flatMap((o) => o.coins)
    .reduce((r, v) => {
      if (!r.length) return [{ address, coins: [cosmos.base.v1beta1.Coin.fromPartial(v)] }];
      const inputCoinIndex = r[0]?.coins?.findIndex((c) => c.denom === v.denom);
      if (inputCoinIndex < 0) return [{ ...r[0], coins: [...r[0].coins, cosmos.base.v1beta1.Coin.fromPartial(v)] }];
      const newR = JSON.parse(JSON.stringify(r));
      newR[0].coins[inputCoinIndex].amount = (
        parseInt(newR[0]?.coins?.[inputCoinIndex].amount) + parseInt(v.amount)
      ).toString();
      return newR;
    }, [] as Input[]);
  return input;
}

export async function extractMinimalDenomFromCoin(coin: Coin, queryClient: QueryClient) {
  let minimalDenom = coin?.denom ?? '';
  const isIbc = /^ibc\//i.test(coin?.denom);
  if (isIbc) {
    const ibcToken = await customQueries.currency.findIbcTokenFromHash(queryClient, coin?.denom?.replace('ibc/', ''));
    if (ibcToken?.token?.coinMinimalDenom) return ibcToken?.token?.coinMinimalDenom;
  } else {
    const token = customQueries.currency.findTokenFromDenom(coin?.denom);
    if (token?.coinMinimalDenom) return token?.coinMinimalDenom;
  }
  return minimalDenom;
}

export async function extractMinimalDenomCoinFromCoin(coin: Coin, queryClient: QueryClient): Promise<Coin> {
  let minimalDenom = coin?.denom ?? '';
  let minimalAmount = coin?.amount ?? '0';
  const isIbc = /^ibc\//i.test(coin?.denom);
  if (isIbc) {
    const ibcToken = await customQueries.currency.findIbcTokenFromHash(queryClient, coin?.denom?.replace('ibc/', ''));
    if (ibcToken?.token?.coinMinimalDenom) {
      minimalDenom = ibcToken?.token?.coinMinimalDenom;
      if (
        (coin?.denom ?? '').toLowerCase().trim() === (ibcToken?.token?.coinDenom ?? '').toLowerCase().trim() &&
        (minimalDenom ?? '').toLowerCase().trim() !== (coin?.denom ?? '').toLowerCase().trim()
      )
        minimalAmount = (Number(coin?.amount ?? 0) * Math.pow(10, ibcToken?.token?.coinDecimals ?? 0)).toString();
    }
  } else {
    const token = customQueries.currency.findTokenFromDenom(coin?.denom);
    if (token?.coinMinimalDenom) {
      minimalDenom = token?.coinMinimalDenom;
      if (
        (coin?.denom ?? '').toLowerCase().trim() === (token?.coinDenom ?? '').toLowerCase().trim() &&
        (minimalDenom ?? '').toLowerCase().trim() !== (coin?.denom ?? '').toLowerCase().trim()
      )
        minimalAmount = (Number(coin?.amount ?? 0) * Math.pow(10, token?.coinDecimals ?? 0)).toString();
    }
  }
  return {
    denom: minimalDenom,
    amount: minimalAmount,
  };
}

export async function extractMinimalDenomCoinsFromCoins(coins: Coin[], queryClient: QueryClient): Promise<Coin[]> {
  const minimalDenomCoins = await Promise.all(
    coins.map(async (coin) => {
      const minimalDenomCoin = await extractMinimalDenomCoinFromCoin(coin, queryClient);
      return minimalDenomCoin;
    }),
  );
  return minimalDenomCoins;
}

export async function extractMinimalDenomCoinsFromOutputOrInputCoins(
  data: Output[] | Input[],
  queryClient: QueryClient,
): Promise<Output[] | Input[]> {
  const minimalDenomCoins = await Promise.all(
    data.map(async (output) => {
      const minimalDenomCoins = await extractMinimalDenomCoinsFromCoins(output.coins, queryClient);
      return {
        ...output,
        coins: minimalDenomCoins,
      };
    }),
  );
  return minimalDenomCoins;
}

export async function extractWalletBalanceFromCoin(coin: Coin, queryClient: QueryClient) {
  let amount = Number(coin?.amount ?? 0);
  let denom = coin?.denom;
  let displayDenom = coin?.denom;

  if (!denom) return 'No Coin';

  if (denom && /^ibc\//.test(denom)) {
    const token = await customQueries.currency.findIbcTokenFromHash(queryClient!, denom?.replace('ibc/', ''));
    if (token?.token?.coinDenom) {
      displayDenom = `${token.token.coinDenom} (IBC)`;
      amount = amount / Math.pow(10, token.token.coinDecimals ?? 0);
    }
  } else {
    const token = customQueries.currency.findTokenFromDenom(denom);
    if (token?.coinDenom) {
      displayDenom = token.coinDenom;
      amount = amount / Math.pow(10, token.coinDecimals ?? 0);
    }
  }

  return {
    amount,
    denom,
    displayDenom,
  };
}

export async function extractWalletBalancesFromCoins(coins: Coin[], queryClient: QueryClient) {
  const balances = await Promise.all(
    coins.map(async (coin) => {
      const balance = await extractWalletBalanceFromCoin(coin, queryClient);
      return balance;
    }),
  );
  return balances;
}
