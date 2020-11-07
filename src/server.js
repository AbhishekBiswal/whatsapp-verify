const express = require("express");
const app = express();

// Utils
const checkNumber = require("./utils/checkNumber");

// Check Single Number
app.get("/checknumber", async (req, res) => {
	const { phoneNumber } = req.query;
	const exists = await checkNumber(phoneNumber);
	return res.json({ phoneNumber, exists });
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Started Server on port ${process.env.PORT || 3000}`);
});
