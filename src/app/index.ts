import express, { Request, Response } from "express";
import { ServerController } from "../controllers/server.controller";

export const initApp = () => {
  const app = express();
  const port = process.env.PORT ?? 3000;
  const server = app.listen(port, () => {
    console.log("App starting at:", port);
  });

  app.get("/", async (req: Request, res: Response) => {
    try {
      const onlineServer = await ServerController.findServer();
      res.status(200).send(onlineServer);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  return server;
};
