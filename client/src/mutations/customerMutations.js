import { gql } from "@apollo/client";

const ADD_CUSTOMER = gql`
  mutation addCustomer($custId: String!, $name: String!, $street: String!, $city: String!,
    $zip: String!, $webSite: String!, $email: String!, $phone: String!) {
    addCustomer(custId: $custId, name: $name, street: $street, city: $city, zip: $zip, webSite: $webSite,
       email: $email, phone: $phone)
    {
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
  `

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
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
`

export { ADD_CUSTOMER, DELETE_CUSTOMER };