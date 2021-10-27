//Imports.
const express = require('express');
const router = express.Router();
module.exports = router;
const Form = require('../models/Form');
const ApprovalRoute = require('../models/FormRoute');


/*
Method: GET.
Description: Returns all existing created Forms.
Request URL: http://localhost:3000/form/
*/
router.get('/', async (req, res)=>{

    try{
        const form = await Form.find();

        res.json({
            code: 0,
            errorMsg: "",
            data: form
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
Description: Returns to the receiver their available forms to accept or reject.
Request URL: http://localhost:3000/form/toReview/:receiver
*/
router.get('/toReview/:receiver', async (req, res)=>{

    try{
        const pReceiver = req.params.receiver;
        const forms = await Form.find();
        var formsList = [];

        forms.forEach(element => {
            const value = element.receivers.includes(pReceiver);
            if (value) {
                formsList.push(element);
            }
        });

        res.json({
            code: 0,
            msg: "",
            data: formsList
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
Description: Returns all the forms of a specific sender.
Request URL: http://localhost:3000/form/:sender
*/
router.get('/:sender', async (req, res)=>{

    try{
        const user=req.params.sender;
        const form = await Form.find({sender:user});

        res.json({
            code: 0,
            msg: "",
            data: form
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
Description: Register a new form.
Request URL: http://localhost:3000/form/
*/
router.post('/', async (req, res)=>{

    try{
        const pSender=req.body.sender
        const pTitle=req.body.title
        var appRoute;

        appRouteC = await ApprovalRoute.count({sender: pSender, formTitle: pTitle});

        if(appRouteC==0){

            res.json({
                code: -1,
                msg: "No tiene acceso al Formulario.",
                data: ""
            });

        }else{

            appRoute = await ApprovalRoute.findOne({sender: pSender, formTitle: pTitle});
            const pReceivers = appRoute.receivers

            const form = new Form({
                title: pTitle,
                questions: req.body.questions,
                answers: req.body.answers,
                state: "Revision",
                sender: pSender,
                approvers: [],
                rejecters: [],
                receivers: pReceivers
            });
            form.save();

            res.json({
                code: 0,
                msg: "Formulario creado con éxito.",
                data: form
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
Method: PATCH.
Description: Approve a form and change status if necessary.
Request URL: http://localhost:3000/form/approve
*/
router.patch('/approve', async (req, res)=>{

    try{
        
        const pReceiver = req.body.receiver;
        const pId = req.body.id;
        const formC = await Form.count({_id:pId});

        if(formC > 0) {

            const form = await Form.findOne({_id: pId});
            var pApprovers = form.approvers;
            pApprovers.unshift(pReceiver);
            const longApprovers = pApprovers.length;
            const pApprovalsRequired = (await ApprovalRoute.findOne({sender: form.sender, formTitle: form.title})).approvalsRequired;
            
            if(longApprovers == pApprovalsRequired){

                const formUpdated = await Form.updateOne({_id:pId},{approvers:pApprovers,state:"Aceptado"});

                res.json({
                    code: 0,
                    msg: "",
                    data: formUpdated
                });

            }else{
                const formUpdated = await Form.updateOne({_id: pId}, {approvers: pApprovers});

                res.json({
                    code: 0,
                    msg: "",
                    data: formUpdated
                });
            }

        }else{
            res.json({
                code: -1,
                msg: "El Form solicitado no existe.",
                data: ""
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
Method: PATCH.
Description: Reject a form and change status if necessary.
Request URL: http://localhost:3000/form/reject
*/
router.patch('/reject', async (req, res)=>{

    try{
        const pReceiver = req.body.receiver;
        const pId = req.body.id;
        const formC = await Form.count({_id: pId});

        if(formC > 0) {

            const form = await Form.findOne({_id: pId});
            var pRejecters = form.rejecters;
            pRejecters.unshift(pReceiver);
            const longRejecters = pRejecters.length;
            const pApprovalsRequired = (await ApprovalRoute.findOne({sender: form.sender, formTitle: form.title})).approvalsRequired;
            const longReceivers = form.receivers.length;

            if((longReceivers - longRejecters) < pApprovalsRequired) {

                const formUpdated = await Form.updateOne({_id: pId}, {rejecters: pRejecters, state: "Rechazado"});

                res.json({
                    code: 0,
                    errorMsg: "",
                    data: formUpdated
                });

            }else{
                const formUpdated = await Form.updateOne({_id: pId}, {rejecters: pRejecters});

                res.json({
                    code: 0,
                    msg: "",
                    data: formUpdated
                });
            }

        }else{
            res.json({
                code: -1,
                msg: "El Form solicitado no existe.",
                data: ""
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
Description: Delete a form by their id.
Request URL: http://localhost:3000/form/deleteId
*/
router.delete('/deleteId', async (req, res)=>{

    try{
        const pId = req.body.id;
        const appRoute = await Form.deleteOne({_id: pId});

        res.json({
            code: 0,
            errorMsg: "",
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
