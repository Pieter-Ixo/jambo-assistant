export const functions = [
  // TODO: query channels
  {
    name: 'ibc_msgTransfer',
    description:
      'Transfer fungible tokens between ICS20 enabled chains. This represents an IBC transfer message, allowing tokens to be transferred from one chain to another following the ICS20 standard.',
    parameters: {
      type: 'object',
      properties: {
        sourcePort: {
          type: 'string',
          description: 'The port on which the IBC packet will be sent.',
        },
        sourceChannel: {
          type: 'string',
          description: 'The channel through which the IBC packet will be sent.',
        },
        token: {
          type: 'object',
          description: 'Information about the tokens being transferred.',
          properties: {
            denom: {
              type: 'string',
              description: 'The denomination of the tokens to transfer.',
            },
            amount: {
              type: 'string',
              description: 'The quantity of tokens to transfer.',
            },
          },
          required: ['denom', 'amount'],
        },
        sender: {
          type: 'string',
          description: 'The address of the sender initiating the transfer.',
        },
        receiver: {
          type: 'string',
          description: 'The address of the recipient on the destination chain.',
        },
        timeoutHeight: {
          type: 'object',
          description: 'The block height after which the transfer will time out. A value of 0 disables the timeout.',
          properties: {
            revisionNumber: {
              type: 'string',
              description: 'The revision number of the timeout height.',
            },
            revisionHeight: {
              type: 'string',
              description: 'The height within the revision.',
            },
          },
          required: ['revisionNumber', 'revisionHeight'],
        },
        timeoutTimestamp: {
          type: 'number',
          description:
            'The absolute time (in nanoseconds since the UNIX epoch) after which the transfer will time out. A value of 0 disables the timeout.',
        },
        memo: {
          type: 'string',
          description: 'An optional memo or note to accompany the transfer.',
        },
      },
      required: ['sourcePort', 'sourceChannel', 'sender', 'receiver', 'timeoutTimestamp', 'memo'],
    },
  },
];
