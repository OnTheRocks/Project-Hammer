export default function TicketCard({ticket}) {
  return (
    <div className="col-md-6">
      <div className="card md-3 mt-2">
        <div className="card body">
          <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{ticket.ticketNum}</h5>

          <a className="btn btn-light" href={`/ticket/${ticket.id}`}>view</a>
          </div>
          <p className="small">Ticket ID: <strong>{ticket.id}</strong></p>
        </div>
      </div>
    </div>
  )
}
