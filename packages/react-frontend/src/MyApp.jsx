// src/MyApp.jsx
import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
        deleteUser(characters[index]["_id"])
            .then((res) => {
                if (res.status === 404)
                    throw new Error("Could not find character")
                if (res.status !== 204)
                    throw new Error("Could not remove character")
            })
            .then(() => {
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters(updated);
            })
            .catch((error) => {
                console.log(error);
            })


    }

    function updateList(person) {
        postUser(person)
            .then((res) => {
                if (res.status !== 201)
                    throw new Error("Cant update");
                return res.json()
            })
            .then((newUser) => setCharacters([...characters, newUser]))
            .catch((error) => {
                console.log(error);
            })
    }

    function fetchUsers() {
        const searchParams = window.location.search;
        const promise = fetch(`http://localhost:8000/users${searchParams}`);
        return promise;
    }

    function postUser(person) {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        return promise;
    }

    function deleteUser(id) {
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE"
        });
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList}/>
        </div>
    );
}

export default MyApp;