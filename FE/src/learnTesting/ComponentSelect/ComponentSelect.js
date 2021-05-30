// CheckboxWithLabel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const CheckboxWithLabel = ({ labelOn, labelOff }) => {
    const [isChecked, setIsChecked] = useState(false);

    const onChange = () => {
        setIsChecked(!isChecked);
    };

    const [status, setStatus] = useState(1);
    const [newUser, setNewUser] = useState({
        id: null,
        name: "",
    });
    const [showNewUser, setShowNewUser] = useState("");
    const [users, setUsers] = useState([]);

    const fetchUser = () => {
        let config = {
            method: "get",
            url: "https://jsonplaceholder.typicode.com/users",
        };
        axios
            .get(config.url)
            .then((result) => {
                if (result.data.length > 0) {
                    // console.log(result.data);
                    setUsers([...result.data]);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleInput = (e) => {
        let { value } = e.target;
        setNewUser((prev) => {
            return { ...prev, id: users.length, name: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", newUser.id);
        formData.append("name", newUser.name);
        console.log("post");
        let config = {
            method: "post",
            url: "https://jsonplaceholder.typicode.com/users",
            data: formData,
        };
        axios
            .post(config.url, formData)
            .then((result) => {
                if (result.data) {
                    console.log("set name" + newUser.name);
                    setShowNewUser(newUser.name);
                    setNewUser((prev) => {
                        return { ...prev, id: null, name: "" };
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        // let isMounted = true;
        fetchUser();
        // return () => {
        //     isMounted = false;
        // };
    }, []);
    const handleChange = (e) => {
        console.log("cek value", parseInt(e.target.value));
        setStatus(parseInt(e.target.value));
    };

    return (
        <div data-testid='checkboxlabel'>
            <label data-testid='label'>
                <input
                    type='checkbox'
                    checked={isChecked}
                    onChange={onChange}
                />
                {isChecked ? labelOn : labelOff}
            </label>
            <div className='margin-top'>
                <select
                    value={status}
                    onChange={handleChange}
                    data-testid='select'>
                    {users.length > 0 &&
                        users.map((data, idx) => {
                            return (
                                <option
                                    value={data.id}
                                    key={idx}
                                    data-testid='select-option'
                                    name={data.name}>
                                    {data.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <form className='margin-top' id='newUser' onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={handleInput}
                    value={newUser.name}
                    form='newUser'
                    data-testid='name'
                />
                <button type='submit'>Submit</button>
            </form>
            <div>new user is: {showNewUser}</div>
        </div>
    );
};

export default CheckboxWithLabel;
