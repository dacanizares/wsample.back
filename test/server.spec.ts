import request from "supertest";

import app from "../src/app";

describe("test server", () => {
  test("home route", async () => {
    const res = await request(app).get("/");
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('SEM Backend');
  });
});
