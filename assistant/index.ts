import { createQueryClient } from '@ixo/impactxclient-sdk';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import * as BankSchemas from './cosmos/bank/schemas';
import * as DistributionSchemas from './cosmos/distribution/schemas';
import * as FeegrantSchemas from './cosmos/feegrant/schemas';
import * as GovSchemas from './cosmos/gov/schemas';
import * as StakingSchemas from './cosmos/staking/schemas';
import * as IbcSchemas from './ibc/schemas';
import * as EntitySchemas from './ixo/entity/schemas';
import * as TokenSchemas from './ixo/token/schemas';

import * as BankHandlers from './cosmos/bank/handler';
import * as DistributionHandlers from './cosmos/distribution/handler';
import * as FeegrantHandlers from './cosmos/feegrant/handler';
import * as GovHandlers from './cosmos/gov/handler';
import * as StakingHandlers from './cosmos/staking/handler';
import * as IbcHandlers from './ibc/handler';
import * as EntityHandlers from './ixo/entity/handler';
import * as TokenHandlers from './ixo/token/handler';

import { TransactionRequest, TransactionResponse } from './types/transactions';
import { MODULES } from './types/modules';
import * as AssistantTypes from 'assistant/types/assistant';
import { CHAIN_NETWORK_TYPE } from 'types/chain';
import { RPC_ENDPOINTS } from './constants/chain';
import ChatGPT from './utils/chatGPT';

function getModuleSchema(module: MODULES, transactions: boolean = false) {
  switch (module) {
    case MODULES.bank:
      return transactions ? BankSchemas.transactions : BankSchemas.queries;
    case MODULES.distribution:
      return transactions ? DistributionSchemas.transactions : DistributionSchemas.queries;
    case MODULES.feegrant:
      return transactions ? FeegrantSchemas.transactions : FeegrantSchemas.queries;
    case MODULES.gov:
      return transactions ? GovSchemas.transactions : GovSchemas.queries;
    case MODULES.staking:
      return transactions ? StakingSchemas.transactions : StakingSchemas.queries;
    case MODULES.ibc:
      return transactions ? IbcSchemas.transactions : IbcSchemas.queries;
    case MODULES.entity:
      return transactions ? EntitySchemas.transactions : EntitySchemas.queries;
    case MODULES.token:
      return transactions ? TokenSchemas.transactions : TokenSchemas.queries;
    default:
      throw new Error('Cannot find module functions');
  }
}

function getModuleHandler(module: MODULES, transactions: boolean = false) {
  switch (module) {
    case MODULES.bank:
      return transactions ? BankHandlers.transactions : BankHandlers.queries;
    case MODULES.distribution:
      return transactions ? DistributionHandlers.transactions : DistributionHandlers.queries;
    case MODULES.feegrant:
      return transactions ? FeegrantHandlers.transactions : FeegrantHandlers.queries;
    case MODULES.gov:
      return transactions ? GovHandlers.transactions : GovHandlers.queries;
    case MODULES.staking:
      return transactions ? StakingHandlers.transactions : StakingHandlers.queries;
    case MODULES.ibc:
      return transactions ? IbcHandlers.transactions : IbcHandlers.queries;
    case MODULES.entity:
      return transactions ? EntityHandlers.transactions : EntityHandlers.queries;
    case MODULES.token:
      return transactions ? TokenHandlers.transactions : TokenHandlers.queries;
    default:
      throw new Error('Cannot find module handlers');
  }
}

export default class Oxi extends ChatGPT {
  private network: CHAIN_NETWORK_TYPE;
  private signAndBroadcast: (trx: TransactionRequest) => Promise<TransactionResponse | string>;
  private queryClient?: AssistantTypes.QueryClient;
  private graphqlClient?: AssistantTypes.GraphqlClient;

  constructor(config: AssistantTypes.Config) {
    super(config);
    if (!config.network) console.warn('Network not specified. Defaulting to testnet.');
    this.network = config?.network ?? 'testnet';
    if (!config.signAndBroadcast)
      console.warn('No signAndBroadcast function provided. Transactions will not execute successfully.');
    this.signAndBroadcast =
      config?.signAndBroadcast ?? (async (trx: TransactionRequest) => 'Unable to execute transaction');
    if (config.queryClient) this.queryClient = config.queryClient;
    if (config.graphqlClient) this.graphqlClient = config.graphqlClient;
    this.initiateChatGPT();
  }

  private async init() {
    if (!this.queryClient) this.queryClient = await createQueryClient(RPC_ENDPOINTS[this.network]);
    if (!this.graphqlClient)
      this.graphqlClient = new ApolloClient({
        uri: RPC_ENDPOINTS[this.network],
        cache: new InMemoryCache(),
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
          },
          query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
          },
        },
      });
  }

  async chat(message?: string): Promise<any> {
    if (message) this.addUserMessage(message);
    const messages = JSON.parse(JSON.stringify(this.getChatMessages()));
    await this.init();
    let [msg, name, args] = await this.getIntent(messages);
    if (!name) return msg;
    if (name === 'use_module') {
      const functions = getModuleSchema(args.module, args.type === 'transaction');
      this.setFunctions(functions);
      [msg, name, args] = await this.getIntent(messages);
      if (!name) return msg;
    }
    messages.push(msg);
    try {
      const [module, func] = (name ?? '')?.split('_');
      const isQuery = /^query/.test(func);
      const isGraphql = /^graphql/.test(func);
      const handler = getModuleHandler(module as MODULES, !isQuery);
      const result = await handler(func, args, this.getUser, {
        queryClient: isQuery ? (this.queryClient as AssistantTypes.QueryClient) : undefined,
        graphqlClient: isGraphql ? (this.graphqlClient as AssistantTypes.GraphqlClient) : undefined,
        signAndBroadcast:
          !isQuery && !isGraphql ? (this.signAndBroadcast as AssistantTypes.SignAndBroadcast) : undefined,
      });
      if (isQuery) {
        messages.push({
          role: 'function',
          name,
          content: result,
        });
      } else {
        const response = await this.signAndBroadcast([result as any]);
        if (!response || (typeof response === 'object' && response.code !== 0)) throw new Error('Transaction Failed');
        messages.push({
          role: 'function',
          name,
          content: typeof response === 'object' ? 'success' : response,
        });
      }
    } catch (error) {
      console.error('chat::', error);
      messages.push({
        role: 'function',
        name,
        content: (error as { message: string }).message?.toString() ?? 'Unknown error occurred',
      });
    } finally {
      const responseChat = await this.assistantChat(messages);
      console.log({ responseChat });
      this.addAssistantMessage(responseChat?.content ?? '-- NO RESPONSE FROM ASSISTANT --');
      this.resetFunctions();
      return responseChat;
    }
  }

  async getIntent(messages: AssistantTypes.ChatMessage[]) {
    const message = await this.assistantChat(messages);
    console.log({ message });
    let wantsToUseFunction = message?.function_call;
    console.log({ wantsToUseFunction });
    if (!wantsToUseFunction) {
      this.addAssistantMessage(message?.content ?? '-- NO RESPONSE FROM ASSISTANT --');
      return [message];
    }
    let name = message?.function_call?.name;
    let args = JSON.parse(message?.function_call?.arguments ?? '{}');
    console.log({ name, args });
    return [message, name, args];
  }

  setSignAndBroadcast(signAndBroadcast: (trx: TransactionRequest) => Promise<TransactionResponse | string>) {
    this.signAndBroadcast = signAndBroadcast;
  }

  setQueryClient(queryClient: AssistantTypes.QueryClient) {
    this.queryClient = queryClient;
  }
}
