const express = require('express');
const router = express.Router();
module.exports = router;
const Form = require('../models/Form');
const ApprovalRoute = require('../models/FormRoute');

/*
METHOD: GET
Description: get all form into collections
*/
router.get('/',async (req, res)=>{
    try{
        const form = await Form.find();
        res.json({
            errorCode: 0,
            errorMsg: "",
            data :form
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});

router.post('/',async (req, res)=>{
    try{
        const pSender=req.body.sender
        const pTitle=req.body.title
        var appRoute;
        appRouteC = await ApprovalRoute.count({sender:pSender,formTitle:pTitle});
        if(appRouteC==0){
                res.json({
                    errorCode: -1,
                    errorMsg: "No tiene acceso al Formulario.",
                    data : ""
                });
        }else{
            appRoute = await ApprovalRoute.findOne({sender:pSender,formTitle:pTitle});
            const pReceivers=appRoute.receivers
            const pApprovalsRequired=appRoute.approvalsRequired
            const form=new Form({
                title: pTitle,
                questions:req.body.questions,
                answers:req.body.answers,
                state:"Revision",
                sender:pSender,
                approvers:[],
                rejecters:[],
                receivers:pReceivers
            });
            form.save();
            res.json({
                errorCode: 0,
                errorMsg: "Formulario completado con exito.",
                data : form
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

/*
METHOD: GET 
Description: get all to review form by user (user)
*/
router.get('/toReview/:receiver',async (req, res)=>{//Los que tiene que revisar
    try{
        const pReceiver=req.params.receiver;
        const forms = await Form.find();
        var formsList = [];
        forms.forEach(element => {
            const value = element.receivers.includes(pReceiver);
            if (value){
                formsList.push(element);
            }
        });
        res.json({
            errorCode: 0,
            errorMsg: "",
            data : formsList
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "MongoDB error",
            data : error
        });
    }
});

/*
METHOD: GET
Description: get all form by sender (user)
*/
router.get('/:sender',async (req, res)=>{
    try{
        const user=req.params.sender;
        const form = await Form.find({sender:user});
        res.json({
            errorCode: 0,
            errorMsg: "",
            data :form
        });
    }catch(error){
        res.json({
            errorCode: -1,
            errorMsg: "Error inesperado",
            data : error
        });
    }
});


router.patch('/approve',async (req, res)=>{//Aprobar
    try{
        
        const pReceiver=req.body.receiver;
        const pId=req.body.id;
        const formC = await Form.count({_id:pId});

        if(formC>0){

            const form = await Form.findOne({_id:pId});
            var pApprovers=form.approvers;
            pApprovers.unshift(pReceiver);
            const longApprovers = pApprovers.length;
            const pApprovalsRequired= (await ApprovalRoute.findOne({sender:form.sender, formTitle:form.title})).approvalsRequired;
            

            if(longApprovers == pApprovalsRequired){
                const formUpdated = await Form.updateOne({_id:pId},{approvers:pApprovers,state:"Aceptado"});
                res.json({
                    errorCode: 0,
                    errorMsg: "",
                    data : formUpdated
                });
            }else{
                const formUpdated = await Form.updateOne({_id:pId},{approvers:pApprovers});
                res.json({
                    errorCode: 0,
                    errorMsg: "",
                    data : formUpdated
                });
            }
        }else{
            res.json({
                errorCode: -1,
                errorMsg: "No se encontro el form.",
                data : ""
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

router.patch('/reject',async (req, res)=>{//Rechazar
    try{

        const pReceiver=req.body.receiver;
        const pId=req.body.id;
        const formC = await Form.count({_id:pId});

        if(formC>0){

            const form = await Form.findOne({_id:pId});
            var pRejecters=form.rejecters;
            pRejecters.unshift(pReceiver);
            const longRejecters = pRejecters.length;
            const pApprovalsRequired= (await ApprovalRoute.findOne({sender:form.sender, formTitle:form.title})).approvalsRequired;
            const longReceivers=form.receivers.length

            if((longReceivers - longRejecters) < pApprovalsRequired){
                const formUpdated = await Form.updateOne({_id:pId},{rejecters:pRejecters,state:"Rechazado"});
                res.json({
                    errorCode: 0,
                    errorMsg: "",
                    data : formUpdated
                });
            }else{
                const formUpdated = await Form.updateOne({_id:pId},{rejecters:pRejecters});
                res.json({
                    errorCode: 0,
                    errorMsg: "",
                    data : formUpdated
                });
            }
        }else{
            res.json({
                errorCode: -1,
                errorMsg: "No se encontro el form.",
                data : ""
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

router.delete('/deleteId',async (req, res)=>{
    try{
        const pId=req.body.id;
        const appRoute = await Form.deleteOne({_id:pId});
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
