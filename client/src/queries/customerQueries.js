import { gql } from "@apollo/client";



const GET_CUSTOMERS = gql`
query getCustomers {
  customers {
    id
    custId
    name
    street
    city
    zip
    webSite
    email
    phone
  }
}
`;

export { GET_CUSTOMERS };