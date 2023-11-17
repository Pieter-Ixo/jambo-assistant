export const functions = [
  {
    name: 'group_msgCreateGroup',
    description:
      "The 'group_msgCreateGroup' message type facilitates the creation of a new group within the blockchain network under the Group module. It enables an administrator to establish a new group, define its members, and attach any pertinent metadata to encapsulate additional information or context about the group, thereby enriching the manageability and configurability of groups within the network and enhancing collaborative and collective actions and decision-making.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The blockchain address of the administrative account tasked with managing and overseeing the group. The admin possesses the necessary permissions to execute various actions like modifying group metadata, adding or removing members, and other managerial tasks, thereby ensuring orderly, authorized, and structured management of the group.',
        },
        members: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description:
                  'The blockchain address of a group member, ensuring that their identity and network presence are accurately recorded and verifiable, facilitating clear member identification and reliable communication and interaction within the group.',
              },
              weight: {
                type: 'string',
                description:
                  'A numerical value representing the weight or influence of a member within group actions and decisions, ensuring that the dynamics of participative actions like voting or collective decision-making are accurately and transparently managed, respecting the predetermined influence levels of each member.',
              },
              metadata: {
                type: 'string',
                description:
                  'Any additional, arbitrary metadata attached to a member, providing an avenue to incorporate extra information, context, or notes concerning a member, and enhancing the detail and depth of member profiles within the group.',
              },
            },
            required: ['address', 'weight'],
          },
          description:
            "An array delineating the members of the group, encapsulating each member's address and weight to ensure accurate identity verification and representational influence within the group. This allows for structured, transparent, and fair group dynamics, ensuring each member’s voice and influence are proportionally represented in collective actions.",
        },
        metadata: {
          type: 'string',
          description:
            "An arbitrary string containing additional metadata related to the group, providing a flexible space to store extra information, notes, or context about the group, thereby enhancing the comprehensiveness of the group's description and facilitating richer documentation and understanding of the group's purpose, norms, or other relevant information.",
        },
      },
      required: ['admin', 'members'],
    },
  },
  {
    name: 'group_msgUpdateGroupMembers',
    description:
      "The 'group_msgUpdateGroupMembers' message type allows an administrator of a group to orchestrate updates to the members of a specific group identified by its unique ID under the Group module. This action encompasses the ability to modify the weight of existing members and manage group membership by implementing updates such as adding new members or removing existing ones, facilitating dynamic and adaptable management of group constituents and their respective participative influence.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The blockchain address of the admin account, identified as having the requisite permissions to execute member update actions, thereby ensuring that group member management and modifications are executed by an authorized entity, safeguarding the integrity and structured management of the group.',
        },
        groupId: {
          type: 'integer',
          description:
            'The unique identifier of the group targeted for member updates, ensuring that member modifications are accurately applied to the correct group, safeguarding against misapplications and ensuring precise, targeted management actions within the network’s group structures.',
        },
        memberUpdates: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description:
                  'The blockchain address pertaining to a member subject to update actions, ensuring that modifications such as weight adjustments or removal are precisely targeted, ensuring accurate, and intentional management of group members.',
              },
              weight: {
                type: 'string',
                description:
                  'A numerical representation of a member’s participative weight within the group. Adjusting this value modifies the member’s influence in group actions and decisions. Setting the weight to 0 effectively removes the member from the group, enabling flexible, dynamic management of group composition and participative dynamics.',
              },
              metadata: {
                type: 'string',
                description:
                  'An arbitrary data field allowing for the attachment of additional metadata to a member, facilitating the inclusion of supplementary information, notes, or context concerning the member, thereby enriching the informational depth and comprehensive detailing of each member within the group.',
              },
            },
            required: ['address', 'weight'],
          },
          description:
            'An array detailing the members subjected to update actions, encapsulating each member’s address, weight, and optional metadata, thereby enabling structured, accurate, and intentional modification of members’ presence and participative weight within the group, ensuring fair, transparent, and adaptable group dynamics.',
        },
      },
      required: ['admin', 'groupId', 'memberUpdates'],
    },
  },
  {
    name: 'group_msgUpdateGroupAdmin',
    description:
      "The 'group_msgUpdateGroupAdmin' message type is utilized to facilitate the transition of administrative control over a group within the Group module, from the current administrator to a newly designated admin. This ensures that the management and administrative activities of the group can dynamically shift between different accounts, enabling flexible and adaptive governance within the group’s operational and decision-making processes.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'Represents the blockchain address of the current admin, acknowledged as the operative manager with authoritative control over the group, ensuring that administrative transitions are initiated by a legitimately recognized entity, thereby maintaining secure and authentic administrative operations.',
        },
        groupId: {
          type: 'integer',
          description:
            'Specifies the unique identifier of the group, ensuring that administrative transition actions are meticulously applied to the intended group, preventing misapplications and ensuring coherent and targeted admin management within the network’s group structures.',
        },
        newAdmin: {
          type: 'string',
          description:
            'Represents the blockchain address of the account designated to inherit administrative control over the group, ensuring that the transfer of administrative capabilities is directed towards a clearly defined, intended recipient, facilitating secure, intentional, and verifiable shifts in group governance and control.',
        },
      },
      required: ['admin', 'groupId', 'newAdmin'],
    },
  },
  {
    name: 'group_msgUpdateGroupMetadata',
    description:
      "The 'group_msgUpdateGroupMetadata' message type allows the group admin to update the metadata associated with a group. Metadata in blockchain can encompass various informative details, being a versatile field that can store data pertaining to categorization, descriptive elements, and additional relevant information to provide context, insights, or structured data regarding the group.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            "The blockchain address of the group's administrator, empowered with the capability to modify the group’s metadata, ensuring that modifications are performed securely and are originated from an authorized administrative entity, safeguarding the group’s data integrity and authenticity.",
        },
        groupId: {
          type: 'integer',
          description:
            'The distinctive identifier assigned to the group, assuring that metadata modifications are specifically targeted and applied to the correct group, preventing unintended alterations and safeguarding coherent and precise data management within the network’s groups.',
        },
        metadata: {
          type: 'string',
          description:
            'Represents the updated metadata that is to be associated with the group, providing a flexible and versatile field to store and convey various forms of data, insights, descriptions, or additional information that enhances the informative depth, context, or structured data associated with the group.',
        },
      },
      required: ['admin', 'groupId', 'metadata'],
    },
  },
  {
    name: 'group_msgCreateGroupPolicy',
    description:
      "The 'group_msgCreateGroupPolicy' message type allows the group admin to create a policy for a specific group, granting an ability to define decision-making structures, rules, or parameters within the group, and associating specific metadata with the policy to enhance informational depth or convey supplementary data relevant to the policy's context, operational insights, or function.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            "The blockchain address of the group's administrator, a trusted entity authorized to create policies, ensuring that the policy creation is securely originated and applied by an approved authority within the group, maintaining secure and credible policy management.",
        },
        groupId: {
          type: 'integer',
          description:
            'A unique identifier that denotes the specific group for which the policy is being created, ensuring accurate, intended, and precise policy association and application to the correct group, avoiding unintentional policy applications and preserving targeted and coherent group policy management.',
        },
        metadata: {
          type: 'string',
          description:
            'An arbitrary string of metadata that can be attached to the group policy, offering a flexible space to store, convey, or describe various informational elements, insights, data, or additional context that can enhance understanding, categorization, or informational depth related to the created policy.',
        },
        decisionPolicy: {
          type: 'object',
          description:
            'Specifies the decision-making policy to be implemented for the group, defining structures, parameters, or rules that guide or determine decision-making processes within the group, establishing a clear, predefined framework that directs, influences, or regulates decision-making activities and operations within the associated group.',
        },
      },
      required: ['admin', 'groupId', 'metadata'],
    },
  },
  {
    name: 'group_msgCreateGroupWithPolicy',
    description:
      "The 'group_msgCreateGroupWithPolicy' message enables the initiation and configuration of a new group alongside its associated policy within a singular transaction, streamlining the establishment of the group and its governing policy. This message permits the user to define the administrative control, member constitution, and metadata of the group and its policy, thus, formulating the foundational structures, governance strategy, and administrative management of the new group and its policy in a unified, efficient, and coherent manner.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The account address of the administrator, tasked with overseeing, managing, and ensuring the secure, authentic, and authorized management and control of the group and its associated policy, upholding governance, administrative continuity, and safeguarded leadership throughout the lifecycle of the group and its policy.',
        },
        members: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              address: {
                type: 'string',
                description:
                  'Specific account address of a member, ensuring precise, verified, and authenticated identification and participation within the group, safeguarding against unauthorized access and participation.',
              },
              weight: {
                type: 'number',
                description:
                  'The weight accorded to a member, determining their influence, voting power, and stake within the group, enabling weighted participation and influence in group decisions, activities, and governance.',
              },
              metadata: {
                type: 'string',
                description:
                  'Any relevant, auxiliary, or additional data related to a member, providing further context, identification, or informative data pertaining to a member’s role, identity, or participation within the group.',
              },
            },
            required: ['address', 'weight'],
          },
          description:
            'Defines the constituents of the group by specifying the members, their respective weights, and any pertinent metadata, establishing the composition, membership, and structural organization of the group.',
        },
        groupMetadata: {
          type: 'string',
          description:
            'Arbitrary metadata attached to the group, offering additional, contextual, or descriptive data concerning the group, enhancing clarity, context, and informational detail about the group’s purpose, nature, or characteristics.',
        },
        groupPolicyMetadata: {
          type: 'string',
          description:
            'Arbitrary metadata attached to the group policy, providing additional, context-specific, or detailed information about the policy, augmenting understanding, clarity, and insight regarding the policy’s purpose, operation, or attributes.',
        },
        groupPolicyAsAdmin: {
          type: 'boolean',
          description:
            'A Boolean field that, when set to true, employs the group policy account address as the administrator for both the group and group policy, ensuring centralized, unified, and streamlined administrative control, governance, and management across both the group and its policy.',
        },
        decisionPolicy: {
          type: 'object',
          description:
            'Specifies the decision policy of the group, defining the mechanisms, criteria, and strategies through which decisions are made, evaluated, and enacted within the group, guiding its operations, activities, and governance with structured, predefined decision-making methodologies.',
        },
      },
      required: ['admin', 'members', 'groupMetadata', 'groupPolicyMetadata', 'groupPolicyAsAdmin'],
    },
  },
  {
    name: 'group_msgUpdateGroupPolicyAdmin',
    description:
      "The 'group_msgUpdateGroupPolicyAdmin' message allows the current administrator of a group policy to transfer their administrative privileges and control to a new admin, ensuring continuity, adaptability, and management of the policy under new administration. This transition facilitates the maintenance and modification of the policy by aligning it with new leadership or governance, and securely manages administrative transitions while retaining the policy's integrity.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The account address of the current group policy administrator, a secure and authenticated entity that ensures any transition of administrative control is intentional, authorized, and originates from a verified source, maintaining secure and credible administrative management.',
        },
        address: {
          type: 'string',
          description:
            'The account address of the group policy, a distinct identifier that ensures precise, accurate, and specific identification of the policy subject to administrative change, preventing unintentional modifications and safeguarding accurate, targeted policy management.',
        },
        newAdmin: {
          type: 'string',
          description:
            'The account address of the intended new administrator for the group policy, a specified entity that will receive the transferred administrative control, privileges, and responsibilities, establishing new leadership, governance, and management for the policy while ensuring continuity, preservation, and further development of the policy under new administration.',
        },
      },
      required: ['admin', 'address', 'newAdmin'],
    },
  },
  {
    name: 'group_msgUpdateGroupPolicyDecisionPolicy',
    description:
      "The 'group_msgUpdateGroupPolicyDecisionPolicy' message enables the alteration of the decision-making policy affiliated with a specific group policy. By utilizing this message, the administrator of the group policy is empowered to modify, enhance, or recalibrate the decision-making policy governing the associated group, ensuring the efficacy, alignment, and responsiveness of the group's governance mechanisms to its objectives, context, and operational environment.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The account address of the administrator, assuming responsibility for instigating, authenticating, and ensuring the secure and authorized alteration of the decision-making policy of the group, maintaining governance integrity, authenticity, and control throughout the modification process.',
        },
        address: {
          type: 'string',
          description:
            'The account address of the group policy, providing a precise, verified, and authenticated identifier for the targeted group policy subject to alteration, ensuring accurate targeting, application, and implementation of the modified decision-making policy.',
        },
        decisionPolicy: {
          type: 'object',
          description:
            'The altered decision-making policy, specifying the new methodologies, criteria, and mechanisms through which decisions are assessed, enacted, and managed within the group, reflecting modifications, enhancements, or recalibrations aligned with the group’s objectives, context, and operational dynamics.',
        },
      },
      required: ['admin', 'address'],
    },
  },
  {
    name: 'group_msgUpdateGroupPolicyMetadata',
    description:
      "The 'group_msgUpdateGroupPolicyMetadata' message allows for the updating of metadata associated with a specific group policy, providing a mechanism for modifying, enriching, or refreshing the descriptive, contextual, or supplementary data associated with the group policy, enhancing its clarity, relevance, and informative value.",
    parameters: {
      type: 'object',
      properties: {
        admin: {
          type: 'string',
          description:
            'The account address of the group administrator, responsible for initiating, validating, and ensuring the secure, accurate, and authorized modification of the group policy’s metadata, safeguarding its integrity, consistency, and fidelity.',
        },
        address: {
          type: 'string',
          description:
            'The account address of the group policy, serving as a unique, verifiable, and authentic identifier that ensures accurate targeting, application, and execution of the metadata update, preserving precision and reliability in the amendment process.',
        },
        metadata: {
          type: 'string',
          description:
            'The updated metadata for the group policy, representing enhanced, modified, or refined descriptive, contextual, or supplementary data that provides clarity, relevance, and specific informative value, facilitating accurate, insightful, and effective understanding, interpretation, and utilization of the group policy.',
        },
      },
      required: ['admin', 'address', 'metadata'],
    },
  },
  {
    name: 'group_msgSubmitProposal',
    description:
      "The 'group_msgSubmitProposal' message allows a user or multiple users to submit a proposal, providing a structured approach for suggesting changes, executions, or adaptations within a particular group policy, enabling organized, democratic, and collective decision-making and action.",
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description:
            'The account address of the group policy, ensuring accurate, secure, and specific targeting of the proposal submission to the relevant policy, preserving the integrity and specificity of the proposition and its potential execution.',
        },
        proposers: {
          type: 'array',
          items: {
            type: 'string',
          },
          description:
            'The account addresses of the proposers, serving as verified, authentic, and accountable entities presenting the proposal, whose signatures are consequently considered as affirmative votes, symbolizing consent, support, and agreement with the proposed actions, messages, or changes.',
        },
        metadata: {
          type: 'string',
          description:
            'Any arbitrary metadata attached to the proposal, offering additional, supplementary, or explanatory information, data, or context that enhances understanding, clarity, and informed decision-making regarding the proposal, its implications, objectives, and details.',
        },
        messages: {
          type: 'array',
          items: {
            type: 'object',
            description: 'A `sdk.Msg` object',
          },
          description:
            'A list of `sdk.Msg`s that delineate the actions, executions, or changes to be enacted if the proposal secures approval, detailing specific, concrete, and tangible modifications, additions, or adaptations to be implemented, ensuring clarity, transparency, and specificity in proposed actions.',
        },
        exec: {
          type: 'integer',
          enum: [0, 1, -1],
          description:
            'Mode of execution for the proposal, delineating whether it should be executed immediately upon creation or require a distinct MsgExec request for execution. The mode encapsulates and specifies the procedural, temporal, and conditional factors governing the proposal’s enactment, realization, and operationalization.',
        },
      },
      required: ['address', 'proposers', 'metadata', 'messages', 'exec'],
    },
  },
  {
    name: 'group_msgWithdrawProposal',
    description:
      "The 'group_msgWithdrawProposal' message enables an entity, either the admin of a group policy or one of the proposers of a proposal, to withdraw a previously submitted proposal, negating its effect and removing it from consideration, thereby ensuring flexibility, adaptability, and responsive governance within the policy-making process.",
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description:
            'The unique identifier of the proposal, ensuring precise, unequivocal, and secure referencing and identification of the specific proposal being withdrawn, preserving the accuracy and reliability of the withdrawal action.',
        },
        address: {
          type: 'string',
          description:
            'The account address of the entity withdrawing the proposal, which can either be the admin of the group policy or one of the proposers of the proposal, ensuring authenticated, authorized, and accountable actions within the policy and proposal governance process.',
        },
      },
      required: ['proposalId', 'address'],
    },
  },
  {
    name: 'group_msgVote',
    description:
      "The 'group_msgVote' message facilitates a participant, identified by their account address, to cast a vote on a specific proposal, identified by its unique ID, within a decentralized governance framework. The voter expresses their preference, attaches optional arbitrary metadata, and specifies the execution preference, enhancing the democratic, participative, and inclusive decision-making processes within the governance mechanism.",
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description:
            'A unique identifier assigned to the proposal, ensuring precise identification, secure reference, and reliable interactions in the voting process, mitigating the risks of misallocation, misidentification, and mismanagement of votes.',
        },
        voter: {
          type: 'string',
          description:
            'The account address of the voter, ensuring secure, authenticated, and accountable participation in the voting process, safeguarding the integrity, inclusiveness, and legitimacy of the democratic decision-making mechanism.',
        },
        option: {
          type: 'string',
          enum: ['Yes', 'No', 'Abstain', 'Veto'],
          description:
            'The selected voting option, indicating the voter’s preference, stance, or decision regarding the proposal, contributing to the collective decision-making process and reflecting the decentralized, democratic, and participative nature of the governance mechanism.',
        },
        metadata: {
          type: 'string',
          description:
            'Optional arbitrary metadata, providing supplementary, auxiliary, or additional information, context, or data regarding the vote, enhancing the transparency, traceability, and audibility of the voting process.',
        },
        exec: {
          type: 'string',
          enum: ['EXEC_UNSPECIFIED', 'EXEC_TRY', 'UNRECOGNIZED'],
          description:
            'Defines the execution preference, specifying whether the proposal should be executed immediately post-voting, ensuring responsive, adaptive, and timely governance, and allowing for fluid, dynamic, and flexible policy-making and implementation processes.',
        },
      },
      required: ['proposalId', 'voter', 'option', 'exec'],
    },
  },
  {
    name: 'group_msgExec',
    description:
      "The 'group_msgExec' message type is employed to initiate the execution of a proposal within a decentralized governance framework, utilizing the unique identifier of the proposal and the account address of the entity endorsing its execution. This ensures that proposal enactment is securely managed, accurately directed, and properly validated, thereby enhancing the effectiveness, reliability, and accountability of the governance mechanism.",
    parameters: {
      type: 'object',
      properties: {
        proposalId: {
          type: 'integer',
          description:
            'A distinctive identifier that ensures secure referencing, accurate identification, and reliable interaction with the proposal, safeguarding against misallocation, misdirection, and mismanagement of governance actions, and enhancing the precision, safety, and security of the execution process.',
        },
        signer: {
          type: 'string',
          description:
            'The account address of the signer, ensuring that the execution of the proposal is authenticated, authorized, and verifiable, maintaining the integrity, legitimacy, and credibility of the governance actions, and promoting trust, confidence, and assurance in the enactment and implementation of decisions.',
        },
      },
      required: ['proposalId', 'signer'],
    },
  },
  {
    name: 'group_msgLeaveGroup',
    description:
      "The 'group_msgLeaveGroup' message type facilitates a user's departure from a group within a decentralized governance framework, utilizing the unique identifier of the group and the account address of the member seeking to exit. This ensures that a member's withdrawal from the group is securely managed, accurately documented, and properly validated, thereby enhancing the effectiveness, reliability, and accountability of the group management mechanism.",
    parameters: {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          description:
            'The account address of the member, ensuring that the withdrawal is authenticated, authorized, and verifiable, maintaining the integrity, legitimacy, and credibility of group management actions, and promoting trust, confidence, and assurance among group members and within the governance mechanism.',
        },
        groupId: {
          type: 'integer',
          description:
            'A distinctive identifier that ensures secure referencing, accurate identification, and reliable interaction with the group, safeguarding against misallocation, misdirection, and mismanagement of group management actions, and enhancing the precision, safety, and security of the withdrawal process.',
        },
      },
      required: ['address', 'groupId'],
    },
  },
];
