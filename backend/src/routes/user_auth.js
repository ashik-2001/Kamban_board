var express = require('express')
var router = express.Router()
const User = require("../model/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth");

router.post('/register', async (req,res)=> {
    try {
        const { first_name, last_name, email, password } = req.body;
        if(!(email && password && first_name && last_name)) {
            res.status(400).send("All input required");
        }
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.status(409).send("User already Exist");
        }

        encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;
        res.status(201).send(user);

    } catch (err) {
        console.log(err);
    }
})

router.post('/login', async (req,res)=> {
   try{
    const {email, password} = req.body;
    
    if(!(email && password)) {
        res.status(400).send("All inputs are required")
    }
    const options = {projection: {password:1}} 
    const user = await User.findOne({email})
    console.log(user.password)
    if(user && (await bcrypt.compare(password, user.password))){
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        )
        user.token = token;
        res.status(200).json(user.token);
    }
    res.status(400).send("invalid Credentials")

   }
   catch (err) {
    console.log(err)
   }
})

router.post('/welcome', auth, (req,res) => {
    res.status(200).send("Welcome 🙌 ");
})


module.exports = router