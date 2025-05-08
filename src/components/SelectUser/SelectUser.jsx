function SelectUser({ changeUser }) {
    return (
        <select onChange={changeUser} name="user" id="user">
            <option value="1">Антон</option>
            <option value="2">Вася</option>
        </select>
    );
}

export default SelectUser;
