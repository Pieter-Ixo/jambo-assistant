export const ASSISTANT_FUNCTIONS = [
  {
    name: 'msgSend',
    description: 'Send tokens from one ixo account to another.',
    parameters: {
      type: 'object',
      properties: {
        toAddress: {
          type: 'string',
          description: "The recipient's ixo address",
        },
        amount: {
          type: 'number',
          description: 'The amount of tokens to send',
        },
        denom: {
          type: 'string',
          description: 'The denomination of the tokens to send',
        },
      },
      required: ['toAddress', 'amount', 'denom'],
    },
  },
  {
    name: 'msgDelegate',
    description: 'Delegate/stake tokens in an ixo validator node.',
    parameters: {
      type: 'object',
      properties: {
        validatorAddress: {
          type: 'string',
          description: "The validator's ixo address",
        },
        amount: {
          type: 'number',
          description: 'The amount of tokens to delegate',
        },
        denom: {
          type: 'string',
          description: 'The denomination of the tokens to delegate',
        },
      },
      required: ['validatorAddress', 'amount', 'denom'],
    },
  },
  {
    name: 'msgUndelegate',
    description: 'Undelegate/unstake tokens from an ixo validator node.',
    parameters: {
      type: 'object',
      properties: {
        validatorAddress: {
          type: 'string',
          description: "The validator's ixo address",
        },
        amount: {
          type: 'number',
          description: 'The amount of tokens to undelegate',
        },
        denom: {
          type: 'string',
          description: 'The denomination of the tokens to undelegate',
        },
      },
      required: ['validatorAddress', 'amount', 'denom'],
    },
  },
  {
    name: 'msgBeginRedelegate',
    description: 'Redelegate/reunstake tokens from one ixo validator node to another.',
    parameters: {
      type: 'object',
      properties: {
        fromValidatorAddress: {
          type: 'string',
          description: "The validator's ixo address from which to redelegate",
        },
        toValidatorAddress: {
          type: 'string',
          description: "The validator's ixo address to which to redelegate",
        },
        amount: {
          type: 'number',
          description: 'The amount of tokens to redelegate',
        },
        denom: {
          type: 'string',
          description: 'The denomination of the tokens to redelegate',
        },
      },
      required: ['fromValidatorAddress', 'toValidatorAddress', 'amount', 'denom'],
    },
  },
  {
    name: 'listEntities',
    description: "Query a list of the user's ixo entities (aka NFTs, devices, cookstoves)",
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'msgTransferEntity',
    description: "Transfer an ixo entity (aka NFT, device, cookstove) from the user's ixo account to another",
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The id (DID) of the entity/NFT/device/cookstove to transfer',
        },
        recipientDid: {
          type: 'string',
          description: "The ixo issued DID of the recipient's ixo account",
        },
      },
      required: ['id', 'recipientDid'],
    },
  },
  {
    name: 'listTokens',
    description: "Query a list of the user's ixo blockchain issued fungible tokens (e.g. CARBON)",
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'customClaimTokens',
    description: "Claim ixo blockchain issued fungible tokens (e.g. CARBON) from the user's entities",
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'The id (DID) of the entity/NFT/device/cookstove from which to claim tokens',
        },
      },
      required: ['id'],
    },
  },
  {
    name: 'msgTransferToken',
    description: "Transfer ixo blockchain issued fungible tokens (e.g. CARBON) from the user's ixo account to another",
    parameters: {
      type: 'object',
      properties: {
        recipient: {
          type: 'string',
          description: "The address of the recipient's ixo account",
        },
        amount: {
          type: 'string',
          description: 'The amount of tokens to send to the recipient',
        },
      },
      required: ['amount', 'recipient'],
    },
  },
  {
    name: 'msgRetireToken',
    description: "Retire (aka offset) ixo blockchain issued fungible tokens (e.g. CARBON) from the user's ixo account",
    parameters: {
      type: 'object',
      properties: {
        amount: {
          type: 'string',
          description: 'The amount of tokens to retire',
        },
        reason: {
          type: 'string',
          description: 'The reason for offset/retiring the tokens',
        },
        jurisdiction: {
          type: 'string',
          description:
            "The jurisdiction (2 letter country code) where the user wants to retire/offset the tokens (defaults to 'GLOBAL')",
        },
      },
      required: ['amount'],
    },
  },
];
