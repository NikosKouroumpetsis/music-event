import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewPort, setViewport] = useState({
    latitude: -73.935242,
    longitude: 40.712772,
    width: "100%",
    height: "200px",
    zoom: 12,
  });

  useEffect(() => {
    // Get latitude & longitude from address.
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewPort, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
  if (loading) return false;

  return (
    <ReactMapGL
      {...viewPort}
      mapboxAccessToken={process.env.mapbox_key}
      onViewportChange={(vp) => setViewport(vp)}
      style={{ width: 600, height: 200 }}
      mapStyle="mapbox://styles/nikoskourou/cl19fw7uk00fy15pbsr10ca2h"
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" width={30} height={30} />
      </Marker>
    </ReactMapGL>
  );
}
