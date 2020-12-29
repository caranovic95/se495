import React from 'react';
import { Link } from 'react-router-dom';

import { rentalType } from 'helpers'



export function RentalCard(props) {
    const rental = props.rental;

    return (
        <div className={props.colNum}>
            <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
                <div className='card bwm-card'>
                    <img className='card-img-top' src={rental.image} alt={rental.make}></img>
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rentalType(rental.variant)}`}>{rental.shared ? 'shared' : 'whole'}</h6>
                        <h4 className='card-title'>{rental.make}</h4>
                        <h4 className='card-title'>{rental.model}</h4>
                        <p className='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}