const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Auto = new Schema(
    {
        value: { type: String, required: true },
    },
);

// Add plugins
mongoose.plugin(slug);
Auto.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Auto', Auto);
