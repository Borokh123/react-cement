import React, { useContext } from 'react'
import { AppContext } from '../App';

const Info = ({image,title, description}) => {
    const {} = useContext(AppContext);
    return (
        <div className="cartImg">

            <img src={image} alt="cart-img" className="" />
            <p>{description}</p>
            <h3>{title}</h3>

        </div>
    )
}

export default Info