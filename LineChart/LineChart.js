// @flow
import React, { PureComponent } from 'react';

type Dataset = Array<Array<number>>;

type DefaultProps = {
    width: number,
    height: number,
    minX: number,
    minY: number,
    padding: number,
    svgClassName: string,
    divideBy: number,
    fontSize: number,
    dotRadius: number,
    dotClassName: string,
    lineClassName: string,
    teamImgSize: number
};

type Props = DefaultProps & {
    dataset: Dataset,
    team1Img: string,
    team2Img: string
};

class LineChart extends PureComponent<DefaultProps, Props, void> {

    static defaultProps = {
        width: 200,
        height: 100,
        minX: 0,
        minY: 0,
        padding: 30,
        svgClassName: '',
        divideBy: 4,
        fontSize: 4,
        dotRadius: 1,
        dotClassName: 'graphics-primary-fill',
        lineClassName: 'graphics-primary-stroke',
        teamImgSize: 26
    };

    renderStripes(quantity: number, width: number, height: number, minY: number, fontSize: number) {
        const stripes = [];
        const interval = height / quantity;
        let gap = minY;

        for (let i = 0; i <= quantity; i++) {
            const stripe = (
                <g
                    key={i}
                >
                    <line
                        x1="0"
                        y1={gap}
                        x2={width}
                        y2={gap}
                        strokeDasharray="1, 4"
                        className="line-color"
                        vectorEffect="non-scaling-stroke"
                    />
                    <text
                        x={width + fontSize}
                        y={gap}
                        dy={fontSize / 3}
                        fontSize={fontSize}
                        className=""
                        textAnchor="center"
                    >
                        {gap}
                    </text>
                </g>
            );
            stripes.push(stripe);
            gap = gap + interval;
        }

        return stripes;
    }

    renderDots(dataset: Dataset, dotRadius: number, dotClassName: string) {
        const dots = [];
        for (let i = 0; i < dataset.length; i++) {
            const dot = (
                <circle
                    key={i}
                    cx={dataset[i][0]}
                    cy={dataset[i][1]}
                    r={dotRadius}
                    className={dotClassName}
                />
            );
            dots.push(dot);
        }
        return dots;
    }

    getPoints(dataset: Dataset) {
        let pointsStr = '';

        for (let i = 0; i < dataset.length; i++) {
            pointsStr = pointsStr.concat(`${dataset[i][0]},${dataset[i][1]} `);
        }

        return pointsStr;
    }

    render() {
        const {
            width,
            height,
            minX,
            minY,
            padding,
            svgClassName,
            divideBy,
            fontSize,
            dotRadius,
            dotClassName,
            lineClassName,
            team1Img,
            team2Img,
            teamImgSize,
            dataset
        } = this.props;

        const paddedWidth = width + padding * 2;
        const paddedHeight = height + padding * 2;

        return (
            <svg
                width="100%"
                viewBox={`${minX - padding} ${minY - padding} ${paddedWidth} ${paddedHeight}`}
                className={svgClassName}
            >
                <g>
                    {this.renderStripes(divideBy, width, height, minY, fontSize)}
                </g>
                <polyline
                    fill="none"
                    strokeWidth={dotRadius / 2}
                    className={lineClassName}
                    points={this.getPoints(dataset)}
                />
                <g>
                    {this.renderDots(dataset, dotRadius, dotClassName)}
                </g>

                <image
                    xlinkHref={team1Img}
                    x={-padding}
                    y={-teamImgSize / 2}
                    width={teamImgSize}
                />
                <image
                    xlinkHref={team2Img}
                    x={-padding}
                    y={height - teamImgSize / 2}
                    width={teamImgSize}
                />
            </svg>
        );
    }
}

export default LineChart;
