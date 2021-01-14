const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async(req, res) => {
    const url = "https://api.exchangeratesapi.io/latest";
    try {
        const fetchAllExchangeRates = await fetch(`${url}`);
        const results = await fetchAllExchangeRates.json();

        if (req.query) {
            let { base, currency } = req.query;
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
        }
        return res.status(200).json(results);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;