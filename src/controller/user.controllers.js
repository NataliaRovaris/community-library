import userService from "../services/user.services.js";

async function createUserController(req, res) {
    const newUser = req.body;

    try {
        const user = await userService.createUserService(newUser);
        res.status(201).send({user})
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
    findAllUsersController,
    findUsersByIdController,
    updateUserController,
    deleteUserController
}