import React, { useEffect, useState } from 'react';
 
export default function MyCustomWidget() {
   
    const [location, setLocation] = useState(null);

    useEffect(() => {
      // Get user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Reverse geocoding using MapQuest Geocoding API
          fetch(
            `https://www.mapquestapi.com/geocoding/v1/reverse?key=YOUR-API-KEY&location=${latitude},${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.results[0].locations[0].adminArea5;
              setLocation({ latitude, longitude, city });
            })
            .catch((error) => {
              console.log('Error getting location:', error);
            });
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }, []);
  
    return (
      <div style={{ minWidth: 300 }}>
        {location ? (
          <p>
            City: {location.city}, Latitude: {location.latitude}, Longitude: {location.longitude}
          </p>
        ) : (
          <p>Loading location...</p>
        )}
      </div>
    );
  };  