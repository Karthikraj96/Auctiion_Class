module.exports = function(app){
    app.use("/signup",require('./signup/index'))
    app.use('/signin',require('./signin/index'))
    app.use('/logout',require('./logout/index'))
    app.use('/dashboard',require('./dashboard/index'))
}