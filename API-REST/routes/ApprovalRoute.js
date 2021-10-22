//Imports.
const express = require('express');
const router = express.Router();
module.exports = router;
const ApprovalRoute = require('../models/FormRoute');


/*
Method: GET.
Description: Returns all existing approval routes.
Request URL: http://localhost:3000/formRoute/
*/
router.get('/', async (req, res)=>{

    try{
        const appRoute = await ApprovalRoute.find();
        res.json({
            code: 1,
            msg: "",
            data : appRoute
        });

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }
});


/*
Method: GET.
Description: Returns all existing approval routes for a specific sender.
Request URL: http://localhost:3000/formRoute/getUser/:sender
*/
router.get('/getUser/:sender', async (req, res)=>{

    try{
        pSender = req.params.sender;
        const appRoute = await ApprovalRoute.find({sender: pSender});

        res.json({
            code: 0,
            msg: "",
            data: appRoute
        });

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }

});


/*
Method: POST.
Description: Create a new approval route for a specific Template.
Request URL: http://localhost:3000/formRoute/
*/
router.post('/', async (req, res)=>{

    try{
        var appRouteVal = await ApprovalRoute.count({sender:req.body.sender, formTitle: req.body.formTitle});

        //Validates that there is no approval route for a form.
        if(appRouteVal > 0){

            res.json({
                code: -1,
                msg: "Ya existe un approval route con ese Form y Sender",
                data: ""
            });

        }else{

            const appRoute = new ApprovalRoute({
                formTitle: req.body.formTitle,
                sender: req.body.sender,
                receivers: req.body.receivers,
                approvalsRequired: req.body.approvalsRequired
            });
            appRoute.save();

            res.json({
                code: 0,
                msg: "Ruta de aprobación creada con éxito.",
                data: appRoute
            });
        }

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }
});


/*
Method: DELETE.
Description: Delete an approval route by their id.
Request URL: http://localhost:3000/formRoute/deleteId
*/
router.delete('/deleteId', async (req, res)=>{

    try{
        const pId = req.body.id;
        const appRoute = await ApprovalRoute.deleteOne({_id: pId});

        res.json({
            code: 0,
            errorMsg: "Ruta de aprobación eliminada con éxito.",
            data: appRoute
        });

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }

});


/*
Method: DELETE.
Description: Delete an approval route by their sender and form title.
Request URL: http://localhost:3000/formRoute/deleteUserRoute
*/
router.delete('/deleteUserRoute', async (req, res)=>{

    try{
        const pSender = req.body.sender;
        const pForm = req.body.formTitle;
        const appRoute = await ApprovalRoute.deleteOne({sender: pSender, formTitle: pForm});

        res.json({
            errorCode: 0,
            errorMsg: "Ruta de aprobación eliminada con éxito.",
            data: appRoute
        });

    }catch(error){
        res.json({
            code: -1,
            msg: "MongoDB ERROR",
            data: error
        });
    }
});