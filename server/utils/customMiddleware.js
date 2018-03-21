const jwt = require("jsonwebtoken");
const UserModel = MONGOOSE.model('User');

module.exports = {
    async authenticate(ctx, next) {
        const token = ctx.request.headers['x-access-token'];   
        if (!token) throw new APP_ERROR({message: `Invalid token`, status: 401});
        const userObject = await jwt.verify(token, GlobalConstant.tokenSecret);
        const user = await UserModel.findOne({_id: userObject.id}).lean().exec();
        if (!user) throw new APP_ERROR({message: `User not present`, status: 401});
        ctx.state.user = user;
        await next();
    }
}