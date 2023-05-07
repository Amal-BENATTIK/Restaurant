import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const VilleList = () => {
  const [villes, setVilles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8082/api/villes").then((response) => {
        setVilles(response.data);
    })
    
    .catch(error => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`http://localhost:8082/api/villes/${id}`).then(() => {
        setVilles(villes.filter((ville) => ville.id_Ville !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`http://localhost:8082/api/villes/${id}`, {nom:newName }).then(() => {
         setVilles(villes.map(( ville) => {
          if (ville.id_Ville === id) {
            return { ... ville, nom: newName };
          }
          return  ville;
        }));
      });
    }
  };

  return (
    <div className="table-responsive">
    <div className="container mt-4">
      <h2 > ville List</h2>
      <Link to="/create-ville" className="btn btn-primary mt-2 mb-3">
        Create  ville
      </Link>
      <table className="table w-auto">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {villes.map((ville) => (
            <tr key={ ville.id_Ville}>
              <td>{ ville.id_Ville}</td>
              <td>{ ville.nom}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete( ville.id_Ville)}>
                  Delete
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => handleEdit( ville.id_Ville)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
};

export default  VilleList;
