import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 


const RestaurantMap = ({ restaurants }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiemFrYXJpYWUzOCIsImEiOiJjbGhkdm9yb3gwbHBwM2VtaHc0enN6MGN5In0.uxB11aod30dsqUyYwAqLWQ';

    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-8.019517, 31.656066], // set the initial map center
      zoom: 10, // set the initial map zoom level
    });

    const markerElement = document.createElement('div');
      markerElement.className = 'marker';
    // add restaurant markers to the map
    
    map.current.on('load', () => {
      restaurants.forEach((restaurant) => {
        // create a DOM element for the marker
        
        map.current.addLayer({
          id: restaurant.nom,
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [restaurant.longitude, restaurant.latitude],
                  },
                  properties: {
                    title: restaurant.nom,
                    description: restaurant.adresse,
                  },
                },
              ],
            },
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f00',
          },
        });
        
      });
    });

    // clean up on unmount
    return () => {
      map.current.remove();
      map.current = null;
    };
  }, [restaurants]);

  return <div ref={mapContainer} style={{height:'70vh'}} className="map-container" />;
};

export default RestaurantMap;
