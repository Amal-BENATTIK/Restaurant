import { FaMapMarkerAlt, FaClock, FaRegCalendarAlt , FaStar} from 'react-icons/fa';

const RestaurantList = ({ restaurants }) => {
  return (
    <div style={{ width: '100%', marginRight: '1em', overflowY: 'scroll', maxHeight: '600px' }}>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id_Restaurant} style={{ border: '2px solid #ccc', padding: '1em', marginBottom: '1em' , borderRadius: '20px'}}>
          <h3>{restaurant.nom}</h3>
          <p><FaMapMarkerAlt style={{ marginRight: '0.5em' }} />{restaurant.adresse}</p>
          <p><FaRegCalendarAlt style={{ marginRight: '0.5em' }} />{restaurant.jour_ouverture} </p>
          <p><FaClock style={{ marginRight: '0.5em' }} />{restaurant.heure_ouverture} to {restaurant.heure_fermeture}</p>
          <p><FaMapMarkerAlt style={{ marginRight: '0.5em' }} />{restaurant.zone.nom}</p>
          <p>Serie: {restaurant.serie.nom}</p>
          <p><FaStar style={{ marginRight: '0.5em' }}/> {restaurant.rank} </p>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
