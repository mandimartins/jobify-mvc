const getAllCategorias = (dbConnection) =>{

    return async()=>{
        const categorias = await dbConnection.select('*').from('categorias')
        return categorias
    }
}

const getCategoriaById = (dbConnection)=>{
    return async(id)=>{
         const categoria = await dbConnection('categorias').where({id})
         return categoria
    
    }
}

const insertCategoria = (dbConnection) =>{
    return async (categoria) =>{

        await dbConnection('categorias').insert({
            categoria
        })
    }
}

const deleteCategoria = (dbConnection)=>{
    return async (id)=>{
        await dbConnection('categorias').where({id}).del()
    }
}

const updateCategoria = (dbConnection) =>{
    return async (id,categoria)=>{
        await dbConnection('categorias').where({id}).update({categoria})
    }
}

module.exports = {
    getAllCategorias,
    getCategoriaById,
    insertCategoria,
    deleteCategoria,
    updateCategoria
}