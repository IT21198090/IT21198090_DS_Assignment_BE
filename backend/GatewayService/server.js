const express = require("express");
const http = require("http");

const app = express();
const PORT = 4005;

// Define the hostnames and ports for your microservices using environment variables
const userServiceHost = "localhost";
const userServicePort = 8000;
const instructorServiceHost = "localhost";
const instructorServicePort = 8001;
const studentServiceHost = "localhost";
const studentServicePort = 8003;
const contentServiceHost = "localhost";
const contentServicePort = 8004;
const courseServiceHost = "localhost";
const courseServicePort = 8006;
const enrollmentServiceHost = "localhost";
const enrollmentServicePort = 8008;
const paymentServiceHost = "localhost";
const paymentServicePort = 8009;
// Function to create a simple proxy request
const proxyRequest = (req, res, targetHost, targetPort) => {
  const options = {
    hostname: targetHost,
    port: targetPort,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = http.request(options, function (r) {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });
  proxy.on("error", function (e) {
    res.status(500).send("Something went wrong on the server");
    console.error(e);
  });
};

// Routes
app.all("/api/users/*", (req, res) =>
  proxyRequest(req, res, userServiceHost, userServicePort)
);
app.all("/api/instructors/*", (req, res) =>
  proxyRequest(req, res, instructorServiceHost, instructorServicePort)
);

app.all("/api/students/*", (req, res) =>
  proxyRequest(req, res, studentServiceHost, studentServicePort)
);
app.all("/api/contents/*", (req, res) =>
  proxyRequest(req, res, contentServiceHost, contentServicePort)
);
app.all("/api/courses/*", (req, res) =>
  proxyRequest(req, res, courseServiceHost, courseServicePort)
);
app.all("/api/enrollments/*", (req, res) =>
  proxyRequest(req, res, enrollmentServiceHost, enrollmentServicePort)
);
app.all("/api/payments/*", (req, res) =>
  proxyRequest(req, res, paymentServiceHost, paymentServicePort)
);

// Start the server
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
