import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantList from './List/list';
import RestaurantMap from './Map/map';


const RestaurantSearch = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [cityFilter, setCityFilter] = useState('All');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [nom, setNom] = useState("");
  const [serieId, setSerieId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [villeId, setVilleId] = useState("");
  const [datav, setVilles] = useState([]);
  const [dataz, setZones] = useState([]);
  const [datas, setSeries] = useState([]);




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

  useEffect(() => {
    axios.get('http://localhost:8082/api/restaurants')
      .then(response => setRestaurants(response.data))
      .catch(error => console.log(error));
  }, []);


  const chargeZoneByVille = (event) => {
    const selectedValue = event.target.value;
    setVilleId(selectedValue);

    fetch(`http://localhost:8082/api/zones/${selectedValue}`)
        .then(response => response.json())
        .then(data => setZones(data))
        .catch(error => console.error(error));
    
  };


  

  const handleCityFilter = (event) => {
    setCityFilter(event.target.value);
  };

  const handleSpecialtyFilter = (event) => {
    setSpecialtyFilter(event.target.value);
  };

  const filteredRestaurants = restaurants.filter(r =>
    (cityFilter === 'All' || r.city === cityFilter) &&
    (specialtyFilter === 'All' || r.specialty === specialtyFilter) &&
    (nom === '' || r.nom.toLowerCase().includes(nom.toLowerCase())) &&
    (zoneId === '' || r.zoneId === parseInt(zoneId)) &&
    (serieId === '' || r.serieId === parseInt(serieId))
);


  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom:'20px' }}>
        <div className="form-group">
          <label htmlFor="adresse">Nom Restaurant:</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
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
      </div>
      <div className='row'>
        <div className='col-md-4 col-sm-12' >
          <RestaurantList restaurants={filteredRestaurants} />
        </div>
        <div className='col-md-8 col-sm-12'>
          <RestaurantMap  restaurants={filteredRestaurants} /> 
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearch;
