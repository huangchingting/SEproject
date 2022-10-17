const User = require('../../server/schema/user');
const expect = require('chai').expect;
const { connect, clear, close } = require('./db.js');

describe('User schema', () => {

    before(async () => await connect());
    afterEach(async () => await clear());
    after(async () => await close());

    const username = 'John';
    const password = 'secret';

    const createOneUser = async () => {
        const user = await User.create({
            username: username,
            password: password,
        });
        await user.save();
        return user.id;
    };

    it('should be able to store a new user and get the user by its id', async () => {
        const userId = await createOneUser();

        // Retrieve the user we just stored.
        const user2 = await User.findById(userId);

        expect(user2.username).to.equal(username);
        expect(user2.password).to.equal(password);
    });

    it('should be able to updata a user by its id', async () => {
        const newUsername = 'Alice';
        const newPassword = 'new_screte';

        const userId = await createOneUser();
        const user = await User.findById(userId);
        user.username = newUsername;
        user.password = newPassword;
        await user.save();

        const user2 = await User.findById(userId);
        expect(user2.username).to.equal(newUsername);
        expect(user2.password).to.equal(newPassword);
    });

    it('should be able to delete a user by its id', async () => {
        const userId = await createOneUser();
        await User.findById(userId).deleteOne();
        const users = await User.find();
        expect(users).to.be.empty;
    });
});
