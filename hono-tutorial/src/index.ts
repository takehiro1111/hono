import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import blogs from "./blogs/blogs";
import auth from "./auth/auth"
import { basicAuth } from 'hono/basic-auth'

const app = new Hono();

app.use("*", prettyJSON())

app.use(
  '/auth/*',
  basicAuth({
    username: 'test',
    password: 'test',
  })
)

app.route("/posts", blogs)
app.route("/auth", auth)

export default app;
