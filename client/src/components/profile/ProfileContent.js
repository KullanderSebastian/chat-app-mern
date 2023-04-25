import React, { useEffect, useState } from "react";
import ProfilePlaceholder from "../../svg/profilePlaceholder.svg";
import EditIcon from "../../images/edit-icon.svg";

function ProfileContent(props) {
    const [user, setUser] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            const data = await fetch("http://localhost:3000/api/getuser", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body:  JSON.stringify({"username": sessionStorage.getItem("username")})
            });

            const json = await data.json();

            console.log(json.data);

            setUser(json.data);
        }

        fetchUser();
    }, []);

    return (
        <div className="profileContent">
            <div>
                <img src={ProfilePlaceholder} alt="Profile placeholder image" />
            </div>
            {user ? (
                <div className="content">
                    <h1>Profile</h1>
                    <div className="changeInput">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={user.username}
                            readOnly
                        />
                        <img className="editImage" onClick={props.clickHandler} src={EditIcon} alt="edit icon"/>
                    </div>
                    <div className="changeInput">
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={user.email}
                            readOnly
                        />
                        <img className="editImage" onClick={props.clickHandler} src={EditIcon} alt="edit icon"/>
                    </div>
                    <button className="changePasswordBtn" onClick={props.clickHandler}>Change password</button>
                </div>
            ) : null}
        </div>
    );
}

export default ProfileContent;
