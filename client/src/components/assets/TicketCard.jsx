export default function TicketCard({ticket}) {
  return (
    <div className="col-md-4">
      <div className="card md-3">
        <div className="card body">
          <div className="d-flex justify-content-between align-items-center">;
          <h5 className="card-title">{ticket.id}</h5>

          </div>
        </div>
      </div>
    </div>
  )
}
