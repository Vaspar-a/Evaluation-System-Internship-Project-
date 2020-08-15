const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const componentSchema = new Schema({
    componentName: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },

}, 
    {
        timestamps: true,
    }
);

const markSchema = new Schema({
    sid: {
        type: String,
        required: true,
    },
    sname: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
    },
    components: [componentSchema]

}, 
    {
        timestamps: true,
    }
);

const evaluateSchema = new Schema({
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
    // subName: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    // subCode: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    // type: {
    //     type: String,
    //     default: '',
    //     required: true,
    // },
    _id: {  // college_branch_sem_subCode_subName_type
        type: String,
        required: true,
        unique: true,
    },
    marks: [markSchema],
    
},
    {
        timestamps: true,
    }
);

// const evaluatesSchema = new Schema({
//     evaluate: [evaluateSchema],
// },
//     {
//         timestamps: true
//     }
// );

let Evaluate = mongoose.model('Evaluate', evaluateSchema);

module.exports = Evaluate;
