import { useParams, useNavigate } from "react-router-dom";
import { services } from "../data/services";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = services.find(s => s.id == id);

  return (
    <div className="container">
      <h2>{service.name}</h2>
      <p>Price: ₹{service.price}</p>
      <p>{service.available ? "Available" : "Not Available"}</p>

      <button onClick={() => navigate("/checkout", { state: service })}>
        Book Now
      </button>
    </div>
  );
}

export default ServiceDetails;