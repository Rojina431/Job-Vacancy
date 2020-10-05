const express = require('express');
const rejectRouter = express.Router();
const  Reject  = require("../models/reject");
const  Job  = require("../models/job");

rejectRouter.route('/rejected')
.post((req, res) => {
 
    Reject.find({ jobId:req.body.jobId ,userFrom:req.body.userFrom })
        .exec((err, Reject) => {
            if (err) return res.status(400).send(err)

            var result = false;
            if (Reject.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, rejected: result });

        })

});

rejectRouter.route('/addToRejected')
.post( (req, res) => {

    const reject = new Reject(req.body)

    reject.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true,doc })
    })

});


rejectRouter.route('/removeRejected')
.post( (req, res) => {

    Reject.findOneAndDelete({ jobId:req.body.jobId ,userFrom:req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});


rejectRouter.route('/getRejectedJob')
.post(  (req, res) => {
  if(Job.find()!==null){
    Reject.find({userFrom:req.body.userFrom})
    .exec((err, jobs) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, jobs })
    })
}else{
    return null
}
})


module.exports = rejectRouter;