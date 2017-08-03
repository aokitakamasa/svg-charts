// @flow
type Props = {
    text: string | number,
    width: number,
    fontSize: number,
    paddingVertical: number,
    reversed?: boolean
}

import React, { Component } from 'react';

class Score extends Component<void, Props, void> {
    render() {
        const {
            text,
            width,
            fontSize,
            paddingVertical,
            reversed
        } = this.props;

        const fontOffset = fontSize / 2;

        return (
            <text
                x={100 - width / 2}
                y={reversed ? paddingVertical + fontOffset : -paddingVertical + fontOffset}
                fontSize={fontSize}
                textAnchor="middle"
                className="score"
            >
                {text}
            </text>
        );
    }
}

export default Score;
