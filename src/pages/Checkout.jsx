import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state;

  return (
    <div className="container">
      <h2>Checkout</h2>
      <p>{service?.name}</p>
      <p>₹{service?.price}</p>

      <button onClick={() => navigate("/history")}>
        Pay & Confirm
      </button>
    </div>
  );
}

export default Checkout;