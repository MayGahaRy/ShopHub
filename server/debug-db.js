const { Message, User, sequelize } = require('./models');

async function debug() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const usersCount = await User.count();
        console.log('Total users:', usersCount);

        const messages = await Message.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email', 'lastActive'] }],
            limit: 10
        });

        console.log('--- DATABASE DEBUG REPORT ---');
        console.log('Total users:', usersCount);
        console.log('Sample Users:');
        const users = await User.findAll({ limit: 5 });
        users.forEach(u => console.log(`- ID: ${u.id}, Name: ${u.name}, Email: ${u.email}`));

        console.log('\nSample Messages with User info:');
        messages.forEach(m => {
            console.log(`Msg ID: ${m.id}, Text: ${m.text.substring(0, 20)}..., Sender: ${m.sender}, UserID: ${m.userId}, UserObj: ${m.User ? JSON.stringify(m.User) : 'NULL'}`);
        });
        console.log('--- END REPORT ---');

        process.exit(0);
    } catch (err) {
        console.error('Debug failed:', err);
        process.exit(1);
    }
}

debug();
