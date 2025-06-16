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


router.get("/abelhas", function (req, res) {
  res.render("pages/abelhas");
});


router.get("/adm", comentariosController.listarComentariosAdm);


router.get("/excluir", function (req, res) {
  comentariosController.excluirComentario(req, res);
});





module.exports = router;












