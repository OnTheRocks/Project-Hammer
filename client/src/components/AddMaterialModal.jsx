import { useState } from "react";
import { FaTruckMoving } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_MATERIAL } from "../mutations/materialMutations";
import { GET_MATERIALS } from "../queries/materialQueries";

export default function AddMaterialModal() {
  const [matId, setMatId] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes]  = useState('');
  
  const [addMaterial] = useMutation(ADD_MATERIAL, {
    variables: { matId, name, notes }, 
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
    
    
    if (matId === "" || name === "" || notes === "") {
      return alert("Please fill in all fields");      
    }
    
    addMaterial(matId, name, notes);

    setMatId("");
    setName("");
    setNotes("");
  };

  return (
    <>
      <button type="button" 
        className="btn btn-secondary" 
        data-bs-toggle="modal" 
        data-bs-target="#addMaterialModal">
        <div className="d-flex align-items-center">
          <FaTruckMoving className="icon" color= "#0fa10a" />
          <div className="btnFont">Add Material</div>
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
                    type="text"
                    className="form-control" id="matId"
                    value={matId} onChange={ (e) => setMatId(e.target.value) } 
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
