import React from "react";
import WagerCard from "./WagerCard";

function Home({wagers}) {

    console.log(wagers)

    const wagerCards = wagers.map((wager) => {
        return <WagerCard amount={wager.amount} />
    })

    return (
        <div>
             <h1 className="text-4xl font-bold underline text-amber-600">
      Hello world!
    </h1>
            <h2>This is home</h2>
            {wagerCards}
        </div>
    );
    }

    export default Home;