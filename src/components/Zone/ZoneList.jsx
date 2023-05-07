import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ZoneList = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8082/api/zones").then((response) => {
        setZones(response.data);
    })
    
    .catch(error => {
        console.log(error.message);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this city?")) {
      axios.delete(`http://localhost:8082/api/zones/${id}`).then(() => {
        setZones(zones.filter((zone) => zone.id_Zone !== id));
      });
    }
  };

  const handleEdit = (id) => {
    const newName = window.prompt("Enter the new name for this city:");
    if (newName) {
      axios.put(`http://localhost:8082/api/zones/${id}`, {nom:newName }).then(() => {
         setZones(zones.map(( zone) => {
          if (zone.id_Zone === id) {
            return { ... zone, nom: newName };
          }
          return  zone;
        }));
      });
    }
  };

  return (
    <div className="table-responsive">
    <div className="container mt-4">
      <h2 > zone List</h2>
      <Link to="/create-zone" className="btn btn-primary mt-2 mb-3">
        Create  zone
      </Link>
      <table className="table w-auto">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Name</th>
            <th>Ville</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zones.map((zone) => (
            <tr key={ zone.id_Zone}>
              <td>{ zone.id_Zone}</td>
              <td>{ zone.nom}</td>
              <td>{ zone.ville.nom}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete( zone.id_Zone)}>
                  Delete
                </button>
                <button className="btn btn-secondary ml-2" onClick={() => handleEdit( zone.id_Zone)}>
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

export default  ZoneList;
