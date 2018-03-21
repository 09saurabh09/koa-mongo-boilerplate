const userService = require('./userService');

module.exports = {
    async createUser(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.createUser(ctx.request.body, ctx.state.user);
        RESPONSE_HELPER({ctx, response});
    },

    async authenticate(ctx, next) {
        let response = new RESPONSE_MESSAGE.GenericSuccessMessage();
        response.data = await userService.authenticate(ctx.request.body);
        RESPONSE_HELPER({ctx, response});
    }
}