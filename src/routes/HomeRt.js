import express from "express";
import { HomeIndex } from "../controllers/HomeCon.js";

export const HomeRt = express.Router();
    HomeRt.get("/", HomeIndex);



    