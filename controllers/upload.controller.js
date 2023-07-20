const { FlowProducer } =require('bullmq')
const redisOptions = require('../config/redisConfig')

const uploadFiles = (async (req, res) => {
    if (req.file){
        console.log(req.file)
        const unqId = Date.now()
        const flowProducer = new FlowProducer({connection:redisOptions})
        const flow = await flowProducer.add({
            name: 'upload-job',
            queueName: 'upload-jobs',
            data: {ecryptedfilename:'dummy name',filepath:'dummypath'},
            children: [
              { 
                name: 'encrypt-job', 
                data: {filename:'dummy name',ecryptedfilename:'dummy name',filepath:'dummypath'}, 
                queueName: 'upload-jobs'
              },
              { 
                name: 'photo-entry-job', 
                data: {filename:'dummy name',ecryptedfilename:'dummy name',filepath:'dummypath'}, 
                queueName: 'upload-jobs'
              }
            ],
          });
        res.status(200).json({message: req.file + " file uploaded"});
    }
    else{
        res.status(200).json({message:"0 files uploaded."}); 
    }
})

module.exports = { uploadFiles }