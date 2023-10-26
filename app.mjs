import express from "express";
import exportValues from "./convertToJSON.mjs";
const app = express();
const port = 80;

app.get('/', async (req, res) => {
    try{
        let data = await exportValues();
        // console.log(data);
        res.status(200).send(data);
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, ()=>{
    console.log("Application Started At Port 80 on LocalHost 127.0.0.1");
})