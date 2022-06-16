const mongoose = require('mongoose')

const adSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        required: true
    },

    ad_title: {
        type: String,
        required: true
    },

    ad_content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ad', adSchema)