// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

const findUserByName = (name) => {
    return users["users_list"].filter(
        (user) => user["name"] === name
    );
};

const findUserByJob = (job) => {
    return users["users_list"].filter(
        (user) => user["job"] === job
    );
};

const addUser = (user) => {
    user["id"] = Math.floor(Math.random() * 100000);
    users["users_list"].push(user);
    return user;
};

const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] == id);

const deleteUserById = (id) => {
    let index = users["users_list"].findIndex((user) => user["id"] == id);
    if (index !== -1) {
        return users["users_list"].splice(index, 1)[0];
    } else {
        return null;
    }
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    if (name !== undefined && job !== undefined) {
        let result = findUserByName(name);
        result = result.filter(user => user["job"] === job);
        result = {users_list: result};
        res.send(result);
    } else if (name !== undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    } else if (job !== undefined) {
        let result = findUserByJob(job);
        result = {users_list: result};
        res.send(result);
    } else {
        res.send(users);
    }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);
    res.status(201).send(newUser);
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.send(result);
    }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = deleteUserById(id);
    if (result === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        res.status(204).send();
    }
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
