const { FlowProducer } =require('bullmq')
const redisOptions = require('../config/redisConfig')
const fs = require('fs')

const uploadFiles = (async (req, res) => {
    if (req.file){
        console.log(req.file)
        const fileStats = fs.statSync(req.file.path)
        console.log(fileStats)
        const flowProducer = new FlowProducer({connection:redisOptions})
        let childJobs = []
        childJobs.push({ 
          name: 'encrypt-job', 
          data: {filename:req.file.filename ,ecryptedfilename:'crypt-'+req.file.filename ,downloadUri:'/tempfiles/'+ req.file.filename,uploadUri:'/api/upload',encryptionKey:''}, 
          queueName: 'upload-jobs'
        })

        const isImage = ["image/png", "image/jpeg", "image/apng", "image/avif", "image/gif","image/svg+xml","image/webp", "image/bmp","image/x-icon","image/tiff"].includes(req.file.mimetype)

        if(isImage){
          childJobs.push({ 
            name: 'meta-data-job', 
            data: {filename:req.file.filename,downloadUri:'/tempfiles/'+ req.file.filename}, 
            queueName: 'upload-jobs'
          })
        }
        await flowProducer.add({
            name: 'upload-job',
            queueName: 'upload-jobs',
            data: {ecryptedfilename:'crypt-'+req.file.filename,downloadUri:'/tempfiles/crypt-'+ req.file.filename,bucketName:'kn-bkt-'+req.user.id},
            children: childJobs,
          });
        res.status(200).json({message: req.file + " file uploaded"});
    }
    else{
        res.status(200).json({message:"0 files uploaded."}); 
    }
})

module.exports = { uploadFiles }