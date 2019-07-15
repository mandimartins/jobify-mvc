const getCategorias = (dbConnection) =>{
    return async (req, res) => {
        const db = await dbConnection
        const categorias = await db.all('select * from categorias')
      
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
        const db = await dbConnection
        await db.run(`insert into categorias ( categoria ) values ( '${categoria}')`)
        res.redirect('/admin/categorias')
    }
}

const getEditCategoria = (dbConnection)=>{
    return  async (req, res) => {
        const { id } = req.params
        const db = await dbConnection
        const categoria = await db.get('select * from categorias where id=' + id)
        res.render('admin/editar-categoria', { categoria })
      }
}
const postEditCategoria = dbConnection =>{
    return async (req, res) => {
        const { categoria } = req.body
        const { id } = req.params
        const db = await dbConnection
        await db.run(`update categorias set categoria='${categoria}' where id=${id}`)
        res.redirect('/admin/categorias')
      }
}
const deleteCategoria = dbConnection =>{
    return async (req, res) => {
        const db = await dbConnection
        await db.run(`delete from categorias where id=${req.params.id}`)
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