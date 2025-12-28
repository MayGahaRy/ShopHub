// Shared product data
export const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        description: 'High-quality sound with active noise cancellation and 30-hour battery life',
        price: 299.99,
        originalPrice: 399.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.5,
        inStock: true,
        discount: 25,
        specs: {
            brand: 'AudioTech',
            model: 'AT-3000',
            connectivity: 'Bluetooth 5.0, 3.5mm Jack',
            batteryLife: '30 hours',
            weight: '250g'
        },
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 2,
        name: 'Smart Watch Series 7',
        description: 'Track your fitness goals with advanced health monitoring features',
        price: 449.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.8,
        inStock: true,
        specs: {
            brand: 'SmartTech',
            model: 'SW-7',
            display: '1.9" Retina Display',
            batteryLife: '18 hours',
            waterResistance: '50m'
        },
        images: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 3,
        name: 'Designer Leather Bag',
        description: 'Handcrafted genuine leather bag with multiple compartments',
        price: 189.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.3,
        inStock: true,
        discount: 24,
        specs: {
            brand: 'LuxeBags',
            material: 'Genuine Leather',
            dimensions: '40cm x 30cm x 15cm',
            compartments: '3 main, 2 side pockets',
            color: 'Brown'
        },
        images: [
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 4,
        name: 'Running Shoes Pro',
        description: 'Lightweight and breathable running shoes for maximum performance',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.6,
        inStock: true,
        specs: {
            brand: 'RunFast',
            model: 'RF-Pro',
            material: 'Mesh & Synthetic',
            sole: 'Rubber',
            weight: '280g per shoe'
        },
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
            'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 5,
        name: 'Mechanical Keyboard RGB',
        description: 'Premium mechanical keyboard with customizable RGB lighting',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.7,
        inStock: false,
        specs: {
            brand: 'KeyMaster',
            switches: 'Cherry MX Red',
            backlight: 'RGB Customizable',
            connectivity: 'USB-C',
            keys: '104 Keys'
        },
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 6,
        name: 'Minimalist Watch',
        description: 'Elegant timepiece with Japanese movement and sapphire crystal',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.4,
        inStock: true,
        specs: {
            brand: 'TimeElite',
            movement: 'Japanese Quartz',
            crystal: 'Sapphire',
            waterResistance: '30m',
            strapMaterial: 'Leather'
        },
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 7,
        name: 'Portable Bluetooth Speaker',
        description: 'Waterproof speaker with 360-degree sound and 12-hour playtime',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.2,
        inStock: true,
        discount: 20,
        specs: {
            brand: 'SoundWave',
            power: '20W',
            batteryLife: '12 hours',
            waterproof: 'IPX7',
            connectivity: 'Bluetooth 5.0'
        },
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 8,
        name: 'Sunglasses UV Protection',
        description: 'Polarized lenses with 100% UV protection and stylish frame',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.1,
        inStock: true,
        specs: {
            brand: 'ShadeStyle',
            lensType: 'Polarized',
            uvProtection: '100% UVA/UVB',
            frameMaterial: 'Acetate',
            lensColor: 'Gray'
        },
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 9,
        name: 'Wireless Gaming Mouse',
        description: 'High-precision sensor with programmable buttons and RGB lighting',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.5,
        inStock: true,
        specs: {
            brand: 'GamerGear',
            dpi: '16000 DPI',
            buttons: '7 Programmable',
            batteryLife: '70 hours',
            connectivity: 'Wireless 2.4GHz'
        },
        images: [
            'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 10,
        name: 'Travel Backpack',
        description: 'Durable backpack with laptop compartment and USB charging port',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.6,
        inStock: true,
        specs: {
            brand: 'TravelPro',
            capacity: '35L',
            laptopSize: 'Up to 17"',
            material: 'Water-resistant Nylon',
            features: 'USB Charging Port'
        },
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 11,
        name: '4K Webcam Pro',
        description: 'Crystal clear video quality with auto-focus and noise reduction',
        price: 119.99,
        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.4,
        inStock: true,
        specs: {
            brand: 'WebCamTech',
            resolution: '4K (3840x2160)',
            frameRate: '30fps',
            microphone: 'Dual Noise-canceling',
            connectivity: 'USB 3.0'
        },
        images: [
            'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 12,
        name: 'Leather Wallet',
        description: 'Slim wallet with RFID protection and premium leather finish',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.3,
        inStock: true,
        specs: {
            brand: 'WalletCraft',
            material: 'Genuine Leather',
            cardSlots: '8',
            rfidProtection: 'Yes',
            dimensions: '11cm x 9cm'
        },
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 13,
        name: 'USB-C Hub Adapter',
        description: '7-in-1 hub with HDMI, USB 3.0, SD card reader, and more',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
        category: 'Electronics',
        rating: 4.0,
        inStock: true,
        specs: {
            brand: 'HubMaster',
            ports: '7-in-1',
            hdmi: '4K@30Hz',
            usb: '3x USB 3.0',
            compatibility: 'MacBook, Windows, Chromebook'
        },
        images: [
            'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 14,
        name: 'Baseball Cap',
        description: 'Adjustable cotton cap with embroidered logo',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop',
        category: 'Fashion',
        rating: 4.2,
        inStock: true,
        specs: {
            brand: 'CapStyle',
            material: '100% Cotton',
            adjustment: 'Adjustable Strap',
            color: 'Navy Blue',
            fit: 'One Size Fits Most'
        },
        images: [
            'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop'
        ]
    },
    {
        id: 15,
        name: 'Desk Lamp LED',
        description: 'Adjustable LED lamp with touch controls and USB charging',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        category: 'Home',
        rating: 4.5,
        inStock: true,
        specs: {
            brand: 'LightPro',
            brightness: '3 Levels',
            colorTemp: '3000K-6000K',
            usbPort: 'Yes',
            power: '12W LED'
        },
        images: [
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop'
        ]
    }
]
