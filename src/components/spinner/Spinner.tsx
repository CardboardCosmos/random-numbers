import React from 'react';
import './spinner.css';

interface Props {
    children?: any
}

const Spinner = (props: Props) => {
    return (
        <div className="spinner">{props.children}</div>
    );
}

export default Spinner;

