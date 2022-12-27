import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const isUsed = await User.findOne({username});

        if(isUsed) {
            return res.json({
                message: 447
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hash,
        });

        const token = jwt.sign(
            { id: newUser._id, }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        await newUser.save();

        res.json({
            token,
            newUser,
            message: "Register successful."
        });

    } catch (error) {
        res.json({
            message: `Error on register. ${error}`
        });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        console.log(user);

        if(!user) {
            return res.json({
                message: "Undefined user."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.json({
                message: "Wrong password."
            });
        }

        const token = jwt.sign(
            { id: user._id, }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )
        
        res.json({
            token, 
            user, 
            message: "Login successful."
        })
    } catch (error) {
        res.json({
            message: `Error on login. ${error}`
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if(!user) {
            return res.json({
                message: "Undefined user."
            });
        }

        const token = jwt.sign(
            { id: user._id, }, 
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            user, 
            token
        })
    } catch (error) {
        res.json({
            message: `Error on get user. ${error}`
        });
    }
}
