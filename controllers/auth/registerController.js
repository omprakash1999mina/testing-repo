import Joi from 'joi';
import { User} from "../../models";
import CustomErrorHandler from '../../Services/CustomerrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../Services/JwtService';
import { REFRESH_SECRET } from '../../config';
import discord from '../../Services/discord';
import firebaseServices from '../../Services/firebaseConfig';
import RedisService from '../../Services/redis';
import { RegisterValidation } from '../../validators';

const registerController = {

    async register(req, res, next) {
        let ok = false;
        const { error } = RegisterValidation.validate(req.body);
        if (error) {
            // Delete the uploaded file
            if (req.body.image) {
                ok = firebaseServices.DeleteFileInFirebase(req.body.image)
            }
            // implimetation for discord error logs
            if (!ok) {
                discord.SendErrorMessageToDiscord(req.body.email, "Register User", "error in deleting files in firebase !!");
                console.log("failed to deleting file")
            }
            else {
                discord.SendErrorMessageToDiscord(req.body.email, "Register User", error + " and All files deleted successfully");
                console.log("error accurs and all files deleted on firebase successfully")
            }
            return next(error);
        }

        let document;

        let access_token;
        let refresh_token;

        try {
            const exist = await User.exists({ email: req.body.email });
            if (exist) {
                // Delete the uploaded file
                if (req.body.image) {
                    ok = firebaseServices.DeleteFileInFirebase(req.body.image)
                }
                // implimetation for discord error logs
                if (!ok) {
                    discord.SendErrorMessageToDiscord(req.body.email, "Register User", "error in deleting files in firebase !!");
                    console.log("failed to deleting file")
                }
                else {
                    discord.SendErrorMessageToDiscord(req.body.email, "Register User", error + " and All files deleted successfully");
                    console.log("error accurs and all files deleted on firebase successfully")
                }
                return next(CustomErrorHandler.alreadyExist('This email is already taken . '));
            }

            const { name, email, password, age, gender, image } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            document = await User.create({
                // name: name,
                name,
                email,
                age,
                gender,
                image,
                password: hashedPassword
            });
            console.log(document);

            access_token = JwtService.sign({ _id: document._id, role: document.role });
            refresh_token = JwtService.sign({ _id: document._id, role: document.role }, "600s", REFRESH_SECRET);
            //       redis caching
        
            const ttl = 60 * 60 * 24 * 7;
            const redis = RedisService.createRedisClient();
            const working = await redis.set(document._id, refresh_token, "EX", ttl).then(() => {
                redis.disconnect();
            });
            // const working = RedisService.set(email, refresh_token, ttl);
            if (!working) {
                discord.SendErrorMessageToDiscord(email, "LogIN", "error in setup the otp in redis !!");
                return next(CustomErrorHandler.serverError());
            }
        } catch (err) {
            if (req.body.image) {
                ok = firebaseServices.DeleteFileInFirebase(req.body.image)
            }
            // implimetation for discord error logs
            if (!ok) {
                discord.SendErrorMessageToDiscord(req.body.email, "Register User", "error in deleting files in firebase !!");
                console.log("failed to deleting file")
            }
            else {
                discord.SendErrorMessageToDiscord(req.body.email, "Register User", error + " and All files deleted successfully");
                console.log("error accurs and all files deleted on firebase successfully")
            }
            return next(err);
        }
        res.status(200).json({ _id: document._id, msg: "User Registered Successfully !!!  ", access_token: access_token, refresh_token: refresh_token });
    }
};

export default registerController;
