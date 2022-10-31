import { FaEnvelope, FaIdBadge, FaPhone, FaPhoneAlt } from "react-icons/fa";

export default function CustomerInfo({ customer }) {
  return (
    <>
      <h5 className="">Customer</h5>  
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" />{customer.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" />{customer.email}
        </li>
        <li className="list-group-item">
          <FaPhoneAlt className="icon" />{customer.phone}
        </li>
      </ul>
    </>
  )
}
