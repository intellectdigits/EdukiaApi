const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
   email: {
        required: true,
        type: String
    },
    token: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model(' PasswordReset', dataSchema)