import React from 'react';
import './spinner.css';

interface Props {
    children?: any
    go: boolean
}

// constantly rotating element
const Spinner = (props: Props) => {
    return (
        <div className={`spinner ${props.go ? 'go' : 'spin'}`}>{props.children}</div>
    );
}

export default Spinner;

