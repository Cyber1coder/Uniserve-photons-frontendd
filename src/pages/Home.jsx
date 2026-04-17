import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const categories = [
    { name: "grocery", label: "🛒 Groceries" },
    { name: "food", label: "🍔 Food" },
    { name: "transport", label: "🚗 Transport" },
    { name: "home", label: "🔧 Home Services" }
  ];

  return (
    <div className="container">
      <h2>Select a Category</h2>

      <div className="grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="card"
            onClick={() => navigate(`/services/${cat.name}`)}
          >
            {cat.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
