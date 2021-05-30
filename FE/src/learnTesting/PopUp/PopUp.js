import React, { useState } from "react";
import "./style.css";

const PopUp = () => {
    // useModal
    const [isShowing, setIsShowing] = useState(false);
    const toggle = () => {
        setIsShowing(!isShowing);
    };

    return <div className=''></div>;
};

export default PopUp;
