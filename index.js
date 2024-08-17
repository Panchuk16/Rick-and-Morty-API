import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const baseURL = "https://rickandmortyapi.com/api/";
const welcome = "Choose an option you want to see";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { welcome: welcome, name: null, image: null, location: null, species: null, status: null, data: null, error: null });
});

app.post("/random", async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 826);
        const result = await axios.get(baseURL + "character/" + random);
        const { name, image, location, status, species } = result.data;

        res.render("index.ejs", {
            welcome: null, // Убираем welcome
            name: name,
            image: image,
            location: location.name,
            status: status,
            species: species,
            data: null,
            error: null
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            welcome: null, // Убираем welcome
            name: null,
            image: null,
            location: null,
            status: null,
            species: null,
            data: null,
            error: error.message
        });
    }
});

app.post("/get-random-list", async (req, res) => {
    const list = [];
    const amount = parseInt(req.body.amount, 10);

    for (let i = 0; i < amount; i++) {
        const random = Math.floor(Math.random() * 826);
        list.push(random);
    }

    try {
        const result = await axios.get(baseURL + "character/" + list.join(','));
        res.render("index.ejs", {
            welcome: null, // Убираем welcome
            list: list,
            data: result.data,
            name: null,
            image: null,
            location: null,
            species: null,
            status: null,
            error: null
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            welcome: null, // Убираем welcome
            list: list,
            data: null,
            name: null,
            image: null,
            location: null,
            species: null,
            status: null,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
