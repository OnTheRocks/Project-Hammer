import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
  query getMaterials {
    materials {
      id
      matId
      name
      price
      unit
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
      price
      unit
      notes
    }
  }
  `

export { GET_MATERIALS, GET_MATERIAL};