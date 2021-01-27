import "./App.css";

import Game from "./component/game/Game";
import dogBasketball from "../src/images/dogBasketball.jpg";
import raccoonBasketball from "../src/images/raccoonBasketball.jpg";
import humanBasketball from "../src/images/humanBasketball.png";
import bunnyBasketball from "../src/images/bunnyBasketball.jpg";
import Bounces from "../src/sounds/Bounces.mp3";
import FOOTBALLKICK from "../src/sounds/FOOTBALLKICK.mp3";

function App(props) {
  const dog = {
    name: "Dog Basketball Club",
    logoSrc: dogBasketball,
  };
  const raccoon = {
    name: "Raccoon Basketball",
    logoSrc: raccoonBasketball,
  };
  const human = {
    name: "People Basketball",
    logoSrc: humanBasketball,
  };
  const bunny = {
    name: "Bunny National Association",
    logoSrc: bunnyBasketball,
  };
  return (
    <div className="App">
      <Game
        venue="Animal Arena"
        homeTeam={dog}
        visitingTeam={raccoon}
        bounces={Bounces}
        score={FOOTBALLKICK}
      />
      <Game
        venue="Human&Bunny Arena"
        homeTeam={human}
        visitingTeam={bunny}
        bounces={Bounces}
        score={FOOTBALLKICK}
      />
    </div>
  );
}

export default App;
