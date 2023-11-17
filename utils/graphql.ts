import { gql } from '@apollo/client';

const GET_ALL_COLLECTIONS_AND_DEVICES = gql`
  query getCollectionsAndDevicesByOwnerAddress($ownerAddress: String!) {
    collections: entities(filter: { type: { equalTo: "asset/collection" } }) {
      nodes {
        alsoKnownAs
        accounts
        context
        id
        linkedEntity
        linkedResource
        metadata
        service
        settings
        type
        status
      }
    }
    devices: entities(filter: { type: { equalTo: "asset/device" }, owner: { equalTo: $ownerAddress } }) {
      nodes {
        alsoKnownAs
        accounts
        context
        id
        linkedEntity
        linkedResource
        metadata
        owner
        service
        settings
        type
        status
      }
    }
  }
`;

export async function getCollectionsAndDevicesByOwnerAddress(graphqlClient: GraphqlClient, ownerAddress: string) {
  const data = await graphqlClient.query({
    query: GET_ALL_COLLECTIONS_AND_DEVICES,
    variables: { ownerAddress, assetCollection: 'asset/collection', assetDevice: 'asset/device' },
  });

  return {
    collections: (data?.data?.collections?.nodes ?? []) as Entity[],
    devices: (data?.data?.devices?.nodes ?? []) as Entity[],
  };
}
