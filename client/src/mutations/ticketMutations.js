import { gql } from '@apollo/client';

const ADD_TICKET = gql`
  mutation AddTicket(
    $date: String!, 
    $ticketNum: String!, 
    $customerId: ID!, 
    $material: String!, 
    $tareWeight: Int!, 
    $grossWeight: Int!, 
    $netWeight: Int!, 
    $notes: String! 
  ) {
      addTicket(
        date: $date
        ticketNum: $ticketNum
        customerId: $customerId
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
          material
          tareWeight
          grossWeight
          netWeight
          notes
    }
  }
`

export { ADD_TICKET };