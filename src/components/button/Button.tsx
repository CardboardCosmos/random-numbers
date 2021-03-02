import React from 'react';
import './button.css';

const Button = (props: any) => {
    // calculate size
    let style = {};
    if (props.size) {
        style = {
            width: props.size,
            height: props.size
        }
    }

    // determine if button is visible
    let visible = true;
    if (props.visible !== undefined) visible = props.visible;

    const className = 'button ' + props.className + ` ${visible ? '' : 'btn-hide'}`;

    return (
        <div className={className} onClick={props.onClick} style={style}>
            {props.children}
        </div>
    );
}

export default Button;