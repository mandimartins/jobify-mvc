const vagasModel = require('../../../models/vagas')
const categoriaModel = require('../../../models/categorias')

const getVagas = (dbConnection) =>{
    return async (req, res) => {
        const vagas = await vagasModel.getAllVagas(dbConnection)()
        res.render('admin/vagas', { vagas })
    }
}

const getNewVaga = (dbConnection )=>{
    return async (req, res) => {
    const categorias = await categoriaModel.getAllCategorias(dbConnection)()
    res.render('admin/nova-vaga', { categorias })
  }
}
const postNewVaga = (dbConnection)=>{
    return async (req, res) => {
        const vaga = req.body
        await vagasModel.insertVaga(dbConnection)(vaga)
        res.redirect('/admin/vagas')
      }
}

const getEditVaga = (dbConnection)=>{
    return async (req, res) => {

        const vaga = await vagasModel.getVagaById(dbConnection)(req.params.id)
        const categorias = await categoriaModel.getAllCategorias(dbConnection)()
        res.render('admin/editar-vaga', { vaga, categorias })
    }
}
const postEditVaga = dbConnection =>{
    return async (req, res) => {
        const vaga = req.body
        await vagasModel.updateVaga(dbConnection)(vaga,req.params.id)
        res.redirect('/admin/vagas')
      }
}

const deleteVaga = (dbConnection) =>{
    return async (req, res) => {
        await vagasModel.deleteVaga(dbConnection)(req.params.id)
        res.redirect('/admin/vagas')
      }
}

module.exports = {
    getVagas,
    deleteVaga,
    getNewVaga,
    postNewVaga,
    getEditVaga,
    postEditVaga
}