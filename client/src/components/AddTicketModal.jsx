import { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { ADD_TICKET } from "../mutations/ticketMutations";
import { GET_TICKETS } from "../queries/ticketQueries";

export default function AddTicketModal() {
  const [date, setDate] = useState('');
  const [ticketNum, setTicketNum] = useState('');
  const [customerId, setCustomerId]  = useState('');
  const [material, setMaterial]  = useState('');
  const [tareWeight, setTareWeight]  = useState('');
  const [grossWeight, setGrossWeight]  = useState('');
  const [netWeight, setNetWeight]  = useState('');
  const [notes, setNotes]  = useState('');
  
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { date, ticketNum, customerId, material, tareWeight, grossWeight, netWeight, notes }, 
    update(cache, { data: { addTicket} }) {
      const { tickets } = cache.readQuery({ query: GET_TICKETS});
      cache.writeQuery({
        query: GET_TICKETS,
        data: { tickets: [...tickets, addTicket] },
      });
    }
  });

    // Get Clients for select
  const {loading, error, data} = useQuery(GET_CUSTOMERS);

  const onSubmit = (e) => {
    
    e.preventDefault();
    
    
    if (date === "" || ticketNum === "" || customerId === "" || material === "" || tareWeight === "" || grossWeight === "" || notes === "") {
      return alert("Please fill in all fields");
      
    }

    

    addTicket(date, ticketNum, customerId, material, tareWeight, grossWeight, netWeight, notes);

    setDate("");
    setTicketNum("");
    setCustomerId("");
    setMaterial("");
    setTareWeight("");
    setGrossWeight("");
    setNetWeight("");
    setNotes("");
  };

  if(loading) return null;
  if(error) return "Something Went Wrong"

  return (
    <>    
    { !loading && !error && (
    <>
      <button type="button" 
        className="btn btn-secondary" 
        data-bs-toggle="modal" 
        data-bs-target="#addTicketModal">
        <div className="d-flex align-items-center">
          <FaListAlt className="icon" />
          <div>Add Ticket</div>
        </div>
      </button>
{/* <!-- Modal --> */}
      <div className="modal fade" 
           id="addTicketModal"
           aria-labelledby="addTicketModalLabel" 
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTicketModalLabel">New Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input 
                    // placeholder="Date"
                    type="text"
                    className="form-control" id="date"
                    value={date} onChange={ (e) => setDate(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
                  <input 
                  placeholder="Ticket #"
                  //  className="form-label"
                    type="text"
                    className="form-control" id="ticketNum"
                    value={ticketNum} onChange={ (e) => setTicketNum(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
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
    
                <div className="mb-3">
                  <label className="form-label">Material</label>
                  <input 
                    // placeholder="Material"
                    type="text"
                    className="form-control" id="material"
                    value={material} onChange={ (e) => setMaterial(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Gross Weight</label>
                  <input 
                    // placeholder="Gross Weight"
                    type="number"
                    className="form-control" id="grossWeight"
                    value={grossWeight} onChange={ (e) => setGrossWeight(e.target.valueAsNumber) } 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tare Weight</label>
                  <input
                    // placeholder="Tare Weight" 
                    type="number"
                    className="form-control" id="tareWeight"
                    value={tareWeight} onChange={ (e) => setTareWeight(e.target.valueAsNumber) } 
                  />
                  

                </div>
                <div className="mb-3" >
                  <label className="form-label">Net Weight</label>
                  <input 
                    // placeholder="Net Weight"
                    type="number"
                    className="form-control" id="NetWeight"
                    // readOnly
                    
                    value={grossWeight - tareWeight} 
                    onInput={ (e) => setNetWeight(e.target.valueAsNumber) }
                    
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
      )}
    </>
  );
}
