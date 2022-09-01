import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom'
import CustomerInfo from '../components/CustomerInfo';
import DeleteTicketBtn from '../components/DeleteTicketBtn';
import EditTicketForm from '../components/EditTicketForm';
import Spinner from '../components/Spinner';
import { GET_TICKET } from '../queries/ticketQueries';

export default function Ticket() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_TICKET,
  { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>Somethin Went Wrong</p>;
  
  return (
    <>
      {!loading && !error && (
        <div className="mc-auto w-75 card p-5">
          <Link to="/" className='btn btn-light btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>
          <h1>Ticket #: {data.ticket.ticketNum}</h1>
          <p>{data.ticket.date}</p>

          <h5 className='mt-3'>Material</h5>
          <p className='lead'>{data.ticket.material}</p>

          <CustomerInfo customer={data.ticket.customer} />

          <EditTicketForm ticketId={data.ticket.id} />

          <DeleteTicketBtn ticketId={data.ticket.id} />
        </div>
      )}
    </>
  )
}
