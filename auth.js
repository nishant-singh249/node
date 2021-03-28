const express = require('express');
const router = express.Router();
require('./conn');
const User = require('./userSchema');

router.get('/', (req, res) => {
    res.send('Hello MernStack Devloper router js');
})

// For registration

router.post('/register', (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "pls filled data properly" });
    }
    User.findOne({ email: email }).then((userExist) => {
        if (userExist) {
            return res.status(422).json({ error: "Email already in my Database" });
        }
        else if(password != cpassword){
            return res.status(422).json({ error: "password are not  matching" });

        }
        else {

            const user = new User({ name, email, phone, work, password, cpassword });
            //
            user.save().then(() => {
                res.status(201).json({ message: "Registration successful" });
            }).catch((error) => res.status(500).json({ Error: "Failed registration" }));

        }
       
    }).catch(err => { console.log(err); });
    //console.log(name);
    //console.log(email);
    // res.json({message: req.body})
})

// For Signin

router.post('/signin', async (req, res) => {
    //console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Incorect Credential" });
        }
        const userLogin = await User.findOne({ email: email, password: password });
        //console.log(userLogin)
        //res.status(200).json({message: "user signin successfuly"});
        if (!userLogin) {
            res.status(400).json({ error: "Incorect credential2" })
        }
        else {
            res.status(200).json({ message: "user signin successfuly" });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;