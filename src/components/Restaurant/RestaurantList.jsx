import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8082/api/restaurants").then((response) => {
            setRestaurants(response.data);
        })
        
        .catch(error => {
            console.log(error.message);
          });
      }, []);
    
      const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this restaurant?")) {
          axios.delete(`http://localhost:8082/api/restaurants/${id}`).then(() => {
            setRestaurants(restaurants.filter((restaurant) => restaurant.id_Restaurant !== id));
          });
        }
      };

      
    
      return (
        <div className="table-responsive">
    <div className="container mt-4">
      <h2 > Restaurant List</h2>
      <Link to="/create-Restaurant" className="btn btn-primary mt-2 mb-3">
        Create  Restaurant
      </Link>
      <table className="table w-auto">
        <thead>
          <tr className="">
            <th>ID</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Jour Ouverture</th>
            <th>Heure Ouverture</th>
            <th>Heure Fermeture</th>
            <th>Rank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={ restaurant.id_Restaurant}>
              <td>{ restaurant.id_Restaurant}</td>
              <td>{ restaurant.nom}</td>
              <td>{ restaurant.adresse}</td>
              <td>{ restaurant.jour_ouverture}</td>
              <td>{ restaurant.heure_fermeture}</td>
              <td>{ restaurant.heure_ouverture}</td>
              <td>{ restaurant.rank}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete( restaurant.id_Restaurant)}>
                  Delete
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
    
    export default RestaurantList;