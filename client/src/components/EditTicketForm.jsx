import { useState } from "react";


export default function EditTicketForm({ticket}) {
  const [date, setDate] = useState(ticket.date);
  const [ticketNum, setTicketNum] = useState(ticket.ticketNum);
  const [customerId, setCustomerId]  = useState(ticket.customerId);
  const [material, setMaterial]  = useState(ticket.material);
  const [tareWeight, setTareWeight]  = useState(ticket.tareWeight);
  const [grossWeight, setGrossWeight]  = useState(ticket.grossWeight);
  const [netWeight, setNetWeight]  = useState(ticket.netWeight);
  const [notes, setNotes]  = useState(ticket.notes);

  const onSubmit = (e) => {
    e.preventDefault();

    if (date === "" || ticketNum === "" || customerId === "" || material === "" || tareWeight === "" || grossWeight === "" || netWeight === "" || notes === "") {
      return alert("Please fill in all fields");
    }
  }


  return (
    <div className="mt-5">
      <h3>Update Ticket Details</h3>
      <form onSubmit={ onSubmit }>

                <div className="mb-1">
                  <label className="form-label">Date</label>
                  <input 
                    type="text"
                    className="form-control" id="date"
                    value={date} onChange={ (e) => setDate(e.target.value) } 
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Ticket #</label>
                  <input 
                    type="text"
                    className="form-control" id="ticketNum"
                    value={ticketNum} onChange={ (e) => setTicketNum(e.target.value) } 
                  />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Customer</label>
                  <select id="customerId" className="form-select" 
                          value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
                          <option value="">Select Customer</option>
                          { data.customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name} 
                            </option>
                          ) )}
                  </select>
                </div> */}
                {/* <div className="mb-1">
                  <label className="form-label">Customer</label>
                  <input 
                    type="text"
                    className="form-control" id="customerId"
                    value={customerId} onChange={ (e) => setCustomerId(e.target.value) } 
                  />
                </div> */}
                <div className="mb-1">
                  <label className="form-label">Material</label>
                  <input 
                    type="text"
                    className="form-control" id="material"
                    value={material} onChange={ (e) => setMaterial(e.target.value) } 
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Tare Weight</label>
                  <input 
                    type="number"
                    className="form-control" id="tareWeight"
                    value={tareWeight} onChange={ (e) => setTareWeight(e.target.valueAsNumber) } 
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Gross Weight</label>
                  <input 
                    type="number"
                    className="form-control" id="grossWeight"
                    value={grossWeight} onChange={ (e) => setGrossWeight(e.target.valueAsNumber) } 
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Net Weight</label>
                  <input 
                    type="number"
                    className="form-control" id="NetWeight"
                    value={netWeight} onChange={ (e) => setNetWeight(e.target.valueAsNumber) } 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Notes</label>
                  <textarea
                    className="form-control" id="notes"
                    value={notes} onChange={ (e) => setNotes(e.target.value) }> 
                  </textarea>
                </div>

                
                          
                <button type="submit"
                data-bs-dismiss="modal" className="btn btn-primary">Submit
                </button>
              </form>
            </div>
  )
}
