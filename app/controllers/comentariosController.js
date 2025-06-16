const comentariosModel = require("../models/comentariosModel");
const { body, validationResult } = require("express-validator");

const comentariosController = {
  regrasValidacao: [
    body("nome")
      .isLength({ min: 3, max: 50 })
      .withMessage("Nome deve ter entre 3 e 50 caracteres"),
    body("funcao")
      .isLength({ min: 3, max: 50 })
      .withMessage("Função deve ter entre 3 e 50 caracteres"),
    body("texto")
      .isLength({ min: 5, max: 300 })
      .withMessage("Comentário deve ter entre 5 e 300 caracteres"),
  ],


  listarComentarios: async (req, res) => {
  try {
    let pagina = req.query.pagina === undefined ? 1 : parseInt(req.query.pagina);
    let regPorPagina = 5;
    let inicio = (pagina - 1) * regPorPagina;

    let totalRegistros = await comentariosModel.totalReg();
    console.log("Total registros:", totalRegistros); // debug

    // Verificação segura
    let total = Array.isArray(totalRegistros) && totalRegistros.length > 0
      ? totalRegistros[0].total
      : 0;

    let totalPaginas = Math.ceil(total / regPorPagina);

    let resultados = await comentariosModel.findPage(inicio, regPorPagina);

    let paginador = total <= regPorPagina
      ? null
      : {
          pagina_atual: pagina,
          total_reg: total,
          total_paginas: totalPaginas
        };

 
console.log("Tipo de comentarios:", typeof resultados);
console.log("É array?", Array.isArray(resultados));
console.log("Conteúdo:", resultados);

    res.render("pages/inicio", {
 comentarios: resultados,
      paginador: paginador,
  listaErros: null,
   dadosNotificacao: null,
  dados: {},
  scrollToComments: false, // default false if no errors
});
  } catch (e) {
    console.log("Erro:", e);
    res.json({ erro: "Erro ao buscar comentários" });
  }
},



  adicionarComentario: async (req, res) => {
    const errors = validationResult(req);
   if (!errors.isEmpty()) {
  try {
    const comentarios = await comentariosModel.findAll();
    const regPorPagina = 5;
    const totalRegistros = await comentariosModel.totalReg();
    const total = Array.isArray(totalRegistros) && totalRegistros.length > 0
      ? totalRegistros[0].total
      : 0;
    const totalPaginas = Math.ceil(total / regPorPagina);
    const paginador = total <= regPorPagina ? null : {
      pagina_atual: 1,
      total_reg: total,
      total_paginas: totalPaginas
    };

    return res.render("pages/inicio", {
      comentarios,
      paginador,
      listaErros: errors.array(),
      dadosNotificacao: null,
      dados: req.body,
      scrollToComments: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({ erro: "Falha ao acessar dados" });
  }
}

    const dadosForm = {
      nome: req.body.nome,
      funcao: req.body.funcao,
      texto: req.body.texto,
    };

   try {
  await comentariosModel.create(dadosForm);

  const regPorPagina = 5;
  const pagina = 1; // mostrar página 1 após adicionar
  const inicio = (pagina - 1) * regPorPagina;

  const comentarios = await comentariosModel.findPage(inicio, regPorPagina);

  const totalRegistros = await comentariosModel.totalReg();
  const total = Array.isArray(totalRegistros) && totalRegistros.length > 0
    ? totalRegistros[0].total
    : 0;
  const totalPaginas = Math.ceil(total / regPorPagina);
  const paginador = total <= regPorPagina ? null : {
    pagina_atual: pagina,
    total_reg: total,
    total_paginas: totalPaginas
  };

  res.render("pages/inicio", {
    comentarios,
    paginador, 
    listaErros: null,
    dadosNotificacao: {
      titulo: "Comentário Enviado!", mensagem: "Seu comentário foi salvo.", tipo: "success"
    },
    dados: {},
    scrollToComments: false,
  });

} catch (error) {
  console.log(error);
  res.json({ erro: "Falha ao salvar comentário" });
}

  },


   listarComentariosAdm: async (req, res) => {
   
    try {
      results = await comentariosModel.findAll();
      res.render("pages/adm", { comentarios: results });
    } catch (e) {
      console.log(e); // exibir os erros no console do vs code
      res.json({ erro: "Falha ao acessar dados" });
    }
  },






excluirComentario: async (req, res) => {
    let { id } = req.query;
    try {
      results = await comentariosModel.delete(id);
      res.redirect("/adm");
    } catch (e) {
      console.log(e);
      res.json({ erro: "Falha ao acessar dados" });
    }
  },

};

module.exports = comentariosController;