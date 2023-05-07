import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SpecialiteForm = () => {
  const [nom, setNom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8082/api/specialites", { nom }).then(() => {
      navigate("/Specialites");
    });
  };

  return (
    <div className="container">
      <h2 className="mt-5" >Create Specialite </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default SpecialiteForm;
