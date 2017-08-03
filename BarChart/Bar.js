// @flow
import React, { PureComponent } from 'react';

type Props = {
    width: number,
    barMaxWidth: number,
    title: string,
    reversed?: boolean,
    fontSize: number,
    classNameText: string,
    classNameLine: string,
    barStrokeWidth: number,
    paddingVertical: number
};

class Bar extends PureComponent<void, Props, void> {
    render() {
        const {
            width,
            barMaxWidth,
            title,
            reversed,
            fontSize,
            classNameText,
            classNameLine,
            barStrokeWidth
        } = this.props;
        let {
            paddingVertical
        } = this.props;

        if (!reversed) {
            paddingVertical = paddingVertical * -1;
        }

        return (
            <g>
                <text
                    x="0"
                    y={paddingVertical * 2}
                    dy={reversed ? fontSize : 0}
                    fontSize={fontSize}
                    className={classNameText}
                >
                    {title}
                </text>
                {
                    barMaxWidth - width ? (
                        <line
                            x1={barStrokeWidth / 2}
                            y1={paddingVertical}
                            x2={barMaxWidth}
                            y2={paddingVertical}
                            className={'line-color'}
                            strokeWidth={barStrokeWidth}
                            strokeLinecap="round"
                        />) : null
                }
                {
                    width ? (
                        <line
                            x1={barStrokeWidth / 2}
                            y1={paddingVertical}
                            x2={width}
                            y2={paddingVertical}
                            className={classNameLine}
                            strokeWidth={barStrokeWidth}
                            strokeLinecap="round"
                        />
                    ) : null
                }
            </g>
        );
    }
}

export default Bar;
