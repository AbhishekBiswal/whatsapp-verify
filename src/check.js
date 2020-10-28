const chalk = require("chalk");
const log = console.log;
const puppeteer = require("puppeteer");

(async () => {
	if (process.argv.length < 3) {
		log(chalk.red.bold("No Phone Number has been passed"));
		log(chalk.blue("Example: npm run check 919898989898"));
		process.exit(0);
	}
	const phoneNumber = process.argv[2];
	log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
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
	await new Promise((r) => setTimeout(r, 1000)); // Wait for page load - added for cases where networkidle doesn't work for WA Web. Can be tweaked.
	if ((await page.$("#main")) !== null)
		log(chalk.green.bold("Number Exists on Whatsapp"));
	else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
	await browser.close();
})();
