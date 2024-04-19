import express, { Application } from "express";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.initRouter();
  }

  middleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initRouter() {
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
  }

  initServer(port: number) {
    this.app.listen(port, () => {
      console.log(`[Main][API_SHORTLIFY] Server is running on http://localhost:${port}`);
    });
  }
}
