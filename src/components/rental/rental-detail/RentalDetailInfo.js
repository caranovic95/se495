import React from 'react';
import { RentalAssets } from './RentalAssets'
import { toUpperCase, rentalType } from 'helpers';

export function RentalDetailInfo(props) {
    const rental = props.rental;
    return (
        <div className='rental'>
            <h2 className={`rental-type ${rental.variant}`}>{rentalType(rental.shared)} {rental.variant}</h2>
            <h1 className='rental-title'>{rental.make}</h1>
            <h1 className='rental-title'>{rental.model}</h1>
            <h2 className='rental-city'>{toUpperCase(rental.city)}</h2>
            <div className='rental-room-info'>
                <span><i className='fa fa-building'></i>{rental.model} model</span>


                <span><i className='fa fa-user'></i> {rental.numberOfSeat + 5} number of seats</span>
                <span><i className='fa fa-bed'></i> {rental.numberOfDoor + 5} number of doors</span>
            </div>
            <p className='rental-description'>
                {rental.description}
            </p>
            <hr></hr>
            <RentalAssets />
        </div>
    )
}