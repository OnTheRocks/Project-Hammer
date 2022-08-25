import { gql } from '@apollo/client';

const GET_TICKETS = gql`
  query getTickets {
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

const GET_TICKET = gql`
  query getTicket($id: ID!) {
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
  }`

export { GET_TICKETS, GET_TICKET};