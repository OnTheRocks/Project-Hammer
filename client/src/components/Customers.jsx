import { gql, useQuery } from '@apollo/client'
import CustomerRow from './CustomerRow';


const GET_CUSTOMERS = gql`
  query getCustomers {
    customers {
      id
      name
      email
      phone
    }
  }
`;

export const Customers = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Something Went Wrong</p>;

  return <>{!loading && !error && (
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.customers.map(customer=> (
          <CustomerRow key={customer.id}  customer={customer}/>
        ))}
      </tbody>
    </table>
  )}</>;
}
