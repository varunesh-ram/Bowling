import React from 'react';
import ScoreCard from './ScoreCard';
import Pins from './Pins';

export default class BowlingGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rolls: []
        }
    }

    updateRolls = (pinsDown) => {
        let tempRolls = this.state.rolls;
        tempRolls.push(pinsDown);
        this.setState({ rolls: tempRolls });
        this.updateScore(tempRolls);
    };

    updateScore = (tempRolls) => {
        let score = 0, i = 0, isGameOver = true;
        for (let frame = 0; frame < 10; frame++) {
            if (i + 1 >= tempRolls.length) {
                isGameOver = false;
                break;
            }
            if (tempRolls[i] === 10) {
                if (i + 2 >= tempRolls.length) {
                    isGameOver = false;
                    break;
                }
                score += 10 + tempRolls[i + 1] + tempRolls[i + 2];
                i++;
            }
            else if (tempRolls[i] + tempRolls[i + 1] === 10) {
                if (i + 2 >= tempRolls.length) {
                    isGameOver = false;
                    break;
                }
                score += 10 + tempRolls[i + 2];
                i += 2;
            }
            else {
                score += tempRolls[i] + tempRolls[i + 1];
                i += 2;
            }
        }
        if (isGameOver) {
            this.setState({ score });
        }
    };

    render() {
        return (
            <div className="Game">
                <Pins pinsDown={this.updateRolls} />
                <ScoreCard rolls={this.state.rolls} score={this.state.score} />
            </div>);
    };
}