import { initApp } from "../app";
import request from "supertest";

const app = initApp();

describe("testing api", () => {
  it("call find server api", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("http://app.scnt.me");
  }, 20000);
});
