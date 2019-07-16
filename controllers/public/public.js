const vagasModel = require('../../models/vagas')
const categoriasModel = require('../../models/categorias')

const getVagas = dbConnection =>{
    
  return  async (req, res) => {

        const categoriasDb = await categoriasModel.getAllCategorias(dbConnection)()
        const vagas = await vagasModel.getAllVagas(dbConnection)()
        const categorias = categoriasDb.map((cat) => {
          return {
            ...cat,
            vagas: vagas.filter((vaga) => vaga.categoria === cat.id)
          }
        })
        res.render('home', { categorias })
    }
}

const getVaga = dbConnection =>{

  return  async (req, res) => {
    const vaga = await vagasModel.getVagaById(dbConnection,req.params.id)()
    
    res.render('vaga', { vaga:vaga[0]})
  }
}
module.exports = {
  getVagas,
  getVaga
}
