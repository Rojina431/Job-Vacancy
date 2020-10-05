const express = require('express');
const acceptRouter = express.Router();
const  Accept  = require("../models/accept");
const  Job  = require("../models/job");
acceptRouter.route('/Accepted')
.post((req, res) => {
   
    Accept.find({ jobId:req.body.jobId ,userFrom:req.body.userFrom })
        .exec((err, accept) => {
            if (err) return res.status(400).send(err)

            var result = false;
            if (accept.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, accepted: result });

        })

});

acceptRouter.route('/addToAccepted')
.post( (req, res) => {

    const accept = new Accept(req.body)

    accept.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true,doc })
    })

});


acceptRouter.route('/removeAccepted')
.post( (req, res) => {

   Accept.findOneAndDelete({ jobId:req.body.jobId ,userFrom:req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});


acceptRouter.route('/getAcceptedJob')
.post(  (req, res) => {
    if(Job.find()!==null)
    {Accept.find({userFrom:req.body.userFrom})
    .exec((err, jobs) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, jobs })
    })
}else{
    return null
}
})




module.exports = acceptRouter;