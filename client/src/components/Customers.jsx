import { gql, useQuery } from '@apollo/client'

const GET_CUSTOMERS = gql`
  query getCustomers {
    customers {
      id
      name
      email
      phone
    }
  }
`

export const Customers = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS)

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Something Went Wrong</p>;

  return <>{!loading && !error && <h1>Customers</h1>}</>;
}
