import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loading() {
    return(
        <div style={{height:"90vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;
