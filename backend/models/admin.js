const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: true,
    },
    email: {
        type: String,
        default: '',
        required: true,
    },
    college: {
        type: String,
        default: '',
        required: true,
    },
    branch: {
        type: String,
        default: '',
        required: true,
    },
    semester: {
        type: String,
        default: '',
        required: true,
    },
    subName: {
        type: String,
        default: '',
        required: true,
    },
    subCode: {
        type: String,
        default: '',
        required: true,
    },
    
},
    {
        timestamps: true,
    }
);

// const adminsSchema = new Schema({
//     admin: [adminSchema],
// },
//     {
//         timestamps: true
//     }
// );

let Admins = mongoose.model('Admin', adminSchema);

module.exports = Admins;