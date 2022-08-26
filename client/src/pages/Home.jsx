import AddCustomerModal from "../components/AddCustomerModal";
import AddTicketModal from "../components/AddTicketModal";
import { Customers } from "../components/Customers";
import Tickets from "../components/Tickets";


export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddCustomerModal />
        <AddTicketModal />
      </div>
      <Tickets />
      <hr />
      <Customers />
    </>
  )
}
