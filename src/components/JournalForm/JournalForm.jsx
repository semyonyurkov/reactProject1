import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useContext, useEffect, useReducer, useRef } from "react";
import classnames from "classnames";
import { formReducer, INITITAL_STATE } from "./JournalForn.state";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
    const [formState, dispatchForm] = useReducer(formReducer, INITITAL_STATE);
    const { isValid, isFormReadyToSubmit, values } = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const textRef = useRef();
    const { userId } = useContext(UserContext);

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
        if (!data) {
            dispatchForm({ type: "CLEAR" });
            dispatchForm({
                type: "SET_VALUE",
                payload: { userId: userId },
            });
        }
        dispatchForm({
            type: "SET_VALUE",
            payload: { ...data },
        });
    }, [data]);

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
            dispatchForm({
                type: "SET_VALUE",
                payload: { userId: userId },
            });
        }
    }, [isFormReadyToSubmit, values, onSubmit, userId]);

    useEffect(() => {
        dispatchForm({
            type: "SET_VALUE",
            payload: { userId: userId },
        });
    }, [userId]);

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

    const deleteJournalItem = () => {
        onDelete(data.id);
        dispatchForm({ type: "CLEAR" });
        dispatchForm({
            type: "SET_VALUE",
            payload: { userId: userId },
        });
    };

    return (
        <form onSubmit={addJournalItem} className={`${styles["journal-form"]}`}>
            <div className={styles["form-row"]}>
                <Input
                    ref={titleRef}
                    isValid={isValid.title}
                    type="text"
                    name="title"
                    appearence="title"
                    value={values.title}
                    onChange={onChange}
                />
                {data?.id && (
                    <button
                        onClick={deleteJournalItem}
                        className={styles["delete"]}
                        type="button"
                    >
                        <img src="/archive.svg" alt="кнопка удалить" />
                    </button>
                )}
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
                    value={
                        values.date
                            ? new Date(values.date).toISOString().slice(0, 10)
                            : ""
                    }
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
