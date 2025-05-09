import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function SelectUser() {
    const { userId, setUserId } = useContext(UserContext);

    const changeUser = (e) => {
        setUserId(Number(e.target.value));
    };

    return (
        <select onChange={changeUser} value={userId} name="user" id="user">
            <option value="1">Антон</option>
            <option value="2">Вася</option>
        </select>
    );
}

export default SelectUser;
