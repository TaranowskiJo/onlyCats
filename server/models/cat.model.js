const { default: mongoose } = require("mongoose")

const CatSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, `is required`],
        minlength: [2, `name must be at least 2 characters.`]
    },
    type: {
        type: String,
        required: [true, `is required`],
        minlength: [2, `name must be at least 2 characters.`]
    },
    description: {
        type: String,
        required: [true, `is required`],
        minlength: [5, `description must be at least 5 characters.`]
    },
    photo: {
        type: String,
    },
    likes: {
        type: Number
    },
    comments : {
        type : Array
    },
    city : {
        type : String,
        required: [true, `is required`],
    },
    
    },  {timestamps: true}
);

const Cat = mongoose.model('Cat', CatSchema);//(table name, instructions)

module.exports = Cat;