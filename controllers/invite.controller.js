const update = require('../interfaces/command/update');
const query = require('../interfaces/query/fetch');
const userModel = require('../models').User;

const verifyEmail = (async (req, res) => {
    if (res.item.status == "EXPIRED") {
      res.status(400).json({
        statusCode: 400,
        succeded: false,
        message: "Invite already expired.",
      });
    } else {
      if (res.item.type == "VERIFICATION") {
        if (res.item.status == "VERIFIED") {
          res.status(200).json({
            statusCode: 200,
            succeded: true,
            data: { message: "Email already Verified" },
          });
        } else {
          console.log("Starting Email ID verification for " + req.params.id);
          let updMessage = {"body":{
            status: "VERIFIED",
          }};
          // Updating Verification status
          update
            .updateItem(updMessage, res.item)
            .then((result) => {
              let request = {"params":{"id": result.data.user_id}}  
              //Updating User Status
              query.getOneById(request,userModel).then(
                (user) => {
                    if(user.statusCode==200){
                        let userStatusMsg = {"body":{"status":"ACTIVE"}}
                        update.updateItem(userStatusMsg,user.data).then(
                            (userUpdResult) =>{
                                res.status(200).json({
                                    statusCode: 200,
                                    succeded: true,
                                    data: {
                                    message:
                                        "Email id " +
                                        result.data.email_id +
                                        " for " +
                                        result.data.role +
                                        " is verified.",
                                    },
                                });
                            }
                        )
                    }else{
                        res.status(404).json({
                            statusCode: 200,
                            succeded: true,
                            message: "User not found for the invite."
                        });
                    }
                }
              )
            })
            .catch((err) => {
              res.status(500).json({
                statusCode: 500,
                succeded: true,
                message: err.message,
              });
            });
        }
      } else {
        res.status(400).json({
          statusCode: 400,
          succeded: false,
          message: "Invalid invite type.",
        });
      }
    }
})

module.exports = { verifyEmail }