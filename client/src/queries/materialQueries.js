import { gql } from '@apollo/client';

const GET_MATERIALS = gql`
  query getMaterials {
    tickets {
      id
      date
      ticketNum
      customer{
        id
      }
      customer{
        id
        name
        phone
        email
      }
      material
      tareWeight
      grossWeight
      netWeight
      notes
    }
  }
`;

const GET_MATERIAL = gql`
  query getMaterial($id: ID!) {
    ticket(id: $id) {
      id
      date
      ticketNum
      customer{
        id
      }
      customer{
        id
        name
        phone
        email
      }
      material
      tareWeight
      grossWeight
      netWeight
      notes
    }
  }
  `

export { GET_MATERIALS, GET_MATERIAL};