import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { ADD_CUSTOMER } from "../mutations/customerMutations";

export default function AddCustomerModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone]  = useState('');

  const [addCustomer] = useMutation(ADD_CUSTOMER, {
    variables: { name, email, phone }, 
    update(cache, { data: { addCustomer} }) {
      const { customers } = cache.readQuery({ 
        query: GET_CUSTOMERS});

      cache.writeQuery({
        query: GET_CUSTOMERS,
        data: { customers: [...customers, addCustomer] },
      });
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (name === '' || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    addCustomer(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
    
    {/* <!-- Button trigger modal --> */}
<button type="button" 
  className="btn btn-primary" 
  data-bs-toggle="modal" 
  data-bs-target="#exampleModal"
>
  <div className="d-flex align-items-center">
    <FaUser className="icon" />
    <div>Add Customer</div>
  </div>
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text"
              className="form-control" id="name"
              value={name} onChange={ (e) => setName(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="text"
              className="form-control" id="email"
              value={email} onChange={ (e) => setEmail(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input 
              type="text"
              className="form-control" id="phone"
              value={phone} onChange={ (e) => setPhone(e.target.value) } 
            />
          </div>

          <button type="submit"
          data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

    
    </>
  )
}
