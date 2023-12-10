import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { json } from 'express';
import  config from "config";

// user registration
export const register = async (req, res) => {
    console.log("Inside register function");

    let { username, email, password } = req.body;

    console.log("Received request with data:", { username, email, password });

    if (!username || !email || !password) {
        console.log("Invalid data: please enter all data");
        return res.status(400).send({ msg: "Please enter all data" });
    }

    try {
        let user = await User.findOne({ email: email });

        if (user) {
            console.log("User with email already exists");
            return res.status(400).send({ msg: "Email already exists" });
        }

        console.log("Creating a new user:", { username, email });

        let newUser = new User({ username, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;

        // Save the user to the database
        let savedUser = await newUser.save();

        // Generate JWT token
        jwt.sign(
            { id: savedUser.id },
            config.get("jwtSecret"),
            { expiresIn: config.get("tokenExpire") },
            (err, token) => {
                if (err) {
                    console.error("Error generating JWT token:", err);
                    return res.status(500).send({ msg: "Internal Server Error" });
                }

                // Send the token and user details in the response
                res.json({
                    token,
                    user: {
                        id: savedUser.id,
                        username: savedUser.username,
                        email: savedUser.email,
                    },
                });
            }
        );
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

//user login
/*export const login = async(req,res)=>{

    const  email = req.body.email
    try{
            const user = await User.findOne({email});
           /* console.log(user); // Ajoutez cette ligne pour vérifier l'utilisateur trouvé
            //if user doesn't exist*/
          /* if(!user){
                return res.status(404).json({success:false,message:'User not found '});
            }
            const hash = bcrypt.hashSync(req.body.password,user.salt);
            if(hash == user.password ){
              /*  const token = jwt.sign({id:user._id,role:user.role},
                    process.env.jwtSecret,
                    {expiresIn:"2d"}
                    );
                console.log(token)    */
             /*   const token = jwt.sign({email:email,username:user.username}, "ShCQbOf1249059klXwepSU4jv9H18CI+OmYcx7lpuEk+8GTx3pAPCgxeV+QxpKQe", { expiresIn: '1h' });
                res
                .status(200)
                .json({user:user,token:token});
            }else{
                return res.status(404).json({success:false,message:'Password Incorrect'});
            }
           /* //if user is exist then the password or compare the password
            const checkCorrectPassword = await bcrypt.compare(
            req.body.password, 
            user.password);   
            console.log(checkCorrectPassword); // Ajoutez cette ligne pour vérifier le résultat de la comparaison

            //if password is incorrect
            if (!checkCorrectPassword) {
                return res
                .status(401)
                .json({ success: false, message: 'Incorrect email or password' });
            }



            const {password,role, ...rest} = user._doc
            //create jwt token
            const token = jwt.sign({id:user._id,role:user.role},
                process.env.jwtSecret,
                {expiresIn:"15d"}
                );

            //set  token in the browser cookies and send the response to the client */
         

   /* }catch(err){
        res
            .status(500)
            .json({success:false,message:'Failed to login'});
        
    }
};*/
// user login
/*export const login = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const hash = bcrypt.hashSync(req.body.password, user.salt);

        if (hash == user.password) {
            const token = jwt.sign({ email: email, username: user.username }, "ShCQbOf1249059klXwepSU4jv9H18CI+OmYcx7lpuEk+8GTx3pAPCgxeV+QxpKQe", { expiresIn: '1h' });
            res.status(200).json({ success: true, message: 'Login successful', user: user, token: token });
        } else {
            return res.status(404).json({ success: false, message: 'Password incorrect' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};
*/
export const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(400).send({ status: "usernotok", msg: "Please enter all data | body : " + JSON.stringify(req.body) });

    User.findOne({ email: email }).then((user) => {
        if (!user)
            return res.status(400).send({ status: "usernotok", msg: "User does not exist" });

        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch)
                return res.status(400).send({ status: "passnotok", msg: "Mot de passe incorrect" });

            jwt.sign(
                { id: user.id },
                config.get("jwtSecret"),
                { expiresIn: config.get("tokenExpire") },
                (err, token) => {
                    if (err) throw err;
                    // Use a 200 status code for successful login
                    return res.status(200).json({ status: "ok", msg: "ok", data: { token, user } });
                }
            );
        });
    });
};


/*export const test = async(req,res)=>{ 
    res.status(200).json({success:true,mesaage:'Successfully created'});  

};*/