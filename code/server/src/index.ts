import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { Note } from "./entity/Note";
import * as express from "express";

const run = async () => {
    await AppDataSource.initialize();
    const app = express();
    app.use(express.json());
    app.get("/users", async (req, res) => {
        const users = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.notes", "notes")
            .getMany();
        res.json(users);
    });
    app.post("/users", async (req, res) => {
        const user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.post("/notes/:userid", async (req, res) => {
        // Validate that the userid exists in the database...
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.userid } });
        // TODO TEST THIS PART
        if (!user) {
            res.status(500).send("note is not attached to a user!");
            return;
        }
        const note = new Note();
        note.user = user;
        note.content = req.body.content;
        note.timestamp = Date.now();
        await AppDataSource.manager.getRepository(Note).save(note);
        
        res.json(note);
    });
    app.put("/users/:id", async (req, res) => {
        const user = await AppDataSource.manager
            .getRepository(User)
            .findOne({ where: { id: req.params.id } });
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.phoneNumber = req.body.phoneNumber;
        await AppDataSource.manager.getRepository(User).save(user);
        res.json(user);
    });
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
};

run();
