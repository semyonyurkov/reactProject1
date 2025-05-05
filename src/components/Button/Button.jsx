import "./Button.css";

function Button({ text, onCLick }) {
    return (
        <button onClick={onCLick} className="button accent">
            {text}
        </button>
    );
}

export default Button;
