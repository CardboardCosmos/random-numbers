import React, { useEffect, useState } from 'react';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';

const RandomNumber = () => {
    const [speed, setSpeed] = useState(3);
    const [go, setGo] = useState(false);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(3);
    const [positions, setPositions] = useState<[number, number][]>([]);
    const [circleSize, setCircleSize] = useState(100);

    // calculate spinning circle radius and item positions
    useEffect(() => {
        let radius = 100;
        const pos: [number, number][] = [];
        const nItems = maxNumber - minNumber + 1;
        const angle = 2 * Math.PI / nItems;  // angle between each item

        for (let i = 0; i < nItems; i++) {
            pos.push([Math.cos(angle * i) * radius, Math.sin(angle * i) * radius]);
        }

        setPositions(pos);
        setCircleSize( Math.min(angle * radius * 0.6, 50) );

    }, [minNumber, maxNumber]);

    return (
        <div>
            <Spinner speed={speed} go={go}>
                {/* <Circle pos={[100, 0]} size={50} text={go ? '' : '1'} spin={!go}/>
                <Circle pos={[-100, 0]} size={50} text={go ? '' : '2'} spin={!go} /> */}

                {positions.map((p, idx) => <Circle key={idx} pos={p} size={circleSize} text={go ? '' : (minNumber + idx).toString()} spin={!go}/>)}
            </Spinner>

            <button onClick={() => setGo(!go)}> {go ? 'Again' : 'Go'} </button>

            {/* <div style={{background: 'green', width: 150, height: 150, transform:'translate(-50%, -50%)', borderRadius: '50%', top: '50%', left: '50%', position: 'absolute'}}></div> */}
        </div>
    );
}

export default RandomNumber;