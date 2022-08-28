import { gql } from '@apollo/client';

const ADD_TICKET = gql`
  mutation AddTicket(
    $date: String!, 
    $ticketNum: String!, 
    $customerId: ID!, 
    $material: String!, 
    $tareWeight: Number!, 
    $grossWeight: Number!, 
    $netWeight: Number!, 
    $notes: String! 
  ) {
      addTicket(
        date: $date, 
        ticketNum: $TicketNum, 
        customerId: $customerId, 
        material: $material, 
        tareWeight: $tareWeight, 
        grossWeight: $grossWeight, 
        netWeight: $netWeight, 
        notes: notes
      ) {
          id
          ticketNum
          customerId {
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