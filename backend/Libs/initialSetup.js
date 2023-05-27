const Role = require ('../models/rolModel');

const createRol = async ()=>{
    try{
        const count = await Role.estimatedDocumentCount();

        if (count > 0) return;

        const values = await Promise.all([
            new Role({name: "cliente"}).save(),
            new Role({name: "emprendedor"}).save(),
        ])
        console.log(`data ${values}`.bgGreen.underline);
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    createRol
}