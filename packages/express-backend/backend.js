// backend.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
    .connect("mongodb://127.0.0.1:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));



const app = express();
const port = 8000;


function findUserByName(name) {
    return userModel.find({ name: name });
}

function findUserByJob(job) {
    return userModel.find({ job: job });
}

function findUserByNameAndJob(name, job) {
    return userModel.find({ name: name, job: job});
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function getUsers(name, job) {
    let promise;
    if (name === undefined && job === undefined) {
        promise = userModel.find();
    } else if (name && !job) {
        promise = findUserByName(name);
    } else if (job && !name) {
        promise = findUserByJob(job);
    } else if (job && name) {
        promise = findUserByNameAndJob(name, job);
    }
    return promise;
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;

    getUsers(name, job)
        .then(result => {
            res.send({users_list: result});
        })
        .catch(error => res.status(500).send(error));
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
        .then(newUser => {
            res.status(201).send(newUser);
        })
        .catch(error => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    findUserById(id)
        .then(result => {
            if (!result) {
                res.status(404).send("Resource not found.");
        } else {
                res.send(result);
            }
    })
        .catch(error => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    deleteUserById(id)
        .then(result => {
            if (!result) {
                res.status(404).send("Resource not found.");
            } else {
                res.status(204).send();
            }
        })
        .catch(error => res.status(500).send(error));
});

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob,
    deleteUserById,
};