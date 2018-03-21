const bcrypt = require('bcrypt');

const userSchema = new MONGOOSE.Schema({
    name: String,
    email: String,
    password: String
}, {
        timestamps: true
    });

userSchema.pre('save', function (next) {
    const self = this;
    if (self.isNew) {
        bcrypt.hash(self.password, 10, function (err, hash) {
            if (err) return next(err)
            self.password = hash;
            return next();
        });
    } else {
        return next();
    }
});

userSchema.statics.comparePassword = function(password, userPassword) {
    return bcrypt.compare(password, userPassword);
}

module.exports = MONGOOSE.model('User', userSchema, 'users');
