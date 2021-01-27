import React, { Component } from "react";
import Team from "../team/Team";
import ScoreBoard from "../scoreboard/ScoreBoard";

class Game extends Component {
  constructor(props) {
    super(props);
    let winner;

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    };

    this.shotSound = new Audio(props.score);
    this.scoreSound = new Audio(props.bounces);
  }

  shoot = (team) => {
    this.winner = "";
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score,
      },
    }));
  };

  resetGame = () => {
    if (
      this.state.visitingTeamStats.shots !== this.state.homeTeamStats.shots ||
      this.state.visitingTeamStats.shots === 0 ||
      this.state.homeTeamStats.shots === 0
    ) {
      alert("Cannot reset the Game! Make sure both team takes equal shots!");
    } else {
      if (this.state.visitingTeamStats.score > this.state.homeTeamStats.score) {
        this.winner = (
          <strong>
            <hr />
            <mark>
              {this.props.visitingTeam.name} won the game with {this.state.visitingTeamStats.score}{" "}
              to {this.state.homeTeamStats.score}!
            </mark>
          </strong>
        );
      } else if (this.state.visitingTeamStats.score < this.state.homeTeamStats.score) {
        this.winner = (
          <strong>
            <hr />
            <mark>
              {this.props.homeTeam.name} won the game with {this.state.homeTeamStats.score} to{" "}
              {this.state.visitingTeamStats.score}!
            </mark>
          </strong>
        );
      } else {
        this.winner = (
          <strong>
            <hr />
            Draw!
          </strong>
        );
      }

      this.setState((state, props) => ({
        resetCount: state.resetCount + 1,
        homeTeamStats: {
          shots: 0,
          score: 0,
        },
        visitingTeamStats: {
          shots: 0,
          score: 0,
        },
      }));
    }
  };

  render() {
    return (
      <div className="Game">
        <ScoreBoard
          visitingTeamStats={this.state.visitingTeamStats}
          homeTeamStats={this.state.homeTeamStats}
        />

        <h1>Welcome to {this.props.venue}</h1>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.shoot("visiting")}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <strong>Resets:</strong> {this.state.resetCount}
              <button onClick={this.resetGame}>Reset Game</button>
              <div>{this.winner}</div>
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.shoot("home")}
          />
        </div>
      </div>
    );
  }
}

export default Game;
