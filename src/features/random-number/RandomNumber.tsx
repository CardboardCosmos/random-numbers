import React, { useEffect, useState } from 'react';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';
import './random-number.css';

const RandomNumber = () => {
    const [speed, setSpeed] = useState(3);
    const [go, setGo] = useState(false);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(10);
    const [positions, setPositions] = useState<[number, number][]>([]);
    const [circleSize, setCircleSize] = useState(100);

    // calculate spinning circle radius and item positions
    useEffect(() => {
        const radius = 100;
        const pos: [number, number][] = [];
        const nItems = maxNumber - minNumber + 1;
        const angle = 2 * Math.PI / nItems;  // angle between each item
        const offset = -1 * Math.PI / 2;     // offset angle

        for (let i = 0; i < nItems; i++) {
            pos.push([Math.cos(angle * i + offset) * radius, Math.sin(angle * i + offset) * radius]);
        }

        setPositions(pos);
        setCircleSize( Math.min(angle * radius * 0.6, 50) );

    }, [minNumber, maxNumber]);

    return (
        <div>
            <Spinner speed={speed} go={go}>
                {positions.map((p, idx) => <Circle key={idx} pos={p} size={circleSize} text={go ? '' : (minNumber + idx).toString()} spin={!go}/>)}
            </Spinner>

            <button className="rng-go-btn" onClick={() => setGo(!go)}> {go ? 'Again' : 'Go'} </button>

            {/* <div style={{background: 'green', width: 150, height: 150, transform:'translate(-50%, -50%)', borderRadius: '50%', top: '50%', left: '50%', position: 'absolute'}}></div> */}

            <div className="rng-options">
                <div className="rng-option">
                    <h2 className="option-title">Min</h2>
                    <button onClick={() => setMinNumber(minNumber + 1)}>+</button>
                    <h3>{minNumber}</h3>
                    <button onClick={() => setMinNumber(minNumber - 1)}>-</button>
                </div>
                
                <div className="rng-option">
                    <h2 className="option-title">Max</h2>
                    <button onClick={() => setMaxNumber(maxNumber + 1)}>+</button>
                    <h3>{maxNumber}</h3>
                    <button onClick={() => setMaxNumber(maxNumber - 1)}>-</button>
                </div>
                
            </div>
        </div>
    );
}

export default RandomNumber;