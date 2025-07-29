import userService from "../services/user.services.js";
import {loginService} from "../services/auth.service.js";

async function createUserController(req, res) {
    const newUser = req.body;

    try {
        const token = await userService.createUserService(newUser);
        res.send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function loginUserController(req, res) {
    const {email, password} = req.body;

    try {
        const token = await loginService(email, password);
        res.status(201).send({ token });
    } catch (err) {
        res.status(400).send(err.message);
    }
}

async function findAllUsersController(req, res) {
    try {
        const users = await userService.findAllUserService();
        res.send({ users });
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

async function findUsersByIdController(req, res) {
    const {id} = req.params;

    try {
        const user = await userService.findUserByIdService(id);
        res.send({ user })
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

async function updateUserController(req, res) {
    const {id} = req.params;
    const newUser = req.body;

    try {
        const user = await userService.updateUserService(newUser, id);
        res.send({ user });
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

async function deleteUserController(req, res) {
    const {id} = req.params;

    try {
        const message = await userService.deleteUserService(id);
        res.send({ message })
    } catch (err) {
        return res.status(404).send(err.message);
    }
}

export default {
    createUserController,
    loginUserController,
    findAllUsersController,
    findUsersByIdController,
    updateUserController,
    deleteUserController
}