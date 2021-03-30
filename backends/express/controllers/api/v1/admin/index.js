import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import config from '../../../../config';
import checkAdminAuth from '../../../../utils/checkAdminAuth';
import errorHandler from '../../../../utils/errorHandler';
import nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ak.tea.algiers@gmail.com',
		pass: 'akteaalgiers'
	}
});
var mailOptions = {
	from: 'ak.tea.algiers@gmail.com',
	to: null,
	subject: null,
	text: null

};

function login(req, res) {
	const authData = req.body;

	let response = {
		result: 'error',
		errorText: 'Invalid login or password'
	};

	if (authData.login === 'admin' && authData.password === 'admin') {
		const payload = {
			user_id: 'sdfsdfsd',
			role: 'admin'
		};
		const secret = config.jwtSecret;
		const jwtToken = jwt.sign(payload, secret);

		response = {
			result: 'success',
			user_id: 'sdfsdfsd',
			role: 'admin',
			token: jwtToken
		};
	}

	res.status(200).json(response);
}

const getOrders = [
	checkAdminAuth,
	async (req, res) => {
		try {
			console.log('req.query');
			console.log(JSON.stringify(req.query));

			const { db } = req.app;
			const { status } = req.query;

			let queryFilter = {};

			if (status) {
				queryFilter = { status };
			}

			console.log('queryFilter:');
			console.log(JSON.stringify(queryFilter));

			const products = await db
				.collection('orders')
				.find(queryFilter)
				.toArray();

			res.status(200).json(products);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
];

const getOrder = [
	checkAdminAuth,
	async (req, res) => {
		try {
			const { db } = req.app;

			const orderId = req.params.id;

			const filter = {
				_id: new ObjectID(orderId)
			};

			const order = await db.collection('orders').findOne(filter);

			res.status(200).json(order);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
];

const setOrderStatus = [
	checkAdminAuth,
	async (req, res) => {
		try {

			const { db } = req.app;

			const orderId = req.params.id;

			const filter = {
				_id: new ObjectID(orderId)
			};

			const newStatusRequest = req.body;
			const newStatus = newStatusRequest.status;
			

			await db.collection('orders').updateOne(filter, { $set: { status: newStatus } });

			const order = await db.collection('orders').findOne(filter);
			const customer_email=order.orderInfo.email;
			const customer_name=order.orderInfo.name;

			mailOptions.to = customer_email;

			console.log("commande",newStatus);
            
			if (newStatus=="terminée")
			{

			mailOptions.subject = "Commande prête Chez AK TEA";
			mailOptions.text = "Cher client "+customer_name+ ",\n\nMerci pour votre achat sur notre application! Votre commande est maintenant prête."+"\n \n  AK TEA ";
			}
			else if (newStatus=="verifiée")	
			{			mailOptions.subject = "Commande "+newStatus+" Chez AK TEA";		
			mailOptions.text = "Cher client "+customer_name+ ",\n\nMerci pour votre achat sur notre application! Votre commande a été "+newStatus+ " avec succès."+"\n \n  AK TEA ";
		}
		else 	{mailOptions.subject = "Commande "+newStatus+" Chez AK TEA";		

		mailOptions.text = "Cher client "+customer_name+ ",\n\n Nous sommes au regret de vous informer que votre commande a été "+newStatus+ "."+"\n \n  AK TEA ";
		}

			const response = {
				newStatus
			};
			transporter.sendMail(mailOptions, function(error, info){

			if (error) {
			console.log(error);
			} else {
			console.log('Email sent: ' + info.response);
			}
			});

			res.status(200).json(response);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
];

const getProducts = [
	checkAdminAuth,
	async (req, res) => {
		try {
			const { db } = req.app;

			const products = await db
				.collection('products')
				.find({})
				.toArray();

			res.status(200).json(products);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
];

const getProduct = [
	checkAdminAuth,
	async (req, res) => {
		try {
			const { db } = req.app;

			const orderId = req.params.id;

			const filter = {
				_id: new ObjectID(orderId)
			};

			const order = await db.collection('products').findOne(filter);

			res.status(200).json(order);
		} catch (err) {
			errorHandler(err, req, res);
		}
	}
];

function createOrUpdateProduct(req, res, next) {}

function deleteProduct(req, res, next) {}

const addProductImage = async (req, res, next) => {};

const deleteProductImage = (req, res, next) => {};

export default {
	login,
	getOrders,
	getOrder,
	setOrderStatus,
	getProducts,
	createOrUpdateProduct,
	deleteProduct,
	getProduct,
	addProductImage,
	deleteProductImage
};
