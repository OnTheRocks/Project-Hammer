import { gql } from '@apollo/client';

const ADD_TICKET = gql`
  mutation AddTicket(
    $date: String!, 
    $ticketNum: String!, 
    $customerId: ID!, 
    $materialId: ID!, 
    $tareWeight: Int!, 
    $grossWeight: Int!, 
    $netWeight: Int!, 
    $notes: String! 
  ) {
      addTicket(
        date: $date
        ticketNum: $ticketNum
        customerId: $customerId
        materialId: $materialId
        tareWeight: $tareWeight 
        grossWeight: $grossWeight 
        netWeight: $netWeight 
        notes: $notes
      ) {
          id
          date
          ticketNum
          customer {
            name
            email
            phone
          }
          material {
            id
            name
            notes
          }
          tareWeight
          grossWeight
          netWeight
          notes
    }
  }
`;


const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket(
    $id: ID!
    $date: String!, 
    $ticketNum: String!, 
    
    $material: String!, 
    $tareWeight: Int!, 
    $grossWeight: Int!, 
    $netWeight: Int!, 
    $notes: String! 
  ) {
      updateTicket(
        id: $id
        date: $date
        ticketNum: $ticketNum
        
        material: $material
        tareWeight: $tareWeight 
        grossWeight: $grossWeight 
        netWeight: $netWeight 
        notes: $notes
      ) {
          id
          date
          ticketNum
          customer {
            name
            email
            phone
          }
          material {
            name
          }
          tareWeight
          grossWeight
          netWeight
          notes
    }
  }
`;


export { ADD_TICKET, DELETE_TICKET, UPDATE_TICKET };