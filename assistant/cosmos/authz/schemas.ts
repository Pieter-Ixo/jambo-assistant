export const transactions = [
  // TODO: query grant types
  {
    name: 'authz_msgGrant',
    description:
      'Facilitates the delegation of specific authorizations from the granter to the grantee, accompanied by an optional expiration timestamp',
    parameters: {
      type: 'object',
      properties: {
        grantee: {
          type: 'string',
          description: 'Address of the beneficiary/grantee that receives certain permissions from the granter',
        },
        grant: {
          type: 'object',
          properties: {
            authorization: {
              type: 'object',
              // TODO: proto encoded
              // TODO: import usable functions based on allowed modules
              // TODO: update description
              description:
                'A complex object that could encapsulate various parameters and conditions defining the scope, limitations, and permissible actions for the grantee. This attribute illustrates the nature and boundaries of the conferred permissions.',
            },
            expiration: {
              type: 'string',
              format: 'date-time',
              description: 'The timestamp marking the expiration of the grant',
            },
          },
          // TODO: update description
          description:
            "An encompassing object that embeds the 'authorization' - detailing permitted actions and potential conditions, and 'expiration' - specifying the temporal validity of the grant. This encapsulation ensures a structured, clear, and secure delegation of permissions.",
          required: ['authorization'],
        },
      },
      required: ['grantee'],
    },
  },
  // {
  //   name: 'authz_msgExec',
  //   description:
  //     "The 'msgExec' message type initiates the execution of provided messages, leveraging the authorizations previously granted to the grantee. It ensures that the messages being executed correspond to authorizations, validating each message to have a single signer that matches the granter of the specific authorization.",
  //   parameters: {
  //     type: 'object',
  //     properties: {
  //       grantee: {
  //         type: 'string',
  //         description:
  //           'The blockchain address of the entity (grantee) aiming to execute the provided messages. The grantee must hold appropriate authorizations from the granter(s) to execute the enclosed messages, ensuring adherence to the specified conditions and limitations within each grant.',
  //       },
  //       msgs: {
  //         type: 'array',
  //         items: {
  //           type: 'object',
  //           description:
  //             'A message object seeking execution by the grantee. Each message is validated against the (msg.signers[0], grantee, MsgTypeURL(msg)) triple to confirm the existence and validity of a corresponding grant. The message must adhere to the Authorization interface, aligning with the structural and conditional requirements for execution.',
  //         },
  //         description:
  //           'An array of message objects intended for execution, each adhering to the Authorization interface, and substantiated by a corresponding grant. These messages seek to perform various actions, bound by the limitations and conditions of their respective authorizations, ensuring secure, auditable, and controlled execution of functionalities.',
  //       },
  //     },
  //     required: ['grantee', 'msgs'],
  //   },
  // },
  {
    name: 'authz_msgRevoke',
    description: 'Revoking an existing authorization of a specified message type',
    parameters: {
      type: 'object',
      properties: {
        grantee: {
          type: 'string',
          description: 'Address of the grantee whose authorization for a specific message type is being rescinded',
        },
        msgTypeUrl: {
          type: 'string',
          // TODO: update description
          description:
            'Uniform Resource Locator (URL) representing the message type being targeted for authorization revocation. It is essential that the msgTypeUrl corresponds accurately to the message type of the initial grant to ensure precise and intended revocation.',
        },
      },
      required: ['grantee', 'msgTypeUrl'],
    },
  },
];

export const queries = [
  {
    name: 'authz_queryGrants',
    description:
      'Querying the existing authorizations of a specific grantee from a specific granter, optionally filtered by message type',
    parameters: {
      type: 'object',
      properties: {
        granter: {
          type: 'string',
          description: 'Address of the granter whose authorizations are being queried',
        },
        grantee: {
          type: 'string',
          description: 'Address of the grantee whose authorizations are being queried',
        },
        msgTypeUrl: {
          type: 'string',
          // TODO: update description
          description:
            'Uniform Resource Locator (URL) representing the message type being targeted for authorization revocation',
        },
      },
      required: ['granter', 'grantee'],
    },
  },
  {
    name: 'authz_queryGranterGrants',
    description: 'Querying the existing authorizations of a specific granter',
    parameters: {
      type: 'object',
      properties: {
        granter: {
          type: 'string',
          description: 'Address of the granter whose authorizations are being queried',
        },
      },
      required: ['granter'],
    },
  },
  {
    name: 'authz_queryGranteeGrants',
    description: 'Querying the existing authorizations of a specific grantee',
    parameters: {
      type: 'object',
      properties: {
        grantee: {
          type: 'string',
          description: 'Address of the grantee whose authorizations are being queried',
        },
      },
      required: ['grantee'],
    },
  },
];
