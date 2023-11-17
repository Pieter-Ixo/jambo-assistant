// eslint-disable-next-line import/no-anonymous-default-export
export const transactions = [
  {
    name: 'feegrant_msgGrantAllowance',
    description:
      "Allows a user, the granter, to bestow permissions to another user, the grantee, to expend up to a specified Allowance of fees from the granter's account",
    parameters: {
      type: 'object',
      properties: {
        // granter
        grantee: {
          type: 'string',
          description: 'The ixo address of the grantee who is being accorded the allowance',
        },
        allowance: {
          type: 'object',
          description: 'An object that defines the type and parameters of the allowance being granted', // This can be a variety of allowance types including basic, periodic, or allowed fee allowances, each with its distinct characteristics and parameters
          properties: {
            allowanceType: {
              type: 'string',
              enum: ['BasicAllowance'], // 'PeriodicAllowance', 'AllowedMsgAllowance'
              description: 'The type of allowance being granted - current only allow BasicAllowance',
            },
            expiration: {
              type: 'string',
              description: 'The expiration time of the allowance in milliseconds',
            },
            spendLimit: {
              type: 'object',
              items: {
                type: 'object',
                properties: {
                  denom: {
                    type: 'string',
                    description: 'The denomination of tokens being sent (uixo)',
                  },
                  amount: {
                    type: 'string',
                    description: 'The quantity of minimal tokens - string representation of a valid positive integer',
                  },
                },
                required: ['denom', 'amount'],
              },
              description: 'A Coin object, specifying a denomination and amount of tokens',
            },
          },
          required: ['allowanceType'],
        },
      },
      required: ['grantee', 'allowance'],
    },
  },
  {
    name: 'feegrant_msgRevokeAllowance',
    description: 'Enables the Granter to rescind a previously granted allowance',
    parameters: {
      type: 'object',
      properties: {
        // granter
        grantee: {
          type: 'string',
          description: 'The blockchain address of the user (Grantee) whose allowance is being revoked',
        },
      },
      required: ['grantee'],
    },
  },
];

export const queries = [
  {
    name: 'feegrant_queryAllowance',
    description: 'Queries the current allowance of a given grantee for a given granter',
    parameters: {
      type: 'object',
      properties: {
        granter: {
          type: 'string',
          description: 'The blockchain address of the granter who has granted the allowance',
        },
        grantee: {
          type: 'string',
          description: 'The blockchain address of the grantee whose allowance is being queried',
        },
      },
      required: ['granter', 'grantee'],
    },
  },
  {
    name: 'feegrant_queryAllowances',
    description: 'Queries all allowances allocated to the given grantee',
    parameters: {
      type: 'object',
      properties: {
        grantee: {
          type: 'string',
          description: 'The blockchain address of the grantee whose allowances are being queried',
        },
      },
      required: ['grantee'],
    },
  },
  {
    name: 'feegrant_queryAllowancesByGranter',
    description: 'Queries all allowances allocated by the given granter',
    parameters: {
      type: 'object',
      properties: {
        granter: {
          type: 'string',
          description: 'The blockchain address of the granter whose allocated allowances are being queried',
        },
      },
      required: ['granter'],
    },
  },
];
