const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");

const getStages = async (requete, reponse, next) => {
  let stages;

  try {
    stages = await Stage.find({}, "-createur");
  } catch {
    return next(new HttpErreur("Erreur accès stage"), 500);
  }

  reponse.json({
    stages: stages.map((stage) =>
      stage.toObject({ getters: true })
    ),
  });
};

const getStageById = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
  }
  if (!stage) {
    return next(new HttpErreur("Aucun stage trouvée pour l'id fourni", 404));
  }
  reponse.json({ stage: stage.toObject({ getters: true }) });
};

const getStageByCreateur = async (requete, reponse, next) => {
  const employeurId = requete.params.employeurId;
  let stages;
  try {
    stages = await Stage.find({createur:employeurId});
  } catch (err) {
    return next(new HttpErreur("Erreur lors de la récupération du stage", 500));
  }
  if (!stages) {
    return next(new HttpErreur("Aucun stage trouvée pour l'id fourni", 404));
  }
  reponse.json({ stages: stages.map((stage) =>
    stage.toObject({ getters: true })
  )});
};




const creerStage = async (requete, reponse, next) => {
  const {
    nom,
    courriel,
    numeroTel,
    nomEntreprise,
    adresseEntreprise,
    typeStage,
    nombreDePostesDispo,
    descriptionStage,
    remuneration,
    createur
  } = requete.body;

  const nouveauStage = new Stage({
    nom,
    courriel,
    numeroTel,
    nomEntreprise,
    adresseEntreprise,
    typeStage,
    nombreDePostesDispo,
    descriptionStage,
    remuneration,
    createur,
    etudiants:[]
  });


  try {
    await nouveauStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création de stage échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ "success":true, stage: nouveauStage });
};

const updateStage = async (requete, reponse, next) => {
  const { nom, courriel, numeroTel, nomEntreprise, adresseEntreprise, typeStage, nombreDePostesDispo, descriptionStage, remuneration } = requete.body;
  const stageId = requete.params.stageId;

  let stage;

  try {
    stage = await Stage.findById(stageId);
    console.log(stage)
    stage.nom = nom;
    stage.courriel = courriel;
    stage.numeroTel = numeroTel;
    stage.nomEntreprise = nomEntreprise;
    stage.adresseEntreprise = adresseEntreprise;
    stage.typeStage = typeStage;
    stage.nombreDePostesDispo = nombreDePostesDispo;
    stage.descriptionStage = descriptionStage;
    stage.remuneration = remuneration;
    await stage.save();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la mise à jour de la stage", 500)
    );
  }

  reponse.status(200).json({ stage: stage.toObject({ getters: true }) });
};

const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch {
    return next(
      new HttpErreur("Erreur lors de la suppression de la stage", 500)
    );
  }
  if (!stage) {
    return next(new HttpErreur("Impossible de trouver la stage", 404));
  }

  try {
    await stage.remove();
  } catch {
    return next(
      new HttpErreur("Erreur lors de la suppression de la stage", 500)
    );
  }
  reponse.status(200).json({ message: "stage supprimée" });
};

exports.getStageById = getStageById;
exports.creerStage = creerStage;
exports.updateStage = updateStage;
exports.supprimerStage = supprimerStage;
exports.getStages = getStages;
exports.getStageByCreateur = getStageByCreateur;
