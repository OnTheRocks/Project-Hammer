import { useMutation } from '@apollo/client';
import { FaTrash }  from 'react-icons/fa';
import { DELETE_CUSTOMER } from '../mutations/customerMutations';
import { GET_CUSTOMERS } from '../queries/customerQueries';


export default function CustomerRow({ customer }) {
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
    variables: { id: customer.id },
    // refetchQueries: [{ query: GET_CUSTOMERS}],
    update(cache, { data: { deleteCustomer } }) { 
      const { customers } = cache.readQuery({ query: 
      GET_CUSTOMERS });
      cache.writeQuery({
        query: GET_CUSTOMERS,
        data: { customers: customers.customers.filter(customer => customer.id !== deleteCustomer.id) },
      });
     }
  });

  return (
    <tr>
      <td>{ customer.name }</td>
      <td>{ customer.email }</td>
      <td>{ customer.phone }</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteCustomer}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}