import React from 'react';
import './button.css';

const Button = (props: any) => {
    return (
        <div className="button" onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Button;