import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/button/Button';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';
import { selectMax, setMaxNumber } from './maxNumberSlice';
import { selectMin, setMinNumber } from './minNumberSlice';
import './random-number.css';

// generates a random number in range [minNumber, maxNumber]
const RandomNumber = () => {
    const dispatch = useDispatch();

    // global state
    const minNumber = useSelector(selectMin);       // smallest possible generated number (inclusive)
    const maxNumber = useSelector(selectMax);       // largest possible generated number (inclusive)

    // local state
    const [go, setGo] = useState(false);                                    // is generating number?
    const [positions, setPositions] = useState<[number, number][]>([]);     // positions of circles in spinner
    const [circleSize, setCircleSize] = useState(100);                      // diameter of circles in spinner
    const [spinnerPos, setSpinnerPos] = useState(-1000);                    // spinner position
    const [spinnerScale, setSpinnerScale] = useState(1.0);                  // spinner scale
    const [randomNumber, setRandomNumber] = useState(0);                    // generated number

    const optionsDiv = useRef<HTMLDivElement>(null);


    // calculate spinner position and size
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

    // calculate spinning circle item positions
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
        dispatch(setMinNumber(n));

        if (n > maxNumber) dispatch(setMaxNumber(n));
    }

    const updateMax = (n: number) => {
        dispatch(setMaxNumber(n));

        if (n < minNumber) dispatch(setMinNumber(n));
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
            {/* Spinner */}
            <div className="spin-div" style={{top: spinnerPos, transform: `scale(${spinnerScale})`}}>
                <Spinner go={go}>
                    {positions.map((p, idx) => <Circle key={idx} pos={p} size={circleSize} text={go ? '' : (minNumber + idx).toString()} spin={!go}/>)}
                </Spinner>

                <Button className="rng-go-btn" onClick={() => genRandom()} size={80} visible={!go} > Go </Button>

                <div className={`random-number ${go ? 'random-number-show' : ''}`}>
                    <h1>{randomNumber}</h1>
                </div>
            </div>

            {/* Options */}
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

            {/* Back Button */}
            <Button className={`again-btn ${go ? 'show-again-btn' : ''}`} onClick={() => setGo(false)} size={100}>Back</Button>
        </div>
    );
}

export default RandomNumber;