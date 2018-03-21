const UserModel = MONGOOSE.model('User');
const jwt = require("jsonwebtoken");
module.exports = {
    async createUser(params) {
        return new UserModel(params.user).save();
    },

    async authenticate(params) {
        const user = await UserModel.findOne({email: params.user.email}).lean().exec();
        if (!await UserModel.comparePassword(params.user.password, user.password)) throw new APP_ERROR({message: `Invalid password`, status: 401});
        user.token = jwt.sign({ id: user._id }, GlobalConstant.tokenSecret, {
            expiresIn: GlobalConstant.tokenValidity // expires depend on env
        });
        delete user.password;
        return user;
    }
}