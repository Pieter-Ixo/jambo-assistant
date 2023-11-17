export const transactions = [
  {
    name: 'bank_msgSend',
    description: 'A cryptocurrency token transfer operation between two accounts',
    parameters: {
      type: 'object',
      properties: {
        toAddress: {
          type: 'string',
          description: "The recipient's ixo address",
        },
        amount: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              denom: {
                type: 'string',
                description: 'The denomination of tokens being sent',
              },
              amount: {
                type: 'string',
                description: 'The quantity of tokens to be sent - string representation of a valid positive integer',
              },
            },
            required: ['denom', 'amount'],
          },
          description:
            "An array of 'Coin' objects, each specifying a separate denomination and an amount of tokens to send",
        },
      },
      required: ['toAddress', 'amount'],
    },
  },
  {
    name: 'bank_msgMultiSend',
    description:
      'A cryptocurrency token transfer operation of numerous tokens of various types to be sent from one to multiple other addresses',
    parameters: {
      type: 'object',
      properties: {
        outputs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description: 'An ixo address designated to receive cryptocurrency tokens',
              },
              coins: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    denom: {
                      type: 'string',
                      description: 'The denomination of tokens being sent',
                    },
                    amount: {
                      type: 'string',
                      description:
                        'The quantity of tokens being sent - string representation of a valid positive integer',
                    },
                  },
                  required: ['denom', 'amount'],
                },
                description:
                  "An array of 'Coin' objects, detailing the denominations and corresponding amounts of tokens intended for the 'address' to receive.",
              },
            },
            required: ['address', 'coins'],
          },
          description:
            "An array containing multiple output objects, each defining an 'address' and 'coins' to specify the recipient's address and the relevant tokens to be received.",
        },
      },
      required: ['outputs'],
    },
  },
];

export const queries = [
  {
    name: 'bank_queryBalance',
    description: 'Query the balance of a specified token denomination for a given ixo blockchain address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description:
            'The ixo blockchain address to query the balance of - not required if user queries their own balance',
        },
        denom: {
          type: 'string',
          description: 'The denomination of tokens to query the balance of (uixo or ibc tokens)',
        },
      },
      required: ['denom'],
    },
  },
  {
    name: 'bank_queryAllBalances',
    description: 'Query the balances of all tokens for a given ixo blockchain address',
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description:
            'The ixo blockchain address to query the balances of - not required if user queries their own balance',
        },
      },
      required: [],
    },
  },
];
