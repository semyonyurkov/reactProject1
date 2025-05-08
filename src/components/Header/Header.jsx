import styles from "./Header.module.css";
import SelectUser from "../SelectUser/SelectUser";

function Header({ changedUser }) {
    const changeUser = (e) => {
        changedUser(e.target.value);
        console.log(e.target.value);
    };

    return (
        <>
            <img
                className={styles.logo}
                src="/logo.svg"
                alt="Логотип журнала"
            />
            <SelectUser changeUser={changeUser} />
        </>
    );
}

export default Header;
