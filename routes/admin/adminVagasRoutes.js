const init = (dbConnection) =>{
    const adminController = require('../../controllers/admin/index')
    const express  = require('express')
    const router = express.Router()

    router.get('/',adminController.vagas.getVagas(dbConnection))
    router.get('/nova',adminController.vagas.getNewVaga(dbConnection))
    router.post('/nova',adminController.vagas.postNewVaga(dbConnection))
    router.get('/editar/:id',adminController.vagas.getEditVaga(dbConnection))
    router.post('/editar/:id', adminController.vagas.postEditVaga(dbConnection))
    router.get('/delete/:id', adminController.vagas.deleteVaga(dbConnection))

    return router
}
module.exports = init