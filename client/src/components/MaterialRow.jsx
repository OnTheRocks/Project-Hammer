import { useMutation } from '@apollo/client';
import { FaTrash }  from 'react-icons/fa';
import { DELETE_MATERIAL } from '../mutations/materialMutations';
import { GET_MATERIALS } from '../queries/materialQueries';


export default function MaterialRow({ material }) {
  const [deleteMaterial] = useMutation(DELETE_MATERIAL, {
    variables: { id: material.id },
    refetchQueries: [{ query: GET_MATERIALS}],
  });

  return (
    <tr>
      {/* <td>{ material.matId }</td> */}
      <td>{ material.name }</td>
      <td>{ material.price }</td>
      <td>{ material.unit }</td>
      {/* <td>{ material.notes }</td> */}
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteMaterial}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}