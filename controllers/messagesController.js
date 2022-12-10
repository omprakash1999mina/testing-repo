import Joi from 'joi';
import { Message, User } from "../models";
import CustomErrorHandler from '../Services/CustomerrorHandler';
import discord from '../Services/discord';
import { MessageValidation } from '../validators';

const messagesController = {
    async createMessage(req, res, next) {
        
        const { error } = MessageValidation.validate(req.body);
        if (error) {
            return next(error);
        }

        const { name, email, message } = req.body;

        let document;

        try {
            const exist = await User.exists({ email });
            // console.log(exist)
            if (exist) {
                document = await Message.create({
                    name,
                    email,
                    message,
                });
            }
            else {
                discord.SendErrorMessageToDiscord(email, "contact us message", "user not found in db/not registered");
                return next(CustomErrorHandler.badRequest("User not registered"));
            }
            // console.log(document);
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.email, "contact us message", err);
            return next(err);
        }
        res.status(201).json({ msg: "Message posted Successfully !!!  " });
    },
    async destroy(req, res, next) {
        try {
            const document = await Message.findOneAndRemove({ _id: req.params.id });
            if (!document) {
                discord.SendErrorMessageToDiscord(req.params.id, "contact us message delete", "no such file in db for delete");
                return next(new Error("No such data for Delete !!!   "));
            }
            res.status(200).json("Successfully deleted");
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.params.id, "contact us message delete", err);
            return next(CustomErrorHandler.serverError());
        }

    },
    async getmessages(req, res, next) {

        //  use pagination here for big data library is mongoose pagination
        let document;

        try {
            // document = await Product.find().select('-updatedAt -__v -createdAt').sort({_id: -1});

            document = await Message.find().select('-__v -updatedAt');

        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.json(document);

    }

}
export default messagesController;




