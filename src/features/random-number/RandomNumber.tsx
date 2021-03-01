import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/button/Button';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';
import './random-number.css';

const RandomNumber = () => {
    const [go, setGo] = useState(false);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(10);
    const [positions, setPositions] = useState<[number, number][]>([]);
    const [circleSize, setCircleSize] = useState(100);
    const [spinnerPos, setSpinnerPos] = useState(-1000);
    const [spinnerScale, setSpinnerScale] = useState(1.0);
    const [randomNumber, setRandomNumber] = useState(0);

    const optionsDiv = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        // calculate spinner position (middle of area above options div)
        const handleResize = () => {
            if (optionsDiv.current) {
                // set spinner position
                setSpinnerPos((window.innerHeight - optionsDiv.current.offsetHeight) / 2);

                // set spinner radius
                let radiusDimension; // width or height, whichever is smaller 
                if (window.innerHeight - optionsDiv.current.offsetHeight < window.innerWidth)
                    radiusDimension = window.innerHeight - optionsDiv.current.offsetHeight;
                else 
                    radiusDimension = window.innerWidth;

                radiusDimension *= 0.3 / 100;
                setSpinnerScale(radiusDimension);

            } else {
                setSpinnerPos(window.innerHeight / 2);
            }
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    const updateMin = (n: number) => {
        setMinNumber(n);

        if (n > maxNumber) setMaxNumber(n);
    }

    const updateMax = (n: number) => {
        setMaxNumber(n);

        if (n < minNumber) setMinNumber(n);
    }

    // generate random number
    const genRandom = () => {
        const nItems = maxNumber - minNumber + 1;
        const newNumber = Math.floor(Math.random() * (nItems)) + minNumber;

        setRandomNumber(newNumber);
        setGo(true);
    }

    return (
        <div>
            <div style={{position: 'absolute', left: '50%', top: spinnerPos, transform: `scale(${spinnerScale})`}}>
                <Spinner go={go}>
                    {positions.map((p, idx) => <Circle key={idx} pos={p} size={circleSize} text={go ? '' : (minNumber + idx).toString()} spin={!go}/>)}
                </Spinner>

                <Button className="rng-go-btn" onClick={() => genRandom()} size={80} visible={!go} > Go </Button>

                <div className={`random-number ${go ? 'random-number-show' : ''}`}>
                    <h1>{randomNumber}</h1>
                </div>
            </div>

            <div className={`rng-options ${go ? 'rng-options-hide' : ''}`} ref={optionsDiv}>
                <div className="rng-option">
                    <h2 className="option-title">Min</h2>
                    <Button onClick={() => updateMin(minNumber + 1)} size={30}>+</Button>
                    <h3>{minNumber}</h3>
                    <Button onClick={() => updateMin(minNumber - 1)} size={30}>-</Button>
                </div>
                
                <div className="rng-option">
                    <h2 className="option-title">Max</h2>
                    <Button onClick={() => updateMax(maxNumber + 1)} size={30}>+</Button>
                    <h3>{maxNumber}</h3>
                    <Button onClick={() => updateMax(maxNumber - 1)} size={30}>-</Button>
                </div>
                
            </div>

            <Button className={`again-btn ${go ? 'show-again-btn' : ''}`} onClick={() => setGo(false)} size={100}>Again</Button>
        </div>
    );
}

export default RandomNumber;