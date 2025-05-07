import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useState } from "react";
import classnames from "classnames";

function JournalForm({ onSubmit }) {
    const [formValidState, setFormValidState] = useState({
        title: true,
        text: true,
        date: true,
    });

    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        let isFormValid = true;
        if (!formProps.title?.trim().length) {
            setFormValidState((state) => ({ ...state, title: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, title: true }));
        }
        if (!formProps.text?.trim().length) {
            setFormValidState((state) => ({ ...state, text: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, text: true }));
        }
        if (!formProps.date) {
            setFormValidState((state) => ({ ...state, date: false }));
            isFormValid = false;
        } else {
            setFormValidState((state) => ({ ...state, date: true }));
        }
        if (!isFormValid) {
            return;
        }
        onSubmit(formProps);
    };

    return (
        <form onSubmit={addJournalItem} className={`${styles["journal-form"]}`}>
            <div>
                <input
                    type="text"
                    name="title"
                    className={classnames(styles["input-title"], {
                        [styles["invalid"]]: !formValidState.title,
                    })}
                />
            </div>

            <div className={styles["form-row"]}>
                <label className={styles["form-label"]} htmlFor="date">
                    <img src="./calendar.svg" alt="Календарь" />
                    <span>Дата</span>
                </label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    className={classnames(styles["input"], {
                        [styles["invalid"]]: !formValidState.date,
                    })}
                />
            </div>

            <div className={styles["form-row"]}>
                <label className={styles["form-label"]} htmlFor="tag">
                    <img src="./folder.svg" alt="Папка" />
                    <span>Метки</span>
                </label>
                <input
                    id="tag"
                    type="text"
                    name="tag"
                    className={styles["input"]}
                />
            </div>

            <textarea
                name="text"
                id=""
                cols="30"
                rows="10"
                className={classnames(styles["input"], {
                    [styles["invalid"]]: !formValidState.text,
                })}
            />
            <div>
                <Button text="Сохранить" />
            </div>
        </form>
    );
}

export default JournalForm;
