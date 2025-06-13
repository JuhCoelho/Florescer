const express = require("express");
const router = express.Router();
const moment = require("moment");


const comentariosController = require("../controllers/comentariosController");



router.get("/", comentariosController.listarComentarios);

router.post(
  "/comentarios",
  comentariosController.regrasValidacao,
  function (req, res) {
    comentariosController.adicionarComentario(req, res);
  }
);

router.get("/comentarios/excluir", function (req, res) {
  comentariosController.excluirComentario(req, res);
});

module.exports = router;












