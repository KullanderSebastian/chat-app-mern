import React, { useState, useEffect } from "react";
import ProfileContent from  "./ProfileContent";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import ArrowLeft from "../../images/arrow-left.svg";

function Profile() {
    const [currentView, setCurrentView] = useState("profileDefault");
    const [editInput, setEditInput] = useState();
    const [value, setValue] = useState();

    const clickHandler = (e) => {
        if (currentView === "profileDefault" && e.target.localName === "img") {
            setEditInput(e.target.parentElement.children[0]["name"])
            setValue(e.target.parentElement.childNodes[0]["value"]);
            setCurrentView("editField");
        } else if (currentView  === "profileDefault" && e.target.localName  === "button") {
            setCurrentView("changePassword");
        }
    };

    const goToProfile = () => {
        setCurrentView("profileDefault");
    }

    return (
        <div className="profile">
            {currentView === "editField" || currentView === "changePassword" ?  <header>
                <img onClick={goToProfile} src={ArrowLeft}  alt="Go back to profile" />
                <h1>Go back to profile</h1>
            </header> : null}

            {currentView === "profileDefault" ? <ProfileContent clickHandler={clickHandler}/>
            : currentView  === "editField" ? <EditProfile setParentState={setCurrentView} changeInput={editInput} value={value}/>
            : currentView === "changePassword" ? <ChangePassword setParentState={setCurrentView}/> : null}
        </div>
    );
}

export default Profile;
