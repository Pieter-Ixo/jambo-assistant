import OpenAI from 'openai';

import * as AssistantTypes from '../types/assistant';
import { ApisauceInstance, create } from 'apisauce';

function getInitialMessages(user?: AssistantTypes.User) {
  return [
    {
      role: 'system',
      content: `You are Oxi (greet yourself as such), an ixo assistant that help users query data or perform transactions on the ixo blockchain. If the user deviates from the topic of anything ixo related then bring them back to the topic of ixo. The transaction modules you have (limited) access to is cosmos's authz, bank, distribution, feegrant, gov and staking modules, the ibc modules and ixo's entity and token modules. If it seems like the user wants to perform a function, trigger the use_module function with the specified module to get the schema of data required to perform the action or execute the query. Then ask them questions until you have all the necessary details to perform the query or transaction function but always before you initiate a transaction function, prompt them with a short one-sentence summary of the transaction to confirm the transaction details (e.g. Do you want to send 5 IXO to ixo123abc?). Only if they approve or confirm, then go ahead with the function. ${
        user?.address ? `The user's address is ${user.address}. ` : ''
      }The current date and time is ${new Date().toISOString()}. The \`authz\` module introduces granular permission systems for blockchain accounts. It allows a blockchain account holder to delegate the permission to execute certain transactions on their behalf, without transferring full account ownership. The \`authz\` module transactions include granting and revoking authorizations. Queries in this module allow users to check active authorizations between granters and grantees, providing transparency and control over delegated powers within the blockchain network. The \`bank\` module is a key component for managing cryptocurrency tokens. Transactions include the Send operation, which allows users to transfer tokens between accounts, and MultiSend, for sending tokens to multiple recipients simultaneously. Queries in the bank module let users check account balance per cryptocurrency token denomination or balance of all the user's cryptocurrency tokens (excluding CARBON which is an Impact Token in \`tokens\` module). These features ensure that users can easily interact with the financial aspects of the blockchain, such as checking balances and executing transfers, in a secure and decentralized manner. The \`distribution\` module handles the dispersal of fees and rewards across the ixo network. It automates the allocation of transaction fees and block rewards to validators and delegators, enforcing the governance rules for revenue sharing. Key transactions include the withdrawal of rewards by participants and the setting of alternative withdrawal addresses. Query functions allow participants to check on their earned commissions and rewards. This module is pivotal in maintaining the network's economic incentives and ensuring active and fair participation from validators and delegators and should not be confused with the \`staking\` module which handles participants' delegations. The \`feegrant\` module enables account holders to grant others permission to use their funds for transaction fees, effectively paying the fees on behalf of the grantee. Through the Grant Fee Allowance transaction, a user can authorize another account to charge their account for fees within specified limits. If needed, this allowance can be revoked using the Revoke Fee Allowance transaction. Queries in the module allow for checking the details and limits of existing fee allowances. This module simplifies account management for users who rely on third-party services for transaction execution, enhancing the blockchain's usability by allowing more intricate transactional relationships. The \`gov\` module is the governance layer that facilitates the proposal, discussion, and implementation of changes within the network through community voting. Users can submit proposals, which may include text for signaling, changes to the network parameters, or community spending requests. Stakeholders then vote on these proposals within a predefined voting period. The module supports transactions for depositing tokens to back proposals, and voting on proposals. Queries can be made to inspect proposals, voting results, and tallying outcomes, as well as to check the deposits on any proposal. This mechanism is critical for ensuring that the ixo blockchain remains adaptive and community-driven, with a transparent and democratic process for decision-making. The \`staking\` module is integral to the network's Proof-of-Stake (PoS) mechanism, managing the various aspects of staking and validator selection. It allows token holders to stake their cryptocurrencies as collateral to become validators or delegate their stake to validators, participating indirectly in the network consensus and earning rewards. The module handles transactions for staking/delegating, unstaking/undelegating, and restake/re-delegating tokens. Additionally, it supports queries for information about validators, delegations, and unbonding delegations. This module should not be confused with the \`distribution\` module which is focused on delegation/staking rewards. This module ensures the security and integrity of the PoS blockchain by incentivizing participation and good behavior from validators while penalizing dishonesty or poor performance through slashing of stakes. The \`ibc\` module underpins the ixo network's ability to conduct secure and verifiable transactions with other blockchains, allowing for the seamless transfer of tokens and data across distinct chains. The module's transaction functions enable users to initiate and execute these cross-chain transfers. On the query side, the module provides powerful tools for users to trace token denominations, view transfer parameters, and inspect the status and details of IBC channels. This ensures users have complete visibility into the transfer process and the state of their assets within the IBC ecosystem, maintaining the integrity and transparency of cross-chain operations. The \`entity\` module specializes in the management of digital entities (also referred to as assets or cookstoves), enabling users to transfer these entities and delegate transactional permissions. Transactions include the transfer of asset ownership and operational authority over entities can be shared securely within the network via a specialized authz transaction withing the \`entity\` module. Queries within the module provide users with insights into the details of specific entities, an overview of entities by type or collection, and visibility into entities owned by a particular address. This streamlined approach ensures effective and transparent entity management within the ixo ecosystem. The \`token\` module in the ixo blockchain streamlines the management of Impact Tokens, specifically CARBON tokens, which are digital representations of environmental credits. The module supports essential transactions for the circulation and redemption of these tokens, ensuring that users can transfer and retire them according to their environmental goals. Additionally, the module's querying capabilities provide a comprehensive overview of token holdings, both on an individual and an entity level, allowing users to track the impact tokens generated, held, or retired. This functionality underpins the accountability and traceability of environmental assets within the ixo ecosystem.`,
    },
  ];
}

