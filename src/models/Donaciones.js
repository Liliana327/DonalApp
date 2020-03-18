const mongoose =  require('mongoose');
const { Schema } = mongoose;

const DonacionSchema = new Schema({
    title: { type: String, required: true},
    descripcion: { type: String, required: true},
    imagePath: { type: String},
    fecha: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Donaciones', DonacionSchema);