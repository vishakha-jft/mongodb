const Db = require('./models')

async function getemps(req,res){
    try{
        const dbs = await Db.findall()
        if(typeof req.session.edit!=='object'){
            req.session.edit=false
        }
        res.render('ui',{
            dbs,
            edit:req.session.edit
        })
    } catch(error){
        console.log(error)
    }
}
async function getemp(req,res){
    try{
        req.session.edit= await Db.findbyid(req.params.id)   
        res.redirect('/employee')
    } catch(error){
        console.log(error)
    }
}
async function createemp(req,res){
    try{
        const emp = req.body
        await Db.create(emp)
        res.redirect('/employee')
    } catch(error){
        console.log(error)
    }
}
async function updateemp(req,res){
    try{
        const empdata= req.body;
        await Db.update(req.params.id,empdata)
        req.session.edit=false
        res.redirect('/employee')    
    } catch(error){
        console.log(error)
    }
}
async function removeemp(req,res){
    try{
        await Db.remove(req.params.id) 
        res.redirect('/employee')
    } catch(error){
        console.log(error)
    }
}

module.exports = {
    getemps,getemp,createemp,updateemp,removeemp
}
