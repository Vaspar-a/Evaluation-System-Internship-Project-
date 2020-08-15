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
        required: true,
    },
    weightage: {
        type: Number,
        min: 0,
        max: 1,
        required: true,
    },

}, 
    {
        timestamps: true,
    }
);

const pedagogySchema = new Schema({
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
    components: [componentSchema],
    
},
    {
        timestamps: true,
    }
);

// const pedagogiesSchema = new Schema({
//     pedagogy: [pedagogySchema],
// },
//     {
//         timestamps: true
//     }
// );

let Pedagogy = mongoose.model('Pedagogy', pedagogySchema);

module.exports = Pedagogy;