const express = require('express');
const router = express.Router();
module.exports = router;
const ApprovalRoute = require('../models/FormRoute');

/*
METHOD: POST
insert new form route
*/
router.post('/',async (req, res)=>{
    try{
        var appRouteVal = await ApprovalRoute.count({sender:req.body.sender,formTitle: req.body.formTitle});
        if(appRouteVal>0){
            res.json({
                errorCode: -1,
                errorMsg: "Ya existe un approval route con ese form y sender",
                data : ""
            });
        }else{
            const appRoute=new ApprovalRoute({
                formTitle: req.body.formTitle,
                sender: req.body.sender,
                receivers: req.body.receivers,
                approvalsRequired:req.body.approvalsRequired
            });
            appRoute.save();
            res.json({
                errorCode: 0,
                errorMsg: "Ruta de aprobación creada",
                data : appRoute
            });
        }
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});

router.get('/',async (req, res)=>{
    try{
        const appRoute = await ApprovalRoute.find();
        res.json({
            errorCode: 1,
            errorMsg: "",
            data : appRoute
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }

});


router.get('/getUser/:sender',async (req, res)=>{
    try{
        pSender=req.params.sender;
        const appRoute = await ApprovalRoute.find({sender:pSender});
        res.json({
            errorCode: 0,
            errorMsg: "",
            data : appRoute
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});

/*
METHOD: Delete
insert delete a route by Id
*/
router.delete('/deleteId',async (req, res)=>{
    try{
        const pId=req.body.id;
        const appRoute = await ApprovalRoute.deleteOne({_id:pId});
        res.json({
            errorCode: 0,
            errorMsg: "Ruta de aprobación eliminada.",
            data : appRoute
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});

/*
METHOD: Delete
insert delete a route by sender and form title
*/
router.delete('/deleteUserRoute',async (req, res)=>{
    try{
        const pSender=req.body.sender;
        const pForm=req.body.formTitle;
        const appRoute = await ApprovalRoute.deleteOne({sender:pSender,formTitle:pForm});
        res.json({
            errorCode: 0,
            errorMsg: "Ruta de aprobación eliminada.",
            data : appRoute
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});