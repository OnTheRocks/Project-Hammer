import { gql } from "@apollo/client";

const ADD_MATERIAL = gql`
  mutation addMaterial($matId: String!, $name: String!, 
    $notes: String!) {
    addMaterial(matId: $matId, name: $name, notes: $notes)
    {
      id
      matId
      name
      notes
    }
  }
  `

const DELETE_MATERIAL = gql`
  mutation deleteMaterial($id: ID!) {
    deleteMaterial(id: $id) {
      matId
      name
      notes
    }
  }
`

export { ADD_MATERIAL, DELETE_MATERIAL };