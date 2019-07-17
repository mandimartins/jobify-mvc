const init = (dbConnection) =>{

    const publicController = require('../controllers/public/public')
    const adminController = require('../controllers/admin/index')

    const vagasRouter = require('./admin/adminVagasRoutes')
    const categoriasRouter = require('./admin/adminCategoriasRoutes')

    const express = require('express')

    const router = express.Router()

    router.get('/',publicController.getVagas(dbConnection))
    router.get('/vaga/:id',publicController.getVaga(dbConnection))
    router.get('/admin',adminController.getHomeAdmin(dbConnection))
    router.use('/admin/vagas',vagasRouter(dbConnection))
    router.use('/admin/categorias',categoriasRouter(dbConnection))

    return  router
}

module.exports = init