const categoriaModel = require('../../../models/categorias')

const getCategorias = (dbConnection) =>{
    return async (req, res) => {
        const categorias = await categoriaModel.getAllCategorias(dbConnection)()
        res.render('admin/categorias', { categorias })
    }
}
const getNewCategoria = () =>{
    return async (req, res) => {
        res.render('admin/nova-categoria')
    }
}

const postNewCategoria = dbConnection =>{
    return  async (req, res) => {
        const { categoria } = req.body
        await categoriaModel.insertCategoria(dbConnection)(categoria)
        res.redirect('/admin/categorias')
    }
}

const getEditCategoria = (dbConnection)=>{
    return  async (req, res) => {
        const { id } = req.params
        const categoria = await categoriaModel.getCategoriaById(dbConnection)(id)
        res.render('admin/editar-categoria', { categoria })
      }
}
const postEditCategoria = dbConnection =>{
    return async (req, res) => {
        const { categoria } = req.body
        const { id } = req.params
        await categoriaModel.updateCategoria(dbConnection)(id,categoria)
        res.redirect('/admin/categorias')
      }
}
const deleteCategoria = dbConnection =>{
    return async (req, res) => {

        await categoriaModel.deleteCategoria(dbConnection)(req.params.id)

        res.redirect('/admin/categorias')
      }
}

module.exports = {
    getCategorias,
    getNewCategoria,
    postNewCategoria,
    getEditCategoria,
    postEditCategoria,
    deleteCategoria
}