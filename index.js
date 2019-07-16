const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const publicController = require('./controllers/public/public')
const adminController = require('./controllers/admin/index')

const dbConnection = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./banco.sqlite"
  }
});

const port = process.env.PORT || 3001


app.use('/admin',(req, res, next)=>{
    if(req.hostname ==='localhost'){
      next()
    }else{
      res.send('Not allowed')
    }
})

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))

//==========================START HERE ====================================

app.get('/',publicController.getVagas(dbConnection))

app.get('/vaga/:id',publicController.getVaga(dbConnection))

app.get('/admin',adminController.getHomeAdmin(dbConnection))

app.get('/admin/vagas',adminController.vagas.getVagas(dbConnection))

app.get('/admin/vagas/nova',adminController.vagas.getNewVaga(dbConnection))

app.post('/admin/vagas/nova',adminController.vagas.postNewVaga(dbConnection))

app.get('/admin/vagas/editar/:id',adminController.vagas.getEditVaga(dbConnection))

app.post('/admin/vagas/editar/:id', adminController.vagas.postEditVaga(dbConnection))

app.get('/admin/vagas/delete/:id', adminController.vagas.deleteVaga(dbConnection))


app.get('/admin/categorias', adminController.categorias.getCategorias(dbConnection))

app.get('/admin/categoria/nova',adminController.categorias.getNewCategoria())

app.post('/admin/categoria/nova',adminController.categorias.postNewCategoria(dbConnection))

app.get('/admin/categoria/editar/:id',adminController.categorias.getEditCategoria(dbConnection))

app.post('/admin/categoria/editar/:id',adminController.categorias.postEditCategoria(dbConnection))

app.get('/admin/categoria/delete/:id',adminController.categorias.deleteCategoria(dbConnection))


// const init = async () => {
//   const db = await dbConnection
//   await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')
//   await db.run(
//     'create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);',
//   )
// }
// init()

app.listen(port, (err) => {
  if (err) {
    console.log('Nao foi possivel acessar o servidor')
  } else {
    console.log('Servidor iniciado na porta 3001')
  }
})
