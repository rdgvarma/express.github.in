const moment = require ('moment');

const logging =(req,res,next) => {
console.log(`
${req.protocol}://
${req.get('host')}
${req.originalUrl} : 
${moment().format()}
`);
    next();
};

module.exports = logging