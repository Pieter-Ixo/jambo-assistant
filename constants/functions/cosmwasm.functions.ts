export const functions = [
  {
    name: 'cosmwasm_msgStoreCode',
    description: 'Submit Wasm code to the system.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        wasmByteCode: {
          type: 'string',
          format: 'byte',
          description: 'WASM Byte Code, which can be raw or gzip compressed.',
        },
        instantiatePermission: {
          $ref: '#/definitions/AccessConfig',
          description: 'Access control to apply on contract creation. It is optional.',
        },
      },
      required: ['sender', 'wasmByteCode'],
      definitions: {
        AccessConfig: {
          type: 'object',
          properties: {
            permission: {
              $ref: '#/definitions/AccessType',
              description: 'Type of permission access.',
            },
            address: {
              type: 'string',
              description: "Deprecated: Address to apply access control. Replaced by 'addresses'.",
            },
            addresses: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Addresses to apply access control.',
            },
          },
          required: ['permission'],
          definitions: {
            AccessType: {
              type: 'integer',
              enum: [0, 1, 2, 3, 4, -1],
              description:
                'Type of access being applied. Enum values: 0=Unspecified, 1=Nobody, 2=OnlyAddress (deprecated, use AnyOfAddresses instead), 3=Everybody, 4=AnyOfAddresses, -1=Unrecognized.',
            },
          },
        },
      },
    },
  },
  {
    name: 'cosmwasm_msgInstantiateContract',
    description: 'Create a new smart contract instance for the given code ID.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        admin: {
          type: 'string',
          description: 'An optional address that can execute migrations.',
        },
        codeId: {
          type: 'string',
          description: 'The reference to the stored WASM code.',
        },
        label: {
          type: 'string',
          description: 'Optional metadata to be stored with a contract instance.',
        },
        msg: {
          type: 'string',
          format: 'byte',
          description: 'JSON encoded message to be passed to the contract on instantiation.',
        },
        funds: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              denom: {
                type: 'string',
                description: 'The denomination of the coins.',
              },
              amount: {
                type: 'string',
                description: 'Amount of coins to be transferred.',
              },
            },
            required: ['denom', 'amount'],
          },
          description: 'Coins that are transferred to the contract on instantiation.',
        },
      },
      required: ['sender', 'admin', 'codeId', 'label', 'msg', 'funds'],
    },
  },
  {
    name: 'cosmwasm_msgInstantiateContract2',
    description: 'Create a new smart contract instance for the given code ID with a predictable address.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        admin: {
          type: 'string',
          description: 'An optional address that can execute migrations.',
        },
        codeId: {
          type: 'string',
          description: 'The reference to the stored WASM code.',
        },
        label: {
          type: 'string',
          description: 'Optional metadata to be stored with a contract instance.',
        },
        msg: {
          type: 'string',
          format: 'byte',
          description: 'JSON encoded message to be passed to the contract on instantiation.',
        },
        funds: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              denom: {
                type: 'string',
                description: 'The denomination of the coins.',
              },
              amount: {
                type: 'string',
                description: 'Amount of coins to be transferred.',
              },
            },
            required: ['denom', 'amount'],
          },
          description: 'Coins that are transferred to the contract on instantiation.',
        },
        salt: {
          type: 'string',
          format: 'byte',
          description: 'An arbitrary value provided by the sender. Size can be 1 to 64.',
        },
        fixMsg: {
          type: 'boolean',
          description: 'Include the msg value into the hash for the predictable address. Default is false.',
        },
      },
      required: ['sender', 'admin', 'codeId', 'label', 'msg', 'funds', 'salt', 'fixMsg'],
    },
  },
  {
    name: 'cosmwasm_msgExecuteContract',
    description: 'Submits the given message data to a smart contract for execution.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        contract: {
          type: 'string',
          description: 'The address of the smart contract.',
        },
        msg: {
          type: 'string',
          format: 'byte',
          description: 'JSON encoded message to be passed to the contract.',
        },
        funds: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              denom: {
                type: 'string',
                description: 'The denomination of the coins.',
              },
              amount: {
                type: 'string',
                description: 'Amount of coins to be transferred.',
              },
            },
            required: ['denom', 'amount'],
          },
          description: 'Coins that are transferred to the contract on execution.',
        },
      },
      required: ['sender', 'contract', 'msg', 'funds'],
    },
  },
  {
    name: 'cosmwasm_msgMigrateContract',
    description: 'Runs a code upgrade/downgrade for a smart contract.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        contract: {
          type: 'string',
          description: 'The address of the smart contract.',
        },
        codeId: {
          type: 'string',
          description: 'References the new WASM code.',
        },
        msg: {
          type: 'string',
          format: 'byte',
          description: 'JSON encoded message to be passed to the contract on migration.',
        },
      },
      required: ['sender', 'contract', 'codeId', 'msg'],
    },
  },
  {
    name: 'cosmwasm_msgUpdateAdmin',
    description: 'Sets a new admin for a smart contract.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        newAdmin: {
          type: 'string',
          description: 'The address to be set as new admin.',
        },
        contract: {
          type: 'string',
          description: 'The address of the smart contract.',
        },
      },
      required: ['sender', 'newAdmin', 'contract'],
    },
  },
  {
    name: 'cosmwasm_msgClearAdmin',
    description: 'Removes any admin stored for a smart contract.',
    parameters: {
      type: 'object',
      properties: {
        sender: {
          type: 'string',
          description: 'The actor that signed the messages.',
        },
        contract: {
          type: 'string',
          description: 'The address of the smart contract.',
        },
      },
      required: ['sender', 'contract'],
    },
  },
];
