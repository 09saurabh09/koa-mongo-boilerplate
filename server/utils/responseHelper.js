module.exports = ({ctx, status = 200, response}) => {
    ctx.status = status; 
    ctx.body = response;
}
