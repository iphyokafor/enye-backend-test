const express = require("express");
const exchangeRateRouter = require("./routes/exchangeRate");

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use("/api/rates", exchangeRateRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});

module.exports = app;