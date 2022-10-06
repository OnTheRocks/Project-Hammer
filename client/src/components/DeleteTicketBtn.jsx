import { useMutation } from "@apollo/client";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DELETE_TICKET } from "../mutations/ticketMutations";
import { GET_TICKETS } from "../queries/ticketQueries";




export default function DeleteTicketBtn({ ticketId }) {
  const navigate = useNavigate();

  const[deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticketId },
    onCompleted: () => navigate('/'), 
    refetchQueries: [{ query: GET_TICKETS}],  
  })

  return (
    <div className="d-flex mt-5">
      <button className="btn btn-danger m-2" onClick={deleteTicket}>
        <FaTrashAlt className="icon" />Delete Ticket
      </button>
    </div>
  )
}
