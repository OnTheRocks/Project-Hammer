import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../queries/ticketQueries";
import TicketCard from "./TicketCard";

export default function Tickets() {
  const { loading, error, data } = useQuery(GET_TICKETS);

  if (loading) return <Spinner />
  if ( error ) return <p>Something Went Wrong</p>
  
  return (
  <>
    {data.tickets.length > 0 ? (
      <div className="row mt-4">
        {data.tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket=
          {ticket} />
        ))}
      </div>
    ) : (
    <p>No Tickets</p>
    )}
  </>
  )
}
