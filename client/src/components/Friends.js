import React, { useState, useEffect } from "react";

function Friends() {
    const [friends, setFriends] = useState();
    const [userId, setUserId] = useState();

    useEffect(() => {
        const fetchUserId = async () => {
            const data = await fetch("http://localhost:3000/api/getuserid", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"username": sessionStorage.getItem("username")})
            });

            const json = await data.json();

            setUserId(json.data);
        }

        fetchUserId()
            .catch(console.error);
        if (userId) {
            const fetchFriends = async () => {
                const data = await fetch("http://localhost:3000/api/getallfriends", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "userId": userId})
                });

                const json = await data.json();

                setFriends(json);
            }

            fetchFriends();
        }
    }, [userId]);

    return (
        <div className="friends">
            <h1>Hello World</h1>
            <div className="friendList">
                {friends ? friends.map((friend) => {
                    return <div>
                        <p>{friend.recipient}</p>
                        <p>{friend.status}</p>
                    </div>
                }) : null}
            </div>
        </div>
    );
}

export default Friends;
