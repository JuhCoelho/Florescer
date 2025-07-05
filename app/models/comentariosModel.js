var db = require("../../config/pool_conexoes");
const comentariosModel = {
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM comentarios ORDER BY id DESC");
    return rows;
  },


    listarTudo: async () => {
     const [fotos] = await db.query("SELECT * FROM galeria ORDER BY id DESC");
    return fotos;

},


 findPage: async (inicio, total) => {
  try {
    const [linhas] = await db.query(
      'SELECT * FROM comentarios ORDER BY id DESC LIMIT ?, ?',
      [inicio, total]
    );
    return linhas;
  } catch (error) {
    return [];
  }
},

totalReg: async (dados) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS total FROM comentarios');
    return rows; // isso será um array [{ total: número }]
  } catch (error) {
    console.error("Erro na contagem:", error);
    return [{ total: 0 }];
  }
},



 create: async (dados) => {
  const [result] = await db.query(
    "INSERT INTO comentarios (nome, funcao, texto, data_criacao) VALUES (?, ?, ?, NOW())",
    [dados.nome, dados.funcao, dados.texto]
  );
  return result;
},

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM comentarios WHERE id = ?", [id]);
    return result;
  },




};

module.exports = comentariosModel;
