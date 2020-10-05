const express = require('express');
const jobRouter = express.Router();
const  Job  = require("../models/job");


jobRouter.route('/postJob')
.post( (req, res) => {
 
    const job = new Job(req.body)

    job.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true,doc })
    })

});

jobRouter.route('/removePosted')
.post(  (req, res) => {

   Job.findOneAndDelete({jobId:req.body.jobId, userFrom:req.body.userFrom})
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true, doc })
        })

});

jobRouter.route('/getPostedJob')
.post(  (req, res) => {

    Job.find({userFrom:req.body.userFrom})
    .exec((err, jobs) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, jobs })
    })
})

jobRouter.route('/getJobList')
.post(  (req, res) => {

    Job.find()
    .exec((err, jobs) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true, jobs })
    })
})

module.exports = jobRouter;