import { useState } from "react";
import { FaListAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_MATERIAL } from "../mutations/materialMutations";
import { GET_MATERIALS } from "../queries/materialQueries";

export default function AddMaterialModal() {
  const [matId, setMatId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice]  = useState('');
  const [unit, setUnit]  = useState('');
  const [notes, setNotes]  = useState('');
  
  const [addMaterial] = useMutation(ADD_MATERIAL, {
    variables: { matId, name, price, unit, notes }, 
    update(cache, { data: { addMaterial} }) {
      const { materials } = cache.readQuery({ query: GET_MATERIALS});
      cache.writeQuery({
        query: GET_MATERIALS,
        data: { materials: [...materials, addMaterial] },
      });
    }
  });

  const onSubmit = (e) => {
    
    e.preventDefault();
    
    
    if (matId === "" || name === "" || price === "" || unit === "" || notes === "") {
      return alert("Please fill in all fields");
      
    }

    

    addMaterial(matId, name, price, unit, notes);

    setMatId("");
    setName("");
    setPrice("");
    setUnit("");
    setNotes("");
  };

  return (
    <>
      <button type="button" 
        className="btn btn-secondary" 
        data-bs-toggle="modal" 
        data-bs-target="#addMaterialModal">
        <div className="d-flex align-items-center">
          <FaListAlt className="icon" />
          <div>Add Material</div>
        </div>
      </button>
{/* <!-- Modal --> */}
      <div className="modal fade" 
           id="addMaterialModal"
           aria-labelledby="addMaterialModal" 
           aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addMaterialModal">New Material</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Material Id</label>
                  <input 
                    // placeholder="Date"
                    type="text"
                    className="form-control" id="matId"
                    value={matId} onChange={ (e) => setMatId(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
                <label className="form-label">Name</label>
                  <input 
                  // placeholder="Ticket #"
                    type="text"
                    className="form-control" id="name"
                    value={name} onChange={ (e) => setName(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input 
                    // placeholder="price"
                    type="text"
                    className="form-control" id="price"
                    value={price} onChange={ (e) => setPrice(e.target.value) } 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ton/Load</label>
                  <input 
                    // placeholder="Unit"
                    type="unit"
                    className="form-control" id="unit"
                    value={unit} onChange={ (e) => setUnit(e.target.value) } 
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
      )
    }
