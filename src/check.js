const chalk = require("chalk");
const log = console.log;
const checkNumber = require("./utils/checkNumber");

(async () => {
	if (process.argv.length < 3) {
		log(chalk.red.bold("No Phone Number has been passed"));
		log(chalk.blue("Example: npm run check 919898989898"));
		process.exit(0);
	}
	const phoneNumber = process.argv[2];
	log(chalk.blue(`Checking for Existence : ${phoneNumber}`));
	const numberExists = await checkNumber(phoneNumber);
	if (numberExists) log(chalk.green.bold("Number Exists on Whatsapp"));
	else log(chalk.red.bold("Number doesn't exist on Whatsapp"));
	process.exit(0);
})();
