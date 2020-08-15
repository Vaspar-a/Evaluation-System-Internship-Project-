const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const detailSchema = new Schema({
    _id: {
        type: String,
        // required: true,
        // unique: true,
    },
    sname: {
        type: String,
        // required: true,
    },

}, 
    {
        timestamps: true,
    }
);

const studentSchema = new Schema({
    // college: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    // branch: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    // semester: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    _id: {  // college_branch_sem
        type: String,
        required: true,
        unique: true,
    },
    details: [detailSchema],
    
},
    {
        timestamps: true,
    }
);

// const studentsSchema = new Schema({
//     students: [studentSchema],
// },
//     {
//         timestamps: true
//     }
// );

let Students = mongoose.model('Student', studentSchema);

module.exports = Students;