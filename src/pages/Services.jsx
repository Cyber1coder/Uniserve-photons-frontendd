import { useParams } from "react-router-dom";
import { services } from "../data/services";

function Services() {
  const { category } = useParams();

  const filtered = services.filter(s => s.category === category);

  return (
    <div className="container">
      <h2>{category} Services</h2>

      {filtered.map(service => (
        <div key={service.id}>
          {service.name}
        </div>
      ))}
    </div>
  );
}

export default Services;