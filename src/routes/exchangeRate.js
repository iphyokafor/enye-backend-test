const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async(req, res) => {
    const url = "https://api.exchangeratesapi.io/latest";
    try {
        let { base, currency } = req.query;
        const fetchAllExchangeRates = Object.keys(req.query).length ?
            await fetch(`${url}?base=${base}&currency=${currency}`) :
            await fetch(`${url}`);
        const results = await fetchAllExchangeRates.json();
        if (base && currency) {
            const rates = {};
            if (results.error) {
                return res.status(400).json(results);
            }
            const currencyArray = currency
                .split(",")
                .map((item) => item.replace(/^\s+|\s+$|\s+(?=\s)/g, ""));
            const isValidCurrency = currencyArray.every(
                (currency) => results.rates[currency]
            );
            if (!isValidCurrency) {
                return res.status(400).json({
                    message: "Please Check that all currencies entered are correct",
                });
            }
            currencyArray.map((item) => (rates[item] = results.rates[item]));
            return res.status(200).json({
                results: {
                    base: results.base,
                    date: results.date,
                    rates,
                },
            });
        }
        return res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;