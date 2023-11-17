export const transactions = [
  {
    name: 'ibc_msgTransfer',
    description:
      'Transfer fungible tokens between ICS20 enabled chains. The message allows the specification of details for transferring tokens across Inter-Blockchain Communication (IBC) channels.',
    parameters: {
      type: 'object',
      properties: {
        sourcePort: {
          type: 'string',
          description: 'The IBC port identifier on which the packet will be sent.',
        },
        sourceChannel: {
          type: 'string',
          description: 'The IBC channel identifier by which the packet will be sent.',
        },
        token: {
          type: 'object',
          description:
            'The tokens to be transferred expressed as a structured object, specifying the amount and denomination.',
          properties: {
            denom: {
              type: 'string',
              description: 'The denomination of the tokens to be transferred.',
            },
            amount: {
              type: 'string',
              description: 'The amount of tokens to be transferred.',
            },
          },
          required: ['denom', 'amount'],
        },
        sender: {
          type: 'string',
          description: 'The blockchain address of the sender of the tokens.',
        },
        receiver: {
          type: 'string',
          description: 'The blockchain address of the recipient of the tokens on the destination chain.',
        },
        timeoutHeight: {
          type: 'object',
          description:
            'The block height after which the transfer will timeout. The timeout is disabled if this field is not set or set to 0.',
          properties: {
            revisionNumber: {
              type: 'string',
              description: 'The revision number of the chain.',
            },
            revisionHeight: {
              type: 'string',
              description: 'The height of the specified revision.',
            },
          },
          required: ['revisionNumber', 'revisionHeight'],
        },
        timeoutTimestamp: {
          type: 'string',
          description:
            'The timestamp (in absolute nanoseconds since Unix epoch) after which the transfer will timeout. The timeout is disabled if set to 0.',
        },
        memo: {
          type: 'string',
          description: 'An optional memo or note, providing additional context or information for the transfer.',
        },
      },
      required: ['sourcePort', 'sourceChannel', 'sender', 'receiver', 'timeoutTimestamp', 'memo'],
    },
  },
];

export const queries = [
  {
    name: 'ibc_queryDenomTrace',
    description: 'Queries a denomination trace information and returns the trace information of a given ibc hash.',
    parameters: {
      type: 'object',
      properties: {
        hash: {
          type: 'string',
          description:
            'The hash (in hex format) or denom (full denom with ibc prefix) of the denomination trace information.',
        },
      },
      required: ['hash'],
    },
  },
  {
    name: 'ibc_queryDenomTraces',
    description: 'Queries all ibc denomination traces.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'ibc_queryParams',
    description: 'Queries the parameters of ibc-transfer module.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },
  {
    name: 'ibc_queryDenomHash',
    description: 'Queries the hash of the denomination trace information.',
    parameters: {
      type: 'object',
      properties: {
        trace: {
          type: 'string',
          description: 'The denomination trace information.',
        },
      },
      required: ['trace'],
    },
  },
  // {
  //   name: 'ibc_queryEscrowAddress',
  //   description: 'Queries the escrow address for the specified channel.',
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       portId: {
  //         type: 'string',
  //         description: 'The port on which the channel to escrow tokens exists.',
  //       },
  //       channelId: {
  //         type: 'string',
  //         description: 'The channel to escrow tokens.',
  //       },
  //     },
  //     required: ['portId', 'channelId'],
  //   },
  // },
  {
    name: 'ibc_queryChannel',
    description: 'Query an ibc channel.',
    parameters: {
      type: 'object',
      properties: {
        portId: {
          type: 'string',
          description: 'The port identifier.',
        },
        channelId: {
          type: 'string',
          description: 'The channel identifier.',
        },
      },
      required: ['portId', 'channelId'],
    },
  },
  {
    name: 'ibc_queryChannels',
    description: 'Query all ibc channels.',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];
