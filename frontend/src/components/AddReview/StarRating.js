import { useState, useEffect } from 'react';

const StarRating = ({ rating, disabled, onChange }) => {

    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
        setActiveRating(rating)
    }, [rating])

    return (

        <>
            <div className="rating-input">
                <div
                    className={activeRating >= 1 ? `filled` : 'empty'}
                    onMouseEnter={() => { !disabled && setActiveRating(1) }}
                    onMouseLeave={() => { !disabled && setActiveRating(rating) }}
                    onClick={() => { !disabled && onChange(1) }}
                >
                    <i className="fa-solid fa-star" />
                </div>
                <div
                    className={activeRating >= 2 ? `filled` : 'empty'}
                    onMouseEnter={() => { !disabled && setActiveRating(2) }}
                    onMouseLeave={() => { !disabled && setActiveRating(rating) }}
                    onClick={() => { !disabled && onChange(2) }}
                >
                    <i className="fa-solid fa-star" />
                </div>
                <div
                    className={activeRating >= 3 ? `filled` : 'empty'}
                    onMouseEnter={() => { !disabled && setActiveRating(3) }}
                    onMouseLeave={() => { !disabled && setActiveRating(rating) }}
                    onClick={() => { !disabled && onChange(3) }}
                >
                    <i className="fa-solid fa-star" />
                </div>
                <div
                    className={activeRating >= 4 ? `filled` : 'empty'}
                    onMouseEnter={() => { !disabled && setActiveRating(4) }}
                    onMouseLeave={() => { !disabled && setActiveRating(rating) }}
                    onClick={() => { !disabled && onChange(4) }}
                >
                    <i className="fa-solid fa-star" />
                </div>
                <div
                    className={activeRating >= 5 ? `filled` : 'empty'}
                    onMouseEnter={() => { !disabled && setActiveRating(5) }}
                    onMouseLeave={() => { !disabled && setActiveRating(rating) }}
                    onClick={() => { !disabled && onChange(5) }}
                >
                    <i className="fa-solid fa-star" />
                </div>
            </div>
        </>
    );

};

export default StarRating;
