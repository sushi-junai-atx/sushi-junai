import React from "react";

function Button(props) {
    return (
        <button type={`${props.type}`} className={`${props.btn}`} onClick={props.function} disabled={props.onetime}>{props.children}</button>
    );
}

export default Button;