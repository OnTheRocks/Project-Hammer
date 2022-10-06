import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { UPDATE_TICKET } from "../mutations/ticketMutations";
import { GET_TICKET } from "../queries/ticketQueries"

const moment = require('moment');

export default function EditTicketModal({ ticket }) {
  const [date, setDate] = useState(ticket.date);
  const [ticketNum, setTicketNum] = useState(ticket.ticketNum);
  const [customerId, setCustomerId]  = useState(ticket.customerId);
  const [material, setMaterial]  = useState(ticket.material);
  const [tareWeight, setTareWeight]  = useState(ticket.tareWeight);
  const [grossWeight, setGrossWeight]  = useState(ticket.grossWeight);
  const [netWeight, setNetWeight]  = useState(ticket.netWeight);
  const [notes, setNotes]  = useState(ticket.notes);

  const [updateTicket] =  useMutation(UPDATE_TICKET, {
    variables: { id: ticket.id, date, ticketNum, material, tareWeight, grossWeight, netWeight, notes }, 
    refetchQueries: [{ query: GET_TICKET, variables: { id: ticket.id} 
    }],
  })

  const onSubmit = (e) => {
    e.preventDefault();

    if (date === "" || ticketNum === "" || customerId === "" || material === "" || tareWeight === "" || grossWeight === "" || netWeight === "" || notes === "") {
      return alert("Please fill in all fields");
    }

    updateTicket(date, ticketNum, material, tareWeight, grossWeight, netWeight, notes);
  }

  // if(loading) return null;
  // if(error) return "Something Went Wrong"

  return (
    <>    
    {/* { !loading && !error && ( */}
    <>
    <div className="d-flex mt-5 ">
      <button 
        type="button"className="btn btn-primary m-2" 
        data-bs-toggle="modal" 
        data-bs-target="#editTicketModal">
        <FaListAlt className="icon" />Update Ticket
      </button>
    </div>



      {/* <button type="button" 
        className="btn btn-danger m-2" 
        data-bs-toggle="modal" 
        data-bs-target="#editTicketModal">
        <div className="d-flex mt-5 ms-auto">
          <FaListAlt className="icon" />
          <div>Edit Ticket</div>
        </div>
      </button> */}
{/* <!-- Modal --> */}
<div className="modal fade" 
           id="editTicketModal"
           aria-labelledby="editTicketModal" 
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editTicketModal">New Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form onSubmit={ onSubmit }>
                <div className="mb-1">
                  <label className="form-label">Date</label>
                  <input 
                    type="text"
                    className="form-control" id="date"
                    value={moment(date).format("MM-DD-YYYY")} onChange={ (e) => setDate(e.target.value) } 
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
                </div>
                <div className="mb-1">
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
                  <label className="form-label">Gross Weight</label>
                  <input 
                    type="number"
                    className="form-control" id="grossWeight"
                    value={grossWeight} onChange={ (e) => setGrossWeight(e.target.valueAsNumber) } 
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
          </div>
        </div>
      </div>
    </>
      {/* )} */}
    </>
  );
}