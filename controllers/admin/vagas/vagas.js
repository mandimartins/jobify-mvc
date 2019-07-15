const getVagas = (dbConnection) =>{

    return async (req, res) => {
        const db = await dbConnection
        const vagas = await db.all('select * from vagas')
      
        res.render('admin/vagas', { vagas })
    }
}

const getNewVaga = (dbConnection )=>{
    return async (req, res) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias')
    res.render('admin/nova-vaga', { categorias })
  }
}
const postNewVaga = (dbConnection)=>{
    return async (req, res) => {
        const { titulo, descricao, categoria } = req.body
        const db = await dbConnection
        await db.run(`insert into vagas (titulo, descricao, categoria ) values ( '${titulo}', '${descricao}', ${categoria})`)
        res.redirect('/admin/vagas')
      }
}

const getEditVaga = (dbConnection)=>{
    return async (req, res) => {
        const { id } = req.params
        const db = await dbConnection
        const vaga = await db.get(`select * from vagas where id=${id}`)
        const categorias = await db.all('select * from categorias')
        res.render('admin/editar-vaga', { vaga, categorias })
    }
}
const postEditVaga = dbConnection =>{
    return async (req, res) => {
        const { titulo, descricao, categoria } = req.body
        const { id } = req.params
        const db = await dbConnection
        await db.run(`update vagas set titulo='${titulo}', descricao='${descricao}', categoria=${categoria} where id=${id}`)
        res.redirect('/admin/vagas')
      }
}

const deleteVaga = (dbConnection) =>{
    return async (req, res) => {
        const db = await dbConnection
        await db.run(`delete from vagas where id=${req.params.id}`)
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