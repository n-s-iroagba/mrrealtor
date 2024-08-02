import { useState, useEffect } from 'react';

interface GeolocationResult {
  city: string | null;
  error: string | null;
}

const useGeolocation = (): GeolocationResult => {
  const [city, setCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    const showPosition = (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getCityName(latitude, longitude);
    };

    const showError = (error: GeolocationPositionError) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          setError("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          setError("The request to get user location timed out.");
          break;
        default:
          setError("An unknown error occurred.");
          break;
      }
    };

    const getCityName = async (lat: number, lon: number) => {
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
          const addressComponents = data.results[0].address_components;
          let city = '';

          for (let component of addressComponents) {
            if (component.types.includes('locality')) {
              city = component.long_name;
              break;
            }
          }

          setCity(city);
        } else {
          setError('Unable to retrieve your city.');
        }
      } catch (error) {
        setError('Error fetching the city name.');
        console.error('Error fetching the city name:', error);
      }
    };

    getLocation();
  }, []);

  return { city, error };
};

export default useGeolocation;
