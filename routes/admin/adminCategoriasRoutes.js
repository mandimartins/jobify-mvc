const init = dbConnection =>{
    const adminController = require('../../controllers/admin/index')
    const express = require('express')
    const router = express.Router()

    router.get('/', adminController.categorias.getCategorias(dbConnection))
    router.get('/nova',adminController.categorias.getNewCategoria(dbConnection))
    router.post('/nova',adminController.categorias.postNewCategoria(dbConnection))
    router.get('/editar/:id',adminController.categorias.getEditCategoria(dbConnection))
    router.post('/editar/:id',adminController.categorias.postEditCategoria(dbConnection))
    router.get('/delete/:id',adminController.categorias.deleteCategoria(dbConnection))

    return router
}

module.exports = init