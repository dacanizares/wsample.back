import request from "supertest";

import app from "../src/app";

describe("test departments", () => {
  test("/department", async () => {
    const res = await request(app).get("/department");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        "id": 1,
        "name": "Human Resources"
      },
      {
        "id": 2,
        "name": "Computer Science"
      },
      {
        "id": 3,
        "name": "Software Development"
      },
      {
        "id": 4,
        "name": "3D art"
      },
      {
        "id": 5,
        "name": "Music"
      }
    ]);
  });

  test("/department/999 not exists", async () => {
    const res = await request(app).get("/department/999");
    expect(res.status).toEqual(404);
  });
});
