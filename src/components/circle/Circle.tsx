import React from 'react';
import './circle.css';

interface Props {
    pos: [number, number]
    size: number
    text?: string
    spin?: boolean
}

const Circle = (props: Props) => {
    const style = {
        width: props.size,
        height: props.size,
        left: props.pos[0],
        top: props.pos[1]
    }

    return (
        <div className={`circle ${props.spin ? 'circle-spin' : ''}`} style={style}>
            <p> {props.text} </p>
        </div>
    );
}

export default Circle;