import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CUSTOMERS } from '../queries/customerQueries';
import { ADD_CUSTOMER } from "../mutations/customerMutations";

export default function AddCustomerModal() {
  const [custId, setCustId] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [webSite, setWebSite] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone]  = useState('');

  const [addCustomer] = useMutation(ADD_CUSTOMER, {
    variables: { custId, name, street, city, zip, webSite, email, phone }, 
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
    
    if (custId === '' || name === '' || street === '' || city === '' || zip === "" || webSite === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }

    addCustomer(custId, name, street, city, zip, webSite, email, phone);

    setCustId("");
    setName("");
    setStreet("");
    setStreet("");
    setCity("");
    setZip("");
    setWebSite("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
    
    {/* <!-- Button trigger modal --> */}
<button type="button" 
  className="btn btn-secondary" 
  data-bs-toggle="modal" 
  data-bs-target="#addCustomerModal"
>
  <div className="d-flex align-items-center">
    <FaUser className="icon" color= "#0fa10a" />
    <div className="btnFont">Add Customer</div>
  </div>
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="addCustomerModal" tabIndex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="addCustomerModal">Add Customer</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Customer ID</label>
            <input 
              type="text"
              className="form-control" id="custId"
              value={custId} onChange={ (e) => setCustId(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input 
              type="text"
              className="form-control" id="name"
              value={name} onChange={ (e) => setName(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Street</label>
            <input 
              type="text"
              className="form-control" id="street"
              value={street} onChange={ (e) => setStreet(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input 
              type="text"
              className="form-control" id="city"
              value={city} onChange={ (e) => setCity(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">ZIP Code</label>
            <input 
              type="text"
              className="form-control" id="zip"
              value={zip} onChange={ (e) => setZip(e.target.value) } 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">WebSite</label>
            <input 
              type="text"
              className="form-control" id="webSite"
              value={webSite} onChange={ (e) => setWebSite(e.target.value) } 
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
          data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>    
</>
 )
}
