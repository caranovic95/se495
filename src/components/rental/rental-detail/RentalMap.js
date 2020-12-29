import React from 'react'
import { MapWithGeocode } from 'components/map/GoogleMap'

export class RentalMap extends React.Component {

    render() {
        const location = this.props.location;

        return (
            <MapWithGeocode
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDHSMToBLmhM6b_ESIvp-wulAk6Z-EiqQc"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                location={location}
            />
        )
    }
}