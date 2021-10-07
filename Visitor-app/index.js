
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express=require('express');
const app= express();
const path=require('path');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const methodOverride=require('method-override');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

const Alert= require('./models/schema.js');
const { name } = require('ejs');
const d = new Date();

app.get('/',(req,res)=>{
    res.render('form');
})

app.post('/new',(req,res)=>{
    const result= new Alert({
        FirstName:req.body.fname,
        LastName:req.body.lname,
        Email:req.body.email,
        PhoneNumber:req.body.number,
        Status:req.body.check,
    })
    result.save();
    const name= req.body.fname;
    const mail= req.body.email;
    const check=req.body.check;
    const message={
        to: mail,
        from:"riddhiweb02@gmail.com",
        subject:`Hello,${name}`,
        html:`<h2>You ${check} the office at ${d.getHours()}:${d.getMinutes()} IST</h2>`,
    }
    sgMail.send(message)
        .then((response) => {
            console.log("Sent Successfully");
        })
        .catch((err) => {
            console.log(err);
        })  
    res.render('enter');
    
})
app.post('/enter',(req,res)=>{
    res.redirect('/');
})

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Sever connect at port ${port}`);
})