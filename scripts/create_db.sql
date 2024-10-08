DROP TABLE IF EXISTS "history";
DROP TABLE IF EXISTS "employees";
DROP TABLE IF EXISTS "departments";


CREATE TABLE "departments" ("id" int IDENTITY(1,1) PRIMARY KEY, "name" text not null, "creationDate" datetime not null, "modificationDate" datetime not null);

CREATE TABLE "employees" ("id" int IDENTITY(1,1) PRIMARY KEY, "active" integer not null, "firstName" text not null, "lastName" text not null, "hireDate" datetime, "phone" text, "address" text, "avatarUrl" text, "creationDate" datetime not null, "modificationDate" datetime not null, "departmentId" integer references "departments" ("id") on delete NO ACTION);

CREATE TABLE "history" ("id" int IDENTITY(1,1) PRIMARY KEY, "employeeId" integer not null references "employees" ("id") on delete cascade, "departmentId" integer not null references "departments" ("id") on delete cascade, "date" datetime not null);

CREATE INDEX "employee_departmentId_index" on "employees" ("departmentId");
CREATE INDEX "history_index" on "history" ("employeeId", "departmentId");


INSERT INTO "departments" ("name","creationDate","modificationDate") VALUES ('Human Resources','2024-08-27 04:10:52','2024-08-27 04:10:52'),
 ('Computer Science','2024-08-27 04:10:52','2024-08-27 04:10:52'),
 ('Software Development','2024-08-27 04:10:52','2024-08-27 04:10:52'),
 ('3D art','2024-08-27 04:10:52','2024-08-27 04:10:52'),
 ('Music','2024-08-27 04:10:52','2024-08-27 04:10:52');
INSERT INTO "employees" ("active","firstName","lastName","hireDate","phone","address","avatarUrl","creationDate","modificationDate","departmentId") VALUES (1,'Dale','Cooper','1990-01-21','911','Twin Peaks','https://upload.wikimedia.org/wikipedia/en/5/50/Agentdalecooper.jpg','2024-08-27 04:10:52','2024-08-27 04:10:52',NULL),
 (1,'Windom','Earl',NULL,'999','Black lodge','https://www.twinpeaksblog.com/wp-content/uploads/2021/04/06_TPB_CostumeWindom_MauveZone_2014WindomTable.jpg','2024-08-27 04:10:52','2024-08-27 04:10:52',NULL),
 (1,'Shelly','Johnson','1990-01-21','353-54-55','RR','https://upload.wikimedia.org/wikipedia/en/f/f8/Shelly_Johnson_in_Twin_Peaks.png','2024-08-27 04:10:52','2024-08-27 04:10:52',NULL),
 (1,'Warren','Frost','1990-01-21','445-88-99','Hospital','https://upload.wikimedia.org/wikipedia/en/2/2e/Warren_Frost_Twin_Peaks_resize.jpg','2024-08-27 04:10:52','2024-08-27 04:10:52',NULL);

