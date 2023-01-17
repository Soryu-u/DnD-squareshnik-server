import Character from '../models/Character.js';
import User from "../models/User.js";

export const createCharacter = async (req, res) => {
    try {
        const {name, race, level} = req.body;
        const user = await User.findById(req.userId);

        const newCharacter = new Character({
            username: user.username,
            name,
            level,
            race,
            author: req.userId,
        });
        await newCharacter.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: {
                characters: newCharacter
            }
        });
        res.json(newCharacter);
    } catch (error) {
        res.json({
            message: 'Что-то пошло не так.'
        });
    }
}

export const getAll = async (req, res) => {
    try {
        const characters = await Character.find();
        res.json({ characters })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}