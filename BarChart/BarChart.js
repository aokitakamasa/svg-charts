// @flow
import React, { PureComponent } from 'react';
import Bar from './Bar';
import Score from './Score';

type DefaultProps = {
    team1Score: number,
    team2Score: number,
    team1Name: string,
    team2Name: string,
    barStrokeWidth: number,
    scoreMaxWidth: number,
    fontSize: number,
    paddingVertical: number,
    paddingHorizontal: number
};

type Props = DefaultProps;

class BarChart extends PureComponent<DefaultProps, Props, void> {

    static defaultProps = {
        team1Score: 0,
        team2Score: 0,
        team1Name: '',
        team2Name: '',
        barStrokeWidth: 3,
        scoreMaxWidth: 20,
        fontSize: 5,
        paddingVertical: 6,
        paddingHorizontal: 10
    };

    render() {
        const {
            team1Score,
            team2Score,
            team1Name,
            team2Name,
            barStrokeWidth,
            scoreMaxWidth,
            fontSize,
            paddingVertical,
            paddingHorizontal
        } = this.props;

        const strokeWidth = 1 / 2;
        const barMaxWidth = 100 - scoreMaxWidth - paddingHorizontal;
        let percentage1 = 0;
        let percentage2 = 0;

        if (team1Score > team2Score) {
            percentage1 = 100;
            percentage2 = team2Score * 100 / team1Score;
        }
        else if (team2Score > team1Score) {
            percentage1 = team1Score * 100 / team2Score;
            percentage2 = 100;
        }
        else {
            percentage1 = 100;
            percentage2 = 100;
        }

        return (
            <div className="barchart">
                <svg
                    width="100%"
                    viewBox={`-${paddingHorizontal} -25 ${100 + paddingHorizontal * 2} 50`}
                    className="svg-container"
                    strokeWidth={strokeWidth}
                >
                    <Bar
                        width={barMaxWidth / 100 * percentage1}
                        barMaxWidth={barMaxWidth}
                        title={team1Name}
                        barStrokeWidth={barStrokeWidth}
                        paddingVertical={paddingVertical}
                        paddingHorizonal={paddingHorizontal}
                        fontSize={fontSize}
                        classNameText={''}
                        classNameLine={'percentage1ClassName'}
                    />
                    <Score
                        text={team1Score}
                        width={scoreMaxWidth}
                        paddingVertical={paddingVertical}
                        fontSize={fontSize}
                    />
                    <line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        className="line-color"
                    />
                    <Bar
                        width={barMaxWidth / 100 * percentage2}
                        barMaxWidth={barMaxWidth}
                        title={team2Name}
                        barStrokeWidth={barStrokeWidth}
                        paddingVertical={paddingVertical}
                        paddingHorizonal={paddingHorizontal}
                        fontSize={fontSize}
                        classNameText={''}
                        classNameLine={'percentage2ClassName'}
                        reversed
                    />
                    <Score
                        text={team2Score}
                        width={scoreMaxWidth}
                        paddingVertical={paddingVertical}
                        fontSize={fontSize}
                        reversed
                    />
                </svg>
            </div>
        );
    }
}

export default BarChart;
