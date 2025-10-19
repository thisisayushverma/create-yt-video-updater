import express from "express"
import cors from "cors"
import { oauth2Client } from "./utils/googleOauth.js";
import { config } from "./utils/config.js";
import dotenv from "dotenv"
import open from "open"
import cookieParser from "cookie-parser";
import { getAllVideos } from "./utils/youtube.api.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())
dotenv.config({
    path: ".env"
})


app.get('/', (req, res) => {
    res.send({ user: "asdfas" })
})

app.get('/auth', async (req, res) => {
    try {
        console.log(oauth2Client);
        const url = oauth2Client.generateAuthUrl({
            access_type: "offline",
            scope: [config.youtubeApi],
        })
        console.log("url", url);
        open(url)
    } catch (error) {
        console.log("error while auth connection", error);
    }
})


app.get('/auth/callback', async (req, res) => {
    try {
        console.log("req->query  :-", req.query.code);
        oauth2Client.getToken(req.query.code,(err,token)=>{
            if(err) throw err
            console.log(token);
            res.cookie('access_token', token.access_token, {
                httpOnly: true,   // cannot be accessed by JS (good for security)
                secure: false,    // true if using HTTPS
                maxAge: 24 * 3600 * 1000
            })
            oauth2Client.setCredentials(token);
            res.send('/get-videos');
        })
        
    } catch (error) {
        console.log("error while callback", error);
    }
})

app.get('/get-videos', async (req, res) => {
    try {
        const vidList = await getAllVideos();
        res.send(vidList)
    } catch (error) {
        console.log("error while geting videos", error);
    }
})

import userRouter from "./router/video.router.js"
app.use('/api/video', userRouter)


app.listen(5000, () => {
    console.log("server is running on post", 5000)
})
