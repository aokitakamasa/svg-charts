export default function(numDataPoints, maxRangeX, maxRangeY) {
    const dataset = [];
    let x = 0;
    let y = 0;
    for (let i = 0; i < numDataPoints; i++) {
        const stepX = maxRangeX / numDataPoints;
        const min = 0;
        const max = maxRangeY;
        y = Math.floor(Math.random() * (max - min + 1)) + min;
        dataset.push([x, y]);
        x = x + stepX;
    }
    return dataset;
}
