import express from 'express';
import path, { dirname } from 'path';
const app = express();
const port = 8000;

app.use('/static',express.static('static'));
app.set('view engine','pug');
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded({ extended: true }));
// // app.use(express.json());
// app.use(cookieParser());

import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
mongoose.connect("mongodb://127.0.0.1:27017/server_db",{
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Succeded");
}).catch((err)=>{
    console.log(err);
});

const userInfoSchema = new mongoose.Schema({
    Name: String,
    RegistrationNumber: String,
    PhoneNumber: Number,
    EmailId: String,
    password: String,
    passwordCheck: String
});

const Userinfo = new mongoose.model('UserInfoData',userInfoSchema);

app.get('/',(req,res)=>{
    res.status(200).render('signIn.pug');
});

app.post('/',(req,res)=>{
    console.log(req.body);
    var body_ = new Userinfo(req.body);
    body_.save().then(()=>{
        res.status(200).redirect('/VITBhopalNews');
    })
});

app.get('/VITBhopalNews',(req,res)=>{
    res.status(200).render('index.pug');
});

import fetchData from './fectchData.mjs';
import { clubName } from './fectchData.mjs';
import { facultyCoordinator } from './fectchData.mjs';
import { Contact } from './fectchData.mjs';
app.get('/clubs',(req,res)=>{
    async function getValues(){
        await fetchData().then(()=>{
            console.log(clubName);
            console.log(facultyCoordinator);
            console.log(Contact);
            res.status(200).render('clubs.pug',{
                clubs: clubName,
                faculties: facultyCoordinator,
                contacts: Contact
            });
        })
    }
    getValues();
})

app.listen(port,()=>{
    console.log(`Application Started At Port ${port} on LocalHost`);
});