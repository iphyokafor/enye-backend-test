const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async(req, res) => {
    let { base, currency } = req.query;
    const url = "https://api.exchangeratesapi.io/latest";
    // console.log(base, currency);
    try {
        const fetchExchangeRates = await fetch(
            `${url}?base=${base}&currency=${currency}`
        );

        const result = await fetchExchangeRates.json();
        const rates = {};
        currency.split(",").map((item) => {
            if (!result.rates[item]) {
                return res.status(400).json({
                    message: "Please Check that all currencies entered are correct",
                });
            }
            return (rates[item] = result.rates[item]);
        });

        return res.status(200).json({
            results: {
                base: result.base,
                date: result.date,
                rates,
            },
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;