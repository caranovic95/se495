const User = require('../models/user.model')
exports.auth = function (req, res) {

}

exports.register = function (req, res) {

    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email) {
        return res.status(422).send({ errors: [{ title: "Data missing", detail: "Provide email and password" }] });
    }
    if (password !== passwordConfirm) {
        return res.status(422).send({ errors: [{ title: "Invalid password", detail: "Confirmation password is not equal to password" }] });
    }

    User.findOne({ email }, function (err, existingUser) {
        if (err) {
            return res.status(422).send({ 'mongoose': 'err' });
        }

        if (existingUser) {
            return res.status(422).send({ errors: [{ title: "Invalid email", detail: "User with this email exists" }] });
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function (err) {
            if (err) {
                return res.status(422).send({ 'mongoose': 'err' });

            }

            return res.json({ "registered": true })
        });
    })




}