import AddCustomerModal from "../components/AddCustomerModal";
import AddTicketModal from "../components/AddTicketModal";
import { Customers } from "../components/Customers";
import { Materials } from "../components/Materials";
import Tickets from "../components/Tickets";


export default function Home() {
  return (
    <>
      
      <div className="d-flex gap-3 mb-4">
        <AddTicketModal />
        <AddCustomerModal />
      </div>
      <h3>Tickets</h3>
      <Tickets />
      <hr />
      <h3>Customers</h3>
      <div className="d-flex gap-3 mb-4">
        <Customers />
      </div>
      <h3>Materials</h3>
      <div className="d-flex gap-3 mb-4">
        
        <Materials />
      </div>
    </>
  )
}
