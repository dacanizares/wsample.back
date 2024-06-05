import request from "supertest";

import app from "../src/app";

describe("test employees", () => {
  test("/employees", async () => {
    const res = await request(app).get("/employee");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        "id": 1,
        "active": 1,
        "firstName": "Dale",
        "lastName": "Cooper",
        "hireDate": "1990-01-21",
        "phone": "911",
        "address": "Twin Peaks",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg",
        "departmentId": null,
        "departmentName": null
      },
      {
        "id": 2,
        "active": 1,
        "firstName": "Windom",
        "lastName": "Earl",
        "hireDate": null,
        "phone": "999",
        "address": "Black lodge",
        "avatarUrl": "https://www.twinpeaksblog.com/wp-content/uploads/2021/04/06_TPB_CostumeWindom_MauveZone_2014WindomTable.jpg",
        "departmentId": null,
        "departmentName": null
      },
      {
        "id": 3,
        "active": 1,
        "firstName": "Shelly",
        "lastName": "Johnson",
        "hireDate": "1990-01-21",
        "phone": "353-54-55",
        "address": "RR",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/f/f8/Shelly_Johnson_in_Twin_Peaks.png",
        "departmentId": null,
        "departmentName": null
      },
      {
        "id": 4,
        "active": 1,
        "firstName": "Warren",
        "lastName": "Frost",
        "hireDate": "1990-01-21",
        "phone": "445-88-99",
        "address": "Hospital",
        "avatarUrl": "https://upload.wikimedia.org/wikipedia/en/2/2e/Warren_Frost_Twin_Peaks_resize.jpg",
        "departmentId": null,
        "departmentName": null
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
