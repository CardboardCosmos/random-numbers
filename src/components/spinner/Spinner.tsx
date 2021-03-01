import React from 'react';
import './spinner.css';

interface Props {
    children?: any
    go: boolean
    // pos: [number, number]
}

// const startTime = Date.now();
// const getRotation = (speed: number) => (Date.now() - startTime) / 10 % 360 * speed;

const Spinner = (props: Props) => {
    // const style = {
    //     left: props.pos[0],
    //     top: props.pos[1]
    // }

    return (
        // <div className="spinner" style={{animationDuration: `${props.speed}s`}}>{props.children}</div>
        <div className={`spinner ${props.go ? 'go' : 'spin'}`}>{props.children}</div>
        // <div className="spinner" style={{transform: `rotate(${rotation}deg)`}}>{props.children}</div>
    );
}

export default Spinner;

