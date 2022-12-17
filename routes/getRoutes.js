const express = require("express");
const { stat } = require("fs");
const routes = express.Router();
const main = require("../scrapeFn/scrape");
const path = require("path");

routes.post("/indeed", async (req, res) => {
  try {
    const { skill } = req.body;
    let scrp = await main(skill);
    return res.status(200).json({ status: "ok ", list: scrp?.list || {} });
  } catch (error) {
    return res.status(500).send(error);
  }
});

routes.get("/getData", async (req, res) => {
  try {
    const jobs = path.join(__dirname, "..", "job.json");
    return res.status(200).sendFile(jobs);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = routes;
