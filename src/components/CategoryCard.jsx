import { useNavigate } from "react-router-dom";

function CategoryCard({ name }) {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate(`/services/${name.toLowerCase()}`)}
    >
      {name}
    </div>
  );
}

export default CategoryCard;