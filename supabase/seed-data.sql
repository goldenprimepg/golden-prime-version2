-- Golden Prime PG Seed Data for Supabase
-- Run this in your Supabase SQL Editor if you want to immediately populate your cloud database with all buildings, rooms, tenants, allocations, and bills.

-- 1. Insert Core Users
INSERT INTO public.users ("openId", "name", "email", "phone", "passwordHash", "loginMethod", "role")
VALUES 
  ('seed-owner-kapil', 'Kapil Yadav', 'kapil.yadav@goldenprimepg.com', '9990636862', '676f6c64656e7072696d657365656431:73da9b7c844391e4f454378f447f54c93540ebf5bc8caee50130f1469e7bebe7051d3ae647575231cfa7e26fc5c79eb46d0a7a3b37937e294b2ffb39c0fa3129', 'phone-password', 'admin'),
  ('seed-manager-goldenprime', 'Shivam Sharma', 'shivam.sharma@goldenprimepg.com', '7668992940', '676f6c64656e7072696d657365656431:2634d28430e75a34ec800539f1c7dcfdf9d4352feae60d70da6b9c9ea47b31498b31ea6d934bb67a4d5386f68c34ea81a54fcbe8905b63cfba8a8344c8ebca73', 'phone-password', 'manager'),
  ('seed-tenant-shashank', 'Shashank', 'shashank@goldenprimepg.com', '6307500844', '676f6c64656e7072696d657365656431:b3a241477759247656d091e9f1a268e3d6f1a8e1008d7486e92ce01d812239d6b1d1f038ea82cf91c49987ce805a507851253457a8ee95a32b2d7cb6d13e31ff', 'phone-password', 'tenant'),
  ('seed-tenant-tanu', 'Tanu', 'tanu@goldenprimepg.com', '8081368879', '676f6c64656e7072696d657365656431:9a8d542031c519280d5bfa780d35967b07d6ce1f0d23f79025e1a129efbbf9683935db2bb3111fdb45423f85888e9947aa521ca4d0847779d7240367eb70b21a', 'phone-password', 'tenant'),
  ('seed-tenant-nimmi', 'Nimmi', 'nimmi@goldenprimepg.com', '9000000301', '676f6c64656e7072696d657365656431:f5e9da891ef97c7247385973e3e29f3d6dbf08efea296230f653453b342416b67ea9a29e71ec26a849492e86b77943d2c88463c7b6408fcfae29f074d0a653bb', 'phone-password', 'tenant'),
  ('seed-tenant-neelam', 'Neelam', 'neelam@goldenprimepg.com', '9000000302', '676f6c64656e7072696d657365656431:f5e9da891ef97c7247385973e3e29f3d6dbf08efea296230f653453b342416b67ea9a29e71ec26a849492e86b77943d2c88463c7b6408fcfae29f074d0a653bb', 'phone-password', 'tenant'),
  ('seed-tenant-mansi', 'Mansi', 'mansi@goldenprimepg.com', '9000000102', '676f6c64656e7072696d657365656431:f5e9da891ef97c7247385973e3e29f3d6dbf08efea296230f653453b342416b67ea9a29e71ec26a849492e86b77943d2c88463c7b6408fcfae29f074d0a653bb', 'phone-password', 'tenant'),
  ('seed-tenant-rahul', 'Rahul', 'rahul@goldenprimepg.com', '9000000104', '676f6c64656e7072696d657365656431:f5e9da891ef97c7247385973e3e29f3d6dbf08efea296230f653453b342416b67ea9a29e71ec26a849492e86b77943d2c88463c7b6408fcfae29f074d0a653bb', 'phone-password', 'tenant')
ON CONFLICT ("openId") DO NOTHING;

-- 2. Insert Building
INSERT INTO public.buildings ("id", "name", "address", "city", "landmark", "contactPhone", "ownerCutPercent", "ownerMonthlyCutPaise", "electricityRatePaise", "rentDueDay", "currency", "ownerId")
SELECT 1, 'GOLDEN PRIME PG', 'Plot 42, Sector 28, Golf Course Road', 'Gurugram', 'Near Rapid Metro Station', '9990636862', 0, 7000000, 1200, 5, 'INR', u.id
FROM public.users u WHERE u."openId" = 'seed-owner-kapil'
ON CONFLICT ("id") DO NOTHING;

