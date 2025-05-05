import "./JournalForm.css";
import Button from "../Button/Button";

function JournalForm({ onSubmit }) {
    const addJournalItem = (e) => {
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        e.preventDefault();
        onSubmit(formProps);
    };

    return (
        <form onSubmit={addJournalItem} className="journal-form">
            <input type="text" name="title" />
            <input type="date" name="date" />
            <input type="text" name="tag" />
            <textarea name="text" id="" cols="30" rows="10" />
            <Button text="Сохранить" onCLick={() => console.log("123")} />
        </form>
    );
}

export default JournalForm;
