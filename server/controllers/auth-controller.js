const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

// *----------------------
//* Home Page Logic
// *----------------------
const home = async (req, res) => {
    try{
        res.status(200).send("Welcome To MERN Stack ! So, let Start....");
    } catch (error) {
        console.log(error);
    }
};

// *----------------------
//* Register Logic
// *----------------------

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, fullname, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if(userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hash the password
        // const saltRound = 10;  // can pass any value higher it value make more complex and time consuming.
        // const hash_password = await bcrypt.hash(password, saltRound);
        
        const userCreated = await User.create({
            username,
            fullname, 
            email, 
            phone, 
            password /*:hash_password*/
        });

        res.status(201).json({ 
            msg : "Registration Successful", 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(),
        }); 
        // In most cases, converting id to a string is a good practice because it ensures consistency 
        // and compatibility across different JWT libraries and systems. It also aligns with the 
        // expectation that claims in a JWT are represented as strings.
    } catch (error) {
        // res.status(500).json("Internal Server Error");
        next(error);
    }
};

// *----------------------
//* Login Logic
// *----------------------
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        console.log(userExist);

        if(!userExist) {
            return res.status(400).json({ message : "Invalid Credentials"});
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user){
            res.status(200).json({ 
                msg : "Login Successful", 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(),
            });
        }else {
            res.status(401).json({ message : "Invaild email and password" });
        }
    } catch (error) {
        // res.status(500).json("Internal Server Error");
        next(error);
    }
};

// *-----------------------------------
//* to send user data - User Logic
// *-----------------------------------

const user = async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
        // res.status(200).json({ msg: "hi user" });  --> to check the route is successfully get the message or not.
    }catch (error) {
        console.log(`error from teh user route, ${error}`);
    }
}

module.exports = { home, register, login, user };