import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { createQueryClient } from '@ixo/impactxclient-sdk';
import OpenAI from 'openai';

// import { WHITELIST } from './modules';
import { CHAIN_NETWORK_TYPE } from 'types/chain';
import { TransactionRequest, TransactionResponse } from './transactions';

export interface User {
  name?: string;
  address?: string;
  did?: string;
}

export type GraphqlClient = ApolloClient<NormalizedCacheObject>;

export type QueryClient = Awaited<ReturnType<typeof createQueryClient>>;

export type SignAndBroadcast = (trx: TransactionRequest) => Promise<TransactionResponse | string>;

export type Clients = {
  queryClient?: QueryClient;
  graphqlClient?: GraphqlClient;
  signAndBroadcast?: SignAndBroadcast;
};

export interface Config {
  model?: string;
  user?: User;
  relayerUrl?: string;
  apiKey: string;
  network?: CHAIN_NETWORK_TYPE;
  signAndBroadcast?: SignAndBroadcast;
  queryClient?: QueryClient;
  graphqlClient?: GraphqlClient;
}

export interface OpenaiConfig {
  organization: string;
  apiKey: string;
  dangerouslyAllowBrowser?: boolean;
}

export interface ChatGPTConfig {
  apiKey: string;
  relayerUrl?: string;
  model?: string;
  user?: User;
}

export type ChatFunction = OpenAI.Chat.Completions.ChatCompletionCreateParams.Function;

export type ChatMessage = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export type ChatMessageResponse = OpenAI.Chat.Completions.ChatCompletionMessage;
export type StreamMessageResponse = OpenAI.Chat.Completions.ChatCompletionChunk;
