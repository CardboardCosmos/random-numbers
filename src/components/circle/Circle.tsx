import React from 'react';
import './circle.css';

interface Props {
    pos: [number, number]
    size: number
}

const Circle = (props: Props) => {
    const style = {
        width: props.size,
        height: props.size,
        left: props.pos[0],
        top: props.pos[1]
    }

    return (
        <div className='circle' style={style}>
            
        </div>
    );
}

export default Circle;