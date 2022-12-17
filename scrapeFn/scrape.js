const puppeteer = require("puppeteer");
const data = { list: [] };

const fs = require("fs");

async function main(skill) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(`https://in.indeed.com/m/jobs?q=${skill}&l=`, {
    timeout: 0,
    waitUntil: "networkidle0",
  });

  const jobData = await page.evaluate(async (data) => {
    const items = document.querySelectorAll("td.resultContent");
    items.forEach((item, index) => {
      console.log(`scraping data of product: ${index}`);
      const title =
        item.querySelector("h2.jobTitle>a") &&
        item.querySelector("h2.jobTitle>a").innerText;
      const link =
        item.querySelector("h2.jobTitle>a") &&
        item.querySelector("h2.jobTitle>a").href;
      let salary =
        item.querySelector("div.metadata.salary-snippet-container > div") &&
        item.querySelector("div.metadata.salary-snippet-container > div")
          .innerText;
      const companyName =
        item.querySelector("span.companyName") &&
        item.querySelector("span.companyName").innerText;

      if (salary === null) {
        salary = "not available";
      }

      data.list.push({
        title: title,
        salary: salary,
        companyName: companyName,
        link: link,
      });
    });
    return data;
  }, data);

  console.log("succesfully collected ${jobdata.length} product");

  let response = await jobData;
  let json = JSON.stringify(jobData, null, 2);
  fs.writeFile("job.json", json, "utf8", () => {
    console.log("written in job.json");
  });

  browser.close();
  return response;
}
module.exports = main;