-- 3. Staff Assignment
INSERT INTO public."staffAssignments" ("buildingId", "userId")
SELECT 1, u.id FROM public.users u WHERE u."openId" = 'seed-manager-goldenprime'
ON CONFLICT ("buildingId", "userId") DO NOTHING;

-- 4. Floors
INSERT INTO public.floors ("id", "buildingId", "name", "level")
VALUES 
  (1, 1, 'Floor 1', 1),
  (2, 1, 'Floor 2', 2),
  (3, 1, 'Floor 3', 3),
  (4, 1, 'Terrace', 4)
ON CONFLICT ("id") DO NOTHING;

-- 5. Rooms
INSERT INTO public.rooms ("id", "buildingId", "floorId", "number", "capacity", "roomType", "billingMode", "airConditioning", "balcony", "defaultRentPaise")
VALUES 
  (102, 1, 1, '102', 3, 'triple', 'equal_split', 'non_ac', 'balcony', 500000),
  (104, 1, 1, '104', 2, 'double', 'equal_split', 'non_ac', 'balcony', 600000),
  (301, 1, 3, '301', 2, 'double', 'equal_split', 'non_ac', 'balcony', 1200000),
  (302, 1, 3, '302', 2, 'coliving', 'primary_payer', 'non_ac', 'balcony', 1300000)
ON CONFLICT ("id") DO NOTHING;

-- 6. Tenants
INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 1, 1, u.id, 'Shashank', '6307500844', 'shashank@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-shashank'
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 2, 1, u.id, 'Tanu', '8081368879', 'tanu@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-tanu'
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 3, 1, u.id, 'Rahul', '9000000104', 'rahul@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-rahul'
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 4, 1, u.id, 'Nimmi', '9000000301', 'nimmi@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-nimmi'
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 5, 1, u.id, 'Neelam', '9000000302', 'neelam@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-neelam'
ON CONFLICT ("id") DO NOTHING;

INSERT INTO public.tenants ("id", "buildingId", "userId", "fullName", "phone", "email", "status")
SELECT 6, 1, u.id, 'Mansi', '9000000102', 'mansi@goldenprimepg.com', 'active' FROM public.users u WHERE u."openId" = 'seed-tenant-mansi'
ON CONFLICT ("id") DO NOTHING;

-- 7. Allocations
INSERT INTO public."roomAllocations" ("id", "buildingId", "roomId", "tenantId", "activeTenantId", "moveInDate", "bedLabel", "isPrimaryPayer", "monthlyRentPaise", "depositPaise", "status")
VALUES
  (1, 1, 302, 1, 1, '2025-11-10', 'Bed A', 'yes', 1300000, 0, 'active'),
  (2, 1, 302, 2, 2, '2026-01-10', 'Bed B', 'no', 0, 0, 'active'),
  (3, 1, 301, 4, 4, '2026-02-01', 'Bed A', 'no', 600000, 0, 'active'),
  (4, 1, 301, 5, 5, '2026-08-01', 'Bed B', 'no', 600000, 0, 'active'),
  (5, 1, 102, 6, 6, '2026-01-01', 'Bed A', 'no', 500000, 0, 'active'),
  (6, 1, 104, 3, 3, '2026-03-01', 'Bed A', 'no', 600000, 0, 'active')
ON CONFLICT ("id") DO NOTHING;

-- 8. Reset sequences
SELECT setval(pg_get_serial_sequence('public.buildings', 'id'), COALESCE((SELECT MAX(id) FROM public.buildings), 1));
SELECT setval(pg_get_serial_sequence('public.floors', 'id'), COALESCE((SELECT MAX(id) FROM public.floors), 1));
SELECT setval(pg_get_serial_sequence('public.rooms', 'id'), COALESCE((SELECT MAX(id) FROM public.rooms), 1));
SELECT setval(pg_get_serial_sequence('public.tenants', 'id'), COALESCE((SELECT MAX(id) FROM public.tenants), 1));
SELECT setval(pg_get_serial_sequence('public."roomAllocations"', 'id'), COALESCE((SELECT MAX(id) FROM public."roomAllocations"), 1));
