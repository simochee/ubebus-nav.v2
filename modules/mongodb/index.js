const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = {
    init: () => {
        mongoose.connect('mongodb://localhost/ubebus_v2');
    },
};
