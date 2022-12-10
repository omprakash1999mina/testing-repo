const router = express.Router();
import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import { orderController, messagesController, registerController, loginController, userController, refreshController, productController, otpController, forgotPasswordController } from '../controllers';

router.post('/email/verify', otpController.send);
router.post('/forgot/password', forgotPasswordController.forgot);
router.post('/login', loginController.login);
router.post('/register', registerController.register);
router.post('/message', messagesController.createMessage);
router.post('/refresh', refreshController.refresh);
router.post('/logout', loginController.logout);
router.post('/product', [auth, admin], productController.store);
router.post('/orders', [auth], orderController.store);

router.put('/product/:id', [auth, admin], productController.update);
router.put('/update/:id', [auth], userController.update);

router.delete('/product/:id', [auth, admin], productController.destroy);
router.delete('/message/:id', [auth, admin], messagesController.destroy);
router.get('/products', productController.getProductslist);
router.get('/products/:id', productController.getProductsOne);
router.get('/users/:id', [auth], userController.getUsersOne);
router.get('/messages', [auth, admin], messagesController.getmessages);
router.get('/orders/:id', [auth], orderController.getorders);
router.post('/products/cart-items', productController.getProducts);
router.post('/user', loginController.logout);

export default router;

