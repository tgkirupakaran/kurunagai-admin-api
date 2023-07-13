const uploadFiles = ((req, res) => {
    if (req.file){
        console.log(req.file)
        // Create upload job
        res.status(200).json({message: req.file + " file uploaded"});
    }
    else{
        res.status(200).json({message:"0 files uploaded."});
    }
    
    
})

module.exports = { uploadFiles }