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