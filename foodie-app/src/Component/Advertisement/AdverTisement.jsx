import React from "react";
import Style from "./Advertisement.module.scss";
import Typical from "react-typical";
function Advertisement() {
  return (
    <div className={Style.advertisement}>
      <Typical
        loop={Infinity}
        wrapper="h2"
        steps={[
          "Welcome to _Food4Foodie_😍",
          3000,
          " Hungry ✋???",
          2000,
          "UnExpected Guests 👪???",
          2000,
          "Cooking Gone Wrong 🍚???",
          2000,
          "Party Night 🎉???",
          2000,
          "Late Night at Office 🏤???",
          2000,
          "Watching Movie 🎥???",
          2000,
          "Need Diet Food 💪 ???",
          2000,
          "Want to Eat Chinese 🍲???",
          2000,
          " Craving something 🌭???",
          2000,
        ]}
      />
    </div>
  );
}

export default Advertisement;
