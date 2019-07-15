const getVagas = dbConnection =>{
    
  return  async (req, res) => {
        const db = await dbConnection
        const categoriasDb = await db.all('select * from categorias')
        const vagas = await db.all('select * from vagas')
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
    const db = await dbConnection
  
    const vaga = await db.get(`select * from vagas where id= ${req.params.id}`)
    res.render('vaga', { vaga })
  }
}
module.exports = {
  getVagas,
  getVaga
}
