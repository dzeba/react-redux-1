const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

server.use(jsonServer.bodyParser);

const token = "some_token";

server.post("/login", (req, res) => {
  if (req.body.login === "admin" && req.body.password === "admin") {
    res.json({
      token: token
    });
  } else {
    res.sendStatus(401);
  }
});

function isAuthorized(req) {
  return (
    req.headers.authorization && req.headers.authorization === `Bearer ${token}`
  );
}

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    res.sendStatus(401);
  }
});

// server.use((req, res, next) => {
//   if (req.method === "POST") {
//     req.body.createdAt = Date.now();
//   }
//   // Continue to JSON Server router
//   next();
// });

// Use default router
server.use(router);
server.listen(3004, () => {
  console.log("JSON Server is running");
});
