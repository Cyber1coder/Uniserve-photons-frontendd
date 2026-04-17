import { useNavigate } from "react-router-dom";

function ServiceCard({ service }) {
  const navigate = useNavigate();

  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p>Category: {service.category}</p>
      <p>Price: ₹{service.price}</p>
      <p style={{ color: service.available ? "green" : "red" }}>
        {service.available ? "Available" : "Not Available"}
      </p>

      <button onClick={() => navigate(`/service/${service.id}`)}>
        View Details
      </button>
    </div>
  );
}

export default ServiceCard;