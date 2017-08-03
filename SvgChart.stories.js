import React from 'react';

import { storiesOf } from '@kadira/storybook';
// import { withKnobs } from '@kadira/storybook-addon-knobs';
import CircleChart from './CircleChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import dataGenerator from './dataGenerator';
const TEAM1IMG = require('../../.storybook/assets/team1.png');
const TEAM2IMG = require('../../.storybook/assets/team2.png');

const stories = storiesOf('SvgChart', module);

// stories.addDecorator(withKnobs);

stories.addWithInfo('CircleChart', () => {
    return (
        <CircleChart
            percentage1={60}
            percentage2={25}
            team1Name="Home"
            team2Name="Away"
        />
    );
}, { inline: true });

stories.addWithInfo('BarChart', () => {
    return (
        <BarChart
            team1Score={371}
            team2Score={223}
            team1Name="Home"
            team2Name="Away"
        />
    );
}, { inline: true });

stories.addWithInfo('LineChart', () => {
    const dataset = dataGenerator(30, 200, 100);
    return (
        <LineChart
            dataset={dataset}
            team1Img={TEAM1IMG}
            team2Img={TEAM2IMG}
        />
    );
}, { inline: true });
