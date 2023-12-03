const  mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Cateegory needs a name"]
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    lastUpdatedAt: {
        type: Date,
        default: () => Date.now()
    }

});

// Create and eport models
const categoryModel = mongoose.model("User", categorySchema);
module.exports = categoryModel;