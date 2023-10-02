const express = require("express");

const controleursEtudiant = require("../controlers/etudiant-controleur");
const router = express.Router();

router.get("/:etudiantId",controleursEtudiant.getEtudiantById);

router.post("/inscription",controleursEtudiant.inscription);

router.patch('/:etudiantId', controleursEtudiant.updateEtudiant);

router.delete('/:etudiantId', controleursEtudiant.supprimerEtudiant);

router.post('/connexion', controleursEtudiant.connexion);

module.exports = router;