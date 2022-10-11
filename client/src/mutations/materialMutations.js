import { gql } from "@apollo/client";

const ADD_MATERIAL = gql`
  mutation addMaterial($matId: String!, $name: String!, $price: String!, $unit: String!,
    $notes: String!) {
    addMaterial(matId: $matId, name: $name, price: $price, unit: $unit, notes: $notes)
    {
      id
      matId
      name
      price 
      unit
      notes
    }
  }
  `

const DELETE_MATERIAL = gql`
  mutation deleteMaterial($id: ID!) {
    deleteMaterial(id: $id) {
      matId
      name
      price 
      unit
      notes
    }
  }
`

export { ADD_MATERIAL, DELETE_MATERIAL };