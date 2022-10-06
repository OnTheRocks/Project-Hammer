import { useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom'
import CustomerInfo from '../components/CustomerInfo';
import DeleteTicketBtn from '../components/DeleteTicketBtn';
import EditTicketForm from '../components/EditTicketForm';
import EditTicketModal from '../components/EditTicketModal';
import Spinner from '../components/Spinner';
import { GET_TICKET } from '../queries/ticketQueries';

const moment = require('moment');

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
          <Link to="/" className='btn btn-outline-dark btn-sm w-25 d-inline ms-auto'>
            Back
          </Link>
          <h1>Ticket #: {data.ticket.ticketNum}</h1>
          <p>{data.ticket.date}</p>
          <p>{moment(data.ticket.date).format("MM-DD-YYYY")}</p>

          <h5 className=''>Material</h5>
          <p className='lead'>{data.ticket.material}</p>
          <h5 className=''>Gross Weight</h5>
          <p className='lead'>{data.ticket.grossWeight}</p>
          <h5 className=''>Tare Weight</h5>
          <p className='lead'>{data.ticket.tareWeight}</p>
          <h5 className=''>Net Weight</h5>
          <p className='lead'>{data.ticket.grossWeight - data.ticket.tareWeight}</p>

            <CustomerInfo customer={data.ticket.customer} />    
          <div className="d-flex ">
            <EditTicketModal ticket={data.ticket} />
            <DeleteTicketBtn ticketId={data.ticket.id} />            
          </div>
        </div>
      )},
    </>
  )
}
