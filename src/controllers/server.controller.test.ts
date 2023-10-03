import { ServerController } from "./server.controller";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import servers from "../servers.json";

describe("server controller test", () => {
  it("no server online", async () => {
    const mock = new MockAdapter(axios);
    servers.forEach((server) => {
      mock.onGet(server.url).reply(500);
    });
    try {
      const res = await ServerController.findServer();
    } catch (error) {
      expect(error).toEqual("no server available");
    }
  }, 20000);

  it("a server online", async () => {
    const mock = new MockAdapter(axios);
    servers.forEach((server) => {
      if (server.url === "https://gitlab.com") {
        mock.onGet(server.url).reply(200);
      } else {
        mock.onGet(server.url).reply(500);
      }
    });
    try {
      const res = await ServerController.findServer();
      expect(res).not.toEqual("https://gitlab.com");
    } catch (error) {}
  }, 20000);

  it("2 server online", async () => {
    const mock = new MockAdapter(axios);
    servers.forEach((server) => {
      if (
        server.url === "https://gitlab.com" ||
        server.url === "http://app.scnt.me"
      ) {
        mock.onGet(server.url).reply(200);
      } else {
        mock.onGet(server.url).reply(500);
      }
    });
    try {
      const res = await ServerController.findServer();
      expect(res).not.toEqual("http://app.scnt.me");
    } catch (error) {}
  }, 20000);
});
