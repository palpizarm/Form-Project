const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
module.exports = router;

//Create Template
router.post('/create', async (req, res) =>{

    const validacion = await Template.count({title: req.body.title});

    if (validacion==0){
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
                errorCode: 0,
                errorMsg: "Template agregado.",
                data : savedTemplate
            });
        }
        catch(error){
            res.json({message: error});
        }

    }else{
        res.json({
            errorCode: -1,
            errorMsg: "Plantilla ya existe.",
            data : template
        });
    } 
});


/*
METHOD: GET
Description: get all form templates into collections
*/
//Read de todos los Templates
router.get('/',async (req, res)=>{
    try{
        const template = await Template.find()
        res.json({
            errorCode: 0,
            errorMsg: "",
            data : template
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB Error",
            data : error
        });
    }
});