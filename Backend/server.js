import app from "./app.js";
import { db } from "./config/db.js";

db();

app.listen(process.env.PORT, () =>
  console.log(`LocalHost Running at PORT ${process.env.PORT}`),
);
