const request = require("supertest");
const app = require("./app");

describe("Mean, Median, and Mode API tests", () => {
	test("/mean with valid input", async () => {
		const response = await request(app).get(
			"/mean?nums=1,2,3,4,5"
		);
		expect(response.body).toEqual({
			operation: "mean",
			value: 3,
		});
	});

	test("/median with valid input", async () => {
		const response = await request(app).get(
			"/median?nums=1,2,3,4,5"
		);
		expect(response.body).toEqual({
			operation: "median",
			value: 3,
		});
	});

	test("/mode with valid input", async () => {
		const response = await request(app).get(
			"/mode?nums=1,1,2,2,2,3,3"
		);
		expect(response.body).toEqual({
			operation: "mode",
			value: 2,
		});
	});

	test("/mean with invalid input", async () => {
		const response = await request(app).get(
			"/mean?nums=1,foo,3"
		);
		expect(response.status).toBe(400);
		expect(response.body.error).toBe(
			"All inputs must be numbers"
		);
	});

	test("/mean with no input", async () => {
		const response = await request(app).get("/mean");
		expect(response.status).toBe(400);
		expect(response.body.error).toBe("nums are required");
	});
});
