import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const RestaurantForm = () => {
  const [adresse, setAdresse] = useState("");
  const [jouverture, setJOuverture] = useState("");
  const [hfermeture, setHFermeture] = useState("");
  const [houverture, setHOuverture] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [nom, setNom] = useState("");
  const [rank, setRank] = useState("");
  const [serieId, setSerieId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [villeId, setVilleId] = useState("");
  const [datav, setVilles] = useState([]);
  const [dataz, setZones] = useState([]);
  const [datas, setSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8082/api/villes')
      .then(response => response.json())
      .then(data => setVilles(data))
      .catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    fetch('http://localhost:8082/api/series')
      .then(response => response.json())
      .then(data => setSeries(data))
      .catch(error => console.error(error));
  }, []);
  



  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post(`http://localhost:8082/api/restaurants/${nom}/${adresse}/${jouverture}/${houverture}/${hfermeture}/${latitude}/${longtitude}/${rank}/${serieId}/${zoneId}`).then(() => {
    navigate("/Restaurants");
     })
      .catch(error => console.error(error));
  };


  const chargeZoneByVille = (event) => {
    const selectedValue = event.target.value;
    setVilleId(selectedValue);

    fetch(`http://localhost:8082/api/zones/${selectedValue}`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.error(error));
    
  };



  

  return (
    <div className="container">
      <h2 className="mt-5">Create Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adresse">Adresse:</label>
          <input
            type="text"
            className="form-control"
            id="adresse"
            value={adresse}
            onChange={(event) => setAdresse(event.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="jouverture">Jour Ouverture:</label>
          <input
            type="text"
            className="form-control"
            id="jouverture"
            value={jouverture}
            onChange={(event) => setJOuverture(event.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="houverture">Heure Ouverture:</label>
          <input
            type="time"
            className="form-control"
            id="houverture"
            value={houverture}
            onChange={(event) => setHOuverture(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hfermeture">Heure Fermeture:</label>
          <input
            type="time"
            className="form-control"
            id="hfermeture"
            value={hfermeture}
            onChange={(event) => setHFermeture(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            className="form-control"
            id="latitude"
            value={latitude}
            onChange={(event) => setLatitude(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="longtitude">Longtitude:</label>
          <input
            type="text"
            className="form-control"
            id="longtitude"
            value={longtitude}
            onChange={(event) => setLongtitude(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="longtitude">Rank :</label>
          <input
            type="number"
            className="form-control"
            id="rank"
            value={rank}
            onChange={(event) => setRank(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ville">Ville:</label>
          <select
            className="form-control"
            id="ville"
            value={villeId}
            onChange={chargeZoneByVille}
          >
            <option value="">Select a ville</option>
            {datav.map((item) => (
              <option key={item.id_Ville} value={item.id_Ville}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="zoneId">Zone:</label>
          <select
            className="form-control"
            id="zoneId"
            value={zoneId}
            onChange={(event) => setZoneId(event.target.value)}
          >
            <option value="">Select a zone</option>
            {dataz.map((item) => (
              <option key={item.id_Zone} value={item.id_Zone}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serieId">Serie:</label>
          <select
            className="form-control"
            id="serieId"
            value={serieId}
            onChange={(event) => setSerieId(event.target.value)}
          >
            <option value="">Select a serie</option>
            {datas.map((item) => (
              <option key={item.id_Serie} value={item.id_Serie}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};

export default RestaurantForm;
