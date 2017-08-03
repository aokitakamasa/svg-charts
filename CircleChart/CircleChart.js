// @flow
import React, { PureComponent } from 'react';

type DefaultProps = {
    x: number,
    y: number,
    size: number,
    percentage1ClassName: string,
    percentage2ClassName: string,
    circleClassName: string,
    fontSize: number,
    className: string,
    circleStrokeWidth: number,
    highlightCircleStrokeWidth: number,
    percentage1: number,
    percentage2: number
};

type Props = DefaultProps & {
    team1Name: string,
    team2Name: string,
    children: any
}

class CircleChart extends PureComponent<DefaultProps, Props, void> {

    static defaultProps = {
        x: 0,
        y: 0,
        size: 100,
        percentage1ClassName: 'percentage1ClassName',
        percentage2ClassName: 'percentage2ClassName',
        circleClassName: 'circleClassName',
        fontSize: 8,
        className: '',
        circleStrokeWidth: 1,
        highlightCircleStrokeWidth: 10,
        percentage1: 0,
        percentage2: 0
    };

    arc(x: number, y: number, r: number, s: number, percentage: number, inverted?: boolean) {
        const _percentage = (percentage * 98) / 100;
        const f = (360 * _percentage) / 100;
        let rotate = inverted ? f * -1 : 0;
        rotate = inverted ? rotate - 2 : rotate + 2;
        // Parameters: x-axis center, y-axis center, radius, start degrees, finish degrees, rotation in degrees (optional)
        function coords(degrees) {
            const radians = (degrees - (90 - (rotate || 0))) * Math.PI / 180.0;
            return {
                x: x + (r * Math.cos(radians)),
                y: y + (r * Math.sin(radians))
            };
        }

        const start = coords(s);
        const finish = coords(f);

        const d = [
            'M', start.x, start.y,
            'A', r, r, 0, Number(f - s > 180), 1, finish.x, finish.y
        ].join(' ');

        return d;
    }

    render() {
        const {
            x,
            y,
            size,
            percentage1,
            percentage2,
            team1Name,
            team2Name,
            fontSize,
            className,
            circleClassName,
            circleStrokeWidth,
            percentage1ClassName,
            percentage2ClassName,
            highlightCircleStrokeWidth
        } = this.props;

        const centerFactor = (size * 50) / 100;

        let emptyCirle;
        if (percentage1 && percentage2) {
            if (percentage1 + percentage2 !== 100) {
                emptyCirle = (
                    <path
                        d={this.arc(50, 50, 45, 0, 100)}
                        className={circleClassName}
                        strokeWidth={circleStrokeWidth}
                        fill="transparent"
                    />
                );
            }
        }
        else {
            emptyCirle = (
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    className={circleClassName}
                    strokeWidth={circleStrokeWidth}
                    fill="transparent"
                />
            );
        }

        return (
            <svg
                x={x - centerFactor}
                y={y - centerFactor}
                width={`${size}%`}
                viewBox="0 0 100 100"
                className={className}
            >
                {emptyCirle}

                <path
                    d={this.arc(50, 50, 45, 0, percentage1, true)}
                    fill="transparent"
                    className={percentage1ClassName}
                    strokeWidth={highlightCircleStrokeWidth}
                />

                <path
                    d={this.arc(50, 50, 45, 0, percentage2)}
                    fill="transparent"
                    className={percentage2ClassName}
                    strokeWidth={highlightCircleStrokeWidth}
                />

                <text
                    x={25 + highlightCircleStrokeWidth / 2}
                    y={50 - fontSize / 2}
                    dy={fontSize}
                    fontSize={fontSize}
                    className="graphics-primary-fill graphics-primary-color text-uppercase"
                    textAnchor="middle"
                >
                    {team1Name}
                </text>
                <text
                    x={75 - highlightCircleStrokeWidth / 2}
                    y={50 - fontSize / 2}
                    dy={fontSize}
                    fontSize={fontSize}
                    className="graphics-primary-fill graphics-primary-color text-uppercase"
                    textAnchor="middle"
                >
                    {team2Name}
                </text>
                <line
                    className="line-color"
                    x1={50}
                    y1={30}
                    x2={50}
                    y2={70}
                    strokeWidth={1}
                />
            </svg>
        );
    }
}

export default CircleChart;