function getInitialFunction() {
  return {
    name: 'use_module',
    description: '',
    parameters: {
      type: 'object',
      properties: {
        module: {
          type: 'string',
          enum: ['bank', 'distribution', 'feegrant', 'gov', 'staking', 'ibc', 'entity', 'token'],
          description: 'The module to use',
        },
        type: {
          type: 'string',
          enum: ['query', 'transaction'],
          description: 'Use the module for a query or transaction',
        },
      },
      required: ['module', 'type'],
    },
  };
}

export default class ChatGPT {
  private relayer_url: string = 'https://relayer.assistant.ixo.earth';
  private relayer_api_key: string = '';
  private model: string = 'gpt-3.5-turbo-0613';
  private user: AssistantTypes.User = {};
  private messages: AssistantTypes.ChatMessage[] = [];
  private functions: AssistantTypes.ChatFunction[] = [];
  private initiated: boolean = false;
  private api: ApisauceInstance;

  // INITIATE CLASS
  // =================================================================================================
  constructor(config: AssistantTypes.ChatGPTConfig) {
    if (!config.apiKey) throw new Error('Relayer API key required');
    this.relayer_api_key = config.apiKey;
    if (config?.relayerUrl) this.relayer_url = config.relayerUrl;
    if (config?.model) this.model = config.model;
    if (config?.user) this.user = config.user;
    if (!config?.user?.address)
      console.warn(
        'No user details provided! User address is required to perform transactions smoothly. Setting the user later will reset the chat history.',
      );
    this.api = create({
      baseURL: this.relayer_url,
      headers: {
        'Content-Type': 'application/json',
        authorization: this.relayer_api_key,
      },
    });
  }

  // MAIN METHODS
  // =================================================================================================
  protected async initiateChatGPT() {
    if (!this.initiated) {
      this.initiated = true;
      const chat = await this.assistantChat();
      if (chat?.content && !this.getMessages.length) this.addAssistantMessage(chat.content);
    }
  }

  protected async assistantChat(messages?: AssistantTypes.ChatMessage[], functions?: AssistantTypes.ChatFunction[]) {
    const response = await this.api.post<AssistantTypes.ChatMessageResponse>('/assistant/chat', {
      model: this.model,
      messages: messages ?? this.getChatMessages(),
      functions: functions ?? this.getChatFunctions(),
      function_call: (functions ?? this.getChatFunctions())?.length ? 'auto' : 'none',
    });
    console.log({ response });
    if (!response.ok) throw new Error(response.problem);
    return response.data;
  }

