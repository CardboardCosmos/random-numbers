import React, { useState } from 'react';
import Circle from '../../components/circle/Circle';
import Spinner from '../../components/spinner/Spinner';

const RandomNumber = () => {
    const [speed, setSpeed] = useState(3);
    const [go, setGo] = useState(false);

    return (
        <div>
            <Spinner speed={speed} go={go}>
                <Circle pos={[100, 0]} size={50} text={go ? '' : '1'} spin={!go}/>
                <Circle pos={[-100, 0]} size={50} text={go ? '' : '2'} spin={!go} />
            </Spinner>

            <button onClick={() => setGo(!go)}> {go ? 'Again' : 'Go'} </button>

            {/* <div style={{background: 'green', width: 150, height: 150, transform:'translate(-50%, -50%)', borderRadius: '50%', top: '50%', left: '50%', position: 'absolute'}}></div> */}
        </div>
    );
}

export default RandomNumber;