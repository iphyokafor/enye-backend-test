const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    res.send("Welcome to the exchange rate api.");
});

module.exports = router;