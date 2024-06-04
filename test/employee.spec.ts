import request from "supertest";

import app from "../src/app";

describe("test employees", () => {
  test("/employees", async () => {
    const res = await request(app).get("/employee");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        "active": 1, 
        "address": null, 
        "avatarUrl": null, 
        "departmentId": null, 
        "firstName": "Dale", 
        "hireDate": null, 
        "id": 1, 
        "lastName": 
        "Cooper", 
        "phone": null
      }
    ]);
  });

  test("/employees/999 not exists", async () => {
    const res = await request(app).get("/employee/999");
    expect(res.status).toEqual(404);
  });

  test("/employees/togglestatus", async () => {
    const resQuery = await request(app).get("/employee/1");
    expect(resQuery.status).toEqual(200);
    expect(resQuery.body.active).toEqual(1);


    const res = await request(app)
      .post("/employee/togglestatus")
      .send({
        "id": 1,
        "active": 0
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.body.active).toEqual(0);
  });
});
