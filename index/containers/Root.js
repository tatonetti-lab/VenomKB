console.log('NODE_ENV: ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod');
} else {
    module.exports = require('./Root.dev');
}
