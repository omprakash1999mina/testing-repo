import { Product } from '../models';
import CustomErrorHandler from '../Services/CustomerrorHandler';
import { ProductValidation } from '../validators';

const productController = {
    async store(req, res, next) {
        // Multipart form data
        if (err) {
            return next(CustomErrorHandler.serverError(err.message))
        }
        const filePath = req.file.path;
        // validation

        const { error } = ProductValidation.validate(req.body);
        if (error) {
            // Delete the uploaded file


            return next(error);
            // rootfolder/uploads/filename.png
        }

        const { name, price, size, currency } = req.body;
        let document;
        try {
            document = await Product.create({
                name,
                price,
                size,
                currency,
                image: filePath
            });
        } catch (err) {
            return next(err);
        }
        res.status(201).json(document);

    },
    async update(req, res, next) {
        // Multipart form data

        // const id = await Product.findOne({_id: req.params.id});
        // console.log(id);
        if (id) {
            return next(new Error("No such data exist Please recheck your id again !!!  "))
        }
        if (err) {
            return next(CustomErrorHandler.serverError(err.message))
        }
        // validation
        const { error } = productSchema.validate(req.body);
        let filePath;

        if (req.file) {
            filePath = req.file.path;
        }
        if (req.file) {

            if (error) {
                // Delete the uploaded file


                return next(error);

                // rootfolder/uploads/filename.png
            }
        }

        const { name, price, size } = req.body;
        let document;
        try {
            document = await Product.findOneAndUpdate({ _id: req.params.id }, {
                name,
                price,
                size,
                ...(req.file && { image: filePath })
            }, { new: true });
            console.log(document);
        } catch (err) {
            return next(err);
        }
        res.status(201).json(document);
    },

    async destroy(req, res, next) {
        const document = await Product.findOneAndRemove({ _id: req.params.id });
        if (!document) {
            return next(new Error("No such data for Delete !!!   "));
        }
        const imagePath = document._doc.image;

        fs.unlink(`${appRoot}/${imagePath}`, (err) => {
            if (err) {
                return next(new Error('Error in Deleting image file !!! '));
            }
            return res.json("Resquested data successfully deleted  !!!");
        });
    },
    async getProducts(req, res, next) {
        let documents;
        try {
            documents = await Product.find({
                _id: { $in: req.body.ids },
            }).select('-updatedAt -__v');
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        return res.json(documents);
    },

    async getProductslist(req, res, next) {

        //  use pagination here for big data library is mongoose pagination
        let document;

        try {
            // document = await Product.find().select('-updatedAt -__v -createdAt').sort({_id: -1});

            document = await Product.find().select('-updatedAt -__v -createdAt');

        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.json(document);
    },
    async getProductsOne(req, res, next) {
        //  use pagination here for big data library is mongoose pagination

        let document;
        try {
            document = await Product.findOne({ _id: req.params.id }).select('-updatedAt -__v -createdAt');
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
        res.json(document);
    }
}

export default productController;