  protected async assistantStream(messages?: AssistantTypes.ChatMessage[], functions?: AssistantTypes.ChatFunction[]) {
    const response = await fetch(this.relayer_url + '/assistant/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.relayer_api_key,
      },
      body: JSON.stringify({
        model: this.model,
        messages: messages ?? this.getChatMessages(),
        functions: functions ?? this.getChatFunctions(),
        function_call: (functions ?? this.getChatFunctions())?.length ? 'auto' : 'none',
      }),
    });
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (reader) {
      // Process the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        // Process each chunk (value is a Uint8Array)
        const chunk = new TextDecoder().decode(value);
        console.log('Received chunk:', chunk);
        console.log(
          'chunks',
          chunk.split('\n').filter((c) => c),
        );
        const chunks = chunk.split('\n').filter((c) => c);
        chunks.forEach((c) => this.streamAssistantMessage(c));
        // You can process your chunk as needed here
      }
      console.log('Streaming finished.');
    }
    return this.getMessages[this.getMessages.length - 1];
    // const response = await this.api.post(
    //   //<AssistantTypes.StreamMessageResponse>
    //   '/assistant/chat/stream',
    //   {
    //     model: this.model,
    //     messages: messages ?? this.getChatMessages(),
    //     functions: functions ?? this.getChatFunctions(),
    //     function_call: (functions ?? this.getChatFunctions())?.length ? 'auto' : 'none',
    //   },
    //   {
    //     responseType: ResponseType.Stream,
    //   },
    // );
    // console.log({ response });
    // response?.data?.on('data', (chunk) => {
    //   console.log({ chunk });
    // });
    // if (!response.ok) throw new Error(response.problem);
    // // response.data.on
    // return response.data;
  }

  protected addUserMessage(message: string) {
    this.messages.push({
      role: 'user',
      content: message,
    });
  }

  protected addAssistantMessage(message: string) {
    this.messages.push({
      role: 'assistant',
      content: message,
    });
  }

  protected streamAssistantMessage(streamMessage: string) {
    const streamContent = JSON.parse(streamMessage);
    console.log({ streamContent });
    // if (streamContent?.role) {
    //   this.messages.push(streamContent);
    // } else {
    //   const message = this.messages[this.messages.length - 1];
    //   const data = Object.entries(streamContent).map(([key, value]) => ({
    //     ...message,
    //     [key]: (message?.[key] ?? '') + key,
    //   }));
    //   this.messages[this.messages.length - 1] = { ...message, ...data };
    // }
  }

  // HELPERS
  // =================================================================================================
  protected getChatMessages() {
    return [...getInitialMessages(this.user), ...this.messages] as AssistantTypes.ChatMessage[];
  }

  protected getChatFunctions() {
    if (this.functions?.length) return this.functions;
    return [getInitialFunction()];
  }

  // SETTERS
  // =================================================================================================
  protected setRelayerUrl(relayerUrl: string, relayerApiKey: string) {
    if (!relayerUrl) throw new Error(`Cannot set ${relayerUrl} as the relayer url`);
    this.relayer_url = relayerUrl;
    if (relayerApiKey) this.relayer_api_key = relayerApiKey;
    this.resetChatGPT();
    this.api = create({
      baseURL: this.relayer_url,
      headers: {
        'Content-Type': 'application/json',
        authorization: this.relayer_api_key,
      },
    });
    if (this.getMessages.length > 1) this.initiateChatGPT();
  }

  protected setModel(model: string) {
    this.model = model;
  }

  protected setUser(user: AssistantTypes.User) {
    this.resetChatGPT();
    this.user = user;
    if (this.getMessages.length > 1) this.initiateChatGPT();
  }

  protected setMessages(messages?: AssistantTypes.ChatMessage[]) {
    this.messages = messages ?? [];
  }

  protected setFunctions(functions?: AssistantTypes.ChatFunction[]) {
    this.functions = functions ?? [];
  }

  // RESETTERS
  // =================================================================================================
  protected resetFunctions() {
    this.functions = [];
  }

  protected resetMessages() {
    this.initiated = false;
    this.messages = [];
    this.initiateChatGPT();
  }

  protected resetChatGPT() {
    this.resetFunctions();
    this.resetMessages();
  }

  // GETTERS
  // =================================================================================================
  protected get getApi() {
    return this.api;
  }

  protected get getModel() {
    return this.model;
  }

  protected get getUser() {
    return this.user;
  }

  protected get getMessages() {
    return this.messages?.filter((c) => c?.role === 'user' || c?.role === 'assistant') ?? [];
  }

  protected get getFunctions() {
    return this.functions;
  }

  get getUserAddress() {
    return !!this.user?.address;
  }
}
