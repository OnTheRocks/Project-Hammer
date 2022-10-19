import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
  query getMaterials {
    materials {
      id
      matId
      name
      notes
    }
  }
`;

const GET_MATERIAL = gql`
  query getMaterial($id: ID!) {
    material(id: $id) {
      id
      matId
      name
      notes
    }
  }
  `

export { GET_MATERIALS, GET_MATERIAL};