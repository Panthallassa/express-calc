const express = require("express");
const app = express();

// Utility function to calculate mean, median, and mode

function calculateMean(nums) {
	return nums.reduce((a, b) => a + b) / nums.length;
}

function calculateMedian(nums) {
	nums.sort((a, b) => a - b);
	const mid = Math.floor(nums.length / 2);
	return nums.length % 2 !== 0
		? nums[mid]
		: (nums[mid - 1] + nums[mid]) / 2;
}

function calculateMode(nums) {
	const freq = {};
	let max = 0,
		mode;

	nums.forEach((n) => {
		freq[n] = (freq[n] || 0) + 1;
		if (freq[n] > max) {
			max = freq[n];
			mode = n;
		}
	});

	return mode;
}

//  Helper function to convert the nums query into an array
function getNums(query) {
	if (!query.nums) {
		throw new Error("nums are required");
	}
	const nums = query.nums.split(",").map(Number);
	if (nums.some(isNaN)) {
		throw new Error("All inputs must be numbers");
	}
	return nums;
}

// Routes

app.get("/mean", (req, res) => {
	try {
		const nums = getNums(req.query);
		return res.json({
			operation: "mean",
			value: calculateMean(nums),
		});
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

app.get("/median", (req, res) => {
	try {
		const nums = getNums(req.query);
		return res.json({
			operation: "median",
			value: calculateMedian(nums),
		});
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

app.get("/mode", (req, res) => {
	try {
		const nums = getNums(req.query);
		return res.json({
			operation: "mode",
			value: calculateMode(nums),
		});
	} catch (e) {
		return res.status(400).json({ error: e.message });
	}
});

if (require.main === module) {
	app.listen(3000, () => {
		console.log("Server running on http://localhost:3000");
	});
}

module.exports = app;
