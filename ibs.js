import * as http from "http";

const port = "8080"
const host = "localhost";

let ipStore;

const getRequestBody = async request => new Promise((resolve, reject) => {
	let body = "";

	request.on("data", chunk => {
		body += chunk;
	});

	request.on("end", () => {
		resolve(body);
	});
});

const server = http.createServer(async (request, response) => {
	if (request.method == "GET") {
		if (!ipStore) {
			response.writeHead(404);
			response.end("No IP broadcasted\n");
		} else {
			response.writeHead(200);
			response.end(`${ipStore}\n`);
		}

		return;
	}

	if (request.method == "POST") {
		ipStore = await getRequestBody(request);

		response.writeHead(200);
		response.end("POST received");
		return;
	}

	response.write(405);
	response.end("Method not allowed")
});

server.listen(port, host, () => {
	console.log(`Server is now open on ${host}:${port}`);
});
