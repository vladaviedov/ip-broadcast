import * as https from "https";
import * as http from "http";
import shell from "shelljs";

// Get ip address
const ip = await new Promise((resolve, reject) => {
	shell.exec("ip -f inet addr show proton0", {silent: true}, (code, stdout, stderr) => {
		if (code != 0) {
			console.error(stderr);
			reject();
			return;
		}

		const ipInfo = stdout.split("\n")[1].split("/")[0];
		const ip = ipInfo.trim().substring(5);
		resolve(ip);
	});
});

// Set request params
const options = {
	host: "localhost",
	port: 8080,
	path: "/",
	method: "POST"
};

// Create request
const request = http.request(options, res => {
	console.log("status code: " + res.statusCode);
	process.exit(0);
});
request.on("error", console.error);

// Write body
request.write(ip);
request.end();
