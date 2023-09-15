import { Elysia, ws, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";

const app = new Elysia().use(cors()).use(swagger());

app
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .get(
    "/",
    ({ query, store, getDate }) => {
      console.log("context:  ", query);
      return { ans: `${store.version} ${getDate()}` };
    },
    {
      query: t.Object({
        name: t.String(),
        age: t.Optional(t.Numeric()),
      }),
    }
  );

app.use(ws()).ws("/ws", {
  message: (ws, msg) => {
    ws.send(`${msg} ${Date.now()}`);
  },
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
