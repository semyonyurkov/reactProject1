import { useState } from "react";
import "./Button.css";

function Button() {
    // let text = "Сохранить";
    const [text, setText] = useState("Сохранить");

    const clicked = () => {
        setText("Закрыть");
    };

    return (
        <button onClick={clicked} className="button accent">
            {text}
        </button>
    );
}

export default Button;
