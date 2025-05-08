import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useEffect, useReducer, useRef } from "react";
import classnames from "classnames";
import { formReducer, INITITAL_STATE } from "./JournalForn.state";

function JournalForm({ onSubmit }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITITAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.text:
                textRef.current.focus();
                break;
        }
    };

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.text || !isValid.title) {
            focusError(isValid);
            timerId = setTimeout(() => {
                dispatchForm({ type: "RESET_VALIDITY" });
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({ type: "CLEAR" });
        }
    }, [isFormReadyToSubmit, values, onSubmit]);

    const onChange = (e) => {
        dispatchForm({
            type: "SET_VALUE",
            payload: { [e.target.name]: e.target.value },
        });
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({ type: "SUBMIT" });
    };

    return (
        <form onSubmit={addJournalItem} className={`${styles["journal-form"]}`}>
            <div>
                <Input
                    ref={titleRef}
                    isValid={isValid.title}
                    type="text"
                    name="title"
                    appearence="title"
                    value={values.title}
                    onChange={onChange}
                />
            </div>

            <div className={styles["form-row"]}>
                <label className={styles["form-label"]} htmlFor="date">
                    <img src="./calendar.svg" alt="Календарь" />
                    <span>Дата</span>
                </label>
                <Input
                    ref={dateRef}
                    isValid={isValid.date}
                    id="date"
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={onChange}
                />
            </div>

            <div className={styles["form-row"]}>
                <label className={styles["form-label"]} htmlFor="tag">
                    <img src="./folder.svg" alt="Папка" />
                    <span>Метки</span>
                </label>
                <Input
                    id="tag"
                    type="text"
                    name="tag"
                    value={values.tag}
                    onChange={onChange}
                />
            </div>

            <textarea
                ref={textRef}
                name="text"
                id=""
                cols="30"
                rows="10"
                className={classnames(styles["input"], {
                    [styles["invalid"]]: !isValid.text,
                })}
                value={values.text}
                onChange={onChange}
            />
            <div>
                <Button text="Сохранить" />
            </div>
        </form>
    );
}

export default JournalForm;
