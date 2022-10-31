// const moment = require('moment');

export default function TicketCard({ticket}) {
  // console.log(ticket);
  return (
    <div className="col-md-6">
      <div className="card md-3 mt-2">
        <div className="card body">
          <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">Date: <strong>{ticket.date}</strong></h5>

          {/* {moment(ticket.date).format("MM-DD-YYYY")} */}

          <h5 className="card-title">Ticket #: <strong>{ticket.ticketNum}</strong></h5>

          <a className="btn btn-light" href={`/tickets/${ticket.id}`}>view</a>
          </div>
          <p className="small">Ticket ID: <strong>{ticket.id}</strong></p>
        </div>
      </div>
    </div>
  )
 }
