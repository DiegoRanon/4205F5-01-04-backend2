const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const employeurSchema = new Schema({
    nom:{type: String,required: true},
    nomEntreprise:{type: String,required: true},
    adresseEntreprise:{type: String,required: true},
    email:{type: String, required: true},
    motdepasse:{type: String, required: true},
    numTel:{type: String,required: true},
    posteTel:{type: String,required: true},
    userType:{type: String,required: true}
});

module.exports = mongoose.model("Employeur", employeurSchema);