const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const coordonnateurSchema = new Schema({
    nomInstitution:{type: String,required: true},
    nom:{type: String,required: true},
    prenom:{type: String,required: true},
});

module.exports = mongoose.model("coordonnateur", coordonnateurSchema);