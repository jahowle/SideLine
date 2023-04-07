import React from "react";
import WagerCard from "./WagerCard";

function Home({wagers}) {

    const wagerCards = wagers.map((wager) => {
        return <WagerCard amount={wager.amount} />
    })

    return (
        <div>
            <h2>This is home</h2>
            {wagerCards}
        </div>
    );
    }

    export default Home;