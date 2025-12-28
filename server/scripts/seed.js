const { sequelize, User, Product, Coupon, Review, Order } = require('../models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced (force: true)');

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('admin', salt);
        const userPassword = await bcrypt.hash('password', salt);

        const admin = await User.create({
            name: 'Admin',
            email: 'admin@store.com',
            password: adminPassword,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=000000&color=ffffff'
        });

        const user = await User.create({
            name: 'John Doe',
            email: 'user@example.com',
            password: userPassword,
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random'
        });

        console.log('Users created');

        // 2. Create Products
        // Product data simulated from src/data/products.js
        const products = [
            {
                name: 'Premium Wireless Headphones',
                description: 'High-quality sound with active noise cancellation and 30-hour battery life',
                price: 299.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                rating: 4.5,
                inStock: true,
                discount: 25
            },
            {
                name: 'Smart Watch Series 7',
                description: 'Track your fitness goals with advanced health monitoring features',
                price: 449.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
                rating: 4.8,
                inStock: true,
                discount: 0
            },
            {
                name: 'Designer Leather Bag',
                description: 'Handcrafted genuine leather bag with multiple compartments',
                price: 189.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
                rating: 4.3,
                inStock: true,
                discount: 24
            },
            {
                name: 'Running Shoes Pro',
                description: 'Lightweight and breathable running shoes for maximum performance',
                price: 129.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
                rating: 4.6,
                inStock: true,
                discount: 0
            },
            {
                name: 'Mechanical Keyboard RGB',
                description: 'Premium mechanical keyboard with customizable RGB lighting',
                price: 159.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
                rating: 4.7,
                inStock: false,
                discount: 0
            },
            {
                name: 'Minimalist Watch',
                description: 'Elegant timepiece with Japanese movement and sapphire crystal',
                price: 249.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
                rating: 4.4,
                inStock: true,
                discount: 0
            },
            {
                name: 'Portable Bluetooth Speaker',
                description: 'Waterproof speaker with 360-degree sound and 12-hour playtime',
                price: 79.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
                rating: 4.2,
                inStock: true,
                discount: 20
            },
            {
                name: 'Sunglasses UV Protection',
                description: 'Polarized lenses with 100% UV protection and stylish frame',
                price: 89.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
                rating: 4.1,
                inStock: true,
                discount: 0
            },
            {
                name: 'Wireless Gaming Mouse',
                description: 'High-precision sensor with programmable buttons and RGB lighting',
                price: 69.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
                rating: 4.5,
                inStock: true,
                discount: 0
            },
            {
                name: 'Travel Backpack',
                description: 'Durable backpack with laptop compartment and USB charging port',
                price: 99.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
                rating: 4.6,
                inStock: true,
                discount: 0
            },
            {
                name: '4K Webcam Pro',
                description: 'Crystal clear video quality with auto-focus and noise reduction',
                price: 119.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop',
                rating: 4.4,
                inStock: true,
                discount: 0
            },
            {
                name: 'Leather Wallet',
                description: 'Slim wallet with RFID protection and premium leather finish',
                price: 49.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
                rating: 4.3,
                inStock: true,
                discount: 0
            },
            {
                name: 'USB-C Hub Adapter',
                description: '7-in-1 hub with HDMI, USB 3.0, SD card reader, and more',
                price: 39.99,
                category: 'Electronics',
                image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
                rating: 4.0,
                inStock: true,
                discount: 0
            },
            {
                name: 'Baseball Cap',
                description: 'Adjustable cotton cap with embroidered logo',
                price: 24.99,
                category: 'Fashion',
                image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
                rating: 4.2,
                inStock: true,
                discount: 0
            },
            {
                name: 'Desk Lamp LED',
                description: 'Adjustable LED lamp with touch controls and USB charging',
                price: 54.99,
                category: 'Home',
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
                rating: 4.5,
                inStock: true,
                discount: 0
            }
        ];

        for (const p of products) {
            await Product.create(p);
        }
        console.log('Products seeded');

        // 3. Create Coupons
        await Coupon.create({ code: 'WELCOME20', discount: 20, type: 'percent' });
        await Coupon.create({ code: 'FREESHIP', discount: 0, type: 'freeship' });
        await Coupon.create({ code: 'SAVE10', discount: 10, type: 'percent' });
        console.log('Coupons seeded');

        console.log('Database seeding completed successfully.');
        process.exit(0);

    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedData();
