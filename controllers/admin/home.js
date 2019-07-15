const init = dbConnection =>{
    return async (req, res) => {
        res.render('admin/home')
      }
}
module.exports = init