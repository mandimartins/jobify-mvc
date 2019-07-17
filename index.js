const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const routes = require('./routes/index')

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

app.use(routes(dbConnection))

const createTableIfNotExists = async ()=>{

   await dbConnection.schema.hasTable('categorias').then(async(exists)=> {
    if (!exists) {
      return await dbConnection.schema.createTable('categorias', function(t) {
        t.increments('id').primary();
        t.text('categoria');
      });
    }
  });

  await dbConnection.schema.hasTable('vagas').then(async(exists)=>{
    if (!exists) {
      return dbConnection.schema.createTable('vagas', function(t) {
        t.increments('id').primary();
        t.integer('categoria')
        t.text('titulo')
        t.text('descricao');
      });
    }
  });

}

createTableIfNotExists()

app.listen(port, (err) => {
  if (err) {
    console.log('Nao foi possivel acessar o servidor')
  } else {
    console.log('Servidor iniciado na porta 3001')
  }
})