//Imports.
const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
module.exports = router;


/*
Method: GET.
Description: Returns all existing templates.
Request URL: http://localhost:3000/template/
*/
router.get('/', async (req, res)=>{
    try{
        const template = await Template.find()

        res.json({
            code: 0,
            msg: "",
            data: template
        });
        
    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB Error",
            data: error
        });
    }
});


/*
Method: POST.
Description: Create a new template.
Request URL: http://localhost:3000/template/create
*/
router.post('/create', async (req, res) =>{

    const validacion = await Template.count({title: req.body.title});

    if (validacion == 0){

        const template = new Template({
            title: req.body.title,
            questions: req.body.questions,
            type: req.body.type,
            obligatory: req.body.obligatory,
            values: req.body.values
        });

        try{
            const savedTemplate = await template.save();
            res.json({
                code: 0,
                msg: "Template creado con éxito.",
                data: savedTemplate
            });

        }
        catch(error){
            res.json({
                code: -1,
                msg: "MongoDB ERROR",
                data: error
            });
        }

    }else{
        res.json({
            code: -1,
            msg: "El nombre de Template ingresado ya existe.",
            data : ""
        });
    } 
});