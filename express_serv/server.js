const express = require("express"); //Строка 1
let fs = require("node:fs");
const app = express(); //Строка 2
const port = 8000; //Строка 3

// Сообщение о том, что сервер запущен и прослушивает указанный порт
app.listen(port, () => console.log(`Listening on port ${port}`)); //Строка 6
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
// Создание GET маршрута
app.post("/write_data", (req, res) => {
  const { create1000, create10000, remove1, remove1000, update1000 } =
    req?.body;
  fs.appendFile("exp_df/create1000.txt", "\r\n" + create1000, (err) => {
    if (err) throw err;
  });
  fs.appendFile("exp_df/create10000.txt", "\r\n" + create10000, (err) => {
    if (err) throw err;
  });
  fs.appendFile("exp_df/remove1.txt", "\r\n" + remove1.toString(), (err) => {
    if (err) throw err;
  });
  fs.appendFile(
    "exp_df/remove1000.txt",
    "\r\n" + remove1000.toString(),
    (err) => {
      if (err) throw err;
    }
  );
  fs.appendFile(
    "exp_df/update1000.txt",
    "\r\n" + update1000.toString(),
    (err) => {
      if (err) throw err;
      console.log("Data has been added!");
    }
  );
  console.log("Data has been added!");
  //Строка 9
  res.send({ express: "ok" }); //Строка 10
});
