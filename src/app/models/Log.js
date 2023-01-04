const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Log = new Schema(
    {
        pass: { type: String, required: true },
        time: { type: String },
        wrong: { type: String },
    },
);

// Add plugins
mongoose.plugin(slug);
Log.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Log', Log);
