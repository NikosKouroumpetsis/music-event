import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function EventMap({ evt, googlekey, mapbox_token }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewState, setViewState] = useState({
    latitude: -73.935242,
    longitude: 40.712772,
    width: "100%",
    height: "500px",
    zoom: 12,
  });

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLat(lat);
        setLng(lng);
        setViewState({ ...viewState, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(googlekey);
  if (loading) return false;

  console.log(lat, lng);

  return (
    <ReactMapGl
      {...viewState}
      mapboxApiAccessToken="pk.eyJ1Ijoibmlrb3Nrb3Vyb3UiLCJhIjoiY2wxOWJhMjBmMTd6MTNpczF3ejV5YmdpdCJ9.vvVbE0-YbC_LbaO1fq2COg"
      onViewportChange={(vp) => setViewState(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        aaa
      </Marker>
    </ReactMapGl>
  );
}
