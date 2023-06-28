const express = require("express");
const router = express.Router();
const Model = require("../models").Invite;
const query = require("../interfaces/query/fetch");
const create = require("../interfaces/command/create");
const update = require("../interfaces/command/update");
const del = require("../interfaces/command/delete");

// Create a Model
router.post("/", async (req, res) => {
  let result = await create.createOne(req, Model);
  res.status(result.statusCode).json(result);
});

// Retrieve all items
router.get("/", async (req, res) => {
  let result = await query.getAll(req, Model);
  res.status(result.statusCode).json(result);
});

// Retrieve a item by ID
router.get("/:id", getItem, (req, res) => {
  res.json(res.content);
});

// Update a item
router.patch("/:id", getItem, async (req, res) => {
  const result = await update.updateItem(req, res.item);
  res.status(result.statusCode).json(result);
});

// Delete a item
router.delete("/:id", getItem, async (req, res) => {
  const result = await del.deleteItem(res.item);
  res.status(result.statusCode).json(result);
});

// Verifiy Email ID
router.get("/verify/:id", getItem, (req, res) => {
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
        let updMessage = {
          status: "VERIFIED",
        };
        // Updating Verification
        update
          .updateItem(updMessage, res.item)
          .then((result) => {
            res.status(200).json({
              statusCode: 200,
              succeded: true,
              data: {
                message:
                  "Email id " +
                  result.data.email_id +
                  " for " +
                  result.data.role +
                  "is verified.",
              },
            });
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
});

// Middleware to get a item by ID
async function getItem(req, res, next) {
  const result = await query.getOneById(req, Model);
  if (result.statusCode == 200) {
    res.item = result.data;
    res.content = result;
    next();
  } else {
    res.status(result.statusCode).json(result);
  }
}

module.exports = router;
