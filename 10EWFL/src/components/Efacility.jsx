import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import 'mapbox-gl/dist/mapbox-gl.css';
import getLocation from './utils/getLocation';
import { calculateDistance } from './utils/calculateLocation';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { facility } from './data/facility';
import { Link } from 'react-router-dom'; // Updated for Vite

const FacilityMap = () => {
  const [facilityData, setFacilityData] = useState([]);
  const [clientLocation, setClientLocation] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const cardContainerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const markersRef = useRef([]);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw';

    getLocation().then((coordinates) => {
      if (coordinates) {
        setClientLocation(coordinates.coordinates);
      } else {
        setClientLocation([75.7139, 19.7515]); // Default coordinates if location is not available
      }
    });
  }, []);

  const handleAllowLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('User denied the request for location.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.error('The request to get user location timed out.');
              break;
            default:
              console.error('An unknown error occurred.');
              break;
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (clientLocation) {
      const sortedFacilities = facility
        .map((facility) => ({
          ...facility,
          distance: calculateDistance(
            clientLocation[1],
            clientLocation[0],
            facility.lat,
            facility.lon
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      setFacilityData(sortedFacilities);

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: clientLocation,
        zoom: 10,
      });

      mapRef.current = map;
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      map.addControl(geocoder);

      geocoder.on('result', (event) => {
        const { geometry, place_name } = event.result;

        if (geometry && geometry.coordinates) {
          const center = geometry.coordinates;

          const selectedLocationMarker = new mapboxgl.Marker()
            .setLngLat(center)
            .addTo(map);

          const popup = new mapboxgl.Popup().setHTML(
            `<h3 class="font-weight-bold text-success">Selected Location</h3>
            <p>Address: ${place_name || 'Address not available'}</p>`
          );

          selectedLocationMarker.setPopup(popup);

          // Find the nearest facility
          let nearestFacility = facility[0];
          let nearestDistance = calculateDistance(
            center[1],
            center[0],
            facility[0].lat,
            facility[0].lon
          );

          facility.forEach((facility) => {
            const distance = calculateDistance(
              center[1],
              center[0],
              facility.lat,
              facility.lon
            );

            if (distance < nearestDistance) {
              nearestFacility = facility;
              nearestDistance = distance;
            }
          });
          getDirections(center, [nearestFacility.lon, nearestFacility.lat]);
        }
      });

      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

      const userMarker = new mapboxgl.Marker({ color: '#256dd9' })
        .setLngLat(clientLocation)
        .addTo(map);

      userMarkerRef.current = userMarker;

      sortedFacilities.forEach((facility, index) => {
        const popup = new mapboxgl.Popup().setHTML(
          `<h6 class="font-weight-bold text-success">${facility.name}</h6>
            <p class="text-secondary">Distance: ${facility.distance.toFixed(2)} km away</p>`
        );

        const marker = new mapboxgl.Marker({
          color: selectedFacility === index ? '#ff0800' : '#22b371',
        })
          .setLngLat([facility.lon, facility.lat])
          .setPopup(popup);

        markersRef.current.push(marker);

        marker.addTo(map);

        marker.getElement().addEventListener('click', () => {
          const marker = markersRef.current[index];
          const popup = marker.getPopup();

          if (popup) {
            if (popup.isOpen()) {
              popup.remove();
            } else {
              popup.addTo(mapRef.current);
            }
          }
          setSelectedFacility(index);
        });

        const directionsBtn = document.getElementById(`directionsBtn${index}`);
        if (directionsBtn) {
          directionsBtn.addEventListener('click', () => {
            getDirections(clientLocation, [facility.lon, facility.lat]);
          });
        }

        popup.on('close', () => {
          setSelectedFacility(null);
        });
      });

      return () => {
        map.remove();
      };
    }
  }, [clientLocation, selectedFacility]);

  // const getDirections = async (origin, destination) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.mapbox.com/directions/v5/mapbox/walking/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?alternatives=true&continue_straight=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
  //     );

  //     const data = await response.json();

  //     if (data.code === 'Ok' && mapRef.current) {
  //       const distanceInKm = data.routes[0].distance / 1000;

  //       const directionsLayerId = 'directions';
  //       if (mapRef.current.getLayer(directionsLayerId)) {
  //         mapRef.current.removeLayer(directionsLayerId);
  //         mapRef.current.removeSource(directionsLayerId);
  //       }

  //       mapRef.current.addSource(directionsLayerId, {
  //         type: 'geojson',
  //         data: {
  //           type: 'Feature',
  //           properties: {},
  //           geometry: data.routes[0].geometry,
  //         },
  //       });

  //       mapRef.current.addLayer({
  //         id: directionsLayerId,
  //         type: 'line',
  //         source: directionsLayerId,
  //         layout: {
  //           'line-join': 'round',
  //           'line-cap': 'round',
  //         },
  //         paint: {
  //           'line-color': '#3887be',
  //           'line-width': 5,
  //           'line-opacity': 0.75,
  //         },
  //       });

  //       const bounds = new mapboxgl.LngLatBounds();
  //       data.routes[0].geometry.coordinates.forEach((coord) =>
  //         bounds.extend(coord)
  //       );
  //       mapRef.current.fitBounds(bounds, { padding: 20 });

  //       const routePopup = new mapboxgl.Popup({
  //         closeButton: false,
  //         closeOnClick: false,
  //         offset: 25,
  //         className: 'h-8',
  //       })
  //         .setLngLat(data.routes[0].geometry.coordinates[0])
  //         .setHTML(
  //           `<p class="text-lg">Distance to Nearest Facility: ${distanceInKm.toFixed(
  //             2
  //           )} km</p>`
  //         )
  //         .addTo(mapRef.current);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching directions:', error);
  //   }
  // };

  useEffect(() => {
    if (
      selectedFacility !== null &&
      cardContainerRef.current &&
      mapRef.current
    ) {
      cardContainerRef.current.scrollTo({
        top: selectedFacility * 120,
        behavior: 'smooth',
      });
    }
  }, [selectedFacility]);

  useEffect(() => {
    if (selectedFacility !== null && mapRef.current && markersRef.current) {
      const selectedMarker = markersRef.current[selectedFacility];
      const selectedMarkerLngLat = selectedMarker.getLngLat();

      mapRef.current.flyTo({
        center: selectedMarkerLngLat,
        essential: true,
      });

      markersRef.current.forEach((marker, index) => {
        marker.getElement().addEventListener('click', () => {
          setSelectedFacility(index);
        });
      });

      selectedMarker.getElement().click();
    }
  }, [selectedFacility]);

  return (
    <div className="container-fluid p-0">
      {clientLocation ? (
        <>
          {/* Map container */}
          <div
            ref={mapContainerRef}
            className="w-100"
            style={{ height: '70vh'}} // Adjusted margin to avoid overlap with header
          />

          {/* Facility Data container below the map */}
          <div className="container-fluid p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <div
              ref={cardContainerRef}
              className="d-flex overflow-auto"
              style={{ whiteSpace: 'nowrap' }}
            >
              {facilityData.map((info, index) => (
                <div
                  key={index}
                  className={`p-3 me-3 border rounded ${
                    selectedFacility === index ? 'text-black' : 'bg-light'
                  }`}
                  style={{
                    minWidth: '300px',
                    maxWidth: '400px', // Set a max width for the cards
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden', // Hide overflow content
                  }}
                  onClick={() => setSelectedFacility(index)}
                >
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <h2 className="h5 text-truncate" style={{ maxWidth: '200px' }}>{info.name}</h2>
                      {info.verified ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </div>
                    <p className="text-truncate" style={{ maxWidth: '100%' }}>Capacity: {info.capacity}</p>
                    <p style={{ maxWidth: '100%',  whiteSpace: 'normal' }}>{info.address}</p>
                    <p className="text-truncate" style={{ maxWidth: '100%' }}>Contact: {info.contact}</p>
                    <p className="text-truncate" style={{ maxWidth: '100%' }}>Time: {info.time}</p>
                    <p className="text-truncate" style={{ maxWidth: '100%' }}>Distance: {info.distance.toFixed(2)} km away</p>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-success me-2 b" id={`directionsBtn${index}`}>
                      Get Directions
                    </button>
                    <Link to="/recycle" className="btn btn-success b">
                      Book Recycling
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center text-center py-5">
          <h1 className="text-danger">Location access denied. Please enable location services.</h1>
          <p className="text-secondary mt-3">Please allow the location permissions...</p>
          <button
            onClick={handleAllowLocationClick}
            className="btn btn-success mt-4"
          >
            Allow Location
          </button>
        </div>
      )}
    </div>
  );
};

export default FacilityMap;
