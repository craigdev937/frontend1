import "dotenv/config";
import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { HomeRt } from "./routes/HomeRt.js";
import { get404 } from "./controllers/ErrorCon.js";

(async () => {
    const app = express();
    // Handlebars Template Engine.
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../src/views"));
    app.engine("hbs", engine({
        defaultLayout: "main", extname: ".hbs",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials")
    }));

    // Middleware, Routes, and Port.
    app.use(express.static(path.join(__dirname, "../src/public")));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use("/", HomeRt);
    app.use(get404);

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



