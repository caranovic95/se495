import React from 'react'
import { Cacher } from 'services/cacher'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle,
    Marker,
    InfoWindow
} from "react-google-maps";


function MapComponent(props) {


    const { coordinates, isError, isLocationLoaded } = props.coordinates;

    return (
        <GoogleMap
            defaultZoom={13}
            defaultCenter={coordinates}
            center={coordinates}
            options={{ disableDefaultUI: isError ? true : false }}
        >
            {isLocationLoaded && !isError && <Circle center={coordinates} radius={500} />}
            <Marker>
                {isLocationLoaded && isError && <InfoWindow position={coordinates}>
                    <div>
                        There is a problem to find location on the map.
                        Contact host for additional information if you are
                        still interested in rent this car. We are sorry for incoviniance.
                </div>
                </InfoWindow>}
            </Marker>
        </GoogleMap>
    )
}

function withGeocode(WrappedComponent) {
    return class extends React.Component {

        constructor() {
            super();

            this.cacher = new Cacher();

            this.state = {
                coordinates: {
                    lat: 0,
                    lng: 0
                },
                isError: false,
                isLocationLoaded: false
            }
        }

        componentDidMount() {
            this.getGeocodeLocation();
        }


        updateCoordinates(coordinates) {
            this.setState({
                coordinates,
                isLocationLoaded: true
            })
        }

        geocodeLocation(location) {
            const geocoder = new window.google.maps.Geocoder();
            return new Promise((resolve, reject) => {
                geocoder.geocode({ address: location }, (result, status) => {
                    if (status === 'OK') {
                        const geometry = result[0].geometry.location;
                        const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

                        this.cacher.cacheValue(location, coordinates);

                        resolve(coordinates);
                    } else {
                        reject("error")
                    }
                });
            })
        }

        getGeocodeLocation() {
            const location = this.props.location;


            if (this.cacher.isValueCached(location)) {
                this.updateCoordinates(this.cacher.getValue(location))
            } else {
                this.geocodeLocation(location).then(
                    (coordinates) => {
                        this.updateCoordinates(coordinates)
                    },
                    (error) => {
                        this.setState({ isError: true, isLocationLoaded: true })
                    }
                )
            }


        }






        render() {
            return (
                <WrappedComponent {...this.state} />
            )
        }
    }
}




export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));