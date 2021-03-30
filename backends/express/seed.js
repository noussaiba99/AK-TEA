import mongo from './setup/mongo';

mongo.connect(async db => {
	const productsCount = await db.collection('products').countDocuments({});

	if (productsCount > 0) {
		await db.collection('products').drop();
	}

	const usersCount = await db.collection('users').countDocuments({});

	if (usersCount > 0) {
		await db.collection('users').drop();
	}

	await db.collection('products').insertMany([
		{
			title: 'Thé de Timimoun',
			description: 'Thé original de timimoune avec une fraicheur spéciale',
			image: {
				id: '1',
				filename: 'the1.jpg'
			},
			price: '25'
		},
		{
			title: 'Caffée noire',
			description: 'La meuilleure caffée noire',
			image: {
				id: '2',
				filename: 'caffee1.jpg'
			},
			price: '30'
		},
		{
			title: 'Jus de citron',
			description: 'Jus de citron',
			image: {
				id: '3',
				filename: 'jus2.png'
			},
			price: '120'
		},
		{
			title: 'Jus aux fraises',
			description:'Jus aux fraises',
						image: {
				id: '4',
				filename: 'jus3.jpg'
			},
			price: '150'
		},
		{
			title: 'Jus aux oranges',
			description:'Jus aux oranges',
			image: {
				id: '5',
				filename: 'jus1.jpg'
			},
			price: '120'
		},
		{
			title: 'Jus aux bananes',
			description: 'Jus aux bananes',
			image: {
				id: '6',
				filename: 'jus4.jpg'
			},
			price: '150'
		},
		{
			title: 'Cocktail',
			description: 'Cocktail',
			image: {
				id: '7',
				filename: 'jus5.jpg'
			},
			price: '150'
		},
		{
			title: 'Bourak',
			description:
				'Un Bourak Spécial!',
			image: {
				id: '8',
				filename: 'bourak.jpg'
			},
			price: '50'
		},
		{
			title: 'Pizza Couverte',
			description: 'Une délicieuse pizza couverte',
			image: {
				id: '9',
				filename: 'coka1.jpg'
			},
			price: '30'
		},
		{
			title: 'Petit Pain Choco',
			description: 'Un délicieux petit pain au chocolat',
			image: {
				id: '10',
				filename: 'petitpain1.jpeg'
			},
			price: '20'
		},
		{
			title: 'Croissant',
			description: 'Croissant délicieux!',
			image: {
				id: '11',
				filename: 'croissant1.jpg'
			},
			price: '20'
		},
		{
			title: 'Kalb Louz',
			description:'Kalb Louz spécial chez AK Tea',
						image: {
				id: '12',
				filename: 'kalbelouz1.jpg'
			},
			price: '40'
		},
		{
			title: 'Baklawa',
			description:'Une vraie baklawa algérienne!',
						image: {
				id: '13',
				filename: 'baklawa1.jpg'
			},
			price: '50'
		},
		{
			title: 'Halwa Turk',
			description:'Halwa turk ou Chamya',
						image: {
				id: '14',
				filename: 'halwaturk.jpg'
			},
			price: '50'
		}
	]);

	await db.collection('users').insertMany([
		{
			login: 'admin',
			password: 'admin'
		}
	]);

	process.exit();
});
