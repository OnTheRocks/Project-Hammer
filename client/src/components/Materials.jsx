import { useQuery } from '@apollo/client'
import { GET_MATERIALS } from '../queries/materialQueries';
import MaterialRow from './MaterialRow';
import Spinner from './Spinner';




export const Materials = () => {
  const { loading, error, data } = useQuery(GET_MATERIALS);

  if (loading) return <Spinner />;
  if (error) return <p>Something IS Wrong</p>;

  return <>{!loading && !error && (
    <table className='table table-hover mt-3'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Unit</th>
          <th>Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.materials.map(material=> (
          <MaterialRow key={material.id}  material={material}/>
        ))}
      </tbody>
    </table>
  )}</>;
}
