// eslint-disable-next-line import/no-anonymous-default-export
export const transactions = [
  {
    name: 'token_msgTransferToken',
    description: 'Transfer a batch of tokens (e.g. CARBON) from one ixo account to another',
    parameters: {
      type: 'object',
      properties: {
        // owner
        recipient: {
          type: 'string',
          description: 'The ixo address of the recipient',
        },
        tokenName: {
          type: 'string',
          enum: ['CARBON'],
          description: 'The name of the token to be transferred (CARBON)',
        },
        amount: {
          type: 'string',
          description: 'The amount of tokens to transfer - string to accommodate large numbers',
        },
      },
      required: ['recipient', 'tokenName', 'amount'],
    },
  },
  {
    name: 'token_msgRetireToken',
    description:
      'Retire/offset a specified amount of tokens, removing them from circulation in the specified smart contract',
    parameters: {
      type: 'object',
      properties: {
        // owner
        tokenName: {
          type: 'string',
          enum: ['CARBON'],
          description: 'The name of the token to be retired/offset',
        },
        amount: {
          type: 'string',
          description: 'The amount of tokens to retire/offset - string to accommodate large numbers',
        },
        jurisdiction: {
          type: 'string',
          description:
            "The jurisdiction of the token owner. Only country-code (default 'Global') is required, with optional sub-national-code (1-3 alphanumeric characters) and postal-code (up to 64 alphanumeric characters) for additional precision.",
        },
        reason: {
          type: 'string',
          description: 'Arbitrary string providing a reason for the retirement/offset',
        },
      },
      required: ['tokenName', 'amount'],
    },
  },
];

export const queries = [
  {
    name: 'token_getAccountImpactTokensByAddress',
    description: 'Get all impact tokens for a given ixo address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The ixo address to query the balance of - not required if user queries their own balance',
        },
      },
    },
  },
  {
    name: 'token_getImpactTokensTotalForEntitiesByAddress',
    description: 'Get the total impact tokens for all entities owned by a given ixo address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The ixo address to query the balance of - not required if user queries their own balance',
        },
      },
    },
  },
  {
    name: 'token_getImpactTokensTotalByAddress',
    description: 'Get the total impact tokens for a given ixo address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description: 'The ixo address to query the balance of - not required if user queries their own balance',
        },
      },
    },
  },
];
