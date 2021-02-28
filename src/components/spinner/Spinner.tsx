import React, { useEffect, useState } from 'react';
import './spinner.css';

interface Props {
    children?: any
    speed: number
    go: boolean
}

const startTime = Date.now();
const getRotation = (speed: number) => (Date.now() - startTime) / 10 % 360 * speed;
let intervalId: NodeJS.Timeout;

const Spinner = (props: Props) => {
    const [rotation, setRotation] = useState(0);
    // const [speed, setSpeed] = useState(1);
    
    
    // useEffect(() => {
    //     setRotation(getRotation());
        
    //     console.log(rotation);
    // });

    // useEffect(() => {
    //     intervalId = setInterval(() => {setRotation(getRotation(props.speed))}, 10);

    //     return () => clearInterval(intervalId);
    // }, [props.speed])

    

    return (
        // <div className="spinner" style={{animationDuration: `${props.speed}s`}}>{props.children}</div>
        <div className={`spinner ${props.go ? 'go' : 'spin'}`} >{props.children}</div>
        // <div className="spinner" style={{transform: `rotate(${rotation}deg)`}}>{props.children}</div>
    );
}

export default Spinner;

