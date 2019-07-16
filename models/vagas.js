const getAllVagas = (dbConnection) =>{
    return async()=>{
        const vagas = await dbConnection('vagas').select('*')
        return vagas
    }
}

const getVagaById = (dbConnection) =>{

    return async(id)=>{
        const vaga = await dbConnection.select('*').from('vagas').where('id',id)
        return vaga
    }
}
const insertVaga = (dbConnection) =>{
    return async ({categoria, titulo,descricao})=>{
        await dbConnection('vagas').insert({categoria,titulo,descricao})
    }
}

const deleteVaga = (dbConnection)=>{
    return async (id)=>{
      await dbConnection('vagas').where({
            id
        }).del()
    }
}

const updateVaga = (dbConnection)=>{
    return async ({categoria,titulo,descricao},id)=>{

        await dbConnection('vagas').where({id}).update({
            categoria,
            titulo,
            descricao
        })
    }
}

module.exports = {
    getAllVagas,
    getVagaById,
    insertVaga,
    updateVaga,
    deleteVaga
}