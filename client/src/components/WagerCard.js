import React from "react";

function WagerCard({amount}) {

    console.log(amount)
    return (
        <div>
            <h3>Wager Card</h3>
            <h4>{amount}</h4>
        </div>
    );
}

export default WagerCard;