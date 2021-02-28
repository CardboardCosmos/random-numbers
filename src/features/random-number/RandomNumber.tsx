import React from 'react';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';

const RandomNumber = () => {
    return (
        <div>
            <Spinner>
                <Circle pos={[100, 0]} size={50}/>
                <Circle pos={[-100, 0]} size={50}/>
            </Spinner>
        </div>
    );
}

export default RandomNumber;