import React from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

function MapComponent(props) {
    return (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -32.397, lng: 151.644 }} >
            <Marker
                position={{ lat: -34.397, lng: 150.644 }}
            />
        </GoogleMap>
    )
}


export const MapWithAMarker = withScriptjs(withGoogleMap(MapComponent));
