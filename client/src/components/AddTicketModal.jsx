import { useState } from "react";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { ADD_TICKET } from "../mutations/ticketMutations";
import { GET_TICKETS } from "../queries/ticketQueries";
import { GET_MATERIALS } from "../queries/materialQueries";
import { gql } from "@apollo/client";

export default function AddTicketModal() {
  const [date, setDate] = useState('');
  const [ticketNum, setTicketNum] = useState('');
  const [customerId, setCustomerId]  = useState('');
  const [materialId, setMaterialId]  = useState('');
  const [tareWeight, setTareWeight]  = useState('');
  const [grossWeight, setGrossWeight]  = useState('');
  const [netWeight, setNetWeight]  = useState('');
  const [notes, setNotes]  = useState('');
  
  const [addTicket] = useMutation(ADD_TICKET, {
    variables: { date, ticketNum, customerId, materialId, tareWeight, grossWeight, netWeight, notes }, 
    update(cache, { data: { addTicket} }) {
      const { tickets } = cache.readQuery({ query: GET_TICKETS});
      cache.writeQuery({
        query: GET_TICKETS,
        data: { tickets: [...tickets, addTicket] },
      });
    }
  });

  // const {loading, error, data} = useQuery(
  //   gql`
  //     query GET_CUSTOMERS {
  //       first {
  //         _id
  //         name
  //       }
  //       second {
  //         _id
  //         name
  //       }
  //   }
  
  // `
  // );

  const {loading, error, data} = useQuery(
    gql`
      query Query {
        customers {
          id
          name
        }
        materials {
          id
          name
        }
    }  
  `
  );

    // Get Customers for customer selection
  // const {loading, error, data} = useQuery(GET_CUSTOMERS);
  // const {loading, error, data} = useQuery(GET_CUSTOMERS);
  // const {loading, error, data} = useQuery(GET_CUSTOMERS );
  // const query2 = useQuery(
  //   GET_MATERIALS`
  //     query ` );

  // const query = useQuery(GET_CUSTOMERS);
  // const query2 = useQuery(GET_MATERIALS);
  // console.log(query.data, query2.data)

  // console.log(data);


  const onSubmit = (e) => {
    
    e.preventDefault();
    
    
    if (date === "" || ticketNum === "" || customerId === "" || materialId === "" || tareWeight === "" || grossWeight === "" || notes === "") {
      return alert("Please fill in all fields");
      
    }

    

    addTicket(date, ticketNum, customerId, materialId, tareWeight, grossWeight, netWeight, notes);

    setDate("");
    setTicketNum("");
    setCustomerId("");
    setMaterialId("");
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
          <FaFileInvoiceDollar className="icon" />
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
                <label className="form-label">Ticket #</label>
                  <input 
                  // placeholder="Ticket #"
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
                  <select id="materialId" className="form-select" 
                          value={materialId} onChange={(e) => setMaterialId(e.target.value)}>
                          <option value="">Select Material</option>
                          {data.materials.map((material) => (
                            <option key={material.id} value={material.id}>
                              {material.name} 
                            </option>
                          ) )} 
                  </select>
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
