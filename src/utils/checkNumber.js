const puppeteer = require("puppeteer");

async function checkNumber(phoneNumber) {
	const browser = await puppeteer.launch({
		headless: false,
		userDataDir: "./profileData",
	});
	const page = await browser.newPage();
	await page.goto(
		`https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
		{ waitUntil: "networkidle0" }
	);
	await page.waitForNavigation({
		waitUntil: "networkidle2",
	});
	await new Promise(r => setTimeout(r, 1000)); // Wait for page load - added for cases where networkidle doesn't
	let numberExists = false;
	if ((await page.$("#main")) !== null) numberExists = true;
	await browser.close();
	return numberExists;
}

module.exports = checkNumber;
