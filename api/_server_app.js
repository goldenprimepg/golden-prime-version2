var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      scheduledAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// shared/const.ts
var COOKIE_NAME, ONE_YEAR_MS, AXIOS_TIMEOUT_MS, UNAUTHED_ERR_MSG, NOT_ADMIN_ERR_MSG;
var init_const = __esm({
  "shared/const.ts"() {
    "use strict";
    COOKIE_NAME = "app_session_id";
    ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
    AXIOS_TIMEOUT_MS = 3e4;
    UNAUTHED_ERR_MSG = "Please login (10001)";
    NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
  }
});

// drizzle-pg/schema.ts
var schema_exports = {};
__export(schema_exports, {
  activeStatus: () => activeStatus,
  airConditioning: () => airConditioning,
  allocationPrimaryPayer: () => allocationPrimaryPayer,
  allocationStatus: () => allocationStatus,
  balcony: () => balcony,
  billingCycle: () => billingCycle,
  buildings: () => buildings,
  changeAuditLogs: () => changeAuditLogs,
  electricityBills: () => electricityBills,
  expenseCategory: () => expenseCategory,
  expenseLiabilityMode: () => expenseLiabilityMode,
  expenses: () => expenses,
  exportHistory: () => exportHistory,
  exportType: () => exportType,
  floors: () => floors,
  governmentElectricityPayments: () => governmentElectricityPayments,
  managerCreditAdjustments: () => managerCreditAdjustments,
  managerNotificationKind: () => managerNotificationKind,
  managerNotifications: () => managerNotifications,
  notificationStatus: () => notificationStatus,
  operatingCostCategory: () => operatingCostCategory,
  operatingCostKind: () => operatingCostKind,
  operatingCostLiabilityMode: () => operatingCostLiabilityMode,
  operatingCostStatus: () => operatingCostStatus,
  operatingCosts: () => operatingCosts,
  operatingWorkStatus: () => operatingWorkStatus,
  ownerSettlementPaymentMethod: () => ownerSettlementPaymentMethod,
  ownerSettlements: () => ownerSettlements,
  paymentMethod: () => paymentMethod,
  receiptReviewStatus: () => receiptReviewStatus,
  reminderStatus: () => reminderStatus,
  reminders: () => reminders,
  rentPayments: () => rentPayments,
  rentStatus: () => rentStatus,
  roomAllocations: () => roomAllocations,
  roomBillingMode: () => roomBillingMode,
  roomType: () => roomType,
  rooms: () => rooms,
  serviceCharges: () => serviceCharges,
  staffAssignments: () => staffAssignments,
  tenantChargeSourceType: () => tenantChargeSourceType,
  tenantCharges: () => tenantCharges,
  tenantServiceType: () => tenantServiceType,
  tenantServices: () => tenantServices,
  tenantStatus: () => tenantStatus,
  tenantTransfers: () => tenantTransfers,
  tenants: () => tenants,
  transferProrationStatus: () => transferProrationStatus,
  userRole: () => userRole,
  users: () => users
});
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar
} from "drizzle-orm/pg-core";
var createdAt, updatedAt, userRole, roomType, roomBillingMode, airConditioning, balcony, tenantStatus, allocationPrimaryPayer, allocationStatus, rentStatus, paymentMethod, receiptReviewStatus, transferProrationStatus, expenseLiabilityMode, expenseCategory, operatingCostLiabilityMode, operatingCostKind, operatingCostCategory, operatingCostStatus, operatingWorkStatus, ownerSettlementPaymentMethod, tenantChargeSourceType, billingCycle, activeStatus, tenantServiceType, reminderStatus, managerNotificationKind, notificationStatus, exportType, users, buildings, staffAssignments, floors, rooms, tenants, roomAllocations, rentPayments, tenantTransfers, electricityBills, expenses, operatingCosts, ownerSettlements, governmentElectricityPayments, managerCreditAdjustments, changeAuditLogs, tenantCharges, serviceCharges, tenantServices, reminders, managerNotifications, exportHistory;
var init_schema = __esm({
  "drizzle-pg/schema.ts"() {
    "use strict";
    createdAt = () => timestamp("createdAt", { withTimezone: true }).defaultNow().notNull();
    updatedAt = () => timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull();
    userRole = pgEnum("user_role", ["admin", "manager", "helper", "cook", "tenant"]);
    roomType = pgEnum("room_type", ["single", "double", "triple", "four", "individual", "coliving"]);
    roomBillingMode = pgEnum("room_billing_mode", ["equal_split", "manager_set", "primary_payer"]);
    airConditioning = pgEnum("air_conditioning", ["ac", "non_ac"]);
    balcony = pgEnum("balcony", ["balcony", "non_balcony"]);
    tenantStatus = pgEnum("tenant_status", ["active", "inactive"]);
    allocationPrimaryPayer = pgEnum("allocation_primary_payer", ["no", "yes"]);
    allocationStatus = pgEnum("allocation_status", ["active", "vacated"]);
    rentStatus = pgEnum("rent_status", ["paid", "pending", "partial"]);
    paymentMethod = pgEnum("payment_method", ["cash", "upi", "bank_transfer"]);
    receiptReviewStatus = pgEnum("receipt_review_status", ["not_submitted", "pending", "approved", "rejected"]);
    transferProrationStatus = pgEnum("transfer_proration_status", ["no", "yes"]);
    expenseLiabilityMode = pgEnum("expense_liability_mode", ["building", "room_shared", "tenant_assigned"]);
    expenseCategory = pgEnum("expense_category", ["maintenance", "groceries", "salaries", "utilities", "rent", "water", "labor", "tiffin", "other"]);
    operatingCostLiabilityMode = pgEnum("operating_cost_liability_mode", ["building", "room_shared", "tenant_assigned"]);
    operatingCostKind = pgEnum("operating_cost_kind", ["staff", "supplies", "maintenance"]);
    operatingCostCategory = pgEnum("operating_cost_category", ["helper_salary", "cook_salary", "staff_advance", "staff_settlement", "groceries", "utensils", "gas", "cleaning", "water", "repair_electrician", "repair_plumber", "rent_equipment", "other"]);
    operatingCostStatus = pgEnum("operating_cost_status", ["pending", "partial", "paid"]);
    operatingWorkStatus = pgEnum("operating_work_status", ["open", "in_progress", "complete"]);
    ownerSettlementPaymentMethod = pgEnum("owner_settlement_payment_method", ["cash", "upi", "bank_transfer", "cheque"]);
    tenantChargeSourceType = pgEnum("tenant_charge_source_type", ["electricity", "expense", "operating_cost", "tenant_service"]);
    billingCycle = pgEnum("billing_cycle", ["monthly", "one_time"]);
    activeStatus = pgEnum("active_status", ["active", "inactive"]);
    tenantServiceType = pgEnum("tenant_service_type", ["tiffin", "water_bottle", "other"]);
    reminderStatus = pgEnum("reminder_status", ["active", "complete"]);
    managerNotificationKind = pgEnum("manager_notification_kind", ["rent_cycle", "rent_upcoming", "rent_overdue", "electricity_upcoming", "electricity_overdue"]);
    notificationStatus = pgEnum("notification_status", ["unread", "read"]);
    exportType = pgEnum("export_type", ["tenants", "rent", "electricity", "expenses", "selected", "complete"]);
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      phone: varchar("phone", { length: 20 }).unique(),
      passwordHash: varchar("passwordHash", { length: 255 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: userRole("role").notNull().default("helper"),
      createdAt: createdAt(),
      updatedAt: updatedAt(),
      lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull()
    });
    buildings = pgTable("buildings", {
      id: serial("id").primaryKey(),
      name: varchar("name", { length: 120 }).notNull(),
      address: text("address").notNull(),
      city: varchar("city", { length: 80 }),
      landmark: varchar("landmark", { length: 160 }),
      contactPhone: varchar("contactPhone", { length: 32 }),
      imageUrl: text("imageUrl"),
      mapUrl: text("mapUrl"),
      ownerCutPercent: integer("ownerCutPercent").notNull().default(0),
      ownerMonthlyCutPaise: integer("ownerMonthlyCutPaise").notNull().default(0),
      paymentBankName: varchar("paymentBankName", { length: 120 }),
      paymentAccountName: varchar("paymentAccountName", { length: 120 }),
      paymentAccountNumber: varchar("paymentAccountNumber", { length: 64 }),
      paymentIfsc: varchar("paymentIfsc", { length: 32 }),
      paymentUpiId: varchar("paymentUpiId", { length: 120 }),
      paymentQrUrl: text("paymentQrUrl"),
      electricityRatePaise: integer("electricityRatePaise").notNull().default(800),
      rentDueDay: integer("rentDueDay").notNull().default(5),
      currency: varchar("currency", { length: 3 }).notNull().default("INR"),
      ownerId: integer("ownerId").notNull().references(() => users.id),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    });
    staffAssignments = pgTable("staffAssignments", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      userId: integer("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
      assignedAt: timestamp("assignedAt", { withTimezone: true }).defaultNow().notNull()
    }, (table) => [
      uniqueIndex("staff_assignment_unique").on(table.buildingId, table.userId),
      index("staff_assignment_user_idx").on(table.userId)
    ]);
    floors = pgTable("floors", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 80 }).notNull(),
      level: integer("level").notNull(),
      createdAt: createdAt()
    }, (table) => [
      uniqueIndex("floor_building_level_unique").on(table.buildingId, table.level),
      index("floor_building_idx").on(table.buildingId)
    ]);
    rooms = pgTable("rooms", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      floorId: integer("floorId").references(() => floors.id, { onDelete: "set null" }),
      number: varchar("number", { length: 32 }).notNull(),
      capacity: integer("capacity").notNull().default(1),
      roomType: roomType("roomType").notNull().default("single"),
      billingMode: roomBillingMode("roomBillingMode").notNull().default("equal_split"),
      airConditioning: airConditioning("airConditioning").notNull().default("non_ac"),
      balcony: balcony("balcony").notNull().default("non_balcony"),
      imageUrl: text("imageUrl"),
      defaultRentPaise: integer("defaultRentPaise").notNull().default(0),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("room_building_number_unique").on(table.buildingId, table.number),
      index("room_floor_idx").on(table.floorId)
    ]);
    tenants = pgTable("tenants", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      userId: integer("userId").references(() => users.id, { onDelete: "set null" }).unique(),
      fullName: varchar("fullName", { length: 120 }).notNull(),
      phone: varchar("phone", { length: 32 }).notNull(),
      email: varchar("email", { length: 320 }),
      emergencyContactName: varchar("emergencyContactName", { length: 120 }),
      emergencyContactPhone: varchar("emergencyContactPhone", { length: 32 }),
      address: text("address"),
      identityDocumentUrl: text("identityDocumentUrl"),
      status: tenantStatus("tenantStatus").notNull().default("active"),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [index("tenant_building_idx").on(table.buildingId)]);
    roomAllocations = pgTable("roomAllocations", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      roomId: integer("roomId").notNull().references(() => rooms.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").notNull().references(() => tenants.id, { onDelete: "cascade" }),
      activeTenantId: integer("activeTenantId").references(() => tenants.id, { onDelete: "set null" }),
      moveInDate: date("moveInDate", { mode: "string" }).notNull(),
      moveOutDate: date("moveOutDate", { mode: "string" }),
      bedLabel: varchar("bedLabel", { length: 32 }),
      isPrimaryPayer: allocationPrimaryPayer("allocationPrimaryPayer").notNull().default("no"),
      monthlyRentPaise: integer("monthlyRentPaise").notNull(),
      depositPaise: integer("depositPaise").notNull().default(0),
      status: allocationStatus("allocationStatus").notNull().default("active"),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      index("allocation_room_status_idx").on(table.roomId, table.status),
      index("allocation_tenant_status_idx").on(table.tenantId, table.status),
      uniqueIndex("allocation_active_tenant_unique").on(table.activeTenantId)
    ]);
    rentPayments = pgTable("rentPayments", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      allocationId: integer("allocationId").notNull().references(() => roomAllocations.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").notNull().references(() => tenants.id, { onDelete: "cascade" }),
      rentMonth: varchar("rentMonth", { length: 7 }).notNull(),
      dueDate: date("dueDate", { mode: "string" }).notNull(),
      expectedAmountPaise: integer("expectedAmountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: rentStatus("rentStatus").notNull().default("pending"),
      paidOn: date("paidOn", { mode: "string" }),
      paymentMethod: paymentMethod("rentPaymentMethod"),
      notes: text("notes"),
      receiptUrl: text("receiptUrl"),
      receiptReviewStatus: receiptReviewStatus("rentReceiptReviewStatus").notNull().default("not_submitted"),
      receiptReviewedAt: timestamp("receiptReviewedAt", { withTimezone: true }),
      receiptReviewedBy: integer("receiptReviewedBy").references(() => users.id, { onDelete: "set null" }),
      receiptReviewNote: text("receiptReviewNote"),
      overdueNotifiedAt: timestamp("overdueNotifiedAt", { withTimezone: true }),
      recordedBy: integer("recordedBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("rent_allocation_month_unique").on(table.allocationId, table.rentMonth),
      index("rent_building_due_idx").on(table.buildingId, table.dueDate),
      index("rent_tenant_idx").on(table.tenantId)
    ]);
    tenantTransfers = pgTable("tenantTransfers", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").notNull().references(() => tenants.id, { onDelete: "cascade" }),
      sourceAllocationId: integer("sourceAllocationId").notNull().references(() => roomAllocations.id),
      destinationAllocationId: integer("destinationAllocationId").notNull().references(() => roomAllocations.id),
      sourceRoomId: integer("sourceRoomId").notNull().references(() => rooms.id),
      destinationRoomId: integer("destinationRoomId").notNull().references(() => rooms.id),
      effectiveDate: date("effectiveDate", { mode: "string" }).notNull(),
      sourceMonthlyRentPaise: integer("sourceMonthlyRentPaise").notNull(),
      destinationMonthlyRentPaise: integer("destinationMonthlyRentPaise").notNull(),
      prorationApplied: transferProrationStatus("prorationApplied").notNull().default("no"),
      sourceProratedAmountPaise: integer("sourceProratedAmountPaise"),
      destinationProratedAmountPaise: integer("destinationProratedAmountPaise"),
      sourceRentPaymentId: integer("sourceRentPaymentId").references(() => rentPayments.id, { onDelete: "set null" }),
      destinationRentPaymentId: integer("destinationRentPaymentId").references(() => rentPayments.id, { onDelete: "set null" }),
      recordedBy: integer("recordedBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt()
    }, (table) => [
      index("transfer_building_date_idx").on(table.buildingId, table.effectiveDate),
      index("transfer_tenant_date_idx").on(table.tenantId, table.effectiveDate)
    ]);
    electricityBills = pgTable("electricityBills", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      roomId: integer("roomId").notNull().references(() => rooms.id, { onDelete: "cascade" }),
      billingMonth: varchar("billingMonth", { length: 7 }).notNull(),
      previousReading: integer("previousReading").notNull(),
      currentReading: integer("currentReading").notNull(),
      unitsConsumed: integer("unitsConsumed").notNull(),
      ratePerUnitPaise: integer("ratePerUnitPaise").notNull(),
      billAmountPaise: integer("billAmountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: rentStatus("electricityStatus").notNull().default("pending"),
      paidOn: date("paidOn", { mode: "string" }),
      paymentMethod: paymentMethod("electricityPaymentMethod"),
      dueDate: date("dueDate", { mode: "string" }),
      notes: text("notes"),
      meterImageUrl: text("meterImageUrl"),
      receiptUrl: text("receiptUrl"),
      receiptReviewStatus: receiptReviewStatus("electricityReceiptReviewStatus").notNull().default("not_submitted"),
      receiptReviewedAt: timestamp("receiptReviewedAt", { withTimezone: true }),
      receiptReviewedBy: integer("receiptReviewedBy").references(() => users.id, { onDelete: "set null" }),
      receiptReviewNote: text("receiptReviewNote"),
      overdueNotifiedAt: timestamp("overdueNotifiedAt", { withTimezone: true }),
      recordedBy: integer("recordedBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("electricity_room_month_unique").on(table.roomId, table.billingMonth),
      index("electricity_building_month_idx").on(table.buildingId, table.billingMonth)
    ]);
    expenses = pgTable("expenses", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      roomId: integer("roomId").references(() => rooms.id, { onDelete: "set null" }),
      tenantId: integer("tenantId").references(() => tenants.id, { onDelete: "set null" }),
      liabilityMode: expenseLiabilityMode("expenseLiabilityMode").notNull().default("building"),
      category: expenseCategory("expenseCategory").notNull(),
      amountPaise: integer("amountPaise").notNull(),
      expenseDate: date("expenseDate", { mode: "string" }).notNull(),
      notes: text("notes"),
      receiptUrl: text("receiptUrl"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      index("expense_building_date_idx").on(table.buildingId, table.expenseDate),
      index("expense_room_idx").on(table.roomId),
      index("expense_tenant_idx").on(table.tenantId)
    ]);
    operatingCosts = pgTable("operatingCosts", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      roomId: integer("roomId").references(() => rooms.id, { onDelete: "set null" }),
      tenantId: integer("tenantId").references(() => tenants.id, { onDelete: "set null" }),
      liabilityMode: operatingCostLiabilityMode("operatingCostLiabilityMode").notNull().default("building"),
      kind: operatingCostKind("operatingCostKind").notNull(),
      category: operatingCostCategory("operatingCostCategory").notNull(),
      title: varchar("title", { length: 160 }).notNull(),
      payeeName: varchar("payeeName", { length: 120 }),
      vendorName: varchar("vendorName", { length: 120 }),
      amountPaise: integer("amountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: operatingCostStatus("operatingCostStatus").notNull().default("pending"),
      workStatus: operatingWorkStatus("operatingWorkStatus").notNull().default("open"),
      costDate: date("costDate", { mode: "string" }).notNull(),
      dueDate: date("dueDate", { mode: "string" }),
      receiptUrl: text("receiptUrl"),
      notes: text("notes"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      index("operating_cost_building_date_idx").on(table.buildingId, table.costDate),
      index("operating_cost_building_status_idx").on(table.buildingId, table.status),
      index("operating_cost_room_idx").on(table.roomId),
      index("operating_cost_tenant_idx").on(table.tenantId)
    ]);
    ownerSettlements = pgTable("ownerSettlements", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      billingMonth: varchar("billingMonth", { length: 7 }).notNull(),
      expectedAmountPaise: integer("expectedAmountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: rentStatus("ownerSettlementStatus").notNull().default("pending"),
      dueDate: date("dueDate", { mode: "string" }).notNull(),
      paidOn: date("paidOn", { mode: "string" }),
      paymentMethod: ownerSettlementPaymentMethod("ownerSettlementPaymentMethod"),
      notes: text("notes"),
      receiptUrl: text("receiptUrl"),
      ownerConfirmedAt: timestamp("ownerConfirmedAt", { withTimezone: true }),
      ownerConfirmedBy: integer("ownerConfirmedBy").references(() => users.id, { onDelete: "set null" }),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("owner_settlement_building_month_unique").on(table.buildingId, table.billingMonth),
      index("owner_settlement_building_due_idx").on(table.buildingId, table.dueDate)
    ]);
    governmentElectricityPayments = pgTable("governmentElectricityPayments", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      billingMonth: varchar("billingMonth", { length: 7 }).notNull(),
      expectedAmountPaise: integer("expectedAmountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: rentStatus("governmentElectricityPaymentStatus").notNull().default("pending"),
      dueDate: date("dueDate", { mode: "string" }).notNull(),
      paidOn: date("paidOn", { mode: "string" }),
      paymentMethod: ownerSettlementPaymentMethod("governmentElectricityPaymentMethod"),
      notes: text("notes"),
      receiptUrl: text("receiptUrl"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("government_electricity_building_month_unique").on(table.buildingId, table.billingMonth),
      index("government_electricity_building_due_idx").on(table.buildingId, table.dueDate)
    ]);
    managerCreditAdjustments = pgTable("managerCreditAdjustments", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      billingMonth: varchar("billingMonth", { length: 7 }).notNull(),
      amountPaise: integer("amountPaise").notNull(),
      notes: text("notes").notNull(),
      createdBy: integer("createdBy").notNull().references(() => users.id, { onDelete: "cascade" }),
      createdAt: createdAt()
    }, (table) => [index("manager_credit_adjustment_building_month_idx").on(table.buildingId, table.billingMonth)]);
    changeAuditLogs = pgTable("changeAuditLogs", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").references(() => buildings.id, { onDelete: "set null" }),
      entityType: varchar("entityType", { length: 48 }).notNull(),
      entityId: integer("entityId").notNull(),
      action: varchar("action", { length: 48 }).notNull(),
      snapshotJson: text("snapshotJson").notNull(),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt()
    }, (table) => [
      index("change_audit_building_created_idx").on(table.buildingId, table.createdAt),
      index("change_audit_entity_idx").on(table.entityType, table.entityId)
    ]);
    tenantCharges = pgTable("tenantCharges", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").notNull().references(() => tenants.id, { onDelete: "cascade" }),
      roomId: integer("roomId").references(() => rooms.id, { onDelete: "set null" }),
      sourceType: tenantChargeSourceType("tenantChargeSourceType").notNull(),
      sourceId: integer("sourceId").notNull(),
      billingMonth: varchar("billingMonth", { length: 7 }),
      title: varchar("title", { length: 180 }).notNull(),
      expectedAmountPaise: integer("expectedAmountPaise").notNull(),
      paidAmountPaise: integer("paidAmountPaise").notNull().default(0),
      status: rentStatus("tenantChargeStatus").notNull().default("pending"),
      dueDate: date("dueDate", { mode: "string" }),
      paidOn: date("paidOn", { mode: "string" }),
      paymentMethod: paymentMethod("tenantChargePaymentMethod"),
      notes: text("notes"),
      receiptUrl: text("receiptUrl"),
      receiptReviewStatus: receiptReviewStatus("tenantChargeReceiptReviewStatus").notNull().default("not_submitted"),
      receiptReviewedAt: timestamp("receiptReviewedAt", { withTimezone: true }),
      receiptReviewedBy: integer("receiptReviewedBy").references(() => users.id, { onDelete: "set null" }),
      receiptReviewNote: text("receiptReviewNote"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("tenant_charge_source_tenant_month_unique").on(table.sourceType, table.sourceId, table.tenantId, table.billingMonth),
      index("tenant_charge_building_status_idx").on(table.buildingId, table.status),
      index("tenant_charge_tenant_idx").on(table.tenantId)
    ]);
    serviceCharges = pgTable("serviceCharges", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      name: varchar("name", { length: 120 }).notNull(),
      amountPaise: integer("amountPaise").notNull(),
      billingCycle: billingCycle("billingCycle").notNull().default("monthly"),
      dueDay: integer("dueDay").notNull().default(1),
      active: activeStatus("serviceChargeStatus").notNull().default("active"),
      notes: text("notes"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [index("service_charge_building_idx").on(table.buildingId)]);
    tenantServices = pgTable("tenantServices", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").notNull().references(() => tenants.id, { onDelete: "cascade" }),
      serviceType: tenantServiceType("tenantServiceType").notNull(),
      monthlyChargePaise: integer("monthlyChargePaise").notNull(),
      active: activeStatus("tenantServiceStatus").notNull().default("active"),
      notes: text("notes"),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      index("tenant_service_building_idx").on(table.buildingId),
      index("tenant_service_tenant_idx").on(table.tenantId)
    ]);
    reminders = pgTable("reminders", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      tenantId: integer("tenantId").references(() => tenants.id, { onDelete: "cascade" }),
      rentPaymentId: integer("rentPaymentId").references(() => rentPayments.id, { onDelete: "cascade" }),
      title: varchar("title", { length: 180 }).notNull(),
      dueDate: date("dueDate", { mode: "string" }).notNull(),
      status: reminderStatus("reminderStatus").notNull().default("active"),
      notifiedAt: timestamp("notifiedAt", { withTimezone: true }),
      deliveryRequestedAt: timestamp("deliveryRequestedAt", { withTimezone: true }),
      deliveryRequestedBy: integer("deliveryRequestedBy").references(() => users.id, { onDelete: "set null" }),
      createdBy: integer("createdBy").references(() => users.id, { onDelete: "set null" }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      index("reminder_building_due_idx").on(table.buildingId, table.dueDate),
      uniqueIndex("reminder_rent_payment_unique").on(table.rentPaymentId)
    ]);
    managerNotifications = pgTable("managerNotifications", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").notNull().references(() => buildings.id, { onDelete: "cascade" }),
      kind: managerNotificationKind("managerNotificationKind").notNull(),
      referenceKey: varchar("referenceKey", { length: 180 }).notNull(),
      title: varchar("title", { length: 180 }).notNull(),
      body: text("body").notNull(),
      dueDate: date("dueDate", { mode: "string" }),
      status: notificationStatus("managerNotificationStatus").notNull().default("unread"),
      readAt: timestamp("readAt", { withTimezone: true }),
      createdAt: createdAt(),
      updatedAt: updatedAt()
    }, (table) => [
      uniqueIndex("manager_notification_reference_unique").on(table.referenceKey),
      index("manager_notification_building_status_idx").on(table.buildingId, table.status)
    ]);
    exportHistory = pgTable("exportHistory", {
      id: serial("id").primaryKey(),
      buildingId: integer("buildingId").references(() => buildings.id, { onDelete: "set null" }),
      requestedBy: integer("requestedBy").notNull().references(() => users.id, { onDelete: "cascade" }),
      exportType: exportType("exportType").notNull(),
      dateFrom: date("dateFrom", { mode: "string" }),
      dateTo: date("dateTo", { mode: "string" }),
      createdAt: createdAt()
    }, (table) => [index("export_requester_created_idx").on(table.requestedBy, table.createdAt)]);
  }
});

// server/domain.ts
function deriveRentStatus2(expectedAmountPaise, paidAmountPaise) {
  if (!Number.isInteger(expectedAmountPaise) || expectedAmountPaise <= 0) {
    throw new Error("Expected rent must be a positive whole number of paise.");
  }
  if (!Number.isInteger(paidAmountPaise) || paidAmountPaise < 0) {
    throw new Error("Paid rent must be a non-negative whole number of paise.");
  }
  if (paidAmountPaise === 0) return "pending";
  if (paidAmountPaise >= expectedAmountPaise) return "paid";
  return "partial";
}
function deriveTenantChargeStatus(expectedAmountPaise, paidAmountPaise) {
  if (!Number.isInteger(expectedAmountPaise) || expectedAmountPaise <= 0) throw new Error("Expected tenant charge must be a positive whole number of paise.");
  if (!Number.isInteger(paidAmountPaise) || paidAmountPaise < 0) throw new Error("Paid tenant charge must be a non-negative whole number of paise.");
  if (paidAmountPaise === 0) return "pending";
  return paidAmountPaise >= expectedAmountPaise ? "paid" : "partial";
}
function splitPaiseEvenly(totalPaise, recipientCount) {
  if (!Number.isInteger(totalPaise) || totalPaise < 0) throw new Error("Amount to split must be a non-negative whole number of paise.");
  if (!Number.isInteger(recipientCount) || recipientCount < 1) throw new Error("At least one active room occupant is required to split an amount.");
  const baseShare = Math.floor(totalPaise / recipientCount);
  const remainder = totalPaise % recipientCount;
  return Array.from({ length: recipientCount }, (_, index2) => baseShare + (index2 < remainder ? 1 : 0));
}
function calculateRoomRentTotal(tenantRentPaise) {
  if (tenantRentPaise.length === 0) return 0;
  return tenantRentPaise.reduce((total, rentPaise) => {
    if (!Number.isInteger(rentPaise) || rentPaise <= 0) throw new Error("Each active tenant rent must be a positive whole number of paise.");
    return total + rentPaise;
  }, 0);
}
function calculateTransferProration(sourceMonthlyRentPaise, destinationMonthlyRentPaise, effectiveDate) {
  if (!Number.isInteger(sourceMonthlyRentPaise) || sourceMonthlyRentPaise <= 0 || !Number.isInteger(destinationMonthlyRentPaise) || destinationMonthlyRentPaise <= 0) {
    throw new Error("Both source and destination monthly rents must be positive whole numbers of paise.");
  }
  if (!/^\d{4}-(0[1-9]|1[0-2])-\d{2}$/.test(effectiveDate)) throw new Error("Choose a valid transfer date.");
  const date2 = /* @__PURE__ */ new Date(`${effectiveDate}T00:00:00.000Z`);
  if (Number.isNaN(date2.getTime()) || date2.toISOString().slice(0, 10) !== effectiveDate) throw new Error("Choose a valid transfer date.");
  const daysInMonth = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth() + 1, 0)).getUTCDate();
  const sourceDays = date2.getUTCDate() - 1;
  const destinationDays = daysInMonth - sourceDays;
  if (sourceDays < 1) throw new Error("Proration is only needed when the transfer occurs after the first day of the month.");
  return {
    rentMonth: effectiveDate.slice(0, 7),
    daysInMonth,
    sourceDays,
    destinationDays,
    sourceExpectedAmountPaise: Math.round(sourceMonthlyRentPaise * sourceDays / daysInMonth),
    destinationExpectedAmountPaise: Math.round(destinationMonthlyRentPaise * destinationDays / daysInMonth)
  };
}
function getRoomCapacityForType(roomType3, individualCapacity = 2) {
  if (roomType3 === "single") return 1;
  if (roomType3 === "double" || roomType3 === "coliving") return 2;
  if (roomType3 === "triple") return 3;
  if (roomType3 === "four") return 4;
  return Math.min(Math.max(Math.trunc(individualCapacity), 2), 12);
}
function getDefaultBillingModeForRoomType(roomType3) {
  return roomType3 === "individual" ? "manager_set" : roomType3 === "coliving" ? "primary_payer" : "equal_split";
}
function getDashboardPeriod(mode, referenceDate = /* @__PURE__ */ new Date(), periodKey) {
  if (periodKey) {
    if (mode === "monthly" && /^\d{4}-(0[1-9]|1[0-2])$/.test(periodKey)) {
      return { key: periodKey, label: (/* @__PURE__ */ new Date(`${periodKey}-01T00:00:00.000Z`)).toLocaleString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }) };
    }
    if (mode === "yearly" && /^\d{4}$/.test(periodKey)) return { key: periodKey, label: periodKey };
    throw new Error("Choose a valid reporting month or year.");
  }
  const year = referenceDate.getUTCFullYear();
  if (mode === "yearly") return { key: String(year), label: String(year) };
  const month = String(referenceDate.getUTCMonth() + 1).padStart(2, "0");
  return { key: `${year}-${month}`, label: referenceDate.toLocaleString("en-IN", { month: "long", year: "numeric", timeZone: "UTC" }) };
}
function calculateElectricityBill(previousReading, currentReading, ratePerUnitPaise) {
  if (!Number.isInteger(previousReading) || previousReading < 0) {
    throw new Error("Previous meter reading must be a non-negative whole number.");
  }
  if (!Number.isInteger(currentReading) || currentReading < previousReading) {
    throw new Error("Current meter reading cannot be less than the previous reading.");
  }
  if (!Number.isInteger(ratePerUnitPaise) || ratePerUnitPaise < 0) {
    throw new Error("Electricity rate must be a non-negative whole number of paise.");
  }
  const unitsConsumed = currentReading - previousReading;
  return { unitsConsumed, billAmountPaise: unitsConsumed * ratePerUnitPaise };
}
function getRoomOccupancy(capacity, activeAllocationCount) {
  if (!Number.isInteger(capacity) || capacity < 1) {
    throw new Error("Room capacity must be at least one.");
  }
  if (!Number.isInteger(activeAllocationCount) || activeAllocationCount < 0) {
    throw new Error("Active allocation count cannot be negative.");
  }
  const availableBeds = Math.max(capacity - activeAllocationCount, 0);
  return {
    status: activeAllocationCount > 0 ? "occupied" : "vacant",
    availableBeds,
    isFull: availableBeds === 0
  };
}
function assertTenantCanReceiveAllocation(activeAllocationCount) {
  if (!Number.isInteger(activeAllocationCount) || activeAllocationCount < 0) {
    throw new Error("Active allocation count cannot be negative.");
  }
  if (activeAllocationCount > 0) {
    throw new Error("A tenant can have only one active room allocation at a time.");
  }
}
function calculateBuildingFinancials(input) {
  const outstandingRentPaise = Math.max(input.expectedRentPaise - input.collectedRentPaise, 0);
  const expectedTenantChargeRecoveryPaise = input.expectedTenantChargeRecoveryPaise ?? 0;
  const collectedTenantChargeRecoveryPaise = input.collectedTenantChargeRecoveryPaise ?? 0;
  const ownerSettlementPaidPaise = input.ownerSettlementPaidPaise ?? 0;
  return {
    outstandingRentPaise,
    cashOperatingResultPaise: input.collectedRentPaise + collectedTenantChargeRecoveryPaise - input.monthlyExpensePaise - ownerSettlementPaidPaise,
    projectedOperatingResultPaise: input.expectedRentPaise + input.monthlyServiceChargeExpectedPaise + expectedTenantChargeRecoveryPaise - input.monthlyExpensePaise
  };
}
function calculateManagerOperatingResult(projectedOperatingResultPaise, ownerCutPercent) {
  if (!Number.isInteger(projectedOperatingResultPaise)) {
    throw new Error("Projected operating result must be a whole number of paise.");
  }
  if (!Number.isInteger(ownerCutPercent) || ownerCutPercent < 0 || ownerCutPercent > 100) {
    throw new Error("Owner share must be a whole percentage from 0 to 100.");
  }
  const ownerCutPaise = Math.round(projectedOperatingResultPaise * ownerCutPercent / 100);
  return { ownerCutPaise, managerOperatingResultPaise: projectedOperatingResultPaise - ownerCutPaise };
}
var init_domain = __esm({
  "server/domain.ts"() {
    "use strict";
  }
});

// server/exportFilters.ts
function hasValidExportDateRange({ dateFrom, dateTo }) {
  return !(dateFrom && dateTo && dateFrom > dateTo);
}
function exportMonthBounds({ dateFrom, dateTo }) {
  return { fromMonth: dateFrom?.slice(0, 7), toMonth: dateTo?.slice(0, 7) };
}
var init_exportFilters = __esm({
  "server/exportFilters.ts"() {
    "use strict";
  }
});

// server/db.ts
import { and, desc, eq, gte, inArray, isNotNull, isNull, lt, lte, ne, or } from "drizzle-orm";
import { drizzle as drizzlePostgres } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import { randomBytes, scryptSync } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { Pool } from "pg";
function hashSeedPassword(password) {
  const existing = cachedPasswordHashes.get(password);
  if (existing) return existing;
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  const hashed = `${salt}:${derived}`;
  cachedPasswordHashes.set(password, hashed);
  return hashed;
}
async function ensureCoreSeedAccounts(db) {
  const defaultTenantHash = hashSeedPassword("GoldenPrime2026");
  const coreAccounts = [
    {
      openId: "seed-owner-kapil",
      name: "Kapil Yadav",
      email: "kapil.yadav@goldenprimepg.com",
      phone: "9990636862",
      passwordHash: hashSeedPassword("Kapil@yadav"),
      loginMethod: "phone-password",
      role: "admin"
    },
    {
      openId: "seed-manager-goldenprime",
      name: "Shivam Sharma",
      email: "shivam.sharma@goldenprimepg.com",
      phone: "7668992940",
      passwordHash: hashSeedPassword("Shivam@sharma"),
      loginMethod: "phone-password",
      role: "manager"
    },
    {
      openId: "seed-tenant-shashank",
      name: "Shashank",
      email: "shashank@goldenprimepg.com",
      phone: "6307500844",
      passwordHash: hashSeedPassword("Shivam@rajput"),
      loginMethod: "phone-password",
      role: "tenant"
    },
    {
      openId: "seed-tenant-tanu",
      name: "Tanu",
      email: "tanu@goldenprimepg.com",
      phone: "8081368879",
      passwordHash: hashSeedPassword("Nistha@singh"),
      loginMethod: "phone-password",
      role: "tenant"
    },
    {
      openId: "seed-tenant-nimmi",
      name: "Nimmi",
      email: "nimmi@goldenprimepg.com",
      phone: "9000000301",
      passwordHash: defaultTenantHash,
      loginMethod: "phone-password",
      role: "tenant"
    },
    {
      openId: "seed-tenant-neelam",
      name: "Neelam",
      email: "neelam@goldenprimepg.com",
      phone: "9000000302",
      passwordHash: defaultTenantHash,
      loginMethod: "phone-password",
      role: "tenant"
    },
    {
      openId: "seed-tenant-mansi",
      name: "Mansi",
      email: "mansi@goldenprimepg.com",
      phone: "9000000102",
      passwordHash: defaultTenantHash,
      loginMethod: "phone-password",
      role: "tenant"
    },
    {
      openId: "seed-tenant-rahul",
      name: "Rahul",
      email: "rahul@goldenprimepg.com",
      phone: "9000000104",
      passwordHash: defaultTenantHash,
      loginMethod: "phone-password",
      role: "tenant"
    }
  ];
  const existingUsers = await db.select({ id: users.id, openId: users.openId, phone: users.phone }).from(users);
  for (const account of coreAccounts) {
    const match = existingUsers.find((u) => u.openId === account.openId || account.phone && u.phone === account.phone);
    if (match) {
      await db.update(users).set({
        name: account.name,
        email: account.email,
        phone: account.phone,
        passwordHash: account.passwordHash,
        loginMethod: "phone-password",
        role: account.role
      }).where(eq(users.id, match.id));
    } else {
      await db.insert(users).values(account).onConflictDoNothing();
    }
  }
}
async function seedEmbeddedDatabase(db, pglite) {
  const existingBuildings = await db.select({ id: buildings.id }).from(buildings).limit(1);
  if (existingBuildings.length > 0) {
    await ensureCoreSeedAccounts(db);
    return;
  }
  await ensureCoreSeedAccounts(db);
  const allSeedUsers = await db.select({ id: users.id, phone: users.phone }).from(users);
  const byPhone = new Map(allSeedUsers.map((u) => [u.phone, u]));
  const owner = byPhone.get("9990636862");
  const manager = byPhone.get("7668992940");
  const shashankUser = byPhone.get("6307500844");
  const tanuUser = byPhone.get("8081368879");
  const nimmiUser = byPhone.get("9000000301");
  const neelamUser = byPhone.get("9000000302");
  const mansiUser = byPhone.get("9000000102");
  const rahulUser = byPhone.get("9000000104");
  if (!owner || !manager || !shashankUser || !tanuUser || !nimmiUser || !neelamUser || !mansiUser || !rahulUser) return;
  const [building] = await db.insert(buildings).values({
    name: "GOLDEN PRIME PG",
    address: "Managed by Shivam Sharma",
    city: "Noida",
    landmark: "Golden Prime PG",
    contactPhone: "7668992940",
    ownerCutPercent: 0,
    ownerMonthlyCutPaise: 0,
    electricityRatePaise: 1200,
    // ₹12/unit
    rentDueDay: 5,
    ownerId: owner.id
  }).returning({ id: buildings.id });
  if (!building) return;
  await db.insert(staffAssignments).values({
    buildingId: building.id,
    userId: manager.id
  });
  const insertedFloors = await db.insert(floors).values([
    { buildingId: building.id, name: "Ground Floor", level: 0 },
    { buildingId: building.id, name: "Floor 1", level: 1 },
    { buildingId: building.id, name: "Floor 2", level: 2 },
    { buildingId: building.id, name: "Floor 3", level: 3 },
    { buildingId: building.id, name: "Terrace", level: 4 }
  ]).returning({ id: floors.id, level: floors.level });
  const floor1Id = insertedFloors.find((f) => f.level === 1)?.id ?? null;
  const floor3Id = insertedFloors.find((f) => f.level === 3)?.id ?? null;
  const insertedRooms = await db.insert(rooms).values([
    {
      buildingId: building.id,
      floorId: floor1Id,
      number: "102",
      capacity: 3,
      roomType: "triple",
      billingMode: "equal_split",
      airConditioning: "non_ac",
      balcony: "balcony",
      defaultRentPaise: 5e5
    },
    {
      buildingId: building.id,
      floorId: floor1Id,
      number: "104",
      capacity: 2,
      roomType: "double",
      billingMode: "equal_split",
      airConditioning: "non_ac",
      balcony: "balcony",
      defaultRentPaise: 6e5
    },
    {
      buildingId: building.id,
      floorId: floor3Id,
      number: "301",
      capacity: 2,
      roomType: "double",
      billingMode: "equal_split",
      airConditioning: "non_ac",
      balcony: "balcony",
      defaultRentPaise: 12e5
    },
    {
      buildingId: building.id,
      floorId: floor3Id,
      number: "302",
      capacity: 2,
      roomType: "coliving",
      billingMode: "primary_payer",
      airConditioning: "non_ac",
      balcony: "balcony",
      defaultRentPaise: 13e5
    }
  ]).returning({ id: rooms.id, number: rooms.number });
  const room102 = insertedRooms.find((r) => r.number === "102");
  const room104 = insertedRooms.find((r) => r.number === "104");
  const room301 = insertedRooms.find((r) => r.number === "301");
  const room302 = insertedRooms.find((r) => r.number === "302");
  const [shashankTenant, tanuTenant, rahulTenant, nimmiTenant, neelamTenant, mansiTenant] = await db.insert(tenants).values([
    {
      buildingId: building.id,
      userId: shashankUser.id,
      fullName: "Shashank",
      phone: "6307500844",
      email: "shashank@goldenprimepg.com",
      status: "active"
    },
    {
      buildingId: building.id,
      userId: tanuUser.id,
      fullName: "Tanu",
      phone: "8081368879",
      email: "tanu@goldenprimepg.com",
      status: "active"
    },
    {
      buildingId: building.id,
      userId: rahulUser.id,
      fullName: "Rahul",
      phone: "9000000104",
      email: "rahul@goldenprimepg.com",
      status: "active"
    },
    {
      buildingId: building.id,
      userId: nimmiUser.id,
      fullName: "Nimmi",
      phone: "9000000301",
      email: "nimmi@goldenprimepg.com",
      status: "active"
    },
    {
      buildingId: building.id,
      userId: neelamUser.id,
      fullName: "Neelam",
      phone: "9000000302",
      email: "neelam@goldenprimepg.com",
      status: "active"
    },
    {
      buildingId: building.id,
      userId: mansiUser.id,
      fullName: "Mansi",
      phone: "9000000102",
      email: "mansi@goldenprimepg.com",
      status: "active"
    }
  ]).returning({ id: tenants.id, fullName: tenants.fullName });
  const rentBatch = [];
  const chargeBatch = [];
  if (room302 && shashankTenant && tanuTenant && room301 && nimmiTenant && neelamTenant && room102 && mansiTenant && room104 && rahulTenant) {
    const insertedAllocs = await db.insert(roomAllocations).values([
      {
        buildingId: building.id,
        roomId: room302.id,
        tenantId: shashankTenant.id,
        activeTenantId: shashankTenant.id,
        moveInDate: "2025-11-10",
        bedLabel: "Bed A",
        isPrimaryPayer: "yes",
        monthlyRentPaise: 13e5,
        depositPaise: 0,
        status: "active"
      },
      {
        buildingId: building.id,
        roomId: room302.id,
        tenantId: tanuTenant.id,
        activeTenantId: tanuTenant.id,
        moveInDate: "2026-01-10",
        bedLabel: "Bed B",
        isPrimaryPayer: "no",
        monthlyRentPaise: 0,
        depositPaise: 0,
        status: "active"
      },
      {
        buildingId: building.id,
        roomId: room301.id,
        tenantId: nimmiTenant.id,
        activeTenantId: nimmiTenant.id,
        moveInDate: "2026-02-01",
        bedLabel: "Bed A",
        isPrimaryPayer: "no",
        monthlyRentPaise: 6e5,
        depositPaise: 0,
        status: "active"
      },
      {
        buildingId: building.id,
        roomId: room301.id,
        tenantId: neelamTenant.id,
        activeTenantId: neelamTenant.id,
        moveInDate: "2026-08-01",
        bedLabel: "Bed B",
        isPrimaryPayer: "no",
        monthlyRentPaise: 6e5,
        depositPaise: 0,
        status: "active"
      },
      {
        buildingId: building.id,
        roomId: room102.id,
        tenantId: mansiTenant.id,
        activeTenantId: mansiTenant.id,
        moveInDate: "2026-01-01",
        bedLabel: "Bed A",
        isPrimaryPayer: "no",
        monthlyRentPaise: 5e5,
        depositPaise: 0,
        status: "active"
      },
      {
        buildingId: building.id,
        roomId: room104.id,
        tenantId: rahulTenant.id,
        activeTenantId: rahulTenant.id,
        moveInDate: "2026-03-01",
        bedLabel: "Bed A",
        isPrimaryPayer: "no",
        monthlyRentPaise: 6e5,
        depositPaise: 0,
        status: "active"
      }
    ]).returning({ id: roomAllocations.id, tenantId: roomAllocations.tenantId });
    const allocByTenant = new Map(insertedAllocs.map((a) => [a.tenantId, a.id]));
    const shashankAllocId = allocByTenant.get(shashankTenant.id);
    const nimmiAllocId = allocByTenant.get(nimmiTenant.id);
    const neelamAllocId = allocByTenant.get(neelamTenant.id);
    const mansiAllocId = allocByTenant.get(mansiTenant.id);
    const rahulAllocId = allocByTenant.get(rahulTenant.id);
    if (shashankAllocId) {
      const shashankRentMonths = [
        { month: "2025-11", amountPaise: 65e4, note: "Moved in 10 Nov 2025 \xB7 Single occupant in double sharing (\u20B96,500/month)" },
        { month: "2025-12", amountPaise: 65e4, note: "Single occupant in double sharing (\u20B96,500/month)" },
        { month: "2026-01", amountPaise: 13e5, note: "Co-sharing with Tanu from 10 Jan 2026 (\u20B913,000/month room rent)" },
        { month: "2026-02", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-03", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-04", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-05", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-06", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-07", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-08", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" },
        { month: "2026-09", amountPaise: 13e5, note: "Co-sharing Room 302 rent (Shashank & Tanu)" }
      ];
      for (const item of shashankRentMonths) {
        const due = getRentDueDate(item.month, 5);
        rentBatch.push({
          buildingId: building.id,
          allocationId: shashankAllocId,
          tenantId: shashankTenant.id,
          rentMonth: item.month,
          dueDate: due,
          expectedAmountPaise: item.amountPaise,
          paidAmountPaise: item.amountPaise,
          status: "paid",
          paidOn: due,
          paymentMethod: "upi",
          notes: item.note,
          recordedBy: manager.id
        });
      }
    }
    if (nimmiAllocId) {
      for (const month of ["2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"]) {
        rentBatch.push({
          buildingId: building.id,
          allocationId: nimmiAllocId,
          tenantId: nimmiTenant.id,
          rentMonth: month,
          dueDate: getRentDueDate(month, 5),
          expectedAmountPaise: 6e5,
          paidAmountPaise: 0,
          status: "pending",
          notes: "Room 301 double sharing split rent (\u20B912,000 total / 2 = \u20B96,000)",
          recordedBy: manager.id
        });
      }
    }
    if (neelamAllocId) {
      for (const month of ["2026-08", "2026-09"]) {
        rentBatch.push({
          buildingId: building.id,
          allocationId: neelamAllocId,
          tenantId: neelamTenant.id,
          rentMonth: month,
          dueDate: getRentDueDate(month, 5),
          expectedAmountPaise: 6e5,
          paidAmountPaise: 0,
          status: "pending",
          notes: "Room 301 double sharing split rent (\u20B912,000 total / 2 = \u20B96,000)",
          recordedBy: manager.id
        });
      }
    }
    if (mansiAllocId) {
      for (const month of ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"]) {
        rentBatch.push({
          buildingId: building.id,
          allocationId: mansiAllocId,
          tenantId: mansiTenant.id,
          rentMonth: month,
          dueDate: getRentDueDate(month, 5),
          expectedAmountPaise: 5e5,
          paidAmountPaise: 0,
          status: "pending",
          notes: "Room 102 triple sharing rent (\u20B95,000/month)",
          recordedBy: manager.id
        });
      }
    }
    if (rahulAllocId) {
      for (const month of ["2026-03", "2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"]) {
        rentBatch.push({
          buildingId: building.id,
          allocationId: rahulAllocId,
          tenantId: rahulTenant.id,
          rentMonth: month,
          dueDate: getRentDueDate(month, 5),
          expectedAmountPaise: 6e5,
          paidAmountPaise: 0,
          status: "pending",
          notes: "Room 104 double sharing rent (\u20B96,000/month)",
          recordedBy: manager.id
        });
      }
    }
    if (rentBatch.length > 0) {
      await db.insert(rentPayments).values(rentBatch);
    }
    const [shashankCoolerService, rahulCoolerService] = await db.insert(tenantServices).values([
      {
        buildingId: building.id,
        tenantId: shashankTenant.id,
        serviceType: "other",
        monthlyChargePaise: 5e4,
        active: "active",
        notes: "Cooler charge (\u20B9500/month \xB7 Apr 2026 to Sep 2026)",
        createdBy: manager.id
      },
      {
        buildingId: building.id,
        tenantId: rahulTenant.id,
        serviceType: "other",
        monthlyChargePaise: 25e3,
        active: "active",
        notes: "Extra split cooler service (\u20B9250/month \xB7 Apr 2026 to Sep 2026)",
        createdBy: manager.id
      }
    ]).returning({ id: tenantServices.id });
    for (const coolerMonth of ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"]) {
      const due = getRentDueDate(coolerMonth, 5);
      if (shashankCoolerService) {
        chargeBatch.push({
          buildingId: building.id,
          tenantId: shashankTenant.id,
          roomId: room302.id,
          sourceType: "tenant_service",
          sourceId: shashankCoolerService.id,
          billingMonth: coolerMonth,
          title: `Cooler charges \xB7 ${coolerMonth}`,
          expectedAmountPaise: 5e4,
          paidAmountPaise: 5e4,
          status: "paid",
          dueDate: due,
          paidOn: due,
          paymentMethod: "upi",
          notes: "Cooler charges \u20B9500/month (Apr 2026 \u2013 Sep 2026)",
          createdBy: manager.id
        });
      }
      if (rahulCoolerService) {
        chargeBatch.push({
          buildingId: building.id,
          tenantId: rahulTenant.id,
          roomId: room104.id,
          sourceType: "tenant_service",
          sourceId: rahulCoolerService.id,
          billingMonth: coolerMonth,
          title: `Cooler service (split) \xB7 ${coolerMonth}`,
          expectedAmountPaise: 25e3,
          paidAmountPaise: 0,
          status: "pending",
          dueDate: due,
          notes: "Split cooler service \u20B9250/month (Apr 2026 \u2013 Sep 2026)",
          createdBy: manager.id
        });
      }
    }
    const [augBill] = await db.insert(electricityBills).values({
      buildingId: building.id,
      roomId: room302.id,
      billingMonth: "2026-08",
      previousReading: 491,
      currentReading: 672,
      unitsConsumed: 181,
      ratePerUnitPaise: 1200,
      billAmountPaise: 217200,
      paidAmountPaise: 0,
      status: "pending",
      dueDate: "2026-09-05",
      notes: "August reading: 181 units (Total meter reading 672 [Direct + Inverter], last paid July reading 491)",
      recordedBy: manager.id
    }).returning({ id: electricityBills.id });
    if (augBill) {
      chargeBatch.push({
        buildingId: building.id,
        tenantId: shashankTenant.id,
        roomId: room302.id,
        sourceType: "electricity",
        sourceId: augBill.id,
        billingMonth: "2026-08",
        title: "Electricity \xB7 2026-08",
        expectedAmountPaise: 217200,
        paidAmountPaise: 0,
        status: "pending",
        dueDate: "2026-09-05",
        notes: "August reading: 181 units (Total meter reading 672 [Direct + Inverter], last paid July reading 491)",
        createdBy: manager.id
      });
    }
    if (chargeBatch.length > 0) {
      await db.insert(tenantCharges).values(chargeBatch);
    }
  }
  if (pglite) {
    await pglite.exec(`
      SELECT setval(pg_get_serial_sequence('public.users', 'id'), COALESCE((SELECT MAX(id) FROM public.users), 1), EXISTS (SELECT 1 FROM public.users));
      SELECT setval(pg_get_serial_sequence('public.buildings', 'id'), COALESCE((SELECT MAX(id) FROM public.buildings), 1), EXISTS (SELECT 1 FROM public.buildings));
      SELECT setval(pg_get_serial_sequence('public."staffAssignments"', 'id'), COALESCE((SELECT MAX(id) FROM public."staffAssignments"), 1), EXISTS (SELECT 1 FROM public."staffAssignments"));
      SELECT setval(pg_get_serial_sequence('public.floors', 'id'), COALESCE((SELECT MAX(id) FROM public.floors), 1), EXISTS (SELECT 1 FROM public.floors));
      SELECT setval(pg_get_serial_sequence('public.rooms', 'id'), COALESCE((SELECT MAX(id) FROM public.rooms), 1), EXISTS (SELECT 1 FROM public.rooms));
      SELECT setval(pg_get_serial_sequence('public.tenants', 'id'), COALESCE((SELECT MAX(id) FROM public.tenants), 1), EXISTS (SELECT 1 FROM public.tenants));
      SELECT setval(pg_get_serial_sequence('public."roomAllocations"', 'id'), COALESCE((SELECT MAX(id) FROM public."roomAllocations"), 1), EXISTS (SELECT 1 FROM public."roomAllocations"));
      SELECT setval(pg_get_serial_sequence('public."rentPayments"', 'id'), COALESCE((SELECT MAX(id) FROM public."rentPayments"), 1), EXISTS (SELECT 1 FROM public."rentPayments"));
      SELECT setval(pg_get_serial_sequence('public."tenantServices"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantServices"), 1), EXISTS (SELECT 1 FROM public."tenantServices"));
      SELECT setval(pg_get_serial_sequence('public."tenantCharges"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantCharges"), 1), EXISTS (SELECT 1 FROM public."tenantCharges"));
      SELECT setval(pg_get_serial_sequence('public."electricityBills"', 'id'), COALESCE((SELECT MAX(id) FROM public."electricityBills"), 1), EXISTS (SELECT 1 FROM public."electricityBills"));
      SELECT setval(pg_get_serial_sequence('public."ownerSettlements"', 'id'), COALESCE((SELECT MAX(id) FROM public."ownerSettlements"), 1), EXISTS (SELECT 1 FROM public."ownerSettlements"));
    `);
  }
}
async function initEmbeddedPglite() {
  if (embeddedInitPromise) return embeddedInitPromise;
  embeddedInitPromise = (async () => {
    try {
      const dataDir = process.env.VITEST || process.env.VERCEL || forceInMemoryEmbedded ? void 0 : path.resolve(process.cwd(), ".pglite-golden-prime-v2");
      let pglite;
      if (dataDir) {
        try {
          pglite = new PGlite(dataDir);
          await pglite.waitReady;
        } catch {
          pglite = new PGlite();
          await pglite.waitReady;
        }
      } else {
        pglite = new PGlite();
        await pglite.waitReady;
      }
      const check = await pglite.query("SELECT to_regclass('public.users') AS reg");
      if (!check.rows[0]?.reg) {
        const rawSql = `-- Golden Prime PG Supabase schema bundle.
-- Apply the numbered files in drizzle-pg/migrations/ order, or use this concatenated file in a new Supabase SQL editor.

-- SOURCE: drizzle-pg/migrations/0000_glossy_slipstream.sql
CREATE TYPE "public"."active_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."air_conditioning" AS ENUM('ac', 'non_ac');--> statement-breakpoint
CREATE TYPE "public"."allocation_primary_payer" AS ENUM('no', 'yes');--> statement-breakpoint
CREATE TYPE "public"."allocation_status" AS ENUM('active', 'vacated');--> statement-breakpoint
CREATE TYPE "public"."balcony" AS ENUM('balcony', 'non_balcony');--> statement-breakpoint
CREATE TYPE "public"."billing_cycle" AS ENUM('monthly', 'one_time');--> statement-breakpoint
CREATE TYPE "public"."expense_category" AS ENUM('maintenance', 'groceries', 'salaries', 'utilities', 'rent', 'water', 'labor', 'tiffin', 'other');--> statement-breakpoint
CREATE TYPE "public"."expense_liability_mode" AS ENUM('building', 'room_shared', 'tenant_assigned');--> statement-breakpoint
CREATE TYPE "public"."export_type" AS ENUM('tenants', 'rent', 'electricity', 'expenses', 'selected', 'complete');--> statement-breakpoint
CREATE TYPE "public"."manager_notification_kind" AS ENUM('rent_cycle', 'rent_upcoming', 'rent_overdue', 'electricity_upcoming', 'electricity_overdue');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('unread', 'read');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_category" AS ENUM('helper_salary', 'cook_salary', 'staff_advance', 'staff_settlement', 'groceries', 'utensils', 'gas', 'cleaning', 'water', 'repair_electrician', 'repair_plumber', 'rent_equipment', 'other');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_kind" AS ENUM('staff', 'supplies', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_liability_mode" AS ENUM('building', 'room_shared', 'tenant_assigned');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_status" AS ENUM('pending', 'partial', 'paid');--> statement-breakpoint
CREATE TYPE "public"."operating_work_status" AS ENUM('open', 'in_progress', 'complete');--> statement-breakpoint
CREATE TYPE "public"."owner_settlement_payment_method" AS ENUM('cash', 'upi', 'bank_transfer', 'cheque');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'upi', 'bank_transfer');--> statement-breakpoint
CREATE TYPE "public"."receipt_review_status" AS ENUM('not_submitted', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."reminder_status" AS ENUM('active', 'complete');--> statement-breakpoint
CREATE TYPE "public"."rent_status" AS ENUM('paid', 'pending', 'partial');--> statement-breakpoint
CREATE TYPE "public"."room_billing_mode" AS ENUM('equal_split', 'manager_set', 'primary_payer');--> statement-breakpoint
CREATE TYPE "public"."room_type" AS ENUM('single', 'double', 'triple', 'four', 'individual', 'coliving');--> statement-breakpoint
CREATE TYPE "public"."tenant_charge_source_type" AS ENUM('electricity', 'expense', 'operating_cost', 'tenant_service');--> statement-breakpoint
CREATE TYPE "public"."tenant_service_type" AS ENUM('tiffin', 'water_bottle', 'other');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."transfer_proration_status" AS ENUM('no', 'yes');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'helper', 'cook', 'tenant');--> statement-breakpoint
CREATE TABLE "buildings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(80),
	"landmark" varchar(160),
	"contactPhone" varchar(32),
	"imageUrl" text,
	"mapUrl" text,
	"ownerCutPercent" integer DEFAULT 0 NOT NULL,
	"ownerMonthlyCutPaise" integer DEFAULT 0 NOT NULL,
	"paymentBankName" varchar(120),
	"paymentAccountName" varchar(120),
	"paymentAccountNumber" varchar(64),
	"paymentIfsc" varchar(32),
	"paymentUpiId" varchar(120),
	"paymentQrUrl" text,
	"electricityRatePaise" integer DEFAULT 800 NOT NULL,
	"rentDueDay" integer DEFAULT 5 NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"ownerId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changeAuditLogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer,
	"entityType" varchar(48) NOT NULL,
	"entityId" integer NOT NULL,
	"action" varchar(48) NOT NULL,
	"snapshotJson" text NOT NULL,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "electricityBills" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"previousReading" integer NOT NULL,
	"currentReading" integer NOT NULL,
	"unitsConsumed" integer NOT NULL,
	"ratePerUnitPaise" integer NOT NULL,
	"billAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"dueDate" date,
	"notes" text,
	"meterImageUrl" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"overdueNotifiedAt" timestamp with time zone,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer,
	"tenantId" integer,
	"liabilityMode" "expense_liability_mode" DEFAULT 'building' NOT NULL,
	"category" "expense_category" NOT NULL,
	"amountPaise" integer NOT NULL,
	"expenseDate" date NOT NULL,
	"notes" text,
	"receiptUrl" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exportHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer,
	"requestedBy" integer NOT NULL,
	"exportType" "export_type" NOT NULL,
	"dateFrom" date,
	"dateTo" date,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "floors" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"name" varchar(80) NOT NULL,
	"level" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "governmentElectricityPayments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date NOT NULL,
	"paidOn" date,
	"paymentMethod" "owner_settlement_payment_method",
	"notes" text,
	"receiptUrl" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "managerCreditAdjustments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"amountPaise" integer NOT NULL,
	"notes" text NOT NULL,
	"createdBy" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "managerNotifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"kind" "manager_notification_kind" NOT NULL,
	"referenceKey" varchar(180) NOT NULL,
	"title" varchar(180) NOT NULL,
	"body" text NOT NULL,
	"dueDate" date,
	"status" "notification_status" DEFAULT 'unread' NOT NULL,
	"readAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operatingCosts" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer,
	"tenantId" integer,
	"liabilityMode" "operating_cost_liability_mode" DEFAULT 'building' NOT NULL,
	"kind" "operating_cost_kind" NOT NULL,
	"category" "operating_cost_category" NOT NULL,
	"title" varchar(160) NOT NULL,
	"payeeName" varchar(120),
	"vendorName" varchar(120),
	"amountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "operating_cost_status" DEFAULT 'pending' NOT NULL,
	"workStatus" "operating_work_status" DEFAULT 'open' NOT NULL,
	"costDate" date NOT NULL,
	"dueDate" date,
	"receiptUrl" text,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ownerSettlements" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date NOT NULL,
	"paidOn" date,
	"paymentMethod" "owner_settlement_payment_method",
	"notes" text,
	"receiptUrl" text,
	"ownerConfirmedAt" timestamp with time zone,
	"ownerConfirmedBy" integer,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer,
	"rentPaymentId" integer,
	"title" varchar(180) NOT NULL,
	"dueDate" date NOT NULL,
	"status" "reminder_status" DEFAULT 'active' NOT NULL,
	"notifiedAt" timestamp with time zone,
	"deliveryRequestedAt" timestamp with time zone,
	"deliveryRequestedBy" integer,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rentPayments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"allocationId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"rentMonth" varchar(7) NOT NULL,
	"dueDate" date NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"notes" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"overdueNotifiedAt" timestamp with time zone,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roomAllocations" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"activeTenantId" integer,
	"moveInDate" date NOT NULL,
	"moveOutDate" date,
	"bedLabel" varchar(32),
	"isPrimaryPayer" "allocation_primary_payer" DEFAULT 'no' NOT NULL,
	"monthlyRentPaise" integer NOT NULL,
	"depositPaise" integer DEFAULT 0 NOT NULL,
	"status" "allocation_status" DEFAULT 'active' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"floorId" integer,
	"number" varchar(32) NOT NULL,
	"capacity" integer DEFAULT 1 NOT NULL,
	"roomType" "room_type" DEFAULT 'single' NOT NULL,
	"billingMode" "room_billing_mode" DEFAULT 'equal_split' NOT NULL,
	"airConditioning" "air_conditioning" DEFAULT 'non_ac' NOT NULL,
	"balcony" "balcony" DEFAULT 'non_balcony' NOT NULL,
	"imageUrl" text,
	"defaultRentPaise" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "serviceCharges" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"name" varchar(120) NOT NULL,
	"amountPaise" integer NOT NULL,
	"billingCycle" "billing_cycle" DEFAULT 'monthly' NOT NULL,
	"dueDay" integer DEFAULT 1 NOT NULL,
	"active" "active_status" DEFAULT 'active' NOT NULL,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staffAssignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"userId" integer NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantCharges" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"roomId" integer,
	"sourceType" "tenant_charge_source_type" NOT NULL,
	"sourceId" integer NOT NULL,
	"billingMonth" varchar(7),
	"title" varchar(180) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"notes" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantServices" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"serviceType" "tenant_service_type" NOT NULL,
	"monthlyChargePaise" integer NOT NULL,
	"active" "active_status" DEFAULT 'active' NOT NULL,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantTransfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"sourceAllocationId" integer NOT NULL,
	"destinationAllocationId" integer NOT NULL,
	"sourceRoomId" integer NOT NULL,
	"destinationRoomId" integer NOT NULL,
	"effectiveDate" date NOT NULL,
	"sourceMonthlyRentPaise" integer NOT NULL,
	"destinationMonthlyRentPaise" integer NOT NULL,
	"prorationApplied" "transfer_proration_status" DEFAULT 'no' NOT NULL,
	"sourceProratedAmountPaise" integer,
	"destinationProratedAmountPaise" integer,
	"sourceRentPaymentId" integer,
	"destinationRentPaymentId" integer,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"userId" integer,
	"fullName" varchar(120) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(320),
	"emergencyContactName" varchar(120),
	"emergencyContactPhone" varchar(32),
	"address" text,
	"identityDocumentUrl" text,
	"status" "tenant_status" DEFAULT 'active' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"phone" varchar(20),
	"passwordHash" varchar(255),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'helper' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changeAuditLogs" ADD CONSTRAINT "changeAuditLogs_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changeAuditLogs" ADD CONSTRAINT "changeAuditLogs_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exportHistory" ADD CONSTRAINT "exportHistory_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exportHistory" ADD CONSTRAINT "exportHistory_requestedBy_users_id_fk" FOREIGN KEY ("requestedBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floors" ADD CONSTRAINT "floors_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "governmentElectricityPayments" ADD CONSTRAINT "governmentElectricityPayments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "governmentElectricityPayments" ADD CONSTRAINT "governmentElectricityPayments_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerCreditAdjustments" ADD CONSTRAINT "managerCreditAdjustments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerCreditAdjustments" ADD CONSTRAINT "managerCreditAdjustments_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerNotifications" ADD CONSTRAINT "managerNotifications_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_ownerConfirmedBy_users_id_fk" FOREIGN KEY ("ownerConfirmedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_rentPaymentId_rentPayments_id_fk" FOREIGN KEY ("rentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_deliveryRequestedBy_users_id_fk" FOREIGN KEY ("deliveryRequestedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_allocationId_roomAllocations_id_fk" FOREIGN KEY ("allocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_activeTenantId_tenants_id_fk" FOREIGN KEY ("activeTenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_floorId_floors_id_fk" FOREIGN KEY ("floorId") REFERENCES "public"."floors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serviceCharges" ADD CONSTRAINT "serviceCharges_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serviceCharges" ADD CONSTRAINT "serviceCharges_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffAssignments" ADD CONSTRAINT "staffAssignments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffAssignments" ADD CONSTRAINT "staffAssignments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceAllocationId_roomAllocations_id_fk" FOREIGN KEY ("sourceAllocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationAllocationId_roomAllocations_id_fk" FOREIGN KEY ("destinationAllocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceRoomId_rooms_id_fk" FOREIGN KEY ("sourceRoomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationRoomId_rooms_id_fk" FOREIGN KEY ("destinationRoomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceRentPaymentId_rentPayments_id_fk" FOREIGN KEY ("sourceRentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationRentPaymentId_rentPayments_id_fk" FOREIGN KEY ("destinationRentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "change_audit_building_created_idx" ON "changeAuditLogs" USING btree ("buildingId","createdAt");--> statement-breakpoint
CREATE INDEX "change_audit_entity_idx" ON "changeAuditLogs" USING btree ("entityType","entityId");--> statement-breakpoint
CREATE UNIQUE INDEX "electricity_room_month_unique" ON "electricityBills" USING btree ("roomId","billingMonth");--> statement-breakpoint
CREATE INDEX "electricity_building_month_idx" ON "electricityBills" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "expense_building_date_idx" ON "expenses" USING btree ("buildingId","expenseDate");--> statement-breakpoint
CREATE INDEX "expense_room_idx" ON "expenses" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX "expense_tenant_idx" ON "expenses" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "export_requester_created_idx" ON "exportHistory" USING btree ("requestedBy","createdAt");--> statement-breakpoint
CREATE UNIQUE INDEX "floor_building_level_unique" ON "floors" USING btree ("buildingId","level");--> statement-breakpoint
CREATE INDEX "floor_building_idx" ON "floors" USING btree ("buildingId");--> statement-breakpoint
CREATE UNIQUE INDEX "government_electricity_building_month_unique" ON "governmentElectricityPayments" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "government_electricity_building_due_idx" ON "governmentElectricityPayments" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "manager_credit_adjustment_building_month_idx" ON "managerCreditAdjustments" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE UNIQUE INDEX "manager_notification_reference_unique" ON "managerNotifications" USING btree ("referenceKey");--> statement-breakpoint
CREATE INDEX "manager_notification_building_status_idx" ON "managerNotifications" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "operating_cost_building_date_idx" ON "operatingCosts" USING btree ("buildingId","costDate");--> statement-breakpoint
CREATE INDEX "operating_cost_building_status_idx" ON "operatingCosts" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "operating_cost_room_idx" ON "operatingCosts" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX "operating_cost_tenant_idx" ON "operatingCosts" USING btree ("tenantId");--> statement-breakpoint
CREATE UNIQUE INDEX "owner_settlement_building_month_unique" ON "ownerSettlements" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "owner_settlement_building_due_idx" ON "ownerSettlements" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "reminder_building_due_idx" ON "reminders" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE UNIQUE INDEX "reminder_rent_payment_unique" ON "reminders" USING btree ("rentPaymentId");--> statement-breakpoint
CREATE UNIQUE INDEX "rent_allocation_month_unique" ON "rentPayments" USING btree ("allocationId","rentMonth");--> statement-breakpoint
CREATE INDEX "rent_building_due_idx" ON "rentPayments" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "rent_tenant_idx" ON "rentPayments" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "allocation_room_status_idx" ON "roomAllocations" USING btree ("roomId","status");--> statement-breakpoint
CREATE INDEX "allocation_tenant_status_idx" ON "roomAllocations" USING btree ("tenantId","status");--> statement-breakpoint
CREATE UNIQUE INDEX "allocation_active_tenant_unique" ON "roomAllocations" USING btree ("activeTenantId");--> statement-breakpoint
CREATE UNIQUE INDEX "room_building_number_unique" ON "rooms" USING btree ("buildingId","number");--> statement-breakpoint
CREATE INDEX "room_floor_idx" ON "rooms" USING btree ("floorId");--> statement-breakpoint
CREATE INDEX "service_charge_building_idx" ON "serviceCharges" USING btree ("buildingId");--> statement-breakpoint
CREATE UNIQUE INDEX "staff_assignment_unique" ON "staffAssignments" USING btree ("buildingId","userId");--> statement-breakpoint
CREATE INDEX "staff_assignment_user_idx" ON "staffAssignments" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_charge_source_tenant_month_unique" ON "tenantCharges" USING btree ("sourceType","sourceId","tenantId","billingMonth");--> statement-breakpoint
CREATE INDEX "tenant_charge_building_status_idx" ON "tenantCharges" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "tenant_charge_tenant_idx" ON "tenantCharges" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "tenant_service_building_idx" ON "tenantServices" USING btree ("buildingId");--> statement-breakpoint
CREATE INDEX "tenant_service_tenant_idx" ON "tenantServices" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "transfer_building_date_idx" ON "tenantTransfers" USING btree ("buildingId","effectiveDate");--> statement-breakpoint
CREATE INDEX "transfer_tenant_date_idx" ON "tenantTransfers" USING btree ("tenantId","effectiveDate");--> statement-breakpoint
CREATE INDEX "tenant_building_idx" ON "tenants" USING btree ("buildingId");--> statement-breakpoint
CREATE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$;--> statement-breakpoint
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON public."users" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER buildings_set_updated_at BEFORE UPDATE ON public."buildings" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER rooms_set_updated_at BEFORE UPDATE ON public."rooms" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenants_set_updated_at BEFORE UPDATE ON public."tenants" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER room_allocations_set_updated_at BEFORE UPDATE ON public."roomAllocations" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER rent_payments_set_updated_at BEFORE UPDATE ON public."rentPayments" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER electricity_bills_set_updated_at BEFORE UPDATE ON public."electricityBills" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER expenses_set_updated_at BEFORE UPDATE ON public."expenses" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER operating_costs_set_updated_at BEFORE UPDATE ON public."operatingCosts" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER owner_settlements_set_updated_at BEFORE UPDATE ON public."ownerSettlements" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER government_electricity_payments_set_updated_at BEFORE UPDATE ON public."governmentElectricityPayments" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenant_charges_set_updated_at BEFORE UPDATE ON public."tenantCharges" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER service_charges_set_updated_at BEFORE UPDATE ON public."serviceCharges" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenant_services_set_updated_at BEFORE UPDATE ON public."tenantServices" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER reminders_set_updated_at BEFORE UPDATE ON public."reminders" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER manager_notifications_set_updated_at BEFORE UPDATE ON public."managerNotifications" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- SOURCE: drizzle-pg/migrations/0001_harden_updated_at_trigger.sql
ALTER FUNCTION public.set_updated_at() SET search_path = pg_catalog;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM authenticated;


-- SOURCE: drizzle-pg/migrations/0002_rename_rooms_billing_mode.sql
ALTER TABLE public."rooms" RENAME COLUMN "billingMode" TO "roomBillingMode";


-- SOURCE: drizzle-pg/migrations/0003_align_source_enum_column_names.sql
ALTER TABLE public."tenants" RENAME COLUMN "status" TO "tenantStatus";
ALTER TABLE public."roomAllocations" RENAME COLUMN "isPrimaryPayer" TO "allocationPrimaryPayer";
ALTER TABLE public."roomAllocations" RENAME COLUMN "status" TO "allocationStatus";
ALTER TABLE public."rentPayments" RENAME COLUMN "status" TO "rentStatus";
ALTER TABLE public."rentPayments" RENAME COLUMN "paymentMethod" TO "rentPaymentMethod";
ALTER TABLE public."rentPayments" RENAME COLUMN "receiptReviewStatus" TO "rentReceiptReviewStatus";
ALTER TABLE public."electricityBills" RENAME COLUMN "status" TO "electricityStatus";
ALTER TABLE public."electricityBills" RENAME COLUMN "paymentMethod" TO "electricityPaymentMethod";
ALTER TABLE public."electricityBills" RENAME COLUMN "receiptReviewStatus" TO "electricityReceiptReviewStatus";
ALTER TABLE public."expenses" RENAME COLUMN "liabilityMode" TO "expenseLiabilityMode";
ALTER TABLE public."expenses" RENAME COLUMN "category" TO "expenseCategory";
ALTER TABLE public."operatingCosts" RENAME COLUMN "liabilityMode" TO "operatingCostLiabilityMode";
ALTER TABLE public."operatingCosts" RENAME COLUMN "kind" TO "operatingCostKind";
ALTER TABLE public."operatingCosts" RENAME COLUMN "category" TO "operatingCostCategory";
ALTER TABLE public."operatingCosts" RENAME COLUMN "status" TO "operatingCostStatus";
ALTER TABLE public."operatingCosts" RENAME COLUMN "workStatus" TO "operatingWorkStatus";
ALTER TABLE public."ownerSettlements" RENAME COLUMN "status" TO "ownerSettlementStatus";
ALTER TABLE public."ownerSettlements" RENAME COLUMN "paymentMethod" TO "ownerSettlementPaymentMethod";
ALTER TABLE public."governmentElectricityPayments" RENAME COLUMN "status" TO "governmentElectricityPaymentStatus";
ALTER TABLE public."governmentElectricityPayments" RENAME COLUMN "paymentMethod" TO "governmentElectricityPaymentMethod";
ALTER TABLE public."tenantCharges" RENAME COLUMN "sourceType" TO "tenantChargeSourceType";
ALTER TABLE public."tenantCharges" RENAME COLUMN "status" TO "tenantChargeStatus";
ALTER TABLE public."tenantCharges" RENAME COLUMN "paymentMethod" TO "tenantChargePaymentMethod";
ALTER TABLE public."tenantCharges" RENAME COLUMN "receiptReviewStatus" TO "tenantChargeReceiptReviewStatus";
ALTER TABLE public."serviceCharges" RENAME COLUMN "active" TO "serviceChargeStatus";
ALTER TABLE public."tenantServices" RENAME COLUMN "serviceType" TO "tenantServiceType";
ALTER TABLE public."tenantServices" RENAME COLUMN "active" TO "tenantServiceStatus";
ALTER TABLE public."reminders" RENAME COLUMN "status" TO "reminderStatus";
ALTER TABLE public."managerNotifications" RENAME COLUMN "kind" TO "managerNotificationKind";
ALTER TABLE public."managerNotifications" RENAME COLUMN "status" TO "managerNotificationStatus";


-- SOURCE: drizzle-pg/migrations/0004_reset_imported_id_sequences.sql
SELECT setval(pg_get_serial_sequence('public.users', 'id'), COALESCE((SELECT MAX(id) FROM public.users), 1), EXISTS (SELECT 1 FROM public.users));
SELECT setval(pg_get_serial_sequence('public.buildings', 'id'), COALESCE((SELECT MAX(id) FROM public.buildings), 1), EXISTS (SELECT 1 FROM public.buildings));
SELECT setval(pg_get_serial_sequence('public."staffAssignments"', 'id'), COALESCE((SELECT MAX(id) FROM public."staffAssignments"), 1), EXISTS (SELECT 1 FROM public."staffAssignments"));
SELECT setval(pg_get_serial_sequence('public.floors', 'id'), COALESCE((SELECT MAX(id) FROM public.floors), 1), EXISTS (SELECT 1 FROM public.floors));
SELECT setval(pg_get_serial_sequence('public.rooms', 'id'), COALESCE((SELECT MAX(id) FROM public.rooms), 1), EXISTS (SELECT 1 FROM public.rooms));
SELECT setval(pg_get_serial_sequence('public.tenants', 'id'), COALESCE((SELECT MAX(id) FROM public.tenants), 1), EXISTS (SELECT 1 FROM public.tenants));
SELECT setval(pg_get_serial_sequence('public."roomAllocations"', 'id'), COALESCE((SELECT MAX(id) FROM public."roomAllocations"), 1), EXISTS (SELECT 1 FROM public."roomAllocations"));
SELECT setval(pg_get_serial_sequence('public."rentPayments"', 'id'), COALESCE((SELECT MAX(id) FROM public."rentPayments"), 1), EXISTS (SELECT 1 FROM public."rentPayments"));
SELECT setval(pg_get_serial_sequence('public."tenantTransfers"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantTransfers"), 1), EXISTS (SELECT 1 FROM public."tenantTransfers"));
SELECT setval(pg_get_serial_sequence('public."electricityBills"', 'id'), COALESCE((SELECT MAX(id) FROM public."electricityBills"), 1), EXISTS (SELECT 1 FROM public."electricityBills"));
SELECT setval(pg_get_serial_sequence('public.expenses', 'id'), COALESCE((SELECT MAX(id) FROM public.expenses), 1), EXISTS (SELECT 1 FROM public.expenses));
SELECT setval(pg_get_serial_sequence('public."operatingCosts"', 'id'), COALESCE((SELECT MAX(id) FROM public."operatingCosts"), 1), EXISTS (SELECT 1 FROM public."operatingCosts"));
SELECT setval(pg_get_serial_sequence('public."ownerSettlements"', 'id'), COALESCE((SELECT MAX(id) FROM public."ownerSettlements"), 1), EXISTS (SELECT 1 FROM public."ownerSettlements"));
SELECT setval(pg_get_serial_sequence('public."governmentElectricityPayments"', 'id'), COALESCE((SELECT MAX(id) FROM public."governmentElectricityPayments"), 1), EXISTS (SELECT 1 FROM public."governmentElectricityPayments"));
SELECT setval(pg_get_serial_sequence('public."managerCreditAdjustments"', 'id'), COALESCE((SELECT MAX(id) FROM public."managerCreditAdjustments"), 1), EXISTS (SELECT 1 FROM public."managerCreditAdjustments"));
SELECT setval(pg_get_serial_sequence('public."changeAuditLogs"', 'id'), COALESCE((SELECT MAX(id) FROM public."changeAuditLogs"), 1), EXISTS (SELECT 1 FROM public."changeAuditLogs"));
SELECT setval(pg_get_serial_sequence('public."tenantCharges"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantCharges"), 1), EXISTS (SELECT 1 FROM public."tenantCharges"));
SELECT setval(pg_get_serial_sequence('public."serviceCharges"', 'id'), COALESCE((SELECT MAX(id) FROM public."serviceCharges"), 1), EXISTS (SELECT 1 FROM public."serviceCharges"));
SELECT setval(pg_get_serial_sequence('public."tenantServices"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantServices"), 1), EXISTS (SELECT 1 FROM public."tenantServices"));
SELECT setval(pg_get_serial_sequence('public.reminders', 'id'), COALESCE((SELECT MAX(id) FROM public.reminders), 1), EXISTS (SELECT 1 FROM public.reminders));
SELECT setval(pg_get_serial_sequence('public."managerNotifications"', 'id'), COALESCE((SELECT MAX(id) FROM public."managerNotifications"), 1), EXISTS (SELECT 1 FROM public."managerNotifications"));
SELECT setval(pg_get_serial_sequence('public."exportHistory"', 'id'), COALESCE((SELECT MAX(id) FROM public."exportHistory"), 1), EXISTS (SELECT 1 FROM public."exportHistory"));

`.length > 0 ? `-- Golden Prime PG Supabase schema bundle.
-- Apply the numbered files in drizzle-pg/migrations/ order, or use this concatenated file in a new Supabase SQL editor.

-- SOURCE: drizzle-pg/migrations/0000_glossy_slipstream.sql
CREATE TYPE "public"."active_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."air_conditioning" AS ENUM('ac', 'non_ac');--> statement-breakpoint
CREATE TYPE "public"."allocation_primary_payer" AS ENUM('no', 'yes');--> statement-breakpoint
CREATE TYPE "public"."allocation_status" AS ENUM('active', 'vacated');--> statement-breakpoint
CREATE TYPE "public"."balcony" AS ENUM('balcony', 'non_balcony');--> statement-breakpoint
CREATE TYPE "public"."billing_cycle" AS ENUM('monthly', 'one_time');--> statement-breakpoint
CREATE TYPE "public"."expense_category" AS ENUM('maintenance', 'groceries', 'salaries', 'utilities', 'rent', 'water', 'labor', 'tiffin', 'other');--> statement-breakpoint
CREATE TYPE "public"."expense_liability_mode" AS ENUM('building', 'room_shared', 'tenant_assigned');--> statement-breakpoint
CREATE TYPE "public"."export_type" AS ENUM('tenants', 'rent', 'electricity', 'expenses', 'selected', 'complete');--> statement-breakpoint
CREATE TYPE "public"."manager_notification_kind" AS ENUM('rent_cycle', 'rent_upcoming', 'rent_overdue', 'electricity_upcoming', 'electricity_overdue');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('unread', 'read');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_category" AS ENUM('helper_salary', 'cook_salary', 'staff_advance', 'staff_settlement', 'groceries', 'utensils', 'gas', 'cleaning', 'water', 'repair_electrician', 'repair_plumber', 'rent_equipment', 'other');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_kind" AS ENUM('staff', 'supplies', 'maintenance');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_liability_mode" AS ENUM('building', 'room_shared', 'tenant_assigned');--> statement-breakpoint
CREATE TYPE "public"."operating_cost_status" AS ENUM('pending', 'partial', 'paid');--> statement-breakpoint
CREATE TYPE "public"."operating_work_status" AS ENUM('open', 'in_progress', 'complete');--> statement-breakpoint
CREATE TYPE "public"."owner_settlement_payment_method" AS ENUM('cash', 'upi', 'bank_transfer', 'cheque');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('cash', 'upi', 'bank_transfer');--> statement-breakpoint
CREATE TYPE "public"."receipt_review_status" AS ENUM('not_submitted', 'pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."reminder_status" AS ENUM('active', 'complete');--> statement-breakpoint
CREATE TYPE "public"."rent_status" AS ENUM('paid', 'pending', 'partial');--> statement-breakpoint
CREATE TYPE "public"."room_billing_mode" AS ENUM('equal_split', 'manager_set', 'primary_payer');--> statement-breakpoint
CREATE TYPE "public"."room_type" AS ENUM('single', 'double', 'triple', 'four', 'individual', 'coliving');--> statement-breakpoint
CREATE TYPE "public"."tenant_charge_source_type" AS ENUM('electricity', 'expense', 'operating_cost', 'tenant_service');--> statement-breakpoint
CREATE TYPE "public"."tenant_service_type" AS ENUM('tiffin', 'water_bottle', 'other');--> statement-breakpoint
CREATE TYPE "public"."tenant_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TYPE "public"."transfer_proration_status" AS ENUM('no', 'yes');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'manager', 'helper', 'cook', 'tenant');--> statement-breakpoint
CREATE TABLE "buildings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(120) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(80),
	"landmark" varchar(160),
	"contactPhone" varchar(32),
	"imageUrl" text,
	"mapUrl" text,
	"ownerCutPercent" integer DEFAULT 0 NOT NULL,
	"ownerMonthlyCutPaise" integer DEFAULT 0 NOT NULL,
	"paymentBankName" varchar(120),
	"paymentAccountName" varchar(120),
	"paymentAccountNumber" varchar(64),
	"paymentIfsc" varchar(32),
	"paymentUpiId" varchar(120),
	"paymentQrUrl" text,
	"electricityRatePaise" integer DEFAULT 800 NOT NULL,
	"rentDueDay" integer DEFAULT 5 NOT NULL,
	"currency" varchar(3) DEFAULT 'INR' NOT NULL,
	"ownerId" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "changeAuditLogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer,
	"entityType" varchar(48) NOT NULL,
	"entityId" integer NOT NULL,
	"action" varchar(48) NOT NULL,
	"snapshotJson" text NOT NULL,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "electricityBills" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"previousReading" integer NOT NULL,
	"currentReading" integer NOT NULL,
	"unitsConsumed" integer NOT NULL,
	"ratePerUnitPaise" integer NOT NULL,
	"billAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"dueDate" date,
	"notes" text,
	"meterImageUrl" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"overdueNotifiedAt" timestamp with time zone,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "expenses" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer,
	"tenantId" integer,
	"liabilityMode" "expense_liability_mode" DEFAULT 'building' NOT NULL,
	"category" "expense_category" NOT NULL,
	"amountPaise" integer NOT NULL,
	"expenseDate" date NOT NULL,
	"notes" text,
	"receiptUrl" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exportHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer,
	"requestedBy" integer NOT NULL,
	"exportType" "export_type" NOT NULL,
	"dateFrom" date,
	"dateTo" date,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "floors" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"name" varchar(80) NOT NULL,
	"level" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "governmentElectricityPayments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date NOT NULL,
	"paidOn" date,
	"paymentMethod" "owner_settlement_payment_method",
	"notes" text,
	"receiptUrl" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "managerCreditAdjustments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"amountPaise" integer NOT NULL,
	"notes" text NOT NULL,
	"createdBy" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "managerNotifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"kind" "manager_notification_kind" NOT NULL,
	"referenceKey" varchar(180) NOT NULL,
	"title" varchar(180) NOT NULL,
	"body" text NOT NULL,
	"dueDate" date,
	"status" "notification_status" DEFAULT 'unread' NOT NULL,
	"readAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "operatingCosts" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer,
	"tenantId" integer,
	"liabilityMode" "operating_cost_liability_mode" DEFAULT 'building' NOT NULL,
	"kind" "operating_cost_kind" NOT NULL,
	"category" "operating_cost_category" NOT NULL,
	"title" varchar(160) NOT NULL,
	"payeeName" varchar(120),
	"vendorName" varchar(120),
	"amountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "operating_cost_status" DEFAULT 'pending' NOT NULL,
	"workStatus" "operating_work_status" DEFAULT 'open' NOT NULL,
	"costDate" date NOT NULL,
	"dueDate" date,
	"receiptUrl" text,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ownerSettlements" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"billingMonth" varchar(7) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date NOT NULL,
	"paidOn" date,
	"paymentMethod" "owner_settlement_payment_method",
	"notes" text,
	"receiptUrl" text,
	"ownerConfirmedAt" timestamp with time zone,
	"ownerConfirmedBy" integer,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reminders" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer,
	"rentPaymentId" integer,
	"title" varchar(180) NOT NULL,
	"dueDate" date NOT NULL,
	"status" "reminder_status" DEFAULT 'active' NOT NULL,
	"notifiedAt" timestamp with time zone,
	"deliveryRequestedAt" timestamp with time zone,
	"deliveryRequestedBy" integer,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rentPayments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"allocationId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"rentMonth" varchar(7) NOT NULL,
	"dueDate" date NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"notes" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"overdueNotifiedAt" timestamp with time zone,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roomAllocations" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"roomId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"activeTenantId" integer,
	"moveInDate" date NOT NULL,
	"moveOutDate" date,
	"bedLabel" varchar(32),
	"isPrimaryPayer" "allocation_primary_payer" DEFAULT 'no' NOT NULL,
	"monthlyRentPaise" integer NOT NULL,
	"depositPaise" integer DEFAULT 0 NOT NULL,
	"status" "allocation_status" DEFAULT 'active' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"floorId" integer,
	"number" varchar(32) NOT NULL,
	"capacity" integer DEFAULT 1 NOT NULL,
	"roomType" "room_type" DEFAULT 'single' NOT NULL,
	"billingMode" "room_billing_mode" DEFAULT 'equal_split' NOT NULL,
	"airConditioning" "air_conditioning" DEFAULT 'non_ac' NOT NULL,
	"balcony" "balcony" DEFAULT 'non_balcony' NOT NULL,
	"imageUrl" text,
	"defaultRentPaise" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "serviceCharges" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"name" varchar(120) NOT NULL,
	"amountPaise" integer NOT NULL,
	"billingCycle" "billing_cycle" DEFAULT 'monthly' NOT NULL,
	"dueDay" integer DEFAULT 1 NOT NULL,
	"active" "active_status" DEFAULT 'active' NOT NULL,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "staffAssignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"userId" integer NOT NULL,
	"assignedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantCharges" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"roomId" integer,
	"sourceType" "tenant_charge_source_type" NOT NULL,
	"sourceId" integer NOT NULL,
	"billingMonth" varchar(7),
	"title" varchar(180) NOT NULL,
	"expectedAmountPaise" integer NOT NULL,
	"paidAmountPaise" integer DEFAULT 0 NOT NULL,
	"status" "rent_status" DEFAULT 'pending' NOT NULL,
	"dueDate" date,
	"paidOn" date,
	"paymentMethod" "payment_method",
	"notes" text,
	"receiptUrl" text,
	"receiptReviewStatus" "receipt_review_status" DEFAULT 'not_submitted' NOT NULL,
	"receiptReviewedAt" timestamp with time zone,
	"receiptReviewedBy" integer,
	"receiptReviewNote" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantServices" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"serviceType" "tenant_service_type" NOT NULL,
	"monthlyChargePaise" integer NOT NULL,
	"active" "active_status" DEFAULT 'active' NOT NULL,
	"notes" text,
	"createdBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenantTransfers" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"tenantId" integer NOT NULL,
	"sourceAllocationId" integer NOT NULL,
	"destinationAllocationId" integer NOT NULL,
	"sourceRoomId" integer NOT NULL,
	"destinationRoomId" integer NOT NULL,
	"effectiveDate" date NOT NULL,
	"sourceMonthlyRentPaise" integer NOT NULL,
	"destinationMonthlyRentPaise" integer NOT NULL,
	"prorationApplied" "transfer_proration_status" DEFAULT 'no' NOT NULL,
	"sourceProratedAmountPaise" integer,
	"destinationProratedAmountPaise" integer,
	"sourceRentPaymentId" integer,
	"destinationRentPaymentId" integer,
	"recordedBy" integer,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"buildingId" integer NOT NULL,
	"userId" integer,
	"fullName" varchar(120) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"email" varchar(320),
	"emergencyContactName" varchar(120),
	"emergencyContactPhone" varchar(32),
	"address" text,
	"identityDocumentUrl" text,
	"status" "tenant_status" DEFAULT 'active' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"phone" varchar(20),
	"passwordHash" varchar(255),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'helper' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changeAuditLogs" ADD CONSTRAINT "changeAuditLogs_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "changeAuditLogs" ADD CONSTRAINT "changeAuditLogs_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "electricityBills" ADD CONSTRAINT "electricityBills_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exportHistory" ADD CONSTRAINT "exportHistory_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exportHistory" ADD CONSTRAINT "exportHistory_requestedBy_users_id_fk" FOREIGN KEY ("requestedBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "floors" ADD CONSTRAINT "floors_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "governmentElectricityPayments" ADD CONSTRAINT "governmentElectricityPayments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "governmentElectricityPayments" ADD CONSTRAINT "governmentElectricityPayments_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerCreditAdjustments" ADD CONSTRAINT "managerCreditAdjustments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerCreditAdjustments" ADD CONSTRAINT "managerCreditAdjustments_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "managerNotifications" ADD CONSTRAINT "managerNotifications_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "operatingCosts" ADD CONSTRAINT "operatingCosts_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_ownerConfirmedBy_users_id_fk" FOREIGN KEY ("ownerConfirmedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ownerSettlements" ADD CONSTRAINT "ownerSettlements_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_rentPaymentId_rentPayments_id_fk" FOREIGN KEY ("rentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_deliveryRequestedBy_users_id_fk" FOREIGN KEY ("deliveryRequestedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_allocationId_roomAllocations_id_fk" FOREIGN KEY ("allocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rentPayments" ADD CONSTRAINT "rentPayments_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomAllocations" ADD CONSTRAINT "roomAllocations_activeTenantId_tenants_id_fk" FOREIGN KEY ("activeTenantId") REFERENCES "public"."tenants"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_floorId_floors_id_fk" FOREIGN KEY ("floorId") REFERENCES "public"."floors"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serviceCharges" ADD CONSTRAINT "serviceCharges_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "serviceCharges" ADD CONSTRAINT "serviceCharges_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffAssignments" ADD CONSTRAINT "staffAssignments_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "staffAssignments" ADD CONSTRAINT "staffAssignments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_receiptReviewedBy_users_id_fk" FOREIGN KEY ("receiptReviewedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantCharges" ADD CONSTRAINT "tenantCharges_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantServices" ADD CONSTRAINT "tenantServices_createdBy_users_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_tenantId_tenants_id_fk" FOREIGN KEY ("tenantId") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceAllocationId_roomAllocations_id_fk" FOREIGN KEY ("sourceAllocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationAllocationId_roomAllocations_id_fk" FOREIGN KEY ("destinationAllocationId") REFERENCES "public"."roomAllocations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceRoomId_rooms_id_fk" FOREIGN KEY ("sourceRoomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationRoomId_rooms_id_fk" FOREIGN KEY ("destinationRoomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_sourceRentPaymentId_rentPayments_id_fk" FOREIGN KEY ("sourceRentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_destinationRentPaymentId_rentPayments_id_fk" FOREIGN KEY ("destinationRentPaymentId") REFERENCES "public"."rentPayments"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenantTransfers" ADD CONSTRAINT "tenantTransfers_recordedBy_users_id_fk" FOREIGN KEY ("recordedBy") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_buildingId_buildings_id_fk" FOREIGN KEY ("buildingId") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "change_audit_building_created_idx" ON "changeAuditLogs" USING btree ("buildingId","createdAt");--> statement-breakpoint
CREATE INDEX "change_audit_entity_idx" ON "changeAuditLogs" USING btree ("entityType","entityId");--> statement-breakpoint
CREATE UNIQUE INDEX "electricity_room_month_unique" ON "electricityBills" USING btree ("roomId","billingMonth");--> statement-breakpoint
CREATE INDEX "electricity_building_month_idx" ON "electricityBills" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "expense_building_date_idx" ON "expenses" USING btree ("buildingId","expenseDate");--> statement-breakpoint
CREATE INDEX "expense_room_idx" ON "expenses" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX "expense_tenant_idx" ON "expenses" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "export_requester_created_idx" ON "exportHistory" USING btree ("requestedBy","createdAt");--> statement-breakpoint
CREATE UNIQUE INDEX "floor_building_level_unique" ON "floors" USING btree ("buildingId","level");--> statement-breakpoint
CREATE INDEX "floor_building_idx" ON "floors" USING btree ("buildingId");--> statement-breakpoint
CREATE UNIQUE INDEX "government_electricity_building_month_unique" ON "governmentElectricityPayments" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "government_electricity_building_due_idx" ON "governmentElectricityPayments" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "manager_credit_adjustment_building_month_idx" ON "managerCreditAdjustments" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE UNIQUE INDEX "manager_notification_reference_unique" ON "managerNotifications" USING btree ("referenceKey");--> statement-breakpoint
CREATE INDEX "manager_notification_building_status_idx" ON "managerNotifications" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "operating_cost_building_date_idx" ON "operatingCosts" USING btree ("buildingId","costDate");--> statement-breakpoint
CREATE INDEX "operating_cost_building_status_idx" ON "operatingCosts" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "operating_cost_room_idx" ON "operatingCosts" USING btree ("roomId");--> statement-breakpoint
CREATE INDEX "operating_cost_tenant_idx" ON "operatingCosts" USING btree ("tenantId");--> statement-breakpoint
CREATE UNIQUE INDEX "owner_settlement_building_month_unique" ON "ownerSettlements" USING btree ("buildingId","billingMonth");--> statement-breakpoint
CREATE INDEX "owner_settlement_building_due_idx" ON "ownerSettlements" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "reminder_building_due_idx" ON "reminders" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE UNIQUE INDEX "reminder_rent_payment_unique" ON "reminders" USING btree ("rentPaymentId");--> statement-breakpoint
CREATE UNIQUE INDEX "rent_allocation_month_unique" ON "rentPayments" USING btree ("allocationId","rentMonth");--> statement-breakpoint
CREATE INDEX "rent_building_due_idx" ON "rentPayments" USING btree ("buildingId","dueDate");--> statement-breakpoint
CREATE INDEX "rent_tenant_idx" ON "rentPayments" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "allocation_room_status_idx" ON "roomAllocations" USING btree ("roomId","status");--> statement-breakpoint
CREATE INDEX "allocation_tenant_status_idx" ON "roomAllocations" USING btree ("tenantId","status");--> statement-breakpoint
CREATE UNIQUE INDEX "allocation_active_tenant_unique" ON "roomAllocations" USING btree ("activeTenantId");--> statement-breakpoint
CREATE UNIQUE INDEX "room_building_number_unique" ON "rooms" USING btree ("buildingId","number");--> statement-breakpoint
CREATE INDEX "room_floor_idx" ON "rooms" USING btree ("floorId");--> statement-breakpoint
CREATE INDEX "service_charge_building_idx" ON "serviceCharges" USING btree ("buildingId");--> statement-breakpoint
CREATE UNIQUE INDEX "staff_assignment_unique" ON "staffAssignments" USING btree ("buildingId","userId");--> statement-breakpoint
CREATE INDEX "staff_assignment_user_idx" ON "staffAssignments" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "tenant_charge_source_tenant_month_unique" ON "tenantCharges" USING btree ("sourceType","sourceId","tenantId","billingMonth");--> statement-breakpoint
CREATE INDEX "tenant_charge_building_status_idx" ON "tenantCharges" USING btree ("buildingId","status");--> statement-breakpoint
CREATE INDEX "tenant_charge_tenant_idx" ON "tenantCharges" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "tenant_service_building_idx" ON "tenantServices" USING btree ("buildingId");--> statement-breakpoint
CREATE INDEX "tenant_service_tenant_idx" ON "tenantServices" USING btree ("tenantId");--> statement-breakpoint
CREATE INDEX "transfer_building_date_idx" ON "tenantTransfers" USING btree ("buildingId","effectiveDate");--> statement-breakpoint
CREATE INDEX "transfer_tenant_date_idx" ON "tenantTransfers" USING btree ("tenantId","effectiveDate");--> statement-breakpoint
CREATE INDEX "tenant_building_idx" ON "tenants" USING btree ("buildingId");--> statement-breakpoint
CREATE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$;--> statement-breakpoint
CREATE TRIGGER users_set_updated_at BEFORE UPDATE ON public."users" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER buildings_set_updated_at BEFORE UPDATE ON public."buildings" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER rooms_set_updated_at BEFORE UPDATE ON public."rooms" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenants_set_updated_at BEFORE UPDATE ON public."tenants" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER room_allocations_set_updated_at BEFORE UPDATE ON public."roomAllocations" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER rent_payments_set_updated_at BEFORE UPDATE ON public."rentPayments" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER electricity_bills_set_updated_at BEFORE UPDATE ON public."electricityBills" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER expenses_set_updated_at BEFORE UPDATE ON public."expenses" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER operating_costs_set_updated_at BEFORE UPDATE ON public."operatingCosts" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER owner_settlements_set_updated_at BEFORE UPDATE ON public."ownerSettlements" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER government_electricity_payments_set_updated_at BEFORE UPDATE ON public."governmentElectricityPayments" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenant_charges_set_updated_at BEFORE UPDATE ON public."tenantCharges" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER service_charges_set_updated_at BEFORE UPDATE ON public."serviceCharges" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER tenant_services_set_updated_at BEFORE UPDATE ON public."tenantServices" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER reminders_set_updated_at BEFORE UPDATE ON public."reminders" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();--> statement-breakpoint
CREATE TRIGGER manager_notifications_set_updated_at BEFORE UPDATE ON public."managerNotifications" FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- SOURCE: drizzle-pg/migrations/0001_harden_updated_at_trigger.sql
ALTER FUNCTION public.set_updated_at() SET search_path = pg_catalog;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM anon;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM authenticated;


-- SOURCE: drizzle-pg/migrations/0002_rename_rooms_billing_mode.sql
ALTER TABLE public."rooms" RENAME COLUMN "billingMode" TO "roomBillingMode";


-- SOURCE: drizzle-pg/migrations/0003_align_source_enum_column_names.sql
ALTER TABLE public."tenants" RENAME COLUMN "status" TO "tenantStatus";
ALTER TABLE public."roomAllocations" RENAME COLUMN "isPrimaryPayer" TO "allocationPrimaryPayer";
ALTER TABLE public."roomAllocations" RENAME COLUMN "status" TO "allocationStatus";
ALTER TABLE public."rentPayments" RENAME COLUMN "status" TO "rentStatus";
ALTER TABLE public."rentPayments" RENAME COLUMN "paymentMethod" TO "rentPaymentMethod";
ALTER TABLE public."rentPayments" RENAME COLUMN "receiptReviewStatus" TO "rentReceiptReviewStatus";
ALTER TABLE public."electricityBills" RENAME COLUMN "status" TO "electricityStatus";
ALTER TABLE public."electricityBills" RENAME COLUMN "paymentMethod" TO "electricityPaymentMethod";
ALTER TABLE public."electricityBills" RENAME COLUMN "receiptReviewStatus" TO "electricityReceiptReviewStatus";
ALTER TABLE public."expenses" RENAME COLUMN "liabilityMode" TO "expenseLiabilityMode";
ALTER TABLE public."expenses" RENAME COLUMN "category" TO "expenseCategory";
ALTER TABLE public."operatingCosts" RENAME COLUMN "liabilityMode" TO "operatingCostLiabilityMode";
ALTER TABLE public."operatingCosts" RENAME COLUMN "kind" TO "operatingCostKind";
ALTER TABLE public."operatingCosts" RENAME COLUMN "category" TO "operatingCostCategory";
ALTER TABLE public."operatingCosts" RENAME COLUMN "status" TO "operatingCostStatus";
ALTER TABLE public."operatingCosts" RENAME COLUMN "workStatus" TO "operatingWorkStatus";
ALTER TABLE public."ownerSettlements" RENAME COLUMN "status" TO "ownerSettlementStatus";
ALTER TABLE public."ownerSettlements" RENAME COLUMN "paymentMethod" TO "ownerSettlementPaymentMethod";
ALTER TABLE public."governmentElectricityPayments" RENAME COLUMN "status" TO "governmentElectricityPaymentStatus";
ALTER TABLE public."governmentElectricityPayments" RENAME COLUMN "paymentMethod" TO "governmentElectricityPaymentMethod";
ALTER TABLE public."tenantCharges" RENAME COLUMN "sourceType" TO "tenantChargeSourceType";
ALTER TABLE public."tenantCharges" RENAME COLUMN "status" TO "tenantChargeStatus";
ALTER TABLE public."tenantCharges" RENAME COLUMN "paymentMethod" TO "tenantChargePaymentMethod";
ALTER TABLE public."tenantCharges" RENAME COLUMN "receiptReviewStatus" TO "tenantChargeReceiptReviewStatus";
ALTER TABLE public."serviceCharges" RENAME COLUMN "active" TO "serviceChargeStatus";
ALTER TABLE public."tenantServices" RENAME COLUMN "serviceType" TO "tenantServiceType";
ALTER TABLE public."tenantServices" RENAME COLUMN "active" TO "tenantServiceStatus";
ALTER TABLE public."reminders" RENAME COLUMN "status" TO "reminderStatus";
ALTER TABLE public."managerNotifications" RENAME COLUMN "kind" TO "managerNotificationKind";
ALTER TABLE public."managerNotifications" RENAME COLUMN "status" TO "managerNotificationStatus";


-- SOURCE: drizzle-pg/migrations/0004_reset_imported_id_sequences.sql
SELECT setval(pg_get_serial_sequence('public.users', 'id'), COALESCE((SELECT MAX(id) FROM public.users), 1), EXISTS (SELECT 1 FROM public.users));
SELECT setval(pg_get_serial_sequence('public.buildings', 'id'), COALESCE((SELECT MAX(id) FROM public.buildings), 1), EXISTS (SELECT 1 FROM public.buildings));
SELECT setval(pg_get_serial_sequence('public."staffAssignments"', 'id'), COALESCE((SELECT MAX(id) FROM public."staffAssignments"), 1), EXISTS (SELECT 1 FROM public."staffAssignments"));
SELECT setval(pg_get_serial_sequence('public.floors', 'id'), COALESCE((SELECT MAX(id) FROM public.floors), 1), EXISTS (SELECT 1 FROM public.floors));
SELECT setval(pg_get_serial_sequence('public.rooms', 'id'), COALESCE((SELECT MAX(id) FROM public.rooms), 1), EXISTS (SELECT 1 FROM public.rooms));
SELECT setval(pg_get_serial_sequence('public.tenants', 'id'), COALESCE((SELECT MAX(id) FROM public.tenants), 1), EXISTS (SELECT 1 FROM public.tenants));
SELECT setval(pg_get_serial_sequence('public."roomAllocations"', 'id'), COALESCE((SELECT MAX(id) FROM public."roomAllocations"), 1), EXISTS (SELECT 1 FROM public."roomAllocations"));
SELECT setval(pg_get_serial_sequence('public."rentPayments"', 'id'), COALESCE((SELECT MAX(id) FROM public."rentPayments"), 1), EXISTS (SELECT 1 FROM public."rentPayments"));
SELECT setval(pg_get_serial_sequence('public."tenantTransfers"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantTransfers"), 1), EXISTS (SELECT 1 FROM public."tenantTransfers"));
SELECT setval(pg_get_serial_sequence('public."electricityBills"', 'id'), COALESCE((SELECT MAX(id) FROM public."electricityBills"), 1), EXISTS (SELECT 1 FROM public."electricityBills"));
SELECT setval(pg_get_serial_sequence('public.expenses', 'id'), COALESCE((SELECT MAX(id) FROM public.expenses), 1), EXISTS (SELECT 1 FROM public.expenses));
SELECT setval(pg_get_serial_sequence('public."operatingCosts"', 'id'), COALESCE((SELECT MAX(id) FROM public."operatingCosts"), 1), EXISTS (SELECT 1 FROM public."operatingCosts"));
SELECT setval(pg_get_serial_sequence('public."ownerSettlements"', 'id'), COALESCE((SELECT MAX(id) FROM public."ownerSettlements"), 1), EXISTS (SELECT 1 FROM public."ownerSettlements"));
SELECT setval(pg_get_serial_sequence('public."governmentElectricityPayments"', 'id'), COALESCE((SELECT MAX(id) FROM public."governmentElectricityPayments"), 1), EXISTS (SELECT 1 FROM public."governmentElectricityPayments"));
SELECT setval(pg_get_serial_sequence('public."managerCreditAdjustments"', 'id'), COALESCE((SELECT MAX(id) FROM public."managerCreditAdjustments"), 1), EXISTS (SELECT 1 FROM public."managerCreditAdjustments"));
SELECT setval(pg_get_serial_sequence('public."changeAuditLogs"', 'id'), COALESCE((SELECT MAX(id) FROM public."changeAuditLogs"), 1), EXISTS (SELECT 1 FROM public."changeAuditLogs"));
SELECT setval(pg_get_serial_sequence('public."tenantCharges"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantCharges"), 1), EXISTS (SELECT 1 FROM public."tenantCharges"));
SELECT setval(pg_get_serial_sequence('public."serviceCharges"', 'id'), COALESCE((SELECT MAX(id) FROM public."serviceCharges"), 1), EXISTS (SELECT 1 FROM public."serviceCharges"));
SELECT setval(pg_get_serial_sequence('public."tenantServices"', 'id'), COALESCE((SELECT MAX(id) FROM public."tenantServices"), 1), EXISTS (SELECT 1 FROM public."tenantServices"));
SELECT setval(pg_get_serial_sequence('public.reminders', 'id'), COALESCE((SELECT MAX(id) FROM public.reminders), 1), EXISTS (SELECT 1 FROM public.reminders));
SELECT setval(pg_get_serial_sequence('public."managerNotifications"', 'id'), COALESCE((SELECT MAX(id) FROM public."managerNotifications"), 1), EXISTS (SELECT 1 FROM public."managerNotifications"));
SELECT setval(pg_get_serial_sequence('public."exportHistory"', 'id'), COALESCE((SELECT MAX(id) FROM public."exportHistory"), 1), EXISTS (SELECT 1 FROM public."exportHistory"));

` : fs.readFileSync(path.resolve(process.cwd(), "supabase", "schema.sql"), "utf8");
        const rawSchema = rawSql.replace(/--> statement-breakpoint/g, "\n").replace(/REVOKE ALL ON FUNCTION public\.set_updated_at\(\) FROM (anon|authenticated);/g, "");
        await pglite.exec(rawSchema);
      }
      const db = drizzlePglite(pglite, { schema: schema_exports });
      await seedEmbeddedDatabase(db, pglite);
      cachedDb = db;
      return db;
    } catch (error) {
      embeddedInitPromise = null;
      cachedDb = null;
      throw error;
    }
  })();
  return embeddedInitPromise;
}
async function resetEmbeddedDatabase() {
  cachedDb = null;
  dbConnectPromise = null;
  embeddedInitPromise = null;
  usingEmbeddedFallback = true;
  forceInMemoryEmbedded = true;
  return initEmbeddedPglite();
}
async function getDb() {
  if (cachedDb) return cachedDb;
  if (dbConnectPromise) return dbConnectPromise;
  dbConnectPromise = (async () => {
    try {
      const connectionString = process.env.SUPABASE_DATABASE_URL ?? process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL_NON_POOLING;
      if (!connectionString || usingEmbeddedFallback) {
        usingEmbeddedFallback = true;
        return await initEmbeddedPglite();
      }
      const configuredMax = Number(process.env.SUPABASE_POOL_MAX ?? 8);
      const max = Number.isInteger(configuredMax) && configuredMax >= 2 && configuredMax <= 12 ? configuredMax : 8;
      const pool = new Pool({
        connectionString,
        max,
        connectionTimeoutMillis: 1500,
        idleTimeoutMillis: 3e4,
        allowExitOnIdle: true,
        ssl: { rejectUnauthorized: false }
      });
      try {
        await pool.query("SELECT 1");
        cachedPostgresPool = pool;
        cachedDb = drizzlePostgres(cachedPostgresPool, { schema: schema_exports });
        await seedEmbeddedDatabase(cachedDb);
        return cachedDb;
      } catch {
        await pool.end().catch(() => {
        });
        usingEmbeddedFallback = true;
        return await initEmbeddedPglite();
      }
    } finally {
      dbConnectPromise = null;
    }
  })();
  return dbConnectPromise;
}
async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error("Database connection is unavailable.");
  return db;
}
function formatRentMonth(date2) {
  return date2.toISOString().slice(0, 7);
}
function getMonthEnd(rentMonth) {
  const [year, month] = rentMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
}
function getRentDueDate(rentMonth, dueDay) {
  const [year, month] = rentMonth.split("-").map(Number);
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${rentMonth}-${String(Math.min(Math.max(dueDay, 1), lastDay)).padStart(2, "0")}`;
}
function buildRentPaymentReminder(input) {
  return {
    buildingId: input.buildingId,
    tenantId: input.tenantId,
    rentPaymentId: input.id,
    title: `Rent due \xB7 ${input.rentMonth}`,
    dueDate: input.dueDate,
    status: "active",
    notifiedAt: null,
    createdBy: input.createdBy
  };
}
async function syncRentPaymentReminder(input) {
  const db = await requireDb();
  const existing = await db.select({ id: reminders.id, status: reminders.status }).from(reminders).where(eq(reminders.rentPaymentId, input.id)).limit(1);
  if (input.status === "paid") {
    if (existing[0]?.status === "active") {
      await db.update(reminders).set({ status: "complete", deliveryRequestedAt: null, deliveryRequestedBy: null }).where(eq(reminders.id, existing[0].id));
    }
    return;
  }
  const reminder = buildRentPaymentReminder(input);
  if (existing[0]) {
    await db.update(reminders).set(reminder).where(eq(reminders.id, existing[0].id));
  } else {
    await db.insert(reminders).values(reminder).onConflictDoUpdate({ target: reminders.rentPaymentId, set: reminder });
  }
}
async function upsertManagerNotification(input) {
  const db = await requireDb();
  await db.insert(managerNotifications).values(input).onConflictDoUpdate({ target: managerNotifications.referenceKey, set: { title: input.title, body: input.body, dueDate: input.dueDate } });
}
async function ensureMonthlyRentCycles(input) {
  const db = await requireDb();
  const activeAllocations = await db.select({ allocationId: roomAllocations.id, buildingId: roomAllocations.buildingId, tenantId: roomAllocations.tenantId, monthlyRentPaise: roomAllocations.monthlyRentPaise, moveInDate: roomAllocations.moveInDate, tenantName: tenants.fullName, rentDueDay: buildings.rentDueDay, billingMode: rooms.billingMode, isPrimaryPayer: roomAllocations.isPrimaryPayer }).from(roomAllocations).innerJoin(buildings, eq(buildings.id, roomAllocations.buildingId)).innerJoin(tenants, eq(tenants.id, roomAllocations.tenantId)).innerJoin(rooms, eq(rooms.id, roomAllocations.roomId)).where(and(eq(roomAllocations.status, "active"), input.buildingId ? eq(roomAllocations.buildingId, input.buildingId) : void 0, input.roomId ? eq(roomAllocations.roomId, input.roomId) : void 0, input.allocationId ? eq(roomAllocations.id, input.allocationId) : void 0));
  let created = 0;
  for (const allocation of activeAllocations) {
    const isRentLiable = allocation.billingMode !== "primary_payer" || allocation.isPrimaryPayer === "yes";
    if (allocation.moveInDate.slice(0, 7) > input.rentMonth || allocation.monthlyRentPaise <= 0 || !isRentLiable) continue;
    const dueDate = getRentDueDate(input.rentMonth, allocation.rentDueDay);
    const existingTenantMonth = await db.select({ id: rentPayments.id, allocationId: rentPayments.allocationId }).from(rentPayments).where(and(eq(rentPayments.buildingId, allocation.buildingId), eq(rentPayments.tenantId, allocation.tenantId), eq(rentPayments.rentMonth, input.rentMonth)));
    const existing = existingTenantMonth.filter((payment2) => payment2.allocationId === allocation.allocationId);
    if (existing.length === 0 && existingTenantMonth.length > 0) continue;
    await db.insert(rentPayments).values({ buildingId: allocation.buildingId, allocationId: allocation.allocationId, tenantId: allocation.tenantId, rentMonth: input.rentMonth, dueDate, expectedAmountPaise: allocation.monthlyRentPaise, paidAmountPaise: 0, status: "pending", paidOn: null, notes: "Auto-generated monthly rent cycle", receiptUrl: null, recordedBy: input.createdBy ?? null }).onConflictDoUpdate({ target: [rentPayments.allocationId, rentPayments.rentMonth], set: { rentMonth: input.rentMonth } });
    const payment = (await db.select({ id: rentPayments.id, status: rentPayments.status }).from(rentPayments).where(and(eq(rentPayments.allocationId, allocation.allocationId), eq(rentPayments.rentMonth, input.rentMonth))).limit(1))[0];
    if (!payment) throw new Error("Automatic rent cycle could not be created.");
    await syncRentPaymentReminder({ id: payment.id, buildingId: allocation.buildingId, tenantId: allocation.tenantId, rentMonth: input.rentMonth, dueDate, status: payment.status, createdBy: input.createdBy ?? null });
    if (!existing[0]) {
      created += 1;
      await upsertManagerNotification({ buildingId: allocation.buildingId, kind: "rent_cycle", referenceKey: `rent-cycle-${payment.id}`, title: `Monthly rent created \xB7 ${allocation.tenantName}`, body: `\u20B9${(allocation.monthlyRentPaise / 100).toLocaleString("en-IN")} is due on ${dueDate} for ${input.rentMonth}.`, dueDate });
    }
  }
  await ensureMonthlyTenantServiceCharges(input);
  return { created, rentMonth: input.rentMonth };
}
async function refreshManagerCollectionNotifications(input) {
  const db = await requireDb();
  const cutoff = /* @__PURE__ */ new Date(`${input.today}T00:00:00.000Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() + (input.upcomingDays ?? 3));
  const cutoffDate = cutoff.toISOString().slice(0, 10);
  const [rents, electricity] = await Promise.all([
    db.select({ id: rentPayments.id, buildingId: rentPayments.buildingId, tenantName: tenants.fullName, expectedAmountPaise: rentPayments.expectedAmountPaise, paidAmountPaise: rentPayments.paidAmountPaise, dueDate: rentPayments.dueDate }).from(rentPayments).innerJoin(tenants, eq(tenants.id, rentPayments.tenantId)).where(and(ne(rentPayments.status, "paid"), input.buildingId ? eq(rentPayments.buildingId, input.buildingId) : void 0)),
    db.select({ id: electricityBills.id, buildingId: electricityBills.buildingId, roomNumber: rooms.number, billAmountPaise: electricityBills.billAmountPaise, paidAmountPaise: electricityBills.paidAmountPaise, dueDate: electricityBills.dueDate }).from(electricityBills).innerJoin(rooms, eq(rooms.id, electricityBills.roomId)).where(and(ne(electricityBills.status, "paid"), input.buildingId ? eq(electricityBills.buildingId, input.buildingId) : void 0))
  ]);
  let refreshed = 0;
  for (const rent of rents) {
    const pendingPaise = Math.max(rent.expectedAmountPaise - rent.paidAmountPaise, 0);
    if (rent.dueDate < input.today) {
      await upsertManagerNotification({ buildingId: rent.buildingId, kind: "rent_overdue", referenceKey: `rent-overdue-${rent.id}`, title: `Rent overdue \xB7 ${rent.tenantName}`, body: `\u20B9${(pendingPaise / 100).toLocaleString("en-IN")} remains unpaid since ${rent.dueDate}.`, dueDate: rent.dueDate });
      refreshed += 1;
    } else if (rent.dueDate <= cutoffDate) {
      await upsertManagerNotification({ buildingId: rent.buildingId, kind: "rent_upcoming", referenceKey: `rent-upcoming-${rent.id}`, title: `Rent due soon \xB7 ${rent.tenantName}`, body: `\u20B9${(pendingPaise / 100).toLocaleString("en-IN")} is due on ${rent.dueDate}.`, dueDate: rent.dueDate });
      refreshed += 1;
    }
  }
  for (const bill of electricity) {
    if (!bill.dueDate) continue;
    const pendingPaise = Math.max(bill.billAmountPaise - bill.paidAmountPaise, 0);
    if (bill.dueDate < input.today) {
      await upsertManagerNotification({ buildingId: bill.buildingId, kind: "electricity_overdue", referenceKey: `electricity-overdue-${bill.id}`, title: `Electricity overdue \xB7 Room ${bill.roomNumber}`, body: `\u20B9${(pendingPaise / 100).toLocaleString("en-IN")} remains unpaid since ${bill.dueDate}.`, dueDate: bill.dueDate });
      refreshed += 1;
    } else if (bill.dueDate <= cutoffDate) {
      await upsertManagerNotification({ buildingId: bill.buildingId, kind: "electricity_upcoming", referenceKey: `electricity-upcoming-${bill.id}`, title: `Electricity due soon \xB7 Room ${bill.roomNumber}`, body: `\u20B9${(pendingPaise / 100).toLocaleString("en-IN")} is due on ${bill.dueDate}.`, dueDate: bill.dueDate });
      refreshed += 1;
    }
  }
  return { refreshed, cutoffDate };
}
async function getManagerNotifications(buildingId) {
  const db = await requireDb();
  return db.select().from(managerNotifications).where(eq(managerNotifications.buildingId, buildingId)).orderBy(desc(managerNotifications.createdAt)).limit(40);
}
async function markManagerNotificationsRead(input) {
  const db = await requireDb();
  const condition = input.notificationIds && input.notificationIds.length > 0 ? and(eq(managerNotifications.buildingId, input.buildingId), inArray(managerNotifications.id, input.notificationIds)) : and(eq(managerNotifications.buildingId, input.buildingId), eq(managerNotifications.status, "unread"));
  await db.update(managerNotifications).set({ status: "read", readAt: /* @__PURE__ */ new Date() }).where(condition);
}
async function resolveManagerCollectionNotifications(buildingId, referenceKeys) {
  if (referenceKeys.length === 0) return;
  const db = await requireDb();
  await db.update(managerNotifications).set({ status: "read", readAt: /* @__PURE__ */ new Date() }).where(and(eq(managerNotifications.buildingId, buildingId), inArray(managerNotifications.referenceKey, referenceKeys)));
}
async function syncTenantCharges(input) {
  const db = await requireDb();
  const sourceCondition = and(
    eq(tenantCharges.sourceType, input.sourceType),
    eq(tenantCharges.sourceId, input.sourceId),
    input.billingMonth ? eq(tenantCharges.billingMonth, input.billingMonth) : isNull(tenantCharges.billingMonth)
  );
  const existing = await db.select().from(tenantCharges).where(sourceCondition);
  if (input.liabilityMode === "building") {
    if (existing.some((charge) => charge.paidAmountPaise > 0)) throw new Error("A collected tenant charge cannot be converted to a building-only cost.");
    if (existing.length > 0) await db.delete(tenantCharges).where(sourceCondition);
    return [];
  }
  let recipientIds = input.recipientTenantIds ?? [];
  if (input.liabilityMode === "tenant_assigned") {
    if (!input.tenantId) throw new Error("Choose a tenant for a tenant-assigned cost.");
    const tenant = (await db.select({ id: tenants.id }).from(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId))).limit(1))[0];
    if (!tenant) throw new Error("Selected tenant is not part of this building.");
    recipientIds = [tenant.id];
  }
  if (input.liabilityMode === "room_shared" && recipientIds.length === 0) {
    if (!input.roomId) throw new Error("Choose a room to share this cost.");
    recipientIds = (await db.select({ tenantId: roomAllocations.tenantId }).from(roomAllocations).where(and(eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.roomId, input.roomId), eq(roomAllocations.status, "active")))).map((allocation) => allocation.tenantId);
  }
  recipientIds = Array.from(new Set(recipientIds));
  if (recipientIds.length === 0) throw new Error("Assign the cost to a tenant or a room with active occupants.");
  if (input.amountPaise <= 0) {
    if (existing.some((charge) => charge.paidAmountPaise > 0)) throw new Error("A collected tenant charge cannot be reset to zero.");
    if (existing.length > 0) await db.delete(tenantCharges).where(sourceCondition);
    return [];
  }
  const shares = input.liabilityMode === "tenant_assigned" ? [input.amountPaise] : splitPaiseEvenly(input.amountPaise, recipientIds.length);
  const existingByTenant = new Map(existing.map((charge) => [charge.tenantId, charge]));
  if (input.sourceType !== "electricity" && existing.some((charge) => charge.paidAmountPaise > 0 && (existingByTenant.get(charge.tenantId)?.expectedAmountPaise !== shares[recipientIds.indexOf(charge.tenantId)] || !recipientIds.includes(charge.tenantId)))) {
    throw new Error("This cost already has a tenant payment. Do not change its assignment or total; record a separate adjustment instead.");
  }
  if (existing.length > 0) await db.delete(tenantCharges).where(sourceCondition);
  await db.insert(tenantCharges).values(recipientIds.map((tenantId, index2) => {
    const previous = existingByTenant.get(tenantId);
    const paidAmountPaise = Math.min(previous?.paidAmountPaise ?? 0, shares[index2]);
    const status = deriveTenantChargeStatus(shares[index2], paidAmountPaise);
    return {
      buildingId: input.buildingId,
      tenantId,
      roomId: input.roomId,
      sourceType: input.sourceType,
      sourceId: input.sourceId,
      billingMonth: input.billingMonth,
      title: input.title,
      expectedAmountPaise: shares[index2],
      paidAmountPaise,
      status,
      dueDate: input.dueDate,
      paidOn: status === "pending" ? null : previous?.paidOn ?? null,
      paymentMethod: status === "pending" ? null : previous?.paymentMethod ?? null,
      notes: input.notes,
      receiptUrl: previous?.receiptUrl ?? null,
      createdBy: input.createdBy
    };
  }));
  return recipientIds;
}
function formatTenantServiceTitle(serviceType) {
  return serviceType === "tiffin" ? "Tiffin service" : serviceType === "water_bottle" ? "Water bottle service" : "Tenant service";
}
async function ensureMonthlyTenantServiceCharges(input) {
  const db = await requireDb();
  const activeServices = await db.select({
    id: tenantServices.id,
    buildingId: tenantServices.buildingId,
    tenantId: tenantServices.tenantId,
    serviceType: tenantServices.serviceType,
    monthlyChargePaise: tenantServices.monthlyChargePaise,
    notes: tenantServices.notes,
    roomId: roomAllocations.roomId,
    moveInDate: roomAllocations.moveInDate,
    rentDueDay: buildings.rentDueDay
  }).from(tenantServices).innerJoin(roomAllocations, and(eq(roomAllocations.tenantId, tenantServices.tenantId), eq(roomAllocations.buildingId, tenantServices.buildingId), eq(roomAllocations.status, "active"))).innerJoin(buildings, eq(buildings.id, tenantServices.buildingId)).where(and(eq(tenantServices.active, "active"), input.buildingId ? eq(tenantServices.buildingId, input.buildingId) : void 0, input.roomId ? eq(roomAllocations.roomId, input.roomId) : void 0, input.allocationId ? eq(roomAllocations.id, input.allocationId) : void 0));
  for (const service of activeServices) {
    if (service.moveInDate.slice(0, 7) > input.rentMonth || service.monthlyChargePaise <= 0) continue;
    await syncTenantCharges({
      buildingId: service.buildingId,
      roomId: service.roomId,
      tenantId: service.tenantId,
      liabilityMode: "tenant_assigned",
      sourceType: "tenant_service",
      sourceId: service.id,
      billingMonth: input.rentMonth,
      title: `${formatTenantServiceTitle(service.serviceType)} \xB7 ${input.rentMonth}`,
      amountPaise: service.monthlyChargePaise,
      dueDate: getRentDueDate(input.rentMonth, service.rentDueDay),
      notes: service.notes,
      createdBy: input.createdBy ?? null
    });
  }
}
async function syncRoomRentTotal(input) {
  const db = await requireDb();
  const room = (await db.select({ roomType: rooms.roomType, billingMode: rooms.billingMode }).from(rooms).where(and(eq(rooms.id, input.roomId), eq(rooms.buildingId, input.buildingId))).limit(1))[0];
  if (!room) throw new Error("Room not found in the selected building.");
  if (room.roomType === "individual") return null;
  const activeAllocations = await db.select({ monthlyRentPaise: roomAllocations.monthlyRentPaise, isPrimaryPayer: roomAllocations.isPrimaryPayer }).from(roomAllocations).where(and(eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.roomId, input.roomId), eq(roomAllocations.status, "active")));
  const allocations = activeAllocations.filter((allocation) => allocation.monthlyRentPaise > 0 && (room.billingMode !== "primary_payer" || allocation.isPrimaryPayer === "yes"));
  if (allocations.length === 0) return null;
  const totalRentPaise = calculateRoomRentTotal(allocations.map((allocation) => allocation.monthlyRentPaise));
  await db.update(rooms).set({ defaultRentPaise: totalRentPaise }).where(and(eq(rooms.id, input.roomId), eq(rooms.buildingId, input.buildingId)));
  return totalRentPaise;
}
async function syncAutoGeneratedAllocationRent(input) {
  const db = await requireDb();
  const payment = (await db.select({ id: rentPayments.id, status: rentPayments.status, paidAmountPaise: rentPayments.paidAmountPaise, notes: rentPayments.notes }).from(rentPayments).where(and(eq(rentPayments.allocationId, input.allocationId), eq(rentPayments.buildingId, input.buildingId), eq(rentPayments.rentMonth, input.rentMonth))).limit(1))[0];
  if (payment) {
    const status = deriveRentStatus(input.monthlyRentPaise, payment.paidAmountPaise);
    await db.update(rentPayments).set({ expectedAmountPaise: input.monthlyRentPaise, status }).where(eq(rentPayments.id, payment.id));
  }
}
async function syncElectricityTenantCharges(input) {
  const db = await requireDb();
  const monthStart = `${input.billingMonth}-01`;
  const room = (await db.select({ billingMode: rooms.billingMode }).from(rooms).where(and(eq(rooms.id, input.roomId), eq(rooms.buildingId, input.buildingId))).limit(1))[0];
  if (!room || room.billingMode === "manager_set") {
    await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: null, liabilityMode: "building", sourceType: "electricity", sourceId: input.billId, billingMonth: input.billingMonth, title: `Electricity \xB7 ${input.billingMonth}`, amountPaise: input.billAmountPaise, dueDate: input.dueDate, notes: input.notes, createdBy: input.createdBy });
    return;
  }
  const allocations = await db.select({ tenantId: roomAllocations.tenantId, isPrimaryPayer: roomAllocations.isPrimaryPayer }).from(roomAllocations).where(and(eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.roomId, input.roomId), lte(roomAllocations.moveInDate, getMonthEnd(input.billingMonth)), or(isNull(roomAllocations.moveOutDate), gte(roomAllocations.moveOutDate, monthStart))));
  const allocationIds = room.billingMode === "primary_payer" ? allocations.filter((allocation) => allocation.isPrimaryPayer === "yes").map((allocation) => allocation.tenantId) : allocations.map((allocation) => allocation.tenantId);
  if (allocationIds.length === 0) {
    await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: null, liabilityMode: "building", sourceType: "electricity", sourceId: input.billId, billingMonth: input.billingMonth, title: `Electricity \xB7 ${input.billingMonth}`, amountPaise: input.billAmountPaise, dueDate: input.dueDate, notes: input.notes, createdBy: input.createdBy });
    return;
  }
  await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: null, liabilityMode: "room_shared", sourceType: "electricity", sourceId: input.billId, billingMonth: input.billingMonth, title: `Electricity \xB7 ${input.billingMonth}`, amountPaise: input.billAmountPaise, dueDate: input.dueDate, notes: input.notes, createdBy: input.createdBy, recipientTenantIds: allocationIds });
  if (input.paidAmountPaise !== void 0) {
    const charges = await db.select().from(tenantCharges).where(and(eq(tenantCharges.sourceType, "electricity"), eq(tenantCharges.sourceId, input.billId), eq(tenantCharges.buildingId, input.buildingId)));
    const currentPaidSum = charges.reduce((sum, item) => sum + item.paidAmountPaise, 0);
    if (charges.length > 0 && currentPaidSum !== input.paidAmountPaise) {
      let remainingPaid = Math.max(0, input.paidAmountPaise);
      for (let i = 0; i < charges.length; i += 1) {
        const charge = charges[i];
        const isLast = i === charges.length - 1;
        const sharePaid = isLast ? Math.min(remainingPaid, charge.expectedAmountPaise) : Math.min(remainingPaid, charge.expectedAmountPaise);
        remainingPaid = Math.max(0, remainingPaid - sharePaid);
        const shareStatus = deriveTenantChargeStatus(charge.expectedAmountPaise, sharePaid);
        await db.update(tenantCharges).set({
          paidAmountPaise: sharePaid,
          status: shareStatus,
          paidOn: shareStatus === "pending" ? null : input.paidOn ?? charge.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
          paymentMethod: shareStatus === "pending" ? null : input.paymentMethod ?? charge.paymentMethod ?? "upi",
          receiptUrl: input.receiptUrl ?? charge.receiptUrl ?? null
        }).where(eq(tenantCharges.id, charge.id));
      }
    }
  }
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required.");
  const db = await requireDb();
  const isOwner = user.openId === ENV.ownerOpenId;
  await db.insert(users).values({
    ...user,
    role: user.role ?? (isOwner ? "admin" : "helper"),
    lastSignedIn: user.lastSignedIn ?? /* @__PURE__ */ new Date()
  }).onConflictDoUpdate({
    target: users.openId,
    set: {
      name: user.name ?? null,
      email: user.email ?? null,
      loginMethod: user.loginMethod ?? null,
      lastSignedIn: /* @__PURE__ */ new Date(),
      ...isOwner ? { role: "admin" } : {}
    }
  });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}
async function getUserById(id) {
  let db = await getDb();
  if (!db) return void 0;
  try {
    return (await db.select().from(users).where(eq(users.id, id)).limit(1))[0];
  } catch (error) {
    if (String(error).includes("Aborted")) {
      db = await resetEmbeddedDatabase();
      return (await db.select().from(users).where(eq(users.id, id)).limit(1))[0];
    }
    throw error;
  }
}
async function getUserByPhone(phone) {
  let db = await getDb();
  if (!db) return void 0;
  try {
    return (await db.select().from(users).where(eq(users.phone, phone)).limit(1))[0];
  } catch (error) {
    if (String(error).includes("Aborted")) {
      db = await resetEmbeddedDatabase();
      return (await db.select().from(users).where(eq(users.phone, phone)).limit(1))[0];
    }
    throw error;
  }
}
async function getUserByPhoneOrUsername(identifier) {
  let db = await getDb();
  if (!db) return void 0;
  const normalized = identifier.trim().toLowerCase();
  try {
    const allUsers = await db.select().from(users);
    return allUsers.find(
      (u) => u.phone === identifier.trim() || u.name && u.name.trim().toLowerCase() === normalized || u.email && u.email.trim().toLowerCase() === normalized
    );
  } catch (error) {
    if (String(error).includes("Aborted")) {
      db = await resetEmbeddedDatabase();
      const allUsers = await db.select().from(users);
      return allUsers.find(
        (u) => u.phone === identifier.trim() || u.name && u.name.trim().toLowerCase() === normalized || u.email && u.email.trim().toLowerCase() === normalized
      );
    }
    throw error;
  }
}
async function getBuildingForUser(buildingId, userId, role) {
  const db = await requireDb();
  if (role === "admin") {
    return (await db.select().from(buildings).where(and(eq(buildings.id, buildingId), eq(buildings.ownerId, userId))).limit(1))[0];
  }
  if (role === "manager") {
    const result2 = await db.select({ building: buildings }).from(buildings).innerJoin(staffAssignments, and(eq(staffAssignments.buildingId, buildings.id), eq(staffAssignments.userId, userId))).where(eq(buildings.id, buildingId)).limit(1);
    return result2[0]?.building;
  }
  const result = await db.select({ building: buildings }).from(buildings).innerJoin(staffAssignments, and(eq(staffAssignments.buildingId, buildings.id), eq(staffAssignments.userId, userId))).where(eq(buildings.id, buildingId)).limit(1);
  return result[0]?.building;
}
async function listBuildingsForUser(user) {
  const db = await requireDb();
  if (user.role === "admin") return db.select().from(buildings).where(eq(buildings.ownerId, user.id)).orderBy(desc(buildings.createdAt));
  if (user.role === "manager") {
    const result2 = await db.select({ building: buildings }).from(buildings).innerJoin(staffAssignments, and(eq(staffAssignments.buildingId, buildings.id), eq(staffAssignments.userId, user.id))).orderBy(desc(buildings.createdAt));
    return result2.map((row) => row.building);
  }
  const result = await db.select({ building: buildings }).from(buildings).innerJoin(staffAssignments, and(eq(staffAssignments.buildingId, buildings.id), eq(staffAssignments.userId, user.id))).orderBy(desc(buildings.createdAt));
  return result.map((row) => row.building);
}
async function createBuilding(input) {
  const db = await requireDb();
  const [result] = await db.insert(buildings).values({ ...input, city: input.city || null, landmark: input.landmark || null, contactPhone: input.contactPhone || null, imageUrl: input.imageUrl || null, mapUrl: input.mapUrl || null, ownerCutPercent: input.ownerCutPercent ?? 0, ownerMonthlyCutPaise: input.ownerMonthlyCutPaise ?? 0 }).returning({ id: buildings.id });
  if (!result) throw new Error("Building could not be created.");
  return result.id;
}
async function updateBuilding(input) {
  const db = await requireDb();
  await db.update(buildings).set({ name: input.name, address: input.address, city: input.city, landmark: input.landmark, contactPhone: input.contactPhone, imageUrl: input.imageUrl, mapUrl: input.mapUrl, ownerCutPercent: input.ownerCutPercent, ownerMonthlyCutPaise: input.ownerMonthlyCutPaise, paymentBankName: input.paymentBankName, paymentAccountName: input.paymentAccountName, paymentAccountNumber: input.paymentAccountNumber, paymentIfsc: input.paymentIfsc, paymentUpiId: input.paymentUpiId, paymentQrUrl: input.paymentQrUrl, electricityRatePaise: input.electricityRatePaise }).where(eq(buildings.id, input.id));
}
function getBuildingDeletionBlockReason(dependencies) {
  return Object.values(dependencies).some((count) => count > 0) ? "This building cannot be deleted while floors, rooms, tenants, billing, expenses, operating costs, or reminders exist. Remove operational records first." : null;
}
function getRoomDeletionBlockReason(dependencies) {
  return dependencies.allocations > 0 || dependencies.electricityBills > 0 ? "This room cannot be deleted while tenant allocations or electricity bills exist. Vacate the room and preserve its billing history first." : null;
}
function getTenantDeletionBlockReason(dependencies) {
  return dependencies.allocations > 0 || dependencies.rentPayments > 0 || dependencies.electricityBills > 0 || dependencies.reminders > 0 ? "This tenant cannot be deleted because allocation, rent, electricity, or reminder history must be preserved. Use Offboard tenant instead." : null;
}
async function deleteBuilding(buildingId) {
  const db = await requireDb();
  const [floorRows, roomRows, tenantRows, allocationRows, rentRows, electricityRows, expenseRows, operatingCostRows, reminderRows] = await Promise.all([
    db.select({ id: floors.id }).from(floors).where(eq(floors.buildingId, buildingId)).limit(1),
    db.select({ id: rooms.id }).from(rooms).where(eq(rooms.buildingId, buildingId)).limit(1),
    db.select({ id: tenants.id }).from(tenants).where(eq(tenants.buildingId, buildingId)).limit(1),
    db.select({ id: roomAllocations.id }).from(roomAllocations).where(eq(roomAllocations.buildingId, buildingId)).limit(1),
    db.select({ id: rentPayments.id }).from(rentPayments).where(eq(rentPayments.buildingId, buildingId)).limit(1),
    db.select({ id: electricityBills.id }).from(electricityBills).where(eq(electricityBills.buildingId, buildingId)).limit(1),
    db.select({ id: expenses.id }).from(expenses).where(eq(expenses.buildingId, buildingId)).limit(1),
    db.select({ id: operatingCosts.id }).from(operatingCosts).where(eq(operatingCosts.buildingId, buildingId)).limit(1),
    db.select({ id: reminders.id }).from(reminders).where(eq(reminders.buildingId, buildingId)).limit(1)
  ]);
  const blockReason = getBuildingDeletionBlockReason({ floors: floorRows.length, rooms: roomRows.length, tenants: tenantRows.length, allocations: allocationRows.length, rentPayments: rentRows.length, electricityBills: electricityRows.length, expenses: expenseRows.length, operatingCosts: operatingCostRows.length, reminders: reminderRows.length });
  if (blockReason) throw new Error(blockReason);
  await db.delete(staffAssignments).where(eq(staffAssignments.buildingId, buildingId));
  await db.delete(buildings).where(eq(buildings.id, buildingId));
}
function buildGeneratedFloors(floorCount) {
  if (!Number.isInteger(floorCount) || floorCount < 0 || floorCount > 200) throw new Error("Floor count must be a whole number between 0 and 200.");
  return [
    { name: "Ground Floor", level: 0 },
    ...Array.from({ length: floorCount }, (_, index2) => ({ name: `Floor ${index2 + 1}`, level: index2 + 1 })),
    { name: "Terrace", level: floorCount + 1 }
  ];
}
async function addFloor(input) {
  const db = await requireDb();
  await db.insert(floors).values(input);
}
async function addGeneratedFloors(input) {
  const db = await requireDb();
  const desired = buildGeneratedFloors(input.floorCount);
  return db.transaction(async (tx) => {
    const existing = await tx.select({ name: floors.name, level: floors.level }).from(floors).where(eq(floors.buildingId, input.buildingId));
    const missing = desired.filter((item) => !existing.some((row) => row.name === item.name && row.level === item.level));
    if (missing.length > 0) await tx.insert(floors).values(missing.map((item) => ({ ...item, buildingId: input.buildingId })));
    return { createdCount: missing.length, totalCount: desired.length };
  });
}
function getFloorDeletionBlockReason(roomCount) {
  return roomCount > 0 ? "This floor cannot be deleted while rooms are assigned to it. Move or delete the rooms first." : null;
}
async function deleteFloor(input) {
  const db = await requireDb();
  const roomRows = await db.select({ id: rooms.id }).from(rooms).where(and(eq(rooms.floorId, input.id), eq(rooms.buildingId, input.buildingId))).limit(1);
  const blockReason = getFloorDeletionBlockReason(roomRows.length);
  if (blockReason) throw new Error(blockReason);
  await db.delete(floors).where(and(eq(floors.id, input.id), eq(floors.buildingId, input.buildingId)));
}
async function addRoom(input) {
  const db = await requireDb();
  await db.insert(rooms).values(input);
}
async function createRoomWithTenantSetup(input) {
  const db = await requireDb();
  let roomId = 0;
  let tenantId = 0;
  let allocationId = 0;
  await db.transaction(async (tx) => {
    const [roomResult] = await tx.insert(rooms).values({ buildingId: input.buildingId, floorId: input.floorId, number: input.number, capacity: input.capacity, roomType: input.roomType, billingMode: input.billingMode, airConditioning: input.airConditioning, balcony: input.balcony, imageUrl: input.imageUrl, defaultRentPaise: input.defaultRentPaise }).returning({ id: rooms.id });
    if (!roomResult) throw new Error("Room could not be created.");
    roomId = roomResult.id;
    const [userResult] = await tx.insert(users).values({ openId: `tenant-${input.tenant.phone}-${Date.now()}`, name: input.tenant.fullName, email: input.tenant.email, phone: input.tenant.phone, passwordHash: input.tenant.passwordHash, loginMethod: "phone-password", role: "tenant" }).returning({ id: users.id });
    if (!userResult) throw new Error("Tenant login could not be created.");
    const userId = userResult.id;
    const [tenantResult] = await tx.insert(tenants).values({ buildingId: input.buildingId, userId, fullName: input.tenant.fullName, phone: input.tenant.phone, email: input.tenant.email, emergencyContactName: input.tenant.emergencyContactName, emergencyContactPhone: input.tenant.emergencyContactPhone, address: input.tenant.address, identityDocumentUrl: input.tenant.identityDocumentUrl }).returning({ id: tenants.id });
    if (!tenantResult) throw new Error("Tenant could not be created.");
    tenantId = tenantResult.id;
    const [allocationResult] = await tx.insert(roomAllocations).values({ buildingId: input.buildingId, roomId, tenantId, activeTenantId: tenantId, moveInDate: input.allocation.moveInDate, bedLabel: input.allocation.bedLabel, isPrimaryPayer: input.allocation.isPrimaryPayer, monthlyRentPaise: input.allocation.monthlyRentPaise, depositPaise: input.allocation.depositPaise }).returning({ id: roomAllocations.id });
    if (!allocationResult) throw new Error("Room allocation could not be created.");
    allocationId = allocationResult.id;
    if (input.services.length > 0) await tx.insert(tenantServices).values(input.services.map((service) => ({ ...service, buildingId: input.buildingId, tenantId })));
  });
  await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()), buildingId: input.buildingId, roomId, createdBy: null });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId });
  return { roomId, tenantId, allocationId };
}
async function updateRoom(input) {
  const db = await requireDb();
  await db.update(rooms).set({ floorId: input.floorId, number: input.number, capacity: input.capacity, roomType: input.roomType, billingMode: input.billingMode, airConditioning: input.airConditioning, balcony: input.balcony, imageUrl: input.imageUrl, defaultRentPaise: input.defaultRentPaise }).where(and(eq(rooms.id, input.id), eq(rooms.buildingId, input.buildingId)));
}
async function deleteRoom(input) {
  const db = await requireDb();
  const [allocationRows, electricityRows] = await Promise.all([
    db.select({ id: roomAllocations.id }).from(roomAllocations).where(and(eq(roomAllocations.roomId, input.id), eq(roomAllocations.buildingId, input.buildingId))).limit(1),
    db.select({ id: electricityBills.id }).from(electricityBills).where(and(eq(electricityBills.roomId, input.id), eq(electricityBills.buildingId, input.buildingId))).limit(1)
  ]);
  const blockReason = getRoomDeletionBlockReason({ allocations: allocationRows.length, electricityBills: electricityRows.length });
  if (blockReason) throw new Error(blockReason);
  await db.delete(rooms).where(and(eq(rooms.id, input.id), eq(rooms.buildingId, input.buildingId)));
}
async function createTenant(input) {
  const db = await requireDb();
  const [userResult] = await db.insert(users).values({ openId: `tenant-${input.phone}-${Date.now()}`, name: input.fullName, email: input.email, phone: input.phone, passwordHash: input.passwordHash, loginMethod: "phone-password", role: "tenant" }).returning({ id: users.id });
  if (!userResult) throw new Error("Tenant login could not be created.");
  const userId = userResult.id;
  await db.insert(tenants).values({ buildingId: input.buildingId, userId, fullName: input.fullName, phone: input.phone, email: input.email, emergencyContactName: input.emergencyContactName, emergencyContactPhone: input.emergencyContactPhone, address: input.address, identityDocumentUrl: input.identityDocumentUrl });
}
async function updateTenant(input) {
  const db = await requireDb();
  await db.transaction(async (tx) => {
    const tenant = (await tx.select({ userId: tenants.userId }).from(tenants).where(and(eq(tenants.id, input.id), eq(tenants.buildingId, input.buildingId))).limit(1))[0];
    if (!tenant) throw new Error("Tenant not found in the selected building.");
    await tx.update(tenants).set({ fullName: input.fullName, phone: input.phone, email: input.email, emergencyContactName: input.emergencyContactName, emergencyContactPhone: input.emergencyContactPhone, address: input.address, identityDocumentUrl: input.identityDocumentUrl, status: input.status }).where(and(eq(tenants.id, input.id), eq(tenants.buildingId, input.buildingId)));
    if (tenant.userId) await tx.update(users).set({ phone: input.phone }).where(eq(users.id, tenant.userId));
  });
}
async function resetTenantCredentials(input) {
  const db = await requireDb();
  await db.transaction(async (tx) => {
    const tenant = (await tx.select({ userId: tenants.userId, status: tenants.status }).from(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId))).limit(1))[0];
    if (!tenant?.userId) throw new Error("Tenant login is not linked to this profile.");
    if (tenant.status !== "active") throw new Error("Activate the tenant profile before resetting its login.");
    await tx.update(users).set({ passwordHash: input.passwordHash, loginMethod: "phone-password" }).where(eq(users.id, tenant.userId));
  });
}
async function revokeTenantCredentials(input) {
  const db = await requireDb();
  const tenant = (await db.select({ userId: tenants.userId }).from(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId))).limit(1))[0];
  if (!tenant) throw new Error("Tenant not found in the selected building.");
  if (tenant.userId) await db.update(users).set({ passwordHash: null, loginMethod: "revoked" }).where(eq(users.id, tenant.userId));
  await db.update(tenants).set({ status: "inactive" }).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId)));
}
async function archiveTenant(input) {
  const db = await requireDb();
  const tenant = (await db.select({ userId: tenants.userId }).from(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId))).limit(1))[0];
  if (!tenant) throw new Error("Tenant not found in the selected building.");
  await db.update(roomAllocations).set({ status: "vacated", moveOutDate: input.moveOutDate, activeTenantId: null }).where(and(eq(roomAllocations.tenantId, input.tenantId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active")));
  if (tenant.userId) await db.update(users).set({ passwordHash: null, loginMethod: "revoked" }).where(eq(users.id, tenant.userId));
  await db.update(tenants).set({ status: "inactive" }).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId)));
}
async function deleteTenant(input) {
  const db = await requireDb();
  const [tenantRow, allocationRows, rentRows, electricityRows, reminderRows] = await Promise.all([
    db.select({ userId: tenants.userId }).from(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId))).limit(1),
    db.select({ id: roomAllocations.id }).from(roomAllocations).where(and(eq(roomAllocations.tenantId, input.tenantId), eq(roomAllocations.buildingId, input.buildingId))).limit(1),
    db.select({ id: rentPayments.id }).from(rentPayments).where(and(eq(rentPayments.tenantId, input.tenantId), eq(rentPayments.buildingId, input.buildingId))).limit(1),
    db.select({ id: electricityBills.id }).from(electricityBills).innerJoin(roomAllocations, eq(electricityBills.roomId, roomAllocations.roomId)).where(and(eq(roomAllocations.tenantId, input.tenantId), eq(electricityBills.buildingId, input.buildingId))).limit(1),
    db.select({ id: reminders.id }).from(reminders).where(and(eq(reminders.tenantId, input.tenantId), eq(reminders.buildingId, input.buildingId))).limit(1)
  ]);
  if (!tenantRow[0]) throw new Error("Tenant not found in the selected building.");
  const blockReason = getTenantDeletionBlockReason({ allocations: allocationRows.length, rentPayments: rentRows.length, electricityBills: electricityRows.length, reminders: reminderRows.length });
  if (blockReason) throw new Error(blockReason);
  await db.delete(tenants).where(and(eq(tenants.id, input.tenantId), eq(tenants.buildingId, input.buildingId)));
  if (tenantRow[0].userId) await db.delete(users).where(eq(users.id, tenantRow[0].userId));
}
async function createTenantService(input) {
  const db = await requireDb();
  await db.insert(tenantServices).values(input);
  await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()), buildingId: input.buildingId, createdBy: input.createdBy });
}
async function updateTenantService(input) {
  const db = await requireDb();
  await db.update(tenantServices).set({ serviceType: input.serviceType, monthlyChargePaise: input.monthlyChargePaise, active: input.active, notes: input.notes }).where(and(eq(tenantServices.id, input.id), eq(tenantServices.buildingId, input.buildingId), eq(tenantServices.tenantId, input.tenantId)));
  if (input.active === "active") await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()), buildingId: input.buildingId, createdBy: null });
}
async function deleteTenantService(input) {
  const db = await requireDb();
  await db.delete(tenantServices).where(and(eq(tenantServices.id, input.id), eq(tenantServices.buildingId, input.buildingId), eq(tenantServices.tenantId, input.tenantId)));
}
async function createAllocation(input) {
  const db = await requireDb();
  let allocationId = 0;
  await db.transaction(async (tx) => {
    const room = (await tx.select({ id: rooms.id, capacity: rooms.capacity, defaultRentPaise: rooms.defaultRentPaise, billingMode: rooms.billingMode }).from(rooms).where(and(eq(rooms.id, input.roomId), eq(rooms.buildingId, input.buildingId))).for("update"))[0];
    if (!room) throw new Error("Room not found in the selected building.");
    const activeAllocations = await tx.select({ id: roomAllocations.id, isPrimaryPayer: roomAllocations.isPrimaryPayer }).from(roomAllocations).where(and(eq(roomAllocations.roomId, input.roomId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).for("update");
    if (activeAllocations.length >= room.capacity) throw new Error("This room has no vacant bed remaining.");
    const tenantAllocation = await tx.select({ id: roomAllocations.id }).from(roomAllocations).where(and(eq(roomAllocations.tenantId, input.tenantId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).limit(1);
    if (tenantAllocation[0]) throw new Error("This tenant already has an active room allocation.");
    if (room.billingMode === "primary_payer" && input.isPrimaryPayer === "yes" && activeAllocations.some((allocation) => allocation.isPrimaryPayer === "yes")) throw new Error("This Co-living room already has a primary payer. Update the existing primary allocation first.");
    const isPrimaryPayer = room.billingMode === "primary_payer" && !activeAllocations.some((allocation) => allocation.isPrimaryPayer === "yes") ? "yes" : input.isPrimaryPayer ?? "no";
    const [result] = await tx.insert(roomAllocations).values({ ...input, isPrimaryPayer, activeTenantId: input.tenantId, bedLabel: input.bedLabel || null }).returning({ id: roomAllocations.id });
    if (!result) throw new Error("Room allocation could not be created.");
    allocationId = result.id;
  });
  const rentMonth = formatRentMonth(/* @__PURE__ */ new Date());
  await ensureMonthlyRentCycles({ rentMonth, buildingId: input.buildingId, roomId: input.roomId, createdBy: null });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: input.roomId });
  return allocationId;
}
async function createAllocationWithServices(input) {
  const allocationId = await createAllocation(input);
  if (input.services.length > 0) {
    const db = await requireDb();
    await db.insert(tenantServices).values(input.services.map((service) => ({ ...service, buildingId: input.buildingId, tenantId: input.tenantId })));
    await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()), buildingId: input.buildingId, roomId: input.roomId, allocationId, createdBy: input.services[0]?.createdBy ?? null });
  }
  return allocationId;
}
async function createTenantWithAllocationAndServices(input) {
  const db = await requireDb();
  let tenantId = 0;
  let allocationId = 0;
  await db.transaction(async (tx) => {
    const room = (await tx.select({ capacity: rooms.capacity, billingMode: rooms.billingMode }).from(rooms).where(and(eq(rooms.id, input.roomId), eq(rooms.buildingId, input.buildingId))).for("update"))[0];
    if (!room) throw new Error("Room not found in the selected building.");
    const activeAllocations = await tx.select({ id: roomAllocations.id, isPrimaryPayer: roomAllocations.isPrimaryPayer }).from(roomAllocations).where(and(eq(roomAllocations.roomId, input.roomId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).for("update");
    if (activeAllocations.length >= room.capacity) throw new Error("This room has no vacant bed remaining.");
    const [userResult] = await tx.insert(users).values({ openId: `tenant-${input.tenant.phone}-${Date.now()}`, name: input.tenant.fullName, email: input.tenant.email, phone: input.tenant.phone, passwordHash: input.tenant.passwordHash, loginMethod: "phone-password", role: "tenant" }).returning({ id: users.id });
    if (!userResult) throw new Error("Tenant login could not be created.");
    const userId = userResult.id;
    const [tenantResult] = await tx.insert(tenants).values({ buildingId: input.buildingId, userId, fullName: input.tenant.fullName, phone: input.tenant.phone, email: input.tenant.email, emergencyContactName: input.tenant.emergencyContactName, emergencyContactPhone: input.tenant.emergencyContactPhone, address: input.tenant.address, identityDocumentUrl: input.tenant.identityDocumentUrl }).returning({ id: tenants.id });
    if (!tenantResult) throw new Error("Tenant could not be created.");
    tenantId = tenantResult.id;
    if (room.billingMode === "primary_payer" && input.allocation.isPrimaryPayer === "yes" && activeAllocations.some((allocation) => allocation.isPrimaryPayer === "yes")) throw new Error("This Co-living room already has a primary payer. Update the existing primary allocation first.");
    const isPrimaryPayer = room.billingMode === "primary_payer" && !activeAllocations.some((allocation) => allocation.isPrimaryPayer === "yes") ? "yes" : input.allocation.isPrimaryPayer;
    const [allocationResult] = await tx.insert(roomAllocations).values({ buildingId: input.buildingId, roomId: input.roomId, tenantId, activeTenantId: tenantId, moveInDate: input.allocation.moveInDate, bedLabel: input.allocation.bedLabel, isPrimaryPayer, monthlyRentPaise: input.allocation.monthlyRentPaise, depositPaise: input.allocation.depositPaise }).returning({ id: roomAllocations.id });
    if (!allocationResult) throw new Error("Room allocation could not be created.");
    allocationId = allocationResult.id;
    if (input.services.length > 0) await tx.insert(tenantServices).values(input.services.map((service) => ({ ...service, buildingId: input.buildingId, tenantId })));
  });
  await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()), buildingId: input.buildingId, roomId: input.roomId, createdBy: null });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: input.roomId });
  return { tenantId, allocationId };
}
async function vacateAllocation(input) {
  const db = await requireDb();
  const allocation = (await db.select({ id: roomAllocations.id, roomId: roomAllocations.roomId }).from(roomAllocations).where(and(eq(roomAllocations.id, input.allocationId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).limit(1))[0];
  if (!allocation) throw new Error("Active allocation not found in the selected building.");
  await db.update(roomAllocations).set({ status: "vacated", moveOutDate: input.moveOutDate, activeTenantId: null }).where(and(eq(roomAllocations.id, input.allocationId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active")));
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: allocation.roomId });
}
async function updateAllocation(input) {
  const db = await requireDb();
  const allocation = (await db.select({ roomId: roomAllocations.roomId }).from(roomAllocations).where(and(eq(roomAllocations.id, input.id), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).limit(1))[0];
  if (!allocation) throw new Error("Active allocation not found in the selected building.");
  await db.update(roomAllocations).set({ moveInDate: input.moveInDate, bedLabel: input.bedLabel, monthlyRentPaise: input.monthlyRentPaise, depositPaise: input.depositPaise }).where(and(eq(roomAllocations.id, input.id), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active")));
  const rentMonth = formatRentMonth(/* @__PURE__ */ new Date());
  await ensureMonthlyRentCycles({ rentMonth, buildingId: input.buildingId, roomId: allocation.roomId, createdBy: null });
  await syncAutoGeneratedAllocationRent({ allocationId: input.id, buildingId: input.buildingId, rentMonth, monthlyRentPaise: input.monthlyRentPaise });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: allocation.roomId });
}
async function transferActiveTenant(input) {
  const db = await requireDb();
  let sourceRoomId = 0;
  let destinationAllocationId = 0;
  let destinationRentPaymentId = null;
  let proration = null;
  await db.transaction(async (tx) => {
    const sourceAllocation = (await tx.select({ id: roomAllocations.id, roomId: roomAllocations.roomId, tenantId: roomAllocations.tenantId, monthlyRentPaise: roomAllocations.monthlyRentPaise }).from(roomAllocations).where(and(eq(roomAllocations.id, input.allocationId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).for("update"))[0];
    if (!sourceAllocation) throw new Error("Active tenant allocation not found in the selected building.");
    if (sourceAllocation.roomId === input.destinationRoomId) throw new Error("Choose a different destination room.");
    const destinationRoom = (await tx.select({ id: rooms.id, number: rooms.number, capacity: rooms.capacity }).from(rooms).where(and(eq(rooms.id, input.destinationRoomId), eq(rooms.buildingId, input.buildingId))).for("update"))[0];
    if (!destinationRoom) throw new Error("Destination room not found in the selected building.");
    const destinationActive = await tx.select({ id: roomAllocations.id }).from(roomAllocations).where(and(eq(roomAllocations.roomId, input.destinationRoomId), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active"))).for("update");
    if (destinationActive.length >= destinationRoom.capacity) throw new Error("Destination room has no vacant bed remaining.");
    let sourceRent;
    if (input.applyProration) {
      sourceRent = (await tx.select({ id: rentPayments.id, expectedAmountPaise: rentPayments.expectedAmountPaise, paidAmountPaise: rentPayments.paidAmountPaise, status: rentPayments.status, dueDate: rentPayments.dueDate, notes: rentPayments.notes }).from(rentPayments).where(and(eq(rentPayments.allocationId, sourceAllocation.id), eq(rentPayments.buildingId, input.buildingId), eq(rentPayments.rentMonth, input.effectiveDate.slice(0, 7)))).for("update"))[0];
      if (!sourceRent) throw new Error("An unpaid rent cycle for the transfer month is required before applying proration.");
      if (sourceRent.status !== "pending" || sourceRent.paidAmountPaise > 0) throw new Error("Prorated transfer rent cannot be applied after source-month collection has started.");
      proration = calculateTransferProration(sourceRent.expectedAmountPaise, input.monthlyRentPaise, input.effectiveDate);
      await tx.update(rentPayments).set({ expectedAmountPaise: proration.sourceExpectedAmountPaise, notes: `${sourceRent.notes ? `${sourceRent.notes} \xB7 ` : ""}Prorated through ${input.effectiveDate} (${proration.sourceDays}/${proration.daysInMonth} days).` }).where(eq(rentPayments.id, sourceRent.id));
    }
    await tx.update(roomAllocations).set({ status: "vacated", moveOutDate: input.effectiveDate, activeTenantId: null }).where(and(eq(roomAllocations.id, sourceAllocation.id), eq(roomAllocations.buildingId, input.buildingId), eq(roomAllocations.status, "active")));
    const [allocationResult] = await tx.insert(roomAllocations).values({ buildingId: input.buildingId, roomId: input.destinationRoomId, tenantId: sourceAllocation.tenantId, activeTenantId: sourceAllocation.tenantId, moveInDate: input.effectiveDate, bedLabel: input.bedLabel, monthlyRentPaise: input.monthlyRentPaise, depositPaise: input.depositPaise }).returning({ id: roomAllocations.id });
    if (!allocationResult) throw new Error("Destination allocation could not be created.");
    destinationAllocationId = allocationResult.id;
    if (proration && sourceRent) {
      const [rentResult] = await tx.insert(rentPayments).values({ buildingId: input.buildingId, allocationId: destinationAllocationId, tenantId: sourceAllocation.tenantId, rentMonth: proration.rentMonth, dueDate: sourceRent.dueDate, expectedAmountPaise: proration.destinationExpectedAmountPaise, paidAmountPaise: 0, status: "pending", notes: `Prorated from transfer on ${input.effectiveDate} (${proration.destinationDays}/${proration.daysInMonth} days) to Room ${destinationRoom.number}.`, recordedBy: input.recordedBy }).returning({ id: rentPayments.id });
      if (!rentResult) throw new Error("Prorated rent could not be created.");
      destinationRentPaymentId = rentResult.id;
    }
    await tx.insert(tenantTransfers).values({ buildingId: input.buildingId, tenantId: sourceAllocation.tenantId, sourceAllocationId: sourceAllocation.id, destinationAllocationId, sourceRoomId: sourceAllocation.roomId, destinationRoomId: input.destinationRoomId, effectiveDate: input.effectiveDate, sourceMonthlyRentPaise: sourceAllocation.monthlyRentPaise, destinationMonthlyRentPaise: input.monthlyRentPaise, prorationApplied: input.applyProration ? "yes" : "no", sourceProratedAmountPaise: proration?.sourceExpectedAmountPaise ?? null, destinationProratedAmountPaise: proration?.destinationExpectedAmountPaise ?? null, sourceRentPaymentId: sourceRent?.id ?? null, destinationRentPaymentId, recordedBy: input.recordedBy });
    sourceRoomId = sourceAllocation.roomId;
  });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: sourceRoomId });
  await syncRoomRentTotal({ buildingId: input.buildingId, roomId: input.destinationRoomId });
  return { destinationAllocationId, sourceRoomId, proration };
}
async function recordRentPayment(input) {
  const db = await requireDb();
  await db.insert(rentPayments).values(input).onConflictDoUpdate({
    target: [rentPayments.allocationId, rentPayments.rentMonth],
    set: {
      dueDate: input.dueDate,
      expectedAmountPaise: input.expectedAmountPaise,
      paidAmountPaise: input.paidAmountPaise,
      status: input.status,
      paidOn: input.paidOn,
      paymentMethod: input.paymentMethod,
      notes: input.notes,
      receiptUrl: input.receiptUrl,
      recordedBy: input.recordedBy,
      ...input.status === "paid" ? { overdueNotifiedAt: null } : {}
    }
  });
  const payment = await db.select({ id: rentPayments.id }).from(rentPayments).where(and(eq(rentPayments.allocationId, input.allocationId), eq(rentPayments.rentMonth, input.rentMonth))).limit(1);
  if (!payment[0]) throw new Error("Rent payment was not saved.");
  await syncRentPaymentReminder({ id: payment[0].id, buildingId: input.buildingId, tenantId: input.tenantId, rentMonth: input.rentMonth, dueDate: input.dueDate, status: input.status, createdBy: input.recordedBy });
  if (input.status === "paid") await resolveManagerCollectionNotifications(input.buildingId, [`rent-upcoming-${payment[0].id}`, `rent-overdue-${payment[0].id}`]);
  return payment[0];
}
async function updateRentPayment(input) {
  const db = await requireDb();
  const result = await db.update(rentPayments).set({ dueDate: input.dueDate, expectedAmountPaise: input.expectedAmountPaise, paidAmountPaise: input.paidAmountPaise, status: input.status, paidOn: input.paidOn, paymentMethod: input.paymentMethod, notes: input.notes, receiptUrl: input.receiptUrl, recordedBy: input.recordedBy }).where(and(eq(rentPayments.id, input.id), eq(rentPayments.buildingId, input.buildingId), eq(rentPayments.updatedAt, input.expectedUpdatedAt))).returning({ id: rentPayments.id });
  if (result.length !== 1) throw new Error("This rent record changed on another device. Review the latest record before saving again.");
  const payment = await db.select({ tenantId: rentPayments.tenantId, rentMonth: rentPayments.rentMonth }).from(rentPayments).where(and(eq(rentPayments.id, input.id), eq(rentPayments.buildingId, input.buildingId))).limit(1);
  if (!payment[0]) throw new Error("Rent payment was not found.");
  await syncRentPaymentReminder({ id: input.id, buildingId: input.buildingId, tenantId: payment[0].tenantId, rentMonth: payment[0].rentMonth, dueDate: input.dueDate, status: input.status, createdBy: input.recordedBy });
  if (input.status === "paid") await resolveManagerCollectionNotifications(input.buildingId, [`rent-upcoming-${input.id}`, `rent-overdue-${input.id}`]);
}
async function getUnnotifiedOverdueRentPayments(today) {
  const db = await requireDb();
  return db.select({ id: rentPayments.id, expectedAmountPaise: rentPayments.expectedAmountPaise, paidAmountPaise: rentPayments.paidAmountPaise }).from(rentPayments).innerJoin(reminders, and(eq(reminders.rentPaymentId, rentPayments.id), eq(reminders.status, "active"))).where(and(lt(rentPayments.dueDate, today), ne(rentPayments.status, "paid"), isNull(rentPayments.overdueNotifiedAt), isNotNull(reminders.deliveryRequestedAt)));
}
async function markRentPaymentsOverdueNotified(ids) {
  if (ids.length === 0) return;
  const db = await requireDb();
  for (const id of ids) {
    await db.update(rentPayments).set({ overdueNotifiedAt: /* @__PURE__ */ new Date() }).where(eq(rentPayments.id, id));
  }
}
async function triggerRentPaymentReminder(input) {
  const db = await requireDb();
  const payment = (await db.select({ id: rentPayments.id, tenantId: rentPayments.tenantId, rentMonth: rentPayments.rentMonth, dueDate: rentPayments.dueDate, status: rentPayments.status }).from(rentPayments).where(and(eq(rentPayments.id, input.id), eq(rentPayments.buildingId, input.buildingId))).limit(1))[0];
  if (!payment) throw new Error("Rent payment was not found in the selected building.");
  if (payment.status === "paid") throw new Error("Paid rent does not need a due reminder.");
  const existing = await db.select({ id: reminders.id, status: reminders.status }).from(reminders).where(eq(reminders.rentPaymentId, input.id)).limit(1);
  await syncRentPaymentReminder({ ...payment, buildingId: input.buildingId, createdBy: input.createdBy });
  await db.update(reminders).set({ deliveryRequestedAt: /* @__PURE__ */ new Date(), deliveryRequestedBy: input.createdBy }).where(and(eq(reminders.rentPaymentId, input.id), eq(reminders.buildingId, input.buildingId), eq(reminders.status, "active")));
  return { created: !existing[0] || existing[0].status === "complete", deliveryRequested: true, title: `Rent due \xB7 ${payment.rentMonth}` };
}
async function recordElectricityBill(input) {
  const db = await requireDb();
  await db.insert(electricityBills).values(input).onConflictDoUpdate({
    target: [electricityBills.roomId, electricityBills.billingMonth],
    set: {
      previousReading: input.previousReading,
      currentReading: input.currentReading,
      unitsConsumed: input.unitsConsumed,
      ratePerUnitPaise: input.ratePerUnitPaise,
      billAmountPaise: input.billAmountPaise,
      paidAmountPaise: input.paidAmountPaise,
      status: input.status,
      paidOn: input.paidOn,
      paymentMethod: input.paymentMethod,
      dueDate: input.dueDate,
      notes: input.notes,
      meterImageUrl: input.meterImageUrl,
      receiptUrl: input.receiptUrl,
      recordedBy: input.recordedBy
    }
  });
  const bill = (await db.select({ id: electricityBills.id }).from(electricityBills).where(and(eq(electricityBills.roomId, input.roomId), eq(electricityBills.billingMonth, input.billingMonth))).limit(1))[0];
  if (!bill) throw new Error("Electricity bill was not saved.");
  await syncElectricityTenantCharges({ billId: bill.id, buildingId: input.buildingId, roomId: input.roomId, billingMonth: input.billingMonth, billAmountPaise: input.billAmountPaise, paidAmountPaise: input.paidAmountPaise, paidOn: input.paidOn, paymentMethod: input.paymentMethod, receiptUrl: input.receiptUrl, dueDate: input.dueDate, notes: input.notes, createdBy: input.recordedBy });
  if (input.status === "paid") await resolveManagerCollectionNotifications(input.buildingId, [`electricity-upcoming-${bill.id}`, `electricity-overdue-${bill.id}`]);
}
async function updateElectricityBill(input) {
  const db = await requireDb();
  const bill = (await db.select({ roomId: electricityBills.roomId, billingMonth: electricityBills.billingMonth }).from(electricityBills).where(and(eq(electricityBills.id, input.id), eq(electricityBills.buildingId, input.buildingId))).limit(1))[0];
  const result = await db.update(electricityBills).set({ previousReading: input.previousReading, currentReading: input.currentReading, unitsConsumed: input.unitsConsumed, ratePerUnitPaise: input.ratePerUnitPaise, billAmountPaise: input.billAmountPaise, paidAmountPaise: input.paidAmountPaise, status: input.status, paidOn: input.paidOn, paymentMethod: input.paymentMethod, dueDate: input.dueDate, notes: input.notes, meterImageUrl: input.meterImageUrl, receiptUrl: input.receiptUrl, recordedBy: input.recordedBy }).where(and(eq(electricityBills.id, input.id), eq(electricityBills.buildingId, input.buildingId), eq(electricityBills.updatedAt, input.expectedUpdatedAt))).returning({ id: electricityBills.id });
  if (result.length !== 1) throw new Error("This electricity record changed on another device. Review the latest record before saving again.");
  if (bill) await syncElectricityTenantCharges({ billId: input.id, buildingId: input.buildingId, roomId: bill.roomId, billingMonth: bill.billingMonth, billAmountPaise: input.billAmountPaise, paidAmountPaise: input.paidAmountPaise, paidOn: input.paidOn, paymentMethod: input.paymentMethod, receiptUrl: input.receiptUrl, dueDate: input.dueDate, notes: input.notes, createdBy: input.recordedBy });
  if (input.status === "paid" && bill) {
    const room = (await db.select({ number: rooms.number }).from(rooms).where(and(eq(rooms.id, bill.roomId), eq(rooms.buildingId, input.buildingId))).limit(1))[0];
    const title = `Electricity due \xB7 Room ${room?.number ?? bill.roomId} \xB7 ${bill.billingMonth}`;
    await db.update(reminders).set({ status: "complete" }).where(and(eq(reminders.buildingId, input.buildingId), eq(reminders.title, title), eq(reminders.status, "active")));
    await resolveManagerCollectionNotifications(input.buildingId, [`electricity-upcoming-${input.id}`, `electricity-overdue-${input.id}`]);
  }
}
async function recordTenantChargePayment(input) {
  const db = await requireDb();
  const charge = (await db.select().from(tenantCharges).where(and(eq(tenantCharges.id, input.id), eq(tenantCharges.buildingId, input.buildingId))).limit(1))[0];
  if (!charge) throw new Error("Tenant charge was not found in the selected building.");
  const status = deriveTenantChargeStatus(charge.expectedAmountPaise, input.paidAmountPaise);
  const result = await db.update(tenantCharges).set({ paidAmountPaise: input.paidAmountPaise, status, paidOn: status === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), paymentMethod: status === "pending" ? null : input.paymentMethod, receiptUrl: input.receiptUrl, createdBy: input.recordedBy }).where(and(eq(tenantCharges.id, input.id), eq(tenantCharges.buildingId, input.buildingId), eq(tenantCharges.updatedAt, input.expectedUpdatedAt))).returning({ id: tenantCharges.id });
  if (result.length !== 1) throw new Error("This tenant charge changed on another device. Review the latest record before saving again.");
  if (charge.sourceType === "electricity") {
    const charges = await db.select({ paidAmountPaise: tenantCharges.paidAmountPaise, expectedAmountPaise: tenantCharges.expectedAmountPaise }).from(tenantCharges).where(and(eq(tenantCharges.sourceType, "electricity"), eq(tenantCharges.sourceId, charge.sourceId), eq(tenantCharges.buildingId, input.buildingId)));
    const paidAmountPaise = charges.reduce((total, item) => total + item.paidAmountPaise, 0);
    const bill = (await db.select({ billAmountPaise: electricityBills.billAmountPaise }).from(electricityBills).where(and(eq(electricityBills.id, charge.sourceId), eq(electricityBills.buildingId, input.buildingId))).limit(1))[0];
    if (bill) {
      const electricityStatus = paidAmountPaise === 0 ? "pending" : paidAmountPaise >= bill.billAmountPaise ? "paid" : "partial";
      await db.update(electricityBills).set({ paidAmountPaise, status: electricityStatus, paidOn: electricityStatus === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }).where(and(eq(electricityBills.id, charge.sourceId), eq(electricityBills.buildingId, input.buildingId)));
    }
  }
  return { status };
}
async function createElectricityOverdueReminder(input) {
  const db = await requireDb();
  const bill = (await db.select({ id: electricityBills.id, roomId: electricityBills.roomId, billingMonth: electricityBills.billingMonth, dueDate: electricityBills.dueDate, status: electricityBills.status }).from(electricityBills).where(and(eq(electricityBills.id, input.billId), eq(electricityBills.buildingId, input.buildingId))).limit(1))[0];
  if (!bill) throw new Error("Electricity bill not found in the selected building.");
  if (bill.status === "paid") throw new Error("A paid electricity bill does not need a reminder.");
  if (!bill.dueDate) throw new Error("Set an electricity due date before creating a reminder.");
  const room = (await db.select({ number: rooms.number }).from(rooms).where(and(eq(rooms.id, bill.roomId), eq(rooms.buildingId, input.buildingId))).limit(1))[0];
  const title = `Electricity due \xB7 Room ${room?.number ?? bill.roomId} \xB7 ${bill.billingMonth}`;
  const existing = await db.select({ id: reminders.id }).from(reminders).where(and(eq(reminders.buildingId, input.buildingId), eq(reminders.title, title), eq(reminders.status, "active"))).limit(1);
  if (!existing[0]) await db.insert(reminders).values({ buildingId: input.buildingId, tenantId: null, rentPaymentId: null, title, dueDate: bill.dueDate, createdBy: input.createdBy });
  return { created: !existing[0], title };
}
async function createExpense(input) {
  const db = await requireDb();
  const [result] = await db.insert(expenses).values(input).returning({ id: expenses.id });
  if (!result) throw new Error("Expense could not be created.");
  const expenseId = result.id;
  await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, sourceType: "expense", sourceId: expenseId, billingMonth: input.expenseDate.slice(0, 7), title: `${input.category.replace(/\b\w/g, (letter) => letter.toUpperCase())} expense`, amountPaise: input.amountPaise, dueDate: input.expenseDate, notes: input.notes, createdBy: input.createdBy });
}
async function updateExpense(input) {
  const db = await requireDb();
  const result = await db.update(expenses).set({ roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, category: input.category, amountPaise: input.amountPaise, expenseDate: input.expenseDate, notes: input.notes, receiptUrl: input.receiptUrl, createdBy: input.createdBy }).where(and(eq(expenses.id, input.id), eq(expenses.buildingId, input.buildingId), eq(expenses.updatedAt, input.expectedUpdatedAt))).returning({ id: expenses.id });
  if (result.length !== 1) throw new Error("This expense changed on another device. Review the latest record before saving again.");
  await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, sourceType: "expense", sourceId: input.id, billingMonth: input.expenseDate.slice(0, 7), title: `${input.category.replace(/\b\w/g, (letter) => letter.toUpperCase())} expense`, amountPaise: input.amountPaise, dueDate: input.expenseDate, notes: input.notes, createdBy: input.createdBy });
}
async function deleteExpense(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const expense = (await tx.select().from(expenses).where(and(eq(expenses.id, input.id), eq(expenses.buildingId, input.buildingId))).limit(1))[0];
    if (!expense) throw new Error("Expense was not found in the selected building.");
    const charges = await tx.select().from(tenantCharges).where(and(eq(tenantCharges.sourceType, "expense"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    if (charges.some((charge) => charge.paidAmountPaise > 0)) throw new Error("This expense has tenant collections. Record an adjustment instead of deleting it.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "expense", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ expense, tenantCharges: charges }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(tenantCharges).where(and(eq(tenantCharges.sourceType, "expense"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    await tx.delete(expenses).where(and(eq(expenses.id, input.id), eq(expenses.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
function deriveOperatingCostStatus(amountPaise, paidAmountPaise) {
  return paidAmountPaise >= amountPaise ? "paid" : paidAmountPaise > 0 ? "partial" : "pending";
}
async function createOperatingCost(input) {
  const db = await requireDb();
  const [result] = await db.insert(operatingCosts).values({ ...input, status: deriveOperatingCostStatus(input.amountPaise, input.paidAmountPaise) }).returning({ id: operatingCosts.id });
  if (!result) throw new Error("Operating cost could not be created.");
  const operatingCostId = result.id;
  await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, sourceType: "operating_cost", sourceId: operatingCostId, billingMonth: input.costDate.slice(0, 7), title: input.title, amountPaise: input.amountPaise, dueDate: input.dueDate, notes: input.notes, createdBy: input.createdBy });
}
async function updateOperatingCost(input) {
  const db = await requireDb();
  const result = await db.update(operatingCosts).set({ roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, kind: input.kind, category: input.category, title: input.title, payeeName: input.payeeName, vendorName: input.vendorName, amountPaise: input.amountPaise, paidAmountPaise: input.paidAmountPaise, status: deriveOperatingCostStatus(input.amountPaise, input.paidAmountPaise), workStatus: input.workStatus, costDate: input.costDate, dueDate: input.dueDate, receiptUrl: input.receiptUrl, notes: input.notes, createdBy: input.createdBy }).where(and(eq(operatingCosts.id, input.id), eq(operatingCosts.buildingId, input.buildingId), eq(operatingCosts.updatedAt, input.expectedUpdatedAt))).returning({ id: operatingCosts.id });
  if (result.length !== 1) throw new Error("This operating cost changed on another device. Review the latest record before saving again.");
  await syncTenantCharges({ buildingId: input.buildingId, roomId: input.roomId, tenantId: input.tenantId, liabilityMode: input.liabilityMode, sourceType: "operating_cost", sourceId: input.id, billingMonth: input.costDate.slice(0, 7), title: input.title, amountPaise: input.amountPaise, dueDate: input.dueDate, notes: input.notes, createdBy: input.createdBy });
}
async function deleteOperatingCost(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const operatingCost = (await tx.select().from(operatingCosts).where(and(eq(operatingCosts.id, input.id), eq(operatingCosts.buildingId, input.buildingId))).limit(1))[0];
    if (!operatingCost) throw new Error("Operating cost was not found in the selected building.");
    const charges = await tx.select().from(tenantCharges).where(and(eq(tenantCharges.sourceType, "operating_cost"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    if (charges.some((charge) => charge.paidAmountPaise > 0)) throw new Error("This operating cost has tenant collections. Record an adjustment instead of deleting it.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "operating_cost", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ operatingCost, tenantCharges: charges }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(tenantCharges).where(and(eq(tenantCharges.sourceType, "operating_cost"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    await tx.delete(operatingCosts).where(and(eq(operatingCosts.id, input.id), eq(operatingCosts.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
async function deleteRentPayment(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const payment = (await tx.select().from(rentPayments).where(and(eq(rentPayments.id, input.id), eq(rentPayments.buildingId, input.buildingId))).limit(1))[0];
    if (!payment) throw new Error("Rent record was not found in the selected building.");
    const paymentReminders = await tx.select().from(reminders).where(and(eq(reminders.rentPaymentId, input.id), eq(reminders.buildingId, input.buildingId)));
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "rent_payment", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ payment, reminders: paymentReminders }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(reminders).where(eq(reminders.rentPaymentId, input.id));
    await tx.delete(rentPayments).where(and(eq(rentPayments.id, input.id), eq(rentPayments.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
async function deleteElectricityBill(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const bill = (await tx.select().from(electricityBills).where(and(eq(electricityBills.id, input.id), eq(electricityBills.buildingId, input.buildingId))).limit(1))[0];
    if (!bill) throw new Error("Electricity bill was not found in the selected building.");
    const charges = await tx.select().from(tenantCharges).where(and(eq(tenantCharges.sourceType, "electricity"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    if (bill.paidAmountPaise > 0 || charges.some((charge) => charge.paidAmountPaise > 0)) throw new Error("This electricity bill has recorded collections. Correct the payment amount instead of deleting it.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "electricity_bill", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ bill, tenantCharges: charges }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(tenantCharges).where(and(eq(tenantCharges.sourceType, "electricity"), eq(tenantCharges.sourceId, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    await tx.delete(electricityBills).where(and(eq(electricityBills.id, input.id), eq(electricityBills.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
async function deleteTenantCharge(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const charge = (await tx.select().from(tenantCharges).where(and(eq(tenantCharges.id, input.id), eq(tenantCharges.buildingId, input.buildingId))).limit(1))[0];
    if (!charge) throw new Error("Tenant collection was not found in the selected building.");
    if (charge.paidAmountPaise > 0) throw new Error("This tenant collection has recorded payment. Correct the payment amount instead of deleting it.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "tenant_charge", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ charge }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(tenantCharges).where(and(eq(tenantCharges.id, input.id), eq(tenantCharges.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
function reviveSnapshotTimestamps(record) {
  const restored = { ...record };
  for (const key of ["createdAt", "updatedAt", "notifiedAt", "deliveryRequestedAt", "readAt"]) {
    if (typeof restored[key] === "string") {
      const timestamp2 = new Date(restored[key]);
      if (Number.isNaN(timestamp2.getTime())) throw new Error("The recovery snapshot contains an invalid timestamp.");
      restored[key] = timestamp2;
    }
  }
  return restored;
}
function requireRecoveryRecord(value, name, buildingId) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`The ${name} recovery snapshot is invalid.`);
  const record = reviveSnapshotTimestamps(value);
  if (!Number.isInteger(record.id) || record.buildingId !== buildingId) throw new Error(`The ${name} recovery snapshot does not belong to this building.`);
  return record;
}
function requireRecoveryRows(value, name, buildingId) {
  if (!Array.isArray(value)) throw new Error(`The ${name} recovery snapshot is invalid.`);
  return value.map((item) => requireRecoveryRecord(item, name, buildingId));
}
function parseRecoverySnapshot(snapshotJson) {
  try {
    const snapshot = JSON.parse(snapshotJson);
    if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) throw new Error("invalid");
    return snapshot;
  } catch {
    throw new Error("The recovery snapshot is unavailable.");
  }
}
async function restoreDeletedEntry(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const audit = (await tx.select().from(changeAuditLogs).where(and(eq(changeAuditLogs.id, input.auditId), eq(changeAuditLogs.buildingId, input.buildingId), eq(changeAuditLogs.createdBy, input.restoredBy), eq(changeAuditLogs.action, "deleted"))).limit(1))[0];
    if (!audit) throw new Error("This deletion can no longer be undone by this Manager.");
    if (Date.now() - audit.createdAt.getTime() > DELETE_UNDO_WINDOW_MS) throw new Error("The 10-minute undo window has expired. The audit snapshot remains available for controlled recovery.");
    const snapshot = parseRecoverySnapshot(audit.snapshotJson);
    let restoredLabel;
    if (audit.entityType === "rent_payment") {
      const payment = requireRecoveryRecord(snapshot.payment, "rent payment", input.buildingId);
      const remindersSnapshot = snapshot.reminders === void 0 ? [] : requireRecoveryRows(snapshot.reminders, "rent reminder", input.buildingId);
      const existing = await tx.select({ id: rentPayments.id }).from(rentPayments).where(and(eq(rentPayments.id, Number(payment.id)), eq(rentPayments.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(rentPayments).values(payment);
      for (const reminder of remindersSnapshot) {
        if (reminder.rentPaymentId !== payment.id) throw new Error("The rent reminder recovery snapshot is inconsistent.");
        const existingReminder = await tx.select({ id: reminders.id }).from(reminders).where(eq(reminders.id, Number(reminder.id))).limit(1);
        if (existingReminder[0]) throw new Error("A replacement reminder already exists, so this deletion cannot be safely undone.");
        await tx.insert(reminders).values(reminder);
      }
      restoredLabel = "Rent record";
    } else if (audit.entityType === "electricity_bill") {
      const bill = requireRecoveryRecord(snapshot.bill, "electricity bill", input.buildingId);
      const charges = requireRecoveryRows(snapshot.tenantCharges, "tenant collection", input.buildingId);
      const existing = await tx.select({ id: electricityBills.id }).from(electricityBills).where(and(eq(electricityBills.id, Number(bill.id)), eq(electricityBills.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(electricityBills).values(bill);
      for (const charge of charges) {
        if (charge.sourceType !== "electricity" || charge.sourceId !== bill.id) throw new Error("The electricity recovery snapshot is inconsistent.");
        const existingCharge = await tx.select({ id: tenantCharges.id }).from(tenantCharges).where(and(eq(tenantCharges.id, Number(charge.id)), eq(tenantCharges.buildingId, input.buildingId))).limit(1);
        if (existingCharge[0]) throw new Error("A replacement tenant collection already exists, so this deletion cannot be safely undone.");
        await tx.insert(tenantCharges).values(charge);
      }
      restoredLabel = "Electricity bill";
    } else if (audit.entityType === "tenant_charge") {
      const charge = requireRecoveryRecord(snapshot.charge, "tenant collection", input.buildingId);
      const existing = await tx.select({ id: tenantCharges.id }).from(tenantCharges).where(and(eq(tenantCharges.id, Number(charge.id)), eq(tenantCharges.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(tenantCharges).values(charge);
      restoredLabel = "Tenant collection";
    } else if (audit.entityType === "expense") {
      const expense = requireRecoveryRecord(snapshot.expense, "expense", input.buildingId);
      const charges = requireRecoveryRows(snapshot.tenantCharges, "tenant collection", input.buildingId);
      const existing = await tx.select({ id: expenses.id }).from(expenses).where(and(eq(expenses.id, Number(expense.id)), eq(expenses.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(expenses).values(expense);
      for (const charge of charges) {
        if (charge.sourceType !== "expense" || charge.sourceId !== expense.id) throw new Error("The expense recovery snapshot is inconsistent.");
        const existingCharge = await tx.select({ id: tenantCharges.id }).from(tenantCharges).where(and(eq(tenantCharges.id, Number(charge.id)), eq(tenantCharges.buildingId, input.buildingId))).limit(1);
        if (existingCharge[0]) throw new Error("A replacement tenant collection already exists, so this deletion cannot be safely undone.");
        await tx.insert(tenantCharges).values(charge);
      }
      restoredLabel = "Expense";
    } else if (audit.entityType === "operating_cost") {
      const operatingCost = requireRecoveryRecord(snapshot.operatingCost, "operating cost", input.buildingId);
      const charges = requireRecoveryRows(snapshot.tenantCharges, "tenant collection", input.buildingId);
      const existing = await tx.select({ id: operatingCosts.id }).from(operatingCosts).where(and(eq(operatingCosts.id, Number(operatingCost.id)), eq(operatingCosts.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(operatingCosts).values(operatingCost);
      for (const charge of charges) {
        if (charge.sourceType !== "operating_cost" || charge.sourceId !== operatingCost.id) throw new Error("The operating-cost recovery snapshot is inconsistent.");
        const existingCharge = await tx.select({ id: tenantCharges.id }).from(tenantCharges).where(and(eq(tenantCharges.id, Number(charge.id)), eq(tenantCharges.buildingId, input.buildingId))).limit(1);
        if (existingCharge[0]) throw new Error("A replacement tenant collection already exists, so this deletion cannot be safely undone.");
        await tx.insert(tenantCharges).values(charge);
      }
      restoredLabel = "Operating cost";
    } else if (audit.entityType === "owner_settlement") {
      const settlement = requireRecoveryRecord(snapshot.settlement, "Owner settlement", input.buildingId);
      const existing = await tx.select({ id: ownerSettlements.id }).from(ownerSettlements).where(and(eq(ownerSettlements.id, Number(settlement.id)), eq(ownerSettlements.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(ownerSettlements).values(settlement);
      restoredLabel = "Owner settlement";
    } else if (audit.entityType === "government_electricity_payment") {
      const payment = requireRecoveryRecord(snapshot.payment, "building electricity bill", input.buildingId);
      const existing = await tx.select({ id: governmentElectricityPayments.id }).from(governmentElectricityPayments).where(and(eq(governmentElectricityPayments.id, Number(payment.id)), eq(governmentElectricityPayments.buildingId, input.buildingId))).limit(1);
      if (existing[0]) throw new Error("A replacement record already exists, so this deletion cannot be safely undone.");
      await tx.insert(governmentElectricityPayments).values(payment);
      restoredLabel = "Building electricity bill";
    } else {
      throw new Error("This deletion type is not eligible for immediate undo.");
    }
    await tx.update(changeAuditLogs).set({ action: "deleted_undone" }).where(eq(changeAuditLogs.id, audit.id));
    await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: audit.entityType, entityId: audit.entityId, action: "restored", snapshotJson: audit.snapshotJson, createdBy: input.restoredBy });
    return { restoredLabel };
  });
}
async function createServiceCharge(input) {
  const db = await requireDb();
  await db.insert(serviceCharges).values(input);
}
async function updateServiceCharge(input) {
  const db = await requireDb();
  await db.update(serviceCharges).set({ name: input.name, amountPaise: input.amountPaise, billingCycle: input.billingCycle, dueDay: input.dueDay, active: input.active, notes: input.notes }).where(and(eq(serviceCharges.id, input.id), eq(serviceCharges.buildingId, input.buildingId)));
}
async function deleteServiceCharge(input) {
  const db = await requireDb();
  await db.delete(serviceCharges).where(and(eq(serviceCharges.id, input.id), eq(serviceCharges.buildingId, input.buildingId)));
}
async function createReminder(input) {
  const db = await requireDb();
  await db.insert(reminders).values(input);
}
async function markReminderComplete(reminderId, buildingId) {
  const db = await requireDb();
  await db.update(reminders).set({ status: "complete" }).where(and(eq(reminders.id, reminderId), eq(reminders.buildingId, buildingId)));
}
async function getBuildingSnapshot(buildingId) {
  const db = await requireDb();
  const [floorRows, roomRows, tenantRows, tenantServiceRows, allocationRows, rentRows, electricityRows, expenseRows, operatingCostRows, serviceChargeRows, reminderRows, notificationRows, tenantChargeRows, transferRows] = await Promise.all([
    db.select().from(floors).where(eq(floors.buildingId, buildingId)),
    db.select().from(rooms).where(eq(rooms.buildingId, buildingId)),
    db.select().from(tenants).where(eq(tenants.buildingId, buildingId)),
    db.select().from(tenantServices).where(eq(tenantServices.buildingId, buildingId)).orderBy(tenantServices.tenantId),
    db.select().from(roomAllocations).where(eq(roomAllocations.buildingId, buildingId)),
    db.select().from(rentPayments).where(eq(rentPayments.buildingId, buildingId)).orderBy(desc(rentPayments.dueDate)),
    db.select().from(electricityBills).where(eq(electricityBills.buildingId, buildingId)).orderBy(desc(electricityBills.billingMonth)),
    db.select().from(expenses).where(eq(expenses.buildingId, buildingId)).orderBy(desc(expenses.expenseDate)),
    db.select().from(operatingCosts).where(eq(operatingCosts.buildingId, buildingId)).orderBy(desc(operatingCosts.costDate)),
    db.select().from(serviceCharges).where(eq(serviceCharges.buildingId, buildingId)).orderBy(serviceCharges.name),
    db.select().from(reminders).where(eq(reminders.buildingId, buildingId)).orderBy(reminders.dueDate),
    db.select().from(managerNotifications).where(eq(managerNotifications.buildingId, buildingId)).orderBy(desc(managerNotifications.createdAt)).limit(40),
    db.select().from(tenantCharges).where(eq(tenantCharges.buildingId, buildingId)).orderBy(desc(tenantCharges.createdAt)),
    db.select().from(tenantTransfers).where(eq(tenantTransfers.buildingId, buildingId)).orderBy(desc(tenantTransfers.effectiveDate))
  ]);
  return { floors: floorRows, rooms: roomRows, tenants: tenantRows, tenantServices: tenantServiceRows, allocations: allocationRows, rents: rentRows, electricity: electricityRows, expenses: expenseRows, operatingCosts: operatingCostRows, serviceCharges: serviceChargeRows, reminders: reminderRows, managerNotifications: notificationRows, tenantCharges: tenantChargeRows, tenantTransfers: transferRows };
}
async function getReceiptReviewHistory(input) {
  const db = await requireDb();
  const rentConditions = [eq(rentPayments.buildingId, input.buildingId), inArray(rentPayments.receiptReviewStatus, ["approved", "rejected"])];
  const electricityConditions = [eq(electricityBills.buildingId, input.buildingId), inArray(electricityBills.receiptReviewStatus, ["approved", "rejected"])];
  const chargeConditions = [eq(tenantCharges.buildingId, input.buildingId), inArray(tenantCharges.receiptReviewStatus, ["approved", "rejected"])];
  if (input.reviewedFrom) {
    rentConditions.push(gte(rentPayments.receiptReviewedAt, input.reviewedFrom));
    electricityConditions.push(gte(electricityBills.receiptReviewedAt, input.reviewedFrom));
    chargeConditions.push(gte(tenantCharges.receiptReviewedAt, input.reviewedFrom));
  }
  if (input.reviewedTo) {
    rentConditions.push(lte(rentPayments.receiptReviewedAt, input.reviewedTo));
    electricityConditions.push(lte(electricityBills.receiptReviewedAt, input.reviewedTo));
    chargeConditions.push(lte(tenantCharges.receiptReviewedAt, input.reviewedTo));
  }
  if (input.tenantId) {
    rentConditions.push(eq(rentPayments.tenantId, input.tenantId));
    chargeConditions.push(eq(tenantCharges.tenantId, input.tenantId));
  }
  if (input.reviewerId) {
    rentConditions.push(eq(rentPayments.receiptReviewedBy, input.reviewerId));
    electricityConditions.push(eq(electricityBills.receiptReviewedBy, input.reviewerId));
    chargeConditions.push(eq(tenantCharges.receiptReviewedBy, input.reviewerId));
  }
  if (input.paymentMethod) {
    rentConditions.push(eq(rentPayments.paymentMethod, input.paymentMethod));
    electricityConditions.push(eq(electricityBills.paymentMethod, input.paymentMethod));
    chargeConditions.push(eq(tenantCharges.paymentMethod, input.paymentMethod));
  }
  if (input.amountMinPaise !== void 0) {
    rentConditions.push(gte(rentPayments.expectedAmountPaise, input.amountMinPaise));
    electricityConditions.push(gte(electricityBills.billAmountPaise, input.amountMinPaise));
    chargeConditions.push(gte(tenantCharges.expectedAmountPaise, input.amountMinPaise));
  }
  if (input.amountMaxPaise !== void 0) {
    rentConditions.push(lte(rentPayments.expectedAmountPaise, input.amountMaxPaise));
    electricityConditions.push(lte(electricityBills.billAmountPaise, input.amountMaxPaise));
    chargeConditions.push(lte(tenantCharges.expectedAmountPaise, input.amountMaxPaise));
  }
  const [rentRows, electricityRows, chargeRows, tenantRows, roomRows, reviewerRows] = await Promise.all([
    db.select().from(rentPayments).where(and(...rentConditions)),
    input.tenantId ? Promise.resolve([]) : db.select().from(electricityBills).where(and(...electricityConditions)),
    db.select().from(tenantCharges).where(and(...chargeConditions)),
    db.select({ id: tenants.id, fullName: tenants.fullName }).from(tenants).where(eq(tenants.buildingId, input.buildingId)),
    db.select({ id: rooms.id, number: rooms.number }).from(rooms).where(eq(rooms.buildingId, input.buildingId)),
    db.select({ id: users.id, name: users.name }).from(users)
  ]);
  const tenantName = new Map(tenantRows.map((tenant) => [tenant.id, tenant.fullName]));
  const roomNumber = new Map(roomRows.map((room) => [room.id, room.number]));
  const reviewerName = new Map(reviewerRows.map((reviewer) => [reviewer.id, reviewer.name ?? "Manager"]));
  return [
    ...rentRows.map((row) => ({ type: "rent", id: row.id, status: row.receiptReviewStatus, reviewNote: row.receiptReviewNote, reviewedAt: row.receiptReviewedAt, reviewerId: row.receiptReviewedBy, reviewerName: row.receiptReviewedBy ? reviewerName.get(row.receiptReviewedBy) ?? "Manager" : "Manager", receiptUrl: row.receiptUrl, paymentMethod: row.paymentMethod, title: `Rent \xB7 ${row.rentMonth}`, subject: tenantName.get(row.tenantId) ?? "Tenant", amountPaise: row.expectedAmountPaise })),
    ...electricityRows.map((row) => ({ type: "electricity", id: row.id, status: row.receiptReviewStatus, reviewNote: row.receiptReviewNote, reviewedAt: row.receiptReviewedAt, reviewerId: row.receiptReviewedBy, reviewerName: row.receiptReviewedBy ? reviewerName.get(row.receiptReviewedBy) ?? "Manager" : "Manager", receiptUrl: row.receiptUrl, paymentMethod: row.paymentMethod, title: `Electricity \xB7 ${row.billingMonth}`, subject: `Room ${roomNumber.get(row.roomId) ?? "\u2014"}`, amountPaise: row.billAmountPaise })),
    ...chargeRows.map((row) => ({ type: "tenant_charge", id: row.id, status: row.receiptReviewStatus, reviewNote: row.receiptReviewNote, reviewedAt: row.receiptReviewedAt, reviewerId: row.receiptReviewedBy, reviewerName: row.receiptReviewedBy ? reviewerName.get(row.receiptReviewedBy) ?? "Manager" : "Manager", receiptUrl: row.receiptUrl, paymentMethod: row.paymentMethod, title: row.title, subject: tenantName.get(row.tenantId) ?? "Tenant", amountPaise: row.expectedAmountPaise }))
  ].sort((left, right) => (right.reviewedAt?.getTime() ?? 0) - (left.reviewedAt?.getTime() ?? 0));
}
async function listReceiptReviewers(buildingId) {
  const db = await requireDb();
  const [rentRows, electricityRows, chargeRows] = await Promise.all([
    db.select({ reviewerId: rentPayments.receiptReviewedBy }).from(rentPayments).where(and(eq(rentPayments.buildingId, buildingId), inArray(rentPayments.receiptReviewStatus, ["approved", "rejected"]))),
    db.select({ reviewerId: electricityBills.receiptReviewedBy }).from(electricityBills).where(and(eq(electricityBills.buildingId, buildingId), inArray(electricityBills.receiptReviewStatus, ["approved", "rejected"]))),
    db.select({ reviewerId: tenantCharges.receiptReviewedBy }).from(tenantCharges).where(and(eq(tenantCharges.buildingId, buildingId), inArray(tenantCharges.receiptReviewStatus, ["approved", "rejected"])))
  ]);
  const reviewerIds = Array.from(new Set([...rentRows, ...electricityRows, ...chargeRows].map((row) => row.reviewerId).filter((reviewerId) => reviewerId !== null)));
  if (reviewerIds.length === 0) return [];
  return db.select({ id: users.id, name: users.name }).from(users).where(inArray(users.id, reviewerIds)).orderBy(users.name);
}
async function getDashboardOverview(buildingId, totalBuildings, periodMode = "monthly", periodKey) {
  const snapshot = await getBuildingSnapshot(buildingId);
  const db = await requireDb();
  const building = (await db.select().from(buildings).where(eq(buildings.id, buildingId)).limit(1))[0];
  if (!building) throw new Error("Selected building not found.");
  const period = getDashboardPeriod(periodMode, /* @__PURE__ */ new Date(), periodKey);
  const month = period.key;
  const matchesPeriod = (value) => value.startsWith(month);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const activeAllocations = snapshot.allocations.filter((allocation) => allocation.status === "active");
  const roomById = new Map(snapshot.rooms.map((room) => [room.id, room]));
  const tenantById = new Map(snapshot.tenants.map((tenant) => [tenant.id, tenant]));
  const activeAllocationByTenantId = new Map(activeAllocations.map((allocation) => [allocation.tenantId, allocation]));
  const allocationCounts = /* @__PURE__ */ new Map();
  activeAllocations.forEach((allocation) => allocationCounts.set(allocation.roomId, (allocationCounts.get(allocation.roomId) ?? 0) + 1));
  const roomStates = snapshot.rooms.map((room) => ({ roomId: room.id, roomNumber: room.number, ...getRoomOccupancy(room.capacity, allocationCounts.get(room.id) ?? 0) }));
  const monthlyRents = snapshot.rents.filter((rent) => matchesPeriod(rent.rentMonth));
  const collectedPaise = monthlyRents.reduce((total, rent) => total + rent.paidAmountPaise, 0);
  const expectedRentPaise = monthlyRents.reduce((total, rent) => total + rent.expectedAmountPaise, 0);
  const pendingPaise = monthlyRents.reduce((total, rent) => total + Math.max(rent.expectedAmountPaise - rent.paidAmountPaise, 0), 0);
  const monthlyExpensePaise = snapshot.expenses.filter((expense) => matchesPeriod(expense.expenseDate)).reduce((total, expense) => total + expense.amountPaise, 0);
  const monthlyOperatingCostPaise = snapshot.operatingCosts.filter((cost) => matchesPeriod(cost.costDate)).reduce((total, cost) => total + cost.amountPaise, 0);
  const monthlyOperatingCostPaidPaise = snapshot.operatingCosts.filter((cost) => matchesPeriod(cost.costDate)).reduce((total, cost) => total + cost.paidAmountPaise, 0);
  const monthlyServiceChargePaise = snapshot.serviceCharges.filter((charge) => charge.active === "active" && charge.billingCycle === "monthly").reduce((total, charge) => total + charge.amountPaise, 0);
  const monthlyTenantServicePaise = snapshot.tenantServices.filter((service) => service.active === "active").reduce((total, service) => total + service.monthlyChargePaise, 0);
  const monthlyElectricityBilledPaise = snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth)).reduce((total, bill) => total + bill.billAmountPaise, 0);
  const monthlyElectricityPaidPaise = snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth)).reduce((total, bill) => total + bill.paidAmountPaise, 0);
  const monthlyElectricityPendingPaise = Math.max(monthlyElectricityBilledPaise - monthlyElectricityPaidPaise, 0);
  const [governmentElectricityRows, creditAdjustmentRows, ownerSettlementRows] = await Promise.all([
    db.select().from(governmentElectricityPayments).where(eq(governmentElectricityPayments.buildingId, buildingId)),
    db.select().from(managerCreditAdjustments).where(eq(managerCreditAdjustments.buildingId, buildingId)),
    db.select().from(ownerSettlements).where(eq(ownerSettlements.buildingId, buildingId))
  ]);
  const governmentElectricity = governmentElectricityRows.filter((payment) => matchesPeriod(payment.billingMonth));
  const governmentElectricityExpectedPaise = governmentElectricity.reduce((total, payment) => total + payment.expectedAmountPaise, 0);
  const governmentElectricityPaidPaise = governmentElectricity.reduce((total, payment) => total + payment.paidAmountPaise, 0);
  const governmentElectricityPendingPaise = Math.max(governmentElectricityExpectedPaise - governmentElectricityPaidPaise, 0);
  const ownerSettlementExpectedPaise = ownerSettlementRows.filter((settlement) => matchesPeriod(settlement.billingMonth)).reduce((total, settlement) => total + settlement.expectedAmountPaise, 0);
  const ownerSettlementPaidPaise = ownerSettlementRows.filter((settlement) => matchesPeriod(settlement.billingMonth)).reduce((total, settlement) => total + settlement.paidAmountPaise, 0);
  const electricityTenantCharges = snapshot.tenantCharges.filter((charge) => charge.sourceType === "electricity" && charge.billingMonth !== null && matchesPeriod(charge.billingMonth));
  const electricityChargeBillIds = new Set(electricityTenantCharges.map((charge) => charge.sourceId));
  const unsplitElectricityBills = snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth) && !electricityChargeBillIds.has(bill.id));
  const electricityCollectionExpectedPaise = electricityTenantCharges.reduce((total, charge) => total + charge.expectedAmountPaise, 0) + unsplitElectricityBills.reduce((total, bill) => total + bill.billAmountPaise, 0);
  const electricityCollectionPaidPaise = electricityTenantCharges.reduce((total, charge) => total + charge.paidAmountPaise, 0) + unsplitElectricityBills.reduce((total, bill) => total + bill.paidAmountPaise, 0);
  const electricityCollectionPendingPaise = Math.max(electricityCollectionExpectedPaise - electricityCollectionPaidPaise, 0);
  const periodTenantCharges = snapshot.tenantCharges.filter((charge) => charge.sourceType !== "electricity" && charge.billingMonth !== null && matchesPeriod(charge.billingMonth));
  const periodTenantChargeExpectedPaise = periodTenantCharges.reduce((total, charge) => total + charge.expectedAmountPaise, 0);
  const periodTenantChargeCreditPaise = periodTenantCharges.reduce((total, charge) => total + charge.paidAmountPaise, 0);
  const periodTenantChargePendingPaise = periodTenantCharges.reduce((total, charge) => total + Math.max(charge.expectedAmountPaise - charge.paidAmountPaise, 0), 0);
  const totalTenantCreditPendingPaise = pendingPaise + electricityCollectionPendingPaise + periodTenantChargePendingPaise;
  const tenantCreditById = /* @__PURE__ */ new Map();
  const addTenantCredit = (tenantId, category, amountPaise, dueDate, paymentTarget) => {
    if (amountPaise <= 0) return;
    const tenant = tenantById.get(tenantId);
    if (!tenant) return;
    const allocation = activeAllocationByTenantId.get(tenantId);
    const current = tenantCreditById.get(tenantId) ?? { tenantId, tenantName: tenant.fullName, tenantPhone: tenant.phone, roomNumber: allocation ? roomById.get(allocation.roomId)?.number ?? "\u2014" : "\u2014", rentPendingPaise: 0, electricityPendingPaise: 0, assignedCostPendingPaise: 0, earliestDueDate: null, paymentTarget: null };
    if (category === "rent") current.rentPendingPaise += amountPaise;
    if (category === "electricity") current.electricityPendingPaise += amountPaise;
    if (category === "assignedCost") current.assignedCostPendingPaise += amountPaise;
    if (dueDate && (!current.earliestDueDate || dueDate < current.earliestDueDate)) current.earliestDueDate = dueDate;
    if (!current.paymentTarget || (dueDate ?? "9999-12-31") < (current.paymentTarget.dueDate ?? "9999-12-31")) current.paymentTarget = { ...paymentTarget, dueDate };
    tenantCreditById.set(tenantId, current);
  };
  monthlyRents.forEach((rent) => addTenantCredit(rent.tenantId, "rent", Math.max(rent.expectedAmountPaise - rent.paidAmountPaise, 0), rent.dueDate, { type: "rent", recordId: rent.id }));
  electricityTenantCharges.forEach((charge) => addTenantCredit(charge.tenantId, "electricity", Math.max(charge.expectedAmountPaise - charge.paidAmountPaise, 0), charge.dueDate, { type: "tenantCharge", recordId: charge.id }));
  periodTenantCharges.forEach((charge) => addTenantCredit(charge.tenantId, "assignedCost", Math.max(charge.expectedAmountPaise - charge.paidAmountPaise, 0), charge.dueDate, { type: "tenantCharge", recordId: charge.id }));
  const tenantCreditRows = Array.from(tenantCreditById.values()).map((row) => ({ ...row, totalPendingPaise: row.rentPendingPaise + row.electricityPendingPaise + row.assignedCostPendingPaise, overdueDays: row.earliestDueDate && row.earliestDueDate < today ? Math.floor((Date.parse(`${today}T00:00:00.000Z`) - Date.parse(`${row.earliestDueDate}T00:00:00.000Z`)) / 864e5) : 0 })).filter((row) => row.totalPendingPaise > 0).sort((left, right) => right.totalPendingPaise - left.totalPendingPaise || left.tenantName.localeCompare(right.tenantName));
  const cashFinancials = calculateBuildingFinancials({ expectedRentPaise, collectedRentPaise: collectedPaise, monthlyExpensePaise: monthlyExpensePaise + monthlyOperatingCostPaidPaise + governmentElectricityPaidPaise, monthlyServiceChargeExpectedPaise: monthlyServiceChargePaise, collectedTenantChargeRecoveryPaise: periodTenantChargeCreditPaise + electricityCollectionPaidPaise, ownerSettlementPaidPaise });
  const financials = calculateBuildingFinancials({ expectedRentPaise, collectedRentPaise: collectedPaise, monthlyExpensePaise: monthlyExpensePaise + monthlyOperatingCostPaise + governmentElectricityExpectedPaise, monthlyServiceChargeExpectedPaise: monthlyServiceChargePaise, expectedTenantChargeRecoveryPaise: periodTenantChargeExpectedPaise + electricityCollectionExpectedPaise });
  const legacyOwnerCutPaise = calculateManagerOperatingResult(financials.projectedOperatingResultPaise, building.ownerCutPercent).ownerCutPaise;
  const ownerCutPaise = building.ownerMonthlyCutPaise > 0 ? building.ownerMonthlyCutPaise : legacyOwnerCutPaise;
  const managerCreditAdjustmentPaise = creditAdjustmentRows.filter((adjustment) => matchesPeriod(adjustment.billingMonth)).reduce((total, adjustment) => total + adjustment.amountPaise, 0);
  const managerOperatingResultPaise = financials.projectedOperatingResultPaise - ownerCutPaise + managerCreditAdjustmentPaise;
  const overdueRents = snapshot.rents.filter((rent) => rent.status !== "paid" && rent.dueDate < today);
  const openReminders = snapshot.reminders.filter((reminder) => reminder.status === "active");
  const insights = [];
  if (pendingPaise > 0) insights.push({ id: "rent-pending", severity: overdueRents.length > 0 ? "urgent" : "attention", title: `${overdueRents.length > 0 ? overdueRents.length : ""}${overdueRents.length > 0 ? " overdue rent " : ""}collection${overdueRents.length === 1 ? "" : "s"} need follow-up`, detail: `${(pendingPaise / 100).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })} rent is pending for ${period.label}.`, path: "/billing" });
  if (monthlyElectricityPendingPaise > 0) insights.push({ id: "electricity-pending", severity: "attention", title: "Electricity collections remain open", detail: `${(monthlyElectricityPendingPaise / 100).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })} electricity is pending for ${period.label}.`, path: "/billing" });
  if (periodTenantChargePendingPaise > 0) insights.push({ id: "tenant-charge-pending", severity: "attention", title: "Assigned cost recoveries remain open", detail: `${(periodTenantChargePendingPaise / 100).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })} of shared or assigned costs is pending for ${period.label}.`, path: "/billing" });
  if (roomStates.some((room) => room.availableBeds > 0)) insights.push({ id: "open-beds", severity: "positive", title: `${roomStates.reduce((total, room) => total + room.availableBeds, 0)} beds are ready to fill`, detail: "Review open beds and allocate the next tenant from the Rooms workspace.", path: "/rooms" });
  if (Math.max(monthlyOperatingCostPaise - monthlyOperatingCostPaidPaise, 0) > 0) insights.push({ id: "operating-payable", severity: "attention", title: "Operating payables need review", detail: `${(Math.max(monthlyOperatingCostPaise - monthlyOperatingCostPaidPaise, 0) / 100).toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })} remains payable in ${period.label}.`, path: "/expenses" });
  if (insights.length === 0) insights.push({ id: "on-track", severity: "positive", title: "Collections and costs are on track", detail: `No pending rent, electricity, or operating payables were recorded for ${period.label}.`, path: "/billing" });
  const rentItems = monthlyRents.map((rent) => ({ id: `rent-${rent.id}`, title: tenantById.get(rent.tenantId)?.fullName ?? "Tenant", detail: `Rent ${rent.rentMonth} \xB7 ${rent.status}`, amountPaise: rent.expectedAmountPaise }));
  const rentCollectedItems = monthlyRents.filter((rent) => rent.paidAmountPaise > 0).map((rent) => ({ id: `rent-collected-${rent.id}`, title: tenantById.get(rent.tenantId)?.fullName ?? "Tenant", detail: `Rent ${rent.rentMonth} \xB7 ${rent.status}`, amountPaise: rent.paidAmountPaise }));
  const rentPendingItems = monthlyRents.filter((rent) => rent.expectedAmountPaise > rent.paidAmountPaise).map((rent) => ({ id: `rent-pending-${rent.id}`, title: tenantById.get(rent.tenantId)?.fullName ?? "Tenant", detail: `Due ${rent.dueDate} \xB7 ${rent.status}`, amountPaise: rent.expectedAmountPaise - rent.paidAmountPaise, paymentTarget: { type: "rent", recordId: rent.id } }));
  const electricityItems = snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth)).map((bill) => ({ id: `electricity-${bill.id}`, title: `Room ${roomById.get(bill.roomId)?.number ?? "\u2014"}`, detail: `Electricity ${bill.billingMonth} \xB7 ${bill.status}`, amountPaise: bill.billAmountPaise }));
  const electricityCollectedItems = snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth) && bill.paidAmountPaise > 0).map((bill) => ({ id: `electricity-collected-${bill.id}`, title: `Room ${roomById.get(bill.roomId)?.number ?? "\u2014"}`, detail: `Electricity ${bill.billingMonth} \xB7 ${bill.status}`, amountPaise: bill.paidAmountPaise }));
  const electricityChargeIds = new Set(snapshot.tenantCharges.filter((charge) => charge.sourceType === "electricity" && charge.billingMonth !== null && matchesPeriod(charge.billingMonth)).map((charge) => charge.sourceId));
  const electricityPendingItems = [
    ...snapshot.tenantCharges.filter((charge) => charge.sourceType === "electricity" && charge.billingMonth !== null && matchesPeriod(charge.billingMonth) && charge.expectedAmountPaise > charge.paidAmountPaise).map((charge) => ({ id: `electricity-charge-pending-${charge.id}`, title: tenantById.get(charge.tenantId ?? 0)?.fullName ?? charge.title, detail: `Room ${roomById.get(charge.roomId ?? 0)?.number ?? "\u2014"} \xB7 Due ${charge.dueDate ?? "not set"}`, amountPaise: charge.expectedAmountPaise - charge.paidAmountPaise, paymentTarget: { type: "tenantCharge", recordId: charge.id } })),
    ...snapshot.electricity.filter((bill) => matchesPeriod(bill.billingMonth) && bill.billAmountPaise > bill.paidAmountPaise && !electricityChargeIds.has(bill.id)).map((bill) => ({ id: `electricity-pending-${bill.id}`, title: `Room ${roomById.get(bill.roomId)?.number ?? "\u2014"}`, detail: `Due ${bill.dueDate ?? "not set"} \xB7 ${bill.status}`, amountPaise: bill.billAmountPaise - bill.paidAmountPaise, paymentTarget: { type: "electricity", recordId: bill.id } }))
  ];
  const expenseItems = [
    ...snapshot.expenses.filter((expense) => matchesPeriod(expense.expenseDate)).map((expense) => ({ id: `expense-${expense.id}`, title: `${expense.category} expense`, detail: expense.expenseDate, amountPaise: expense.amountPaise })),
    ...snapshot.operatingCosts.filter((cost) => matchesPeriod(cost.costDate)).map((cost) => ({ id: `operating-cost-${cost.id}`, title: cost.title, detail: `${cost.costDate} \xB7 ${cost.status}`, amountPaise: cost.amountPaise }))
  ];
  const creditItems = [
    ...rentPendingItems.map((item) => ({ ...item, id: `credit-${item.id}`, detail: `Rent balance due \xB7 ${item.detail}` })),
    ...electricityPendingItems.map((item) => ({ ...item, id: `credit-${item.id}`, detail: `Electricity balance due \xB7 ${item.detail}` })),
    ...periodTenantCharges.filter((charge) => charge.expectedAmountPaise > charge.paidAmountPaise).map((charge) => ({ id: `credit-charge-${charge.id}`, title: tenantById.get(charge.tenantId ?? 0)?.fullName ?? charge.title, detail: `Assigned cost balance due \xB7 ${charge.billingMonth}`, amountPaise: charge.expectedAmountPaise - charge.paidAmountPaise, paymentTarget: { type: "tenantCharge", recordId: charge.id } }))
  ];
  const metricDetails = {
    tenants: { title: "Tenant profiles", description: `All tenant profiles in ${building.name}.`, items: snapshot.tenants.map((tenant) => {
      const allocation = activeAllocations.find((item) => item.tenantId === tenant.id);
      return { id: `tenant-${tenant.id}`, title: tenant.fullName, detail: allocation ? `Room ${roomById.get(allocation.roomId)?.number ?? "\u2014"} \xB7 active` : tenant.status, amountPaise: 0 };
    }) },
    occupancy: { title: "Room occupancy", description: "Rooms with one or more active tenant allocations.", items: roomStates.filter((room) => (roomById.get(room.roomId)?.capacity ?? 0) > room.availableBeds).map((room) => {
      const capacity = roomById.get(room.roomId)?.capacity ?? 0;
      const filledBeds = Math.max(capacity - room.availableBeds, 0);
      return { id: `room-${room.roomId}`, title: `Room ${room.roomNumber}`, detail: `${filledBeds}/${capacity} beds filled \xB7 ${room.availableBeds} open`, amountPaise: 0 };
    }) },
    rentExpected: { title: "Rent expected", description: `All rent dues recorded for ${period.label}.`, items: rentItems },
    rentCollected: { title: "Rent collected", description: `Recorded rent payments for ${period.label}.`, items: rentCollectedItems },
    rentPending: { title: "Rent pending", description: `Outstanding rent balances for ${period.label}.`, items: rentPendingItems },
    electricityBilled: { title: "Electricity billed", description: `Room electricity bills for ${period.label}.`, items: electricityItems },
    buildingElectricity: { title: "Total building electricity bill", description: `The building-level utility bill entered for ${period.label}, separate from room readings and tenant collections.`, items: governmentElectricity.map((payment) => ({ id: `building-electricity-${payment.id}`, title: `Building utility bill \xB7 ${payment.billingMonth}`, detail: `${payment.status} \xB7 Due ${payment.dueDate}`, amountPaise: payment.expectedAmountPaise })) },
    electricityPending: { title: "Electricity pending", description: `Outstanding electricity balances for ${period.label}.`, items: electricityPendingItems },
    credit: { title: "Tenant credit pending", description: `Only remaining tenant balances for ${period.label}. Fully settled bills do not create credit entries.`, items: creditItems },
    expenses: { title: "Expenses booked", description: `General expenses and operating costs recorded for ${period.label}.`, items: expenseItems },
    cashProfit: { title: "Cash profit breakdown", description: "Collected rent and recoveries less paid costs, government electricity payments, and recorded Owner settlements.", items: [{ id: "cash-rent", title: "Rent collected", detail: period.label, amountPaise: collectedPaise }, { id: "cash-electricity-recoveries", title: "Electricity collected from tenants", detail: period.label, amountPaise: electricityCollectionPaidPaise }, { id: "cash-recoveries", title: "Assigned cost recoveries collected", detail: period.label, amountPaise: periodTenantChargeCreditPaise }, { id: "cash-government-electricity", title: "Government electricity paid", detail: period.label, amountPaise: -governmentElectricityPaidPaise }, { id: "cash-owner-settlement", title: "Owner settlement paid", detail: period.label, amountPaise: -ownerSettlementPaidPaise }, { id: "cash-expenses", title: "Paid expenses", detail: period.label, amountPaise: -(monthlyExpensePaise + monthlyOperatingCostPaidPaise) }, { id: "cash-result", title: "Cash operating result", detail: period.label, amountPaise: cashFinancials.cashOperatingResultPaise }] },
    projectedProfit: { title: "Projected profit breakdown", description: "Expected rent, recoveries, booked costs, government electricity, the fixed Owner cut, and Manager result adjustments.", items: [{ id: "projected-rent", title: "Rent expected", detail: period.label, amountPaise: expectedRentPaise }, { id: "projected-services", title: "Recurring services expected", detail: period.label, amountPaise: monthlyServiceChargePaise + monthlyTenantServicePaise }, { id: "projected-electricity-recoveries", title: "Electricity expected from tenants", detail: period.label, amountPaise: electricityCollectionExpectedPaise }, { id: "projected-recoveries", title: "Assigned cost recoveries expected", detail: period.label, amountPaise: periodTenantChargeExpectedPaise }, { id: "projected-government-electricity", title: "Government electricity payable", detail: period.label, amountPaise: -governmentElectricityExpectedPaise }, { id: "projected-expenses", title: "Booked expenses", detail: period.label, amountPaise: -(monthlyExpensePaise + monthlyOperatingCostPaise) }, { id: "projected-result", title: "Projected operating result", detail: period.label, amountPaise: financials.projectedOperatingResultPaise }, { id: "owner-cut", title: "Owner monthly cut", detail: period.label, amountPaise: -ownerCutPaise }, { id: "manager-credit-adjustment", title: "Manager result adjustments", detail: period.label, amountPaise: managerCreditAdjustmentPaise }, { id: "manager-result", title: "Projected Manager result", detail: period.label, amountPaise: managerOperatingResultPaise }] }
  };
  const recentActivity = [
    ...snapshot.allocations.map((allocation) => ({ id: `allocation-${allocation.id}`, kind: allocation.status === "active" ? "allocation" : "moveOut", title: allocation.status === "active" ? "Tenant allocated" : "Move-out recorded", detail: `Room ${roomById.get(allocation.roomId)?.number ?? "\u2014"} \xB7 ${allocation.moveInDate}`, occurredAt: allocation.updatedAt.toISOString() })),
    ...snapshot.rents.map((rent) => ({ id: `rent-${rent.id}`, kind: "rent", title: `Rent ${rent.status}`, detail: `${rent.rentMonth} \xB7 \u20B9${(rent.paidAmountPaise / 100).toLocaleString("en-IN")} recorded`, occurredAt: rent.updatedAt.toISOString() })),
    ...snapshot.expenses.map((expense) => ({ id: `expense-${expense.id}`, kind: "expense", title: `${expense.category} expense recorded`, detail: `\u20B9${(expense.amountPaise / 100).toLocaleString("en-IN")} \xB7 ${expense.expenseDate}`, occurredAt: expense.updatedAt.toISOString() })),
    ...snapshot.operatingCosts.map((cost) => ({ id: `operating-cost-${cost.id}`, kind: "operatingCost", title: `${cost.kind} cost recorded`, detail: `${cost.title} \xB7 \u20B9${(cost.amountPaise / 100).toLocaleString("en-IN")} \xB7 ${cost.status}`, occurredAt: cost.updatedAt.toISOString() })),
    ...snapshot.reminders.map((reminder) => ({ id: `reminder-${reminder.id}`, kind: "reminder", title: reminder.status === "active" ? "Reminder scheduled" : "Reminder completed", detail: `${reminder.title} \xB7 Due ${reminder.dueDate}`, occurredAt: reminder.updatedAt.toISOString() }))
  ].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)).slice(0, 6);
  return {
    summary: {
      periodMode,
      periodKey: period.key,
      periodLabel: period.label,
      totalBuildings,
      totalTenants: snapshot.tenants.length,
      totalRooms: snapshot.rooms.length,
      occupiedRooms: roomStates.filter((room) => room.status === "occupied").length,
      filledRooms: roomStates.filter((room) => room.status === "occupied").length,
      vacantRooms: roomStates.filter((room) => room.status === "vacant").length,
      vacantBeds: roomStates.reduce((total, room) => total + room.availableBeds, 0),
      collectedPaise,
      expectedRentPaise,
      pendingPaise,
      monthlyExpensePaise,
      monthlyOperatingCostPaise,
      monthlyOperatingCostPaidPaise,
      monthlyOperatingCostPayablePaise: Math.max(monthlyOperatingCostPaise - monthlyOperatingCostPaidPaise, 0),
      cashOperatingResultPaise: cashFinancials.cashOperatingResultPaise,
      projectedOperatingResultPaise: financials.projectedOperatingResultPaise,
      ownerCutPercent: building.ownerCutPercent,
      ownerMonthlyCutPaise: building.ownerMonthlyCutPaise,
      ownerCutPaise,
      ownerSettlementExpectedPaise,
      ownerSettlementPaidPaise,
      managerOperatingResultPaise,
      managerCreditAdjustmentPaise,
      monthlyServiceChargePaise,
      monthlyTenantServicePaise,
      monthlyElectricityBilledPaise,
      monthlyElectricityPaidPaise,
      monthlyElectricityPendingPaise,
      electricityCollectionExpectedPaise,
      electricityCollectionPaidPaise,
      electricityCollectionPendingPaise,
      governmentElectricityExpectedPaise,
      governmentElectricityPaidPaise,
      governmentElectricityPendingPaise,
      periodTenantChargeExpectedPaise,
      periodTenantChargeCreditPaise,
      periodTenantChargePendingPaise,
      totalTenantCreditPendingPaise,
      totalExpensesBookedPaise: monthlyExpensePaise + monthlyOperatingCostPaise,
      totalExpensesPaidPaise: monthlyExpensePaise + monthlyOperatingCostPaidPaise,
      unreadNotifications: snapshot.managerNotifications.filter((notification) => notification.status === "unread").length,
      activeTenants: activeAllocations.length
    },
    roomStates,
    tenantCreditRows,
    overdueRents,
    openReminders,
    insights,
    metricDetails,
    recentExpenses: snapshot.expenses.slice(0, 5),
    recentActivity
  };
}
function deriveOwnerSettlementStatus(expectedAmountPaise, paidAmountPaise) {
  if (!Number.isInteger(expectedAmountPaise) || expectedAmountPaise <= 0) throw new Error("Owner settlement amount must be a positive whole number of paise.");
  if (!Number.isInteger(paidAmountPaise) || paidAmountPaise < 0 || paidAmountPaise > expectedAmountPaise) throw new Error("Owner settlement paid amount must be between zero and the expected amount.");
  return paidAmountPaise === 0 ? "pending" : paidAmountPaise === expectedAmountPaise ? "paid" : "partial";
}
async function upsertOwnerSettlement(input) {
  const db = await requireDb();
  const status = deriveOwnerSettlementStatus(input.expectedAmountPaise, input.paidAmountPaise);
  const paidOn = input.paidAmountPaise > 0 ? input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null;
  const paymentMethod2 = input.paidAmountPaise > 0 ? input.paymentMethod : null;
  await db.transaction(async (tx) => {
    await tx.insert(ownerSettlements).values({ ...input, status, paidOn, paymentMethod: paymentMethod2 }).onConflictDoUpdate({
      target: [ownerSettlements.buildingId, ownerSettlements.billingMonth],
      set: { expectedAmountPaise: input.expectedAmountPaise, paidAmountPaise: input.paidAmountPaise, status, dueDate: input.dueDate, paidOn, paymentMethod: paymentMethod2, notes: input.notes, receiptUrl: input.receiptUrl, createdBy: input.createdBy }
    });
    await tx.update(buildings).set({ ownerMonthlyCutPaise: input.expectedAmountPaise, ownerCutPercent: 0 }).where(eq(buildings.id, input.buildingId));
  });
}
async function confirmOwnerSettlement(input) {
  const db = await requireDb();
  await db.update(ownerSettlements).set({ ownerConfirmedAt: /* @__PURE__ */ new Date(), ownerConfirmedBy: input.ownerId }).where(and(eq(ownerSettlements.id, input.id), eq(ownerSettlements.buildingId, input.buildingId)));
}
async function deleteOwnerSettlement(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const settlement = (await tx.select().from(ownerSettlements).where(and(eq(ownerSettlements.id, input.id), eq(ownerSettlements.buildingId, input.buildingId))).limit(1))[0];
    if (!settlement) throw new Error("Owner settlement was not found in the selected building.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "owner_settlement", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ settlement }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(ownerSettlements).where(and(eq(ownerSettlements.id, input.id), eq(ownerSettlements.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
async function upsertGovernmentElectricityPayment(input) {
  const db = await requireDb();
  const status = deriveOwnerSettlementStatus(input.expectedAmountPaise, input.paidAmountPaise);
  const paidOn = input.paidAmountPaise > 0 ? input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null;
  const paymentMethod2 = input.paidAmountPaise > 0 ? input.paymentMethod : null;
  await db.insert(governmentElectricityPayments).values({ ...input, status, paidOn, paymentMethod: paymentMethod2 }).onConflictDoUpdate({
    target: [governmentElectricityPayments.buildingId, governmentElectricityPayments.billingMonth],
    set: { expectedAmountPaise: input.expectedAmountPaise, paidAmountPaise: input.paidAmountPaise, status, dueDate: input.dueDate, paidOn, paymentMethod: paymentMethod2, notes: input.notes, receiptUrl: input.receiptUrl, createdBy: input.createdBy }
  });
}
async function deleteGovernmentElectricityPayment(input) {
  const db = await requireDb();
  return await db.transaction(async (tx) => {
    const payment = (await tx.select().from(governmentElectricityPayments).where(and(eq(governmentElectricityPayments.id, input.id), eq(governmentElectricityPayments.buildingId, input.buildingId))).limit(1))[0];
    if (!payment) throw new Error("Government electricity payment was not found in the selected building.");
    const [audit] = await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "government_electricity_payment", entityId: input.id, action: "deleted", snapshotJson: JSON.stringify({ payment }), createdBy: input.createdBy }).returning({ id: changeAuditLogs.id });
    if (!audit) throw new Error("Deletion audit could not be recorded.");
    await tx.delete(governmentElectricityPayments).where(and(eq(governmentElectricityPayments.id, input.id), eq(governmentElectricityPayments.buildingId, input.buildingId)));
    return { auditId: audit.id };
  });
}
async function createManagerCreditAdjustment(input) {
  const db = await requireDb();
  await db.insert(managerCreditAdjustments).values(input);
}
async function getManagerProfitWorkspace(input) {
  const db = await requireDb();
  const overview = await getDashboardOverview(input.buildingId, input.totalBuildings, input.periodMode, input.periodKey);
  const [settlementRows, governmentElectricityRows, creditAdjustments] = await Promise.all([
    db.select().from(ownerSettlements).where(eq(ownerSettlements.buildingId, input.buildingId)).orderBy(desc(ownerSettlements.billingMonth)),
    db.select().from(governmentElectricityPayments).where(eq(governmentElectricityPayments.buildingId, input.buildingId)).orderBy(desc(governmentElectricityPayments.billingMonth)),
    db.select().from(managerCreditAdjustments).where(eq(managerCreditAdjustments.buildingId, input.buildingId)).orderBy(desc(managerCreditAdjustments.createdAt))
  ]);
  const currentSettlement = settlementRows.find((settlement) => settlement.billingMonth === overview.summary.periodKey) ?? null;
  const currentGovernmentElectricity = governmentElectricityRows.find((payment) => payment.billingMonth === overview.summary.periodKey) ?? null;
  const expectedAmountPaise = currentSettlement?.expectedAmountPaise ?? overview.summary.ownerCutPaise;
  const paidAmountPaise = currentSettlement?.paidAmountPaise ?? 0;
  return {
    summary: overview.summary,
    ownerSettlement: { id: currentSettlement?.id ?? null, billingMonth: overview.summary.periodKey, expectedAmountPaise, paidAmountPaise, dueAmountPaise: Math.max(expectedAmountPaise - paidAmountPaise, 0), status: currentSettlement?.status ?? (expectedAmountPaise > 0 ? "pending" : "paid"), dueDate: currentSettlement?.dueDate ?? `${overview.summary.periodKey}-05` },
    settlementHistory: settlementRows,
    governmentElectricity: currentGovernmentElectricity ?? { billingMonth: overview.summary.periodKey, expectedAmountPaise: 0, paidAmountPaise: 0, dueDate: `${overview.summary.periodKey}-05`, status: "paid", paidOn: null, paymentMethod: null, notes: null, receiptUrl: null },
    governmentElectricityHistory: governmentElectricityRows,
    managerCreditAdjustments: creditAdjustments
  };
}
async function getOwnerOverview(input) {
  const db = await requireDb();
  const authorizedBuildingIds = new Set(input.buildingIds);
  const ownedBuildings = (await db.select().from(buildings).orderBy(buildings.name)).filter((building) => authorizedBuildingIds.has(building.id));
  const buildingSummaries = await Promise.all(ownedBuildings.map(async (building) => {
    const overview = await getDashboardOverview(building.id, ownedBuildings.length, input.periodMode, input.periodKey);
    const [settlements, snapshot] = await Promise.all([
      db.select().from(ownerSettlements).where(eq(ownerSettlements.buildingId, building.id)).orderBy(desc(ownerSettlements.billingMonth)),
      getBuildingSnapshot(building.id)
    ]);
    const currentSettlement = settlements.find((settlement) => settlement.billingMonth === overview.summary.periodKey) ?? null;
    const latestConfiguredSettlement = settlements.find((settlement) => settlement.expectedAmountPaise > 0) ?? null;
    const monthlyProfitPaise = currentSettlement?.expectedAmountPaise ?? (building.ownerMonthlyCutPaise || latestConfiguredSettlement?.expectedAmountPaise || overview.summary.ownerCutPaise);
    const nextPendingSettlement = settlements.find((settlement) => settlement.status !== "paid") ?? null;
    const [year, month] = overview.summary.periodKey.split("-").map(Number);
    const nextPeriodKey = `${month === 12 ? year + 1 : year}-${String(month === 12 ? 1 : month + 1).padStart(2, "0")}`;
    const nextPayment = nextPendingSettlement ?? { id: 0, billingMonth: nextPeriodKey, expectedAmountPaise: monthlyProfitPaise, paidAmountPaise: 0, dueDate: getRentDueDate(nextPeriodKey, building.rentDueDay), status: monthlyProfitPaise > 0 ? "pending" : "paid", paymentMethod: null, paidOn: null, notes: null };
    return {
      building: { id: building.id, name: building.name, address: building.address, city: building.city, landmark: building.landmark, contactPhone: building.contactPhone, imageUrl: building.imageUrl, mapUrl: building.mapUrl },
      occupancy: { totalRooms: overview.summary.totalRooms, vacantRooms: overview.summary.vacantRooms, activeTenants: overview.summary.activeTenants, rooms: snapshot.rooms.map((room) => {
        const floor = snapshot.floors.find((item) => item.id === room.floorId);
        const allocations = snapshot.allocations.filter((allocation) => allocation.roomId === room.id && allocation.status === "active");
        return { id: room.id, number: room.number, floor: floor?.name ?? "Unassigned floor", roomType: room.roomType, capacity: room.capacity, filledBeds: allocations.length, vacantBeds: Math.max(room.capacity - allocations.length, 0), status: allocations.length >= room.capacity ? "filled" : allocations.length === 0 ? "vacant" : "partially_filled", tenants: allocations.map((allocation) => {
          const tenant = snapshot.tenants.find((item) => item.id === allocation.tenantId);
          return { id: allocation.tenantId, fullName: tenant?.fullName ?? "Tenant", phone: tenant?.phone ?? "\u2014" };
        }) };
      }) },
      finance: { monthlyProfitPaise, monthlyBuildingExpensePaise: overview.summary.totalExpensesBookedPaise + overview.summary.governmentElectricityExpectedPaise, nextPayment },
      paymentHistory: settlements.filter((settlement) => settlement.paidAmountPaise > 0).slice(0, 12)
    };
  }));
  return { periodMode: input.periodMode, periodKey: input.periodKey, buildings: buildingSummaries };
}
async function getExportRows(input) {
  const db = await requireDb();
  if (input.exportType === "tenants") {
    const conditions2 = [eq(tenants.buildingId, input.buildingId)];
    if (input.dateFrom) conditions2.push(gte(tenants.createdAt, /* @__PURE__ */ new Date(`${input.dateFrom}T00:00:00.000Z`)));
    if (input.dateTo) conditions2.push(lte(tenants.createdAt, /* @__PURE__ */ new Date(`${input.dateTo}T23:59:59.999Z`)));
    return db.select().from(tenants).where(and(...conditions2));
  }
  if (input.exportType === "rent") {
    const conditions2 = [eq(rentPayments.buildingId, input.buildingId)];
    if (input.dateFrom) conditions2.push(gte(rentPayments.dueDate, input.dateFrom));
    if (input.dateTo) conditions2.push(lte(rentPayments.dueDate, input.dateTo));
    return db.select().from(rentPayments).where(and(...conditions2));
  }
  if (input.exportType === "electricity") {
    const conditions2 = [eq(electricityBills.buildingId, input.buildingId)];
    const { fromMonth, toMonth } = exportMonthBounds(input);
    if (fromMonth) conditions2.push(gte(electricityBills.billingMonth, fromMonth));
    if (toMonth) conditions2.push(lte(electricityBills.billingMonth, toMonth));
    return db.select().from(electricityBills).where(and(...conditions2));
  }
  const conditions = [eq(expenses.buildingId, input.buildingId)];
  if (input.dateFrom) conditions.push(gte(expenses.expenseDate, input.dateFrom));
  if (input.dateTo) conditions.push(lte(expenses.expenseDate, input.dateTo));
  return db.select().from(expenses).where(and(...conditions));
}
async function recordExport(input) {
  const db = await requireDb();
  await db.insert(exportHistory).values(input);
}
async function createOrLinkBuildingOwner(input) {
  const db = await requireDb();
  const existing = (await db.select().from(users).where(eq(users.phone, input.phone)).limit(1))[0];
  if (existing) {
    if (existing.role !== "admin") throw new Error("This phone number belongs to a non-Owner account. Use a registered Owner phone or create a new Owner profile.");
    return existing.id;
  }
  if (!input.passwordHash) throw new Error("Set an initial password when creating a new Owner profile.");
  const [result] = await db.insert(users).values({ openId: `owner-${input.phone}-${Date.now()}`, name: input.name, phone: input.phone, passwordHash: input.passwordHash, loginMethod: "phone-password", role: "admin" }).returning({ id: users.id });
  if (!result) throw new Error("Owner account could not be created.");
  return result.id;
}
async function updateOwnCredentials(input) {
  const db = await requireDb();
  const current = (await db.select({ id: users.id, phone: users.phone, role: users.role }).from(users).where(eq(users.id, input.userId)).limit(1))[0];
  if (!current) throw new Error("Account was not found.");
  const matchingPhone = (await db.select({ id: users.id }).from(users).where(eq(users.phone, input.phone)).limit(1))[0];
  if (matchingPhone && matchingPhone.id !== input.userId) throw new Error("That phone number is already used by another account.");
  await db.transaction(async (tx) => {
    await tx.update(users).set({ phone: input.phone, ...input.passwordHash ? { passwordHash: input.passwordHash } : {}, loginMethod: "phone-password" }).where(eq(users.id, input.userId));
    await tx.insert(changeAuditLogs).values({ buildingId: null, entityType: "user_account", entityId: input.userId, action: "credentials_updated", snapshotJson: JSON.stringify({ role: current.role, phoneBefore: current.phone, phoneAfter: input.phone, passwordChanged: Boolean(input.passwordHash) }), createdBy: input.userId });
  });
}
async function listBuildingRecoveryAccounts(buildingId) {
  const db = await requireDb();
  const building = (await db.select({ ownerId: buildings.ownerId }).from(buildings).where(eq(buildings.id, buildingId)).limit(1))[0];
  if (!building) throw new Error("Building was not found.");
  const [ownerRows, managerRows, tenantRows] = await Promise.all([
    db.select({ id: users.id, name: users.name, phone: users.phone, role: users.role, lastSignedIn: users.lastSignedIn }).from(users).where(eq(users.id, building.ownerId)).limit(1),
    db.select({ id: users.id, name: users.name, phone: users.phone, role: users.role, lastSignedIn: users.lastSignedIn }).from(staffAssignments).innerJoin(users, eq(users.id, staffAssignments.userId)).where(and(eq(staffAssignments.buildingId, buildingId), eq(users.role, "manager"))),
    db.select({ id: users.id, name: users.name, phone: users.phone, role: users.role, lastSignedIn: users.lastSignedIn }).from(tenants).innerJoin(users, eq(users.id, tenants.userId)).where(eq(tenants.buildingId, buildingId))
  ]);
  return [...ownerRows, ...managerRows, ...tenantRows].map((account) => ({ ...account, name: account.name ?? "Unnamed account" }));
}
async function resetBuildingAccountCredentials(input) {
  const db = await requireDb();
  const building = (await db.select({ ownerId: buildings.ownerId }).from(buildings).where(eq(buildings.id, input.buildingId)).limit(1))[0];
  if (!building) throw new Error("Building was not found.");
  const [account, managerAssignment, tenant] = await Promise.all([
    db.select({ id: users.id, role: users.role, phone: users.phone }).from(users).where(eq(users.id, input.userId)).limit(1),
    db.select({ userId: staffAssignments.userId }).from(staffAssignments).where(and(eq(staffAssignments.buildingId, input.buildingId), eq(staffAssignments.userId, input.userId))).limit(1),
    db.select({ userId: tenants.userId }).from(tenants).where(and(eq(tenants.buildingId, input.buildingId), eq(tenants.userId, input.userId))).limit(1)
  ]);
  if (!account[0] || account[0].id !== building.ownerId && !managerAssignment[0] && !tenant[0]) throw new Error("This account is not linked to the selected building.");
  await db.transaction(async (tx) => {
    await tx.update(users).set({ passwordHash: input.passwordHash, loginMethod: "phone-password" }).where(eq(users.id, input.userId));
    await tx.insert(changeAuditLogs).values({ buildingId: input.buildingId, entityType: "user_account", entityId: input.userId, action: "password_reset_by_manager", snapshotJson: JSON.stringify({ role: account[0].role, phone: account[0].phone }), createdBy: input.createdBy });
  });
}
async function getTenantPortal(userId) {
  const db = await requireDb();
  const tenant = (await db.select().from(tenants).where(eq(tenants.userId, userId)).limit(1))[0];
  if (!tenant) return void 0;
  const allocation = (await db.select().from(roomAllocations).where(and(eq(roomAllocations.tenantId, tenant.id), eq(roomAllocations.status, "active"))).limit(1))[0];
  const building = (await db.select().from(buildings).where(eq(buildings.id, tenant.buildingId)).limit(1))[0];
  const room = allocation ? (await db.select().from(rooms).where(eq(rooms.id, allocation.roomId)).limit(1))[0] : void 0;
  const rents = await db.select().from(rentPayments).where(eq(rentPayments.tenantId, tenant.id)).orderBy(desc(rentPayments.rentMonth));
  const electricity = room ? await db.select().from(electricityBills).where(eq(electricityBills.roomId, room.id)).orderBy(desc(electricityBills.billingMonth)) : [];
  const charges = await db.select().from(tenantCharges).where(eq(tenantCharges.tenantId, tenant.id)).orderBy(desc(tenantCharges.createdAt));
  const tenantReminders = await db.select().from(reminders).where(and(eq(reminders.tenantId, tenant.id), eq(reminders.status, "active"))).orderBy(reminders.dueDate);
  return { tenant, allocation, building, room, rents, electricity, charges, reminders: tenantReminders };
}
async function createTenantSupportRequest(input) {
  const db = await requireDb();
  const tenant = (await db.select({ id: tenants.id, buildingId: tenants.buildingId }).from(tenants).where(eq(tenants.userId, input.userId)).limit(1))[0];
  if (!tenant) throw new Error("Tenant profile is not linked to this login.");
  const categoryLabel = input.category === "room" ? "Room" : input.category.charAt(0).toUpperCase() + input.category.slice(1);
  await db.insert(reminders).values({ buildingId: tenant.buildingId, tenantId: tenant.id, rentPaymentId: null, title: `Tenant request \xB7 ${categoryLabel}: ${input.description}`, dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), createdBy: input.userId });
  return { buildingId: tenant.buildingId, tenantId: tenant.id };
}
async function submitTenantPaymentReceipt(input) {
  const db = await requireDb();
  const tenant = (await db.select({ id: tenants.id, buildingId: tenants.buildingId }).from(tenants).where(eq(tenants.userId, input.userId)).limit(1))[0];
  if (!tenant) throw new Error("Tenant profile is not linked to this login.");
  if (input.type === "rent") {
    const payment = (await db.select({ id: rentPayments.id, rentMonth: rentPayments.rentMonth, dueDate: rentPayments.dueDate, status: rentPayments.status }).from(rentPayments).where(and(eq(rentPayments.id, input.billId), eq(rentPayments.tenantId, tenant.id), eq(rentPayments.buildingId, tenant.buildingId))).limit(1))[0];
    if (!payment) throw new Error("Rent record not found for this tenant.");
    await db.update(rentPayments).set({ receiptUrl: input.receiptUrl, paymentMethod: input.paymentMethod, receiptReviewStatus: "pending", receiptReviewedAt: null, receiptReviewedBy: null, receiptReviewNote: null }).where(eq(rentPayments.id, payment.id));
    await syncRentPaymentReminder({ id: payment.id, buildingId: tenant.buildingId, tenantId: tenant.id, rentMonth: payment.rentMonth, dueDate: payment.dueDate, status: payment.status, createdBy: input.userId });
    return { success: true, label: `Rent ${payment.rentMonth}` };
  }
  if (input.type === "tenant_charge") {
    const charge = (await db.select({ id: tenantCharges.id, title: tenantCharges.title }).from(tenantCharges).where(and(eq(tenantCharges.id, input.billId), eq(tenantCharges.tenantId, tenant.id), eq(tenantCharges.buildingId, tenant.buildingId))).limit(1))[0];
    if (!charge) throw new Error("Tenant charge not found for this account.");
    await db.update(tenantCharges).set({ receiptUrl: input.receiptUrl, paymentMethod: input.paymentMethod, receiptReviewStatus: "pending", receiptReviewedAt: null, receiptReviewedBy: null, receiptReviewNote: null }).where(eq(tenantCharges.id, charge.id));
    await db.insert(reminders).values({ buildingId: tenant.buildingId, tenantId: tenant.id, rentPaymentId: null, title: `Tenant payment receipt submitted \xB7 ${charge.title}`, dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), createdBy: input.userId });
    return { success: true, label: charge.title };
  }
  const allocation = (await db.select({ roomId: roomAllocations.roomId }).from(roomAllocations).where(and(eq(roomAllocations.tenantId, tenant.id), eq(roomAllocations.status, "active"))).limit(1))[0];
  if (!allocation) throw new Error("An active room allocation is required to submit an electricity receipt.");
  const bill = (await db.select({ id: electricityBills.id, billingMonth: electricityBills.billingMonth }).from(electricityBills).where(and(eq(electricityBills.id, input.billId), eq(electricityBills.roomId, allocation.roomId), eq(electricityBills.buildingId, tenant.buildingId))).limit(1))[0];
  if (!bill) throw new Error("Electricity record not found for this tenant.");
  await db.update(electricityBills).set({ receiptUrl: input.receiptUrl, paymentMethod: input.paymentMethod, receiptReviewStatus: "pending", receiptReviewedAt: null, receiptReviewedBy: null, receiptReviewNote: null }).where(eq(electricityBills.id, bill.id));
  await db.insert(reminders).values({ buildingId: tenant.buildingId, tenantId: tenant.id, rentPaymentId: null, title: `Tenant payment receipt submitted \xB7 Electricity ${bill.billingMonth}`, dueDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), createdBy: input.userId });
  return { success: true, label: `Electricity ${bill.billingMonth}` };
}
async function reviewTenantPaymentReceipt(input) {
  const db = await requireDb();
  const set = { receiptReviewStatus: input.status, receiptReviewedAt: /* @__PURE__ */ new Date(), receiptReviewedBy: input.reviewedBy, receiptReviewNote: input.reviewNote };
  let result;
  if (input.type === "rent") result = await db.update(rentPayments).set(set).where(and(eq(rentPayments.id, input.billId), eq(rentPayments.buildingId, input.buildingId), eq(rentPayments.updatedAt, input.expectedUpdatedAt))).returning({ id: rentPayments.id });
  else if (input.type === "electricity") result = await db.update(electricityBills).set(set).where(and(eq(electricityBills.id, input.billId), eq(electricityBills.buildingId, input.buildingId), eq(electricityBills.updatedAt, input.expectedUpdatedAt))).returning({ id: electricityBills.id });
  else result = await db.update(tenantCharges).set(set).where(and(eq(tenantCharges.id, input.billId), eq(tenantCharges.buildingId, input.buildingId), eq(tenantCharges.updatedAt, input.expectedUpdatedAt))).returning({ id: tenantCharges.id });
  if (result.length !== 1) throw new Error("This receipt changed on another device or is outside the selected building. Review the latest record before deciding.");
  return { status: input.status };
}
async function addStaffAssignment(input) {
  const db = await requireDb();
  await db.insert(staffAssignments).values(input).onConflictDoUpdate({ target: [staffAssignments.buildingId, staffAssignments.userId], set: { userId: input.userId } });
}
var cachedDb, cachedPostgresPool, embeddedInitPromise, usingEmbeddedFallback, cachedPasswordHashes, forceInMemoryEmbedded, dbConnectPromise, DELETE_UNDO_WINDOW_MS;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_schema();
    init_domain();
    init_exportFilters();
    init_env();
    cachedDb = null;
    cachedPostgresPool = null;
    embeddedInitPromise = null;
    usingEmbeddedFallback = false;
    cachedPasswordHashes = /* @__PURE__ */ new Map();
    forceInMemoryEmbedded = false;
    dbConnectPromise = null;
    DELETE_UNDO_WINDOW_MS = 10 * 60 * 1e3;
  }
});

// shared/_core/errors.ts
var HttpError, ForbiddenError;
var init_errors = __esm({
  "shared/_core/errors.ts"() {
    "use strict";
    HttpError = class extends Error {
      constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = "HttpError";
      }
    };
    ForbiddenError = (msg) => new HttpError(403, msg);
  }
});

// server/_core/sdk.ts
var sdk_exports = {};
__export(sdk_exports, {
  sdk: () => sdk
});
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT as SignJWT2, jwtVerify as jwtVerify2 } from "jose";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "admin",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var isNonEmptyString2, GET_USER_INFO_WITH_JWT_PATH, createScheduledAuthHttpClient, SDKServer, CRON_OPEN_ID_PREFIX, sdk;
var init_sdk = __esm({
  "server/_core/sdk.ts"() {
    "use strict";
    init_const();
    init_errors();
    init_db();
    init_env();
    isNonEmptyString2 = (value) => typeof value === "string" && value.length > 0;
    GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
    createScheduledAuthHttpClient = () => axios.create({
      baseURL: ENV.scheduledAuthServerUrl,
      timeout: AXIOS_TIMEOUT_MS
    });
    SDKServer = class {
      client;
      constructor(client2 = createScheduledAuthHttpClient()) {
        this.client = client2;
      }
      deriveLoginMethod(platforms, fallback) {
        if (fallback && fallback.length > 0) return fallback;
        if (!Array.isArray(platforms) || platforms.length === 0) return null;
        const set = new Set(
          platforms.filter((p) => typeof p === "string")
        );
        if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
        if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
        if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
        if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
          return "microsoft";
        if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
        const first = Array.from(set)[0];
        return first ? first.toLowerCase() : null;
      }
      parseCookies(cookieHeader) {
        if (!cookieHeader) {
          return /* @__PURE__ */ new Map();
        }
        const parsed = parseCookieHeader(cookieHeader);
        return new Map(Object.entries(parsed));
      }
      getSessionSecret() {
        const secret2 = ENV.cookieSecret;
        return new TextEncoder().encode(secret2);
      }
      /**
       * Create a session token for a Manus user openId
       * @example
       * const sessionToken = await sdk.createSessionToken(userInfo.openId);
       */
      async createSessionToken(openId, options = {}) {
        return this.signSession(
          {
            openId,
            appId: ENV.appId,
            name: options.name || ""
          },
          options
        );
      }
      async signSession(payload, options = {}) {
        const issuedAt = Date.now();
        const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
        const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
        const secretKey = this.getSessionSecret();
        return new SignJWT2({
          openId: payload.openId,
          appId: payload.appId,
          name: payload.name
        }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
      }
      async verifySession(cookieValue) {
        if (!cookieValue) {
          console.warn("[Auth] Missing session cookie");
          return null;
        }
        try {
          const secretKey = this.getSessionSecret();
          const { payload } = await jwtVerify2(cookieValue, secretKey, {
            algorithms: ["HS256"]
          });
          const { openId, appId, name } = payload;
          if (!isNonEmptyString2(openId) || !isNonEmptyString2(appId) || !isNonEmptyString2(name)) {
            console.warn("[Auth] Session payload missing required fields");
            return null;
          }
          return {
            openId,
            appId,
            name
          };
        } catch (error) {
          console.warn("[Auth] Session verification failed", String(error));
          return null;
        }
      }
      async getUserInfoWithJwt(jwtToken) {
        const payload = {
          jwtToken,
          projectId: ENV.appId
        };
        const { data } = await this.client.post(
          GET_USER_INFO_WITH_JWT_PATH,
          payload
        );
        const loginMethod = this.deriveLoginMethod(
          data?.platforms,
          data?.platform ?? data.platform ?? null
        );
        return {
          ...data,
          platform: loginMethod,
          loginMethod
        };
      }
      async authenticateRequest(req) {
        const cookies = this.parseCookies(req.headers.cookie);
        let sessionToken = cookies.get(COOKIE_NAME);
        if (!sessionToken) {
          const authHeader = req.headers.authorization;
          if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
            sessionToken = authHeader.slice(7);
          }
        }
        const session = await this.verifySession(sessionToken);
        if (!session) {
          throw ForbiddenError("Invalid session cookie");
        }
        if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
          const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
          const taskUid = userInfo.taskUid ?? null;
          if (!taskUid) {
            throw ForbiddenError("Cron session missing task_uid");
          }
          return buildCronUser(userInfo);
        }
        const sessionUserId = session.openId;
        const signedInAt = /* @__PURE__ */ new Date();
        let user = await getUserByOpenId(sessionUserId);
        if (!user) {
          throw ForbiddenError("User not found");
        }
        await upsertUser({
          openId: user.openId,
          lastSignedIn: signedInAt
        });
        return user;
      }
    };
    CRON_OPEN_ID_PREFIX = "cron_";
    sdk = new SDKServer();
  }
});

// server/_core/app.ts
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// server/_core/storageProxy.ts
init_env();

// server/supabaseStorage.ts
import { createClient } from "@supabase/supabase-js";
var IMAGE_BUCKET = "golden-prime-images";
var SUPABASE_KEY_PREFIX = "supabase/";
var client = null;
var localImages = /* @__PURE__ */ new Map();
function hasSupabaseStorageConfig() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY);
}
function getLocalGoldenPrimeImage(key) {
  return localImages.get(key) ?? null;
}
function getSupabaseStorageClient() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error("Supabase Storage is not configured on the server.");
  client = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
  return client;
}
async function uploadGoldenPrimeImage(input) {
  const objectKey = `pg/${input.userId}/${input.purpose}/${input.purpose}-${Date.now()}-${crypto.randomUUID()}.${input.extension}`;
  const key = `${SUPABASE_KEY_PREFIX}${objectKey}`;
  if (!hasSupabaseStorageConfig()) {
    localImages.set(key, { bytes: Buffer.from(input.bytes), mimeType: input.mimeType });
    return { key, url: `/manus-storage/${key}` };
  }
  const { error } = await getSupabaseStorageClient().storage.from(IMAGE_BUCKET).upload(objectKey, input.bytes, { contentType: input.mimeType, upsert: false });
  if (error) {
    localImages.set(key, { bytes: Buffer.from(input.bytes), mimeType: input.mimeType });
    return { key, url: `/manus-storage/${key}` };
  }
  return { key, url: `/manus-storage/${key}` };
}
function isMissingStorageObject(error) {
  const message = error?.message?.toLowerCase() ?? "";
  return error?.statusCode === 404 || /not found|does not exist|no such object/.test(message);
}
async function createGoldenPrimeImageSignedUrl(key) {
  if (!key.startsWith(SUPABASE_KEY_PREFIX)) return null;
  const objectKey = key.slice(SUPABASE_KEY_PREFIX.length);
  if (!objectKey) throw new Error("Supabase image key is invalid.");
  if (!hasSupabaseStorageConfig()) {
    if (!localImages.has(key)) return null;
    return `https://local.supabase.co/storage/v1/object/sign/${IMAGE_BUCKET}/${objectKey}?token=local`;
  }
  const { data, error } = await getSupabaseStorageClient().storage.from(IMAGE_BUCKET).createSignedUrl(objectKey, 60);
  if (error && isMissingStorageObject(error)) return null;
  if (error || !data?.signedUrl) {
    if (localImages.has(key)) {
      return `${process.env.SUPABASE_URL ?? "https://local.supabase.co"}/storage/v1/object/sign/${IMAGE_BUCKET}/${objectKey}?token=local`;
    }
    throw new Error(`Supabase image access failed: ${error?.message ?? "signed URL was empty"}`);
  }
  return data.signedUrl;
}

// server/_core/storageProxy.ts
function registerStorageProxy(app) {
  app.get(["/manus-storage/*", "/api/storage/*"], async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (key.startsWith("supabase/")) {
      const localImage = getLocalGoldenPrimeImage(key);
      if (localImage) {
        res.set("Content-Type", localImage.mimeType);
        res.set("Cache-Control", "private, max-age=60");
        res.status(200).send(localImage.bytes);
        return;
      }
      try {
        const signedUrl = await createGoldenPrimeImageSignedUrl(key);
        if (!signedUrl) {
          res.status(404).send("Image not found");
          return;
        }
        res.set("Cache-Control", "private, max-age=60");
        res.redirect(307, signedUrl);
      } catch (error) {
        console.error("[StorageProxy] Supabase image access failed:", error);
        res.status(502).send("Image storage error");
      }
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        if (forgeResp.status === 404) {
          res.status(404).send("Storage object not found");
          return;
        }
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/_core/systemRouter.ts
import { z } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
init_const();
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);
var delegateAdminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin" && ctx.user.role !== "manager") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({ ctx: { ...ctx, user: ctx.user } });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z.object({
      timestamp: z.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z.object({
      title: z.string().min(1, "title is required"),
      content: z.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/auth.ts
init_db();
import { randomBytes as randomBytes2, scryptSync as scryptSync2, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { parse as parseCookie } from "cookie";
var PHONE_SESSION_COOKIE = "golden_prime_session";
var PHONE_SESSION_HEADER = "x-session-token";
var SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
var secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "development-only-secret");
function normalizePhone(phone) {
  return phone.replace(/\D/g, "").slice(-10);
}
function toSafeUser(user) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}
function hashPassword(password, salt = randomBytes2(16).toString("hex")) {
  const derived = scryptSync2(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}
function verifyPassword(password, storedHash) {
  const [salt, expected] = storedHash.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync2(password, salt, 64).toString("hex");
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual, "hex"), Buffer.from(expected, "hex"));
}
function isSecureRequest(req) {
  return req.protocol === "https" || req.headers["x-forwarded-proto"]?.toString().split(",").some((value) => value.trim() === "https");
}
async function createPhoneSession(user) {
  return new SignJWT({ auth: "phone-password" }).setProtectedHeader({ alg: "HS256" }).setSubject(String(user.id)).setIssuedAt().setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`).sign(secret);
}
function setPhoneSessionCookie(res, req, token) {
  res.setHeader?.(PHONE_SESSION_HEADER, token);
  res.setHeader?.("Access-Control-Expose-Headers", PHONE_SESSION_HEADER);
  res.cookie(PHONE_SESSION_COOKIE, token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: isSecureRequest(req),
    maxAge: SESSION_MAX_AGE_SECONDS * 1e3
  });
}
function clearPhoneSessionCookie(res, req) {
  res.setHeader?.(PHONE_SESSION_HEADER, "");
  res.setHeader?.("Access-Control-Expose-Headers", PHONE_SESSION_HEADER);
  res.clearCookie(PHONE_SESSION_COOKIE, { httpOnly: true, path: "/", sameSite: "lax", secure: isSecureRequest(req) });
}
function isTransientDatabaseError(error) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return /too many clients|connection terminated|connection timeout|connect e|timeout exceeded|server closed the connection/.test(message);
}
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
async function resolveUserFromToken(token) {
  if (!token) return null;
  let userId;
  try {
    const { payload } = await jwtVerify(token, secret);
    userId = Number(payload.sub);
    if (!Number.isSafeInteger(userId) || userId <= 0) return null;
  } catch {
    return null;
  }
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await getUserById(userId) ?? null;
    } catch (error) {
      if (!isTransientDatabaseError(error) || attempt === 2) return null;
      await wait(75 * (attempt + 1));
    }
  }
  return null;
}
async function getPhoneSessionUser(req) {
  const cookieToken = parseCookie(req.headers.cookie ?? "")[PHONE_SESSION_COOKIE] ?? "";
  const headerValue = req.headers?.[PHONE_SESSION_HEADER];
  const headerToken = typeof headerValue === "string" ? headerValue.trim() : Array.isArray(headerValue) ? headerValue[0]?.trim() ?? "" : "";
  const candidates = Array.from(new Set([headerToken, cookieToken].filter(Boolean)));
  for (const token of candidates) {
    const user = await resolveUserFromToken(token);
    if (user) return user;
  }
  return null;
}
async function authenticatePhonePassword(phoneOrUsername, password) {
  const trimmed = phoneOrUsername.trim();
  if (!trimmed || !password) return null;
  const normalizedPhone = normalizePhone(trimmed);
  const user = normalizedPhone.length === 10 ? await getUserByPhone(normalizedPhone) : await getUserByPhoneOrUsername(trimmed);
  if (!user?.passwordHash) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return user;
}

// server/routers/pg.ts
init_schema();
import { TRPCError as TRPCError4 } from "@trpc/server";
import { and as and2, eq as eq3 } from "drizzle-orm";
import { z as z2 } from "zod";

// server/access.ts
init_db();
import { TRPCError as TRPCError3 } from "@trpc/server";

// server/permissions.ts
var permissions = {
  admin: /* @__PURE__ */ new Set(),
  manager: /* @__PURE__ */ new Set([
    "read",
    "manageBuildings",
    "manageRooms",
    "manageTenants",
    "manageRent",
    "manageElectricity",
    "manageExpenses",
    "manageReminders",
    "manageStaff",
    "export"
  ]),
  helper: /* @__PURE__ */ new Set(["read", "manageRooms", "manageElectricity", "manageExpenses"]),
  cook: /* @__PURE__ */ new Set(["read", "manageExpenses"]),
  tenant: /* @__PURE__ */ new Set([])
};
function hasRolePermission(role, action) {
  return permissions[role].has(action);
}
function canCreateExpense(role, category) {
  return role !== "cook" || category === "groceries" || category === "tiffin";
}

// server/access.ts
async function requireBuildingAccess(user, buildingId, action) {
  const role = user.role;
  if (!hasRolePermission(role, action)) {
    throw new TRPCError3({ code: "FORBIDDEN", message: "Your role cannot perform this action." });
  }
  const building = await getBuildingForUser(buildingId, user.id, role);
  if (!building) {
    throw new TRPCError3({ code: "FORBIDDEN", message: "You do not have access to this building." });
  }
  return building;
}

// server/routers/pg.ts
init_db();

// server/imageUpload.ts
var ALLOWED_IMAGE_TYPES = /* @__PURE__ */ new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"]
]);
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
function decodeImageDataUrl(dataUrl) {
  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!match) throw new Error("Upload a JPG, PNG, or WEBP image.");
  const mimeType = match[1];
  const bytes = Buffer.from(match[2], "base64");
  if (bytes.length === 0 || bytes.length > MAX_IMAGE_BYTES) throw new Error("Image must be between 1 byte and 5 MB.");
  const extension = ALLOWED_IMAGE_TYPES.get(mimeType);
  if (!extension) throw new Error("Unsupported image format.");
  return { bytes, mimeType, extension };
}
async function uploadImageDataUrl(input) {
  const image = decodeImageDataUrl(input.dataUrl);
  return uploadGoldenPrimeImage({ ...image, purpose: input.purpose, userId: input.userId });
}

// server/routers/pg.ts
init_domain();
init_exportFilters();

// server/exportWorkbook.ts
init_schema();
init_db();
import { eq as eq2, inArray as inArray2 } from "drizzle-orm";
var workbookExportDatasets = ["building", "rooms", "tenants", "allocations", "rent", "electricity", "tenantCharges", "expenses", "operatingCosts", "services", "reminders", "transfers", "ownerSettlements", "buildingElectricity", "managerAdjustments", "accounts", "notifications", "auditLogs", "exportHistory"];
var toDate = (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value ?? null;
var toDateTime = (value) => value ? value.toISOString() : null;
var rupees = (paise) => Math.round(paise ?? 0) / 100;
var remaining = (expected, paid) => Math.max(expected - paid, 0);
function matchesDate(value, input) {
  if (!input.dateFrom && !input.dateTo) return true;
  const date2 = toDate(value);
  if (!date2) return false;
  return (!input.dateFrom || date2 >= input.dateFrom) && (!input.dateTo || date2 <= input.dateTo);
}
function matchesFinancialRecord(input, value, status, expected, paid) {
  if (input.mode === "complete") return true;
  if (!matchesDate(value, input)) return false;
  if (input.paymentStatus !== "all" && status !== input.paymentStatus) return false;
  return !input.outstandingOnly || remaining(expected, paid) > 0;
}
function sanitizeSheetName(name) {
  return name.replace(/[\\/?*\[\]:]/g, " ").slice(0, 31) || "Export";
}
function selectWorkbookFields(dataset, rows, input) {
  if (input.mode !== "selected" || !input.fieldSelections || !(dataset in input.fieldSelections)) return rows;
  const selected = new Set(input.fieldSelections[dataset]);
  return rows.map((row) => Object.fromEntries(Object.entries(row).filter(([field]) => selected.has(field))));
}
async function getWorkbookExportData(input) {
  const db = await getDb();
  if (!db) throw new Error("Database connection is unavailable.");
  const building = (await db.select({
    id: buildings.id,
    name: buildings.name,
    address: buildings.address,
    city: buildings.city,
    landmark: buildings.landmark,
    contactPhone: buildings.contactPhone,
    electricityRatePaise: buildings.electricityRatePaise,
    rentDueDay: buildings.rentDueDay,
    currency: buildings.currency,
    ownerMonthlyCutPaise: buildings.ownerMonthlyCutPaise,
    ownerId: buildings.ownerId,
    createdAt: buildings.createdAt,
    updatedAt: buildings.updatedAt
  }).from(buildings).where(eq2(buildings.id, input.buildingId)).limit(1))[0];
  if (!building) throw new Error("Selected building was not found.");
  const snapshot = await getBuildingSnapshot(input.buildingId);
  const [ownerRows, utilityRows, creditAdjustmentRows, staffRows, auditRows, historyRows] = await Promise.all([
    db.select().from(ownerSettlements).where(eq2(ownerSettlements.buildingId, input.buildingId)),
    db.select().from(governmentElectricityPayments).where(eq2(governmentElectricityPayments.buildingId, input.buildingId)),
    db.select().from(managerCreditAdjustments).where(eq2(managerCreditAdjustments.buildingId, input.buildingId)),
    db.select().from(staffAssignments).where(eq2(staffAssignments.buildingId, input.buildingId)),
    db.select().from(changeAuditLogs).where(eq2(changeAuditLogs.buildingId, input.buildingId)),
    db.select().from(exportHistory).where(eq2(exportHistory.buildingId, input.buildingId))
  ]);
  const accountIds = Array.from(/* @__PURE__ */ new Set([building.ownerId, ...staffRows.map((row) => row.userId), ...snapshot.tenants.map((tenant) => tenant.userId).filter((id) => id !== null)]));
  const accountRows = accountIds.length === 0 ? [] : await db.select({
    accountId: users.id,
    name: users.name,
    loginPhone: users.phone,
    role: users.role,
    loginMethod: users.loginMethod,
    lastSignedIn: users.lastSignedIn,
    createdAt: users.createdAt
  }).from(users).where(inArray2(users.id, accountIds));
  const roomById = new Map(snapshot.rooms.map((room) => [room.id, room]));
  const floorById = new Map(snapshot.floors.map((floor) => [floor.id, floor]));
  const tenantById = new Map(snapshot.tenants.map((tenant) => [tenant.id, tenant]));
  const allocationById = new Map(snapshot.allocations.map((allocation) => [allocation.id, allocation]));
  const include = (dataset) => input.mode === "complete" || input.datasets.includes(dataset);
  const sheets = [];
  const append = (name, rows) => {
    if (include(name)) sheets.push({ name: sanitizeSheetName(name), rows: selectWorkbookFields(name, rows, input) });
  };
  sheets.push({ name: "Export summary", rows: [
    { Field: "Building", Value: building.name },
    { Field: "Export mode", Value: input.mode === "complete" ? "Complete operational export" : "Selected data export" },
    { Field: "Generated at UTC", Value: (/* @__PURE__ */ new Date()).toISOString() },
    { Field: "Date from", Value: input.dateFrom ?? "All dates" },
    { Field: "Date to", Value: input.dateTo ?? "All dates" },
    { Field: "Payment status", Value: input.paymentStatus },
    { Field: "Outstanding balances only", Value: input.outstandingOnly },
    { Field: "Security exclusion", Value: "Passwords, password hashes, database credentials, session data, and secrets are never exported." }
  ] });
  append("building", [{
    Building: building.name,
    Address: building.address,
    City: building.city,
    Landmark: building.landmark,
    "Manager contact phone": building.contactPhone,
    "Electricity rate (\u20B9/unit)": rupees(building.electricityRatePaise),
    "Rent due day": building.rentDueDay,
    Currency: building.currency,
    "Fixed Owner cut (\u20B9)": rupees(building.ownerMonthlyCutPaise),
    "Created at": toDateTime(building.createdAt),
    "Updated at": toDateTime(building.updatedAt)
  }]);
  append("rooms", snapshot.rooms.map((room) => ({
    "Room number": room.number,
    Floor: floorById.get(room.floorId ?? 0)?.name ?? null,
    Capacity: room.capacity,
    "Room type": room.roomType,
    "Billing mode": room.billingMode,
    "Air conditioning": room.airConditioning,
    Balcony: room.balcony,
    "Default rent (\u20B9)": rupees(room.defaultRentPaise),
    "Created at": toDateTime(room.createdAt),
    "Updated at": toDateTime(room.updatedAt)
  })));
  append("tenants", snapshot.tenants.filter((tenant) => input.mode === "complete" || matchesDate(tenant.createdAt, input)).map((tenant) => {
    const allocation = snapshot.allocations.find((item) => item.tenantId === tenant.id && item.status === "active");
    return {
      "Tenant name": tenant.fullName,
      Phone: tenant.phone,
      Email: tenant.email,
      Status: tenant.status,
      "Active room": allocation ? roomById.get(allocation.roomId)?.number ?? null : null,
      "Agreed rent (\u20B9)": allocation ? rupees(allocation.monthlyRentPaise) : null,
      "Move-in date": allocation?.moveInDate ?? null,
      "Created at": toDateTime(tenant.createdAt),
      "Updated at": toDateTime(tenant.updatedAt)
    };
  }));
  append("allocations", snapshot.allocations.filter((allocation) => input.mode === "complete" || matchesDate(allocation.moveInDate, input)).map((allocation) => ({
    "Tenant name": tenantById.get(allocation.tenantId)?.fullName ?? "Tenant",
    "Room number": roomById.get(allocation.roomId)?.number ?? "\u2014",
    "Move-in date": allocation.moveInDate,
    "Move-out date": allocation.moveOutDate,
    Bed: allocation.bedLabel,
    "Primary payer": allocation.isPrimaryPayer,
    "Monthly rent (\u20B9)": rupees(allocation.monthlyRentPaise),
    "Deposit (\u20B9)": rupees(allocation.depositPaise),
    Status: allocation.status
  })));
  append("rent", snapshot.rents.filter((rent) => matchesFinancialRecord(input, rent.dueDate, rent.status, rent.expectedAmountPaise, rent.paidAmountPaise)).map((rent) => ({
    "Tenant name": tenantById.get(rent.tenantId)?.fullName ?? "Tenant",
    "Room number": roomById.get(allocationById.get(rent.allocationId)?.roomId ?? 0)?.number ?? "\u2014",
    Month: rent.rentMonth,
    "Due date": rent.dueDate,
    "Bill amount (\u20B9)": rupees(rent.expectedAmountPaise),
    "Paid amount (\u20B9)": rupees(rent.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(rent.expectedAmountPaise, rent.paidAmountPaise)),
    Status: rent.status,
    "Paid on": rent.paidOn,
    "Payment method": rent.paymentMethod,
    Notes: rent.notes
  })));
  append("electricity", snapshot.electricity.filter((bill) => matchesFinancialRecord(input, `${bill.billingMonth}-01`, bill.status, bill.billAmountPaise, bill.paidAmountPaise)).map((bill) => ({
    "Room number": roomById.get(bill.roomId)?.number ?? "\u2014",
    Month: bill.billingMonth,
    "Previous reading": bill.previousReading,
    "Current reading": bill.currentReading,
    Units: bill.unitsConsumed,
    "Rate (\u20B9/unit)": rupees(bill.ratePerUnitPaise),
    "Bill amount (\u20B9)": rupees(bill.billAmountPaise),
    "Paid amount (\u20B9)": rupees(bill.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(bill.billAmountPaise, bill.paidAmountPaise)),
    Status: bill.status,
    "Due date": bill.dueDate,
    "Paid on": bill.paidOn,
    "Payment method": bill.paymentMethod
  })));
  append("tenantCharges", snapshot.tenantCharges.filter((charge) => matchesFinancialRecord(input, charge.dueDate ?? (charge.billingMonth ? `${charge.billingMonth}-01` : null), charge.status, charge.expectedAmountPaise, charge.paidAmountPaise)).map((charge) => ({
    "Tenant name": tenantById.get(charge.tenantId)?.fullName ?? "Tenant",
    "Room number": roomById.get(charge.roomId ?? 0)?.number ?? null,
    Source: charge.sourceType,
    Title: charge.title,
    Month: charge.billingMonth,
    "Bill amount (\u20B9)": rupees(charge.expectedAmountPaise),
    "Paid amount (\u20B9)": rupees(charge.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(charge.expectedAmountPaise, charge.paidAmountPaise)),
    Status: charge.status,
    "Due date": charge.dueDate,
    "Paid on": charge.paidOn,
    "Payment method": charge.paymentMethod
  })));
  append("expenses", snapshot.expenses.filter((expense) => input.mode === "complete" || matchesDate(expense.expenseDate, input)).map((expense) => ({
    Date: expense.expenseDate,
    Category: expense.category,
    "Liability mode": expense.liabilityMode,
    "Room number": roomById.get(expense.roomId ?? 0)?.number ?? null,
    "Tenant name": tenantById.get(expense.tenantId ?? 0)?.fullName ?? null,
    "Amount (\u20B9)": rupees(expense.amountPaise),
    Notes: expense.notes
  })));
  append("operatingCosts", snapshot.operatingCosts.filter((cost) => input.mode === "complete" || matchesDate(cost.costDate, input)).map((cost) => ({
    Date: cost.costDate,
    Type: cost.kind,
    Category: cost.category,
    Title: cost.title,
    Payee: cost.payeeName,
    Vendor: cost.vendorName,
    "Liability mode": cost.liabilityMode,
    "Room number": roomById.get(cost.roomId ?? 0)?.number ?? null,
    "Tenant name": tenantById.get(cost.tenantId ?? 0)?.fullName ?? null,
    "Amount (\u20B9)": rupees(cost.amountPaise),
    "Paid amount (\u20B9)": rupees(cost.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(cost.amountPaise, cost.paidAmountPaise)),
    "Payment status": cost.status,
    "Work status": cost.workStatus,
    "Due date": cost.dueDate
  })));
  append("services", [
    ...snapshot.serviceCharges.map((charge) => ({ Type: "Building service", Name: charge.name, "Billing cycle": charge.billingCycle, "Amount (\u20B9)": rupees(charge.amountPaise), "Due day": charge.dueDay, Status: charge.active, "Tenant name": null, Notes: charge.notes })),
    ...snapshot.tenantServices.map((service) => ({ Type: "Tenant service", Name: service.serviceType, "Billing cycle": "monthly", "Amount (\u20B9)": rupees(service.monthlyChargePaise), "Due day": null, Status: service.active, "Tenant name": tenantById.get(service.tenantId)?.fullName ?? "Tenant", Notes: service.notes }))
  ]);
  append("reminders", snapshot.reminders.filter((reminder) => input.mode === "complete" || matchesDate(reminder.dueDate, input)).map((reminder) => ({
    Title: reminder.title,
    "Tenant name": tenantById.get(reminder.tenantId ?? 0)?.fullName ?? null,
    "Due date": reminder.dueDate,
    Status: reminder.status,
    "Delivery requested at": toDateTime(reminder.deliveryRequestedAt),
    "Notified at": toDateTime(reminder.notifiedAt)
  })));
  append("transfers", snapshot.tenantTransfers.filter((transfer) => input.mode === "complete" || matchesDate(transfer.effectiveDate, input)).map((transfer) => ({
    "Tenant name": tenantById.get(transfer.tenantId)?.fullName ?? "Tenant",
    "Source room": roomById.get(transfer.sourceRoomId)?.number ?? "\u2014",
    "Destination room": roomById.get(transfer.destinationRoomId)?.number ?? "\u2014",
    "Effective date": transfer.effectiveDate,
    "Source rent (\u20B9)": rupees(transfer.sourceMonthlyRentPaise),
    "Destination rent (\u20B9)": rupees(transfer.destinationMonthlyRentPaise),
    "Proration applied": transfer.prorationApplied,
    "Source prorated amount (\u20B9)": transfer.sourceProratedAmountPaise === null ? null : rupees(transfer.sourceProratedAmountPaise),
    "Destination prorated amount (\u20B9)": transfer.destinationProratedAmountPaise === null ? null : rupees(transfer.destinationProratedAmountPaise)
  })));
  append("ownerSettlements", ownerRows.filter((row) => matchesFinancialRecord(input, `${row.billingMonth}-01`, row.status, row.expectedAmountPaise, row.paidAmountPaise)).map((row) => ({
    Month: row.billingMonth,
    "Expected amount (\u20B9)": rupees(row.expectedAmountPaise),
    "Paid amount (\u20B9)": rupees(row.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(row.expectedAmountPaise, row.paidAmountPaise)),
    Status: row.status,
    "Due date": row.dueDate,
    "Paid on": row.paidOn,
    "Payment method": row.paymentMethod,
    "Owner confirmed at": toDateTime(row.ownerConfirmedAt)
  })));
  append("buildingElectricity", utilityRows.filter((row) => matchesFinancialRecord(input, `${row.billingMonth}-01`, row.status, row.expectedAmountPaise, row.paidAmountPaise)).map((row) => ({
    Month: row.billingMonth,
    "Expected amount (\u20B9)": rupees(row.expectedAmountPaise),
    "Paid amount (\u20B9)": rupees(row.paidAmountPaise),
    "Balance due (\u20B9)": rupees(remaining(row.expectedAmountPaise, row.paidAmountPaise)),
    Status: row.status,
    "Due date": row.dueDate,
    "Paid on": row.paidOn,
    "Payment method": row.paymentMethod
  })));
  append("accounts", accountRows.map((account) => ({
    Name: account.name,
    "Login phone": account.loginPhone,
    Role: account.role,
    "Sign-in method": account.loginMethod,
    "Last signed in": toDateTime(account.lastSignedIn),
    "Account created": toDateTime(account.createdAt),
    "Password and secret data": "Not exported"
  })));
  append("notifications", snapshot.managerNotifications.filter((notification) => input.mode === "complete" || matchesDate(notification.dueDate ?? notification.createdAt, input)).map((notification) => ({
    Type: notification.kind,
    Title: notification.title,
    Detail: notification.body,
    "Due date": notification.dueDate,
    Status: notification.status,
    "Created at": toDateTime(notification.createdAt),
    "Read at": toDateTime(notification.readAt)
  })));
  append("managerAdjustments", creditAdjustmentRows.filter((row) => input.mode === "complete" || matchesDate(`${row.billingMonth}-01`, input)).map((row) => ({ Month: row.billingMonth, "Adjustment (\u20B9)": rupees(row.amountPaise), Notes: row.notes, "Created at": toDateTime(row.createdAt) })));
  append("auditLogs", auditRows.filter((row) => input.mode === "complete" || matchesDate(row.createdAt, input)).map((row) => ({ "Logged at": toDateTime(row.createdAt), "Entity type": row.entityType, "Entity ID": row.entityId, Action: row.action, "Snapshot retained": Boolean(row.snapshotJson), "Password and secret data": "Not exported" })));
  append("exportHistory", historyRows.filter((row) => input.mode === "complete" || matchesDate(row.createdAt, input)).map((row) => ({ "Requested at": toDateTime(row.createdAt), "Export type": row.exportType, "Date from": row.dateFrom, "Date to": row.dateTo, "Security scope": "Building-scoped; no secrets" })));
  return { buildingName: building.name, mode: input.mode, generatedAt: (/* @__PURE__ */ new Date()).toISOString(), sheets };
}
async function getWorkbookExportPreview(input) {
  const workbook = await getWorkbookExportData(input);
  return {
    buildingName: workbook.buildingName,
    sheets: workbook.sheets.filter((sheet) => sheet.name !== "Export summary").map((sheet) => ({
      dataset: sheet.name,
      fields: Array.from(new Set(sheet.rows.flatMap((row) => Object.keys(row)))),
      sampleRows: sheet.rows.slice(0, 3),
      rowCount: sheet.rows.length
    }))
  };
}
async function getCsvExportData(input) {
  const workbook = await getWorkbookExportData({ buildingId: input.buildingId, mode: "selected", datasets: [input.dataset], dateFrom: input.dateFrom, dateTo: input.dateTo, paymentStatus: "all", outstandingOnly: false });
  const sheet = workbook.sheets.find((item) => item.name === input.dataset);
  const rows = sheet?.rows ?? [];
  return { buildingName: workbook.buildingName, dataset: input.dataset, fields: Array.from(new Set(rows.flatMap((row) => Object.keys(row)))), rows };
}

// server/routers/pg.ts
var dateString = z2.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD dates.");
var monthString = z2.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM billing months.");
var storedImageUrl = z2.union([
  z2.string().url().max(1e3),
  z2.string().regex(/^\/manus-storage\/[A-Za-z0-9][A-Za-z0-9._/-]*$/, "Use a valid uploaded image URL.").max(1e3)
]);
var optionalStoredImageUrl = storedImageUrl.optional().or(z2.literal(""));
var nullableStoredImageUrl = storedImageUrl.nullable().or(z2.literal(""));
var optionalNullableStoredImageUrl = storedImageUrl.optional().nullable().or(z2.literal(""));
var optionalDateString = dateString.optional();
var operatingCostKind2 = z2.enum(["staff", "supplies", "maintenance"]);
var operatingCostCategory2 = z2.enum(["helper_salary", "cook_salary", "staff_advance", "staff_settlement", "groceries", "utensils", "gas", "cleaning", "water", "repair_electrician", "repair_plumber", "rent_equipment", "other"]);
var liabilityMode = z2.enum(["building", "room_shared", "tenant_assigned"]);
var roomType2 = z2.enum(["single", "double", "triple", "four", "individual", "coliving"]);
var roomBillingMode2 = z2.enum(["equal_split", "manager_set", "primary_payer"]);
var operatingCostInput = z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive().nullable().optional(), tenantId: z2.number().int().positive().nullable().optional(), liabilityMode: liabilityMode.default("building"), kind: operatingCostKind2, category: operatingCostCategory2, title: z2.string().trim().min(2).max(160), payeeName: z2.string().trim().max(120).optional(), vendorName: z2.string().trim().max(120).optional(), amountPaise: z2.number().int().positive(), paidAmountPaise: z2.number().int().min(0), workStatus: z2.enum(["open", "in_progress", "complete"]).default("open"), costDate: dateString, dueDate: optionalDateString, receiptUrl: optionalStoredImageUrl, notes: z2.string().trim().max(800).optional() });
var operatingCostCategories = { staff: ["helper_salary", "cook_salary", "staff_advance", "staff_settlement"], supplies: ["groceries", "utensils", "gas", "cleaning", "water", "other"], maintenance: ["repair_electrician", "repair_plumber", "rent_equipment", "other"] };
function assertOperatingCostInput(input) {
  if (input.paidAmountPaise > input.amountPaise) throw new TRPCError4({ code: "BAD_REQUEST", message: "Paid amount cannot be greater than the recorded cost." });
  if (!operatingCostCategories[input.kind].includes(input.category)) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose a category that belongs to the selected cost type." });
  if (input.liabilityMode === "room_shared" && !input.roomId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose an occupied room for a shared tenant cost." });
  if (input.liabilityMode === "tenant_assigned" && !input.tenantId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose the tenant responsible for this cost." });
}
async function assertRoomAndTenantBelongToBuilding(roomId, tenantId, buildingId) {
  const db = await getDb();
  if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
  const [room, tenant] = await Promise.all([
    db.select().from(rooms).where(and2(eq3(rooms.id, roomId), eq3(rooms.buildingId, buildingId))).limit(1),
    db.select().from(tenants).where(and2(eq3(tenants.id, tenantId), eq3(tenants.buildingId, buildingId))).limit(1)
  ]);
  if (!room[0] || !tenant[0]) {
    throw new TRPCError4({ code: "BAD_REQUEST", message: "Room and tenant must belong to the selected building." });
  }
}
function resolveRoomSettings(input) {
  const billingMode = input.billingMode ?? getDefaultBillingModeForRoomType(input.roomType);
  if (["single", "double", "triple", "four"].includes(input.roomType) && billingMode !== "equal_split") throw new TRPCError4({ code: "BAD_REQUEST", message: "Standard room types use equal shared-bill allocation." });
  if (input.roomType === "coliving" && billingMode !== "primary_payer") throw new TRPCError4({ code: "BAD_REQUEST", message: "Co-living rooms require a single primary payer until the Manager explicitly changes the allocation mode." });
  if (input.roomType === "individual" && billingMode === "primary_payer") throw new TRPCError4({ code: "BAD_REQUEST", message: "Individual rooms use Manager-set or equal allocation, not a Co-living primary payer." });
  return { billingMode, capacity: getRoomCapacityForType(input.roomType, input.capacity) };
}
var pgRouter = router({
  recovery: router({
    restore: protectedProcedure.input(z2.object({ auditId: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager who deleted the record can use immediate undo." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      try {
        return { success: true, ...await restoreDeletedEntry({ ...input, restoredBy: ctx.user.id }) };
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "The deletion could not be safely undone." });
      }
    })
  }),
  buildings: router({
    list: protectedProcedure.query(({ ctx }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Use the Owner summary for read-only building information." });
      return listBuildingsForUser(ctx.user);
    }),
    create: protectedProcedure.input(z2.object({ name: z2.string().trim().min(2).max(120), address: z2.string().trim().min(5), city: z2.string().trim().max(80).optional(), landmark: z2.string().trim().max(160).optional(), contactPhone: z2.string().trim().max(32).optional(), imageUrl: optionalStoredImageUrl, mapUrl: z2.string().url().max(1e3).optional().or(z2.literal("")), ownerName: z2.string().trim().min(2).max(120), ownerPhone: z2.string().trim().min(7).max(32), ownerPassword: z2.string().min(8).max(128).optional(), ownerMonthlyCutPaise: z2.number().int().min(0).default(0), electricityRatePaise: z2.number().int().min(0).max(1e5), rentDueDay: z2.number().int().min(1).max(28).default(5) })).mutation(async ({ ctx, input }) => {
      if (!hasRolePermission(ctx.user.role, "manageBuildings")) throw new TRPCError4({ code: "FORBIDDEN", message: "Building management access is required." });
      const ownerId = await createOrLinkBuildingOwner({ name: input.ownerName, phone: normalizePhone(input.ownerPhone), passwordHash: input.ownerPassword ? hashPassword(input.ownerPassword) : void 0 });
      const { ownerName: _ownerName, ownerPhone: _ownerPhone, ownerPassword: _ownerPassword, ...buildingInput } = input;
      const buildingId = await createBuilding({ ...buildingInput, ownerCutPercent: 0, ownerId });
      await addStaffAssignment({ buildingId, userId: ctx.user.id });
      return { buildingId };
    }),
    update: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), name: z2.string().trim().min(2).max(120), address: z2.string().trim().min(5), city: z2.string().trim().max(80).nullable(), landmark: z2.string().trim().max(160).nullable(), contactPhone: z2.string().trim().max(32).nullable(), imageUrl: nullableStoredImageUrl, mapUrl: z2.string().url().max(1e3).nullable().or(z2.literal("")), ownerMonthlyCutPaise: z2.number().int().min(0).default(0), paymentBankName: z2.string().trim().max(120).optional().nullable(), paymentAccountName: z2.string().trim().max(120).optional().nullable(), paymentAccountNumber: z2.string().trim().max(64).optional().nullable(), paymentIfsc: z2.string().trim().max(32).optional().nullable(), paymentUpiId: z2.string().trim().max(120).optional().nullable(), paymentQrUrl: optionalNullableStoredImageUrl, electricityRatePaise: z2.number().int().min(0).max(1e5), rentDueDay: z2.number().int().min(1).max(28).default(5) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.id, "manageBuildings");
      await updateBuilding({ ...input, ownerCutPercent: 0, imageUrl: input.imageUrl || null, mapUrl: input.mapUrl || null, paymentBankName: input.paymentBankName || null, paymentAccountName: input.paymentAccountName || null, paymentAccountNumber: input.paymentAccountNumber || null, paymentIfsc: input.paymentIfsc || null, paymentUpiId: input.paymentUpiId || null, paymentQrUrl: input.paymentQrUrl || null });
      return { success: true };
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.id, "manageBuildings");
      try {
        await deleteBuilding(input.id);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Building cannot be deleted." });
      }
      return { success: true };
    })
  }),
  uploads: router({
    image: protectedProcedure.input(z2.object({ dataUrl: z2.string().max(7e6), purpose: z2.enum(["building", "room", "meter", "receipt", "payment_qr"]) })).mutation(async ({ ctx, input }) => {
      const uploaded = await uploadImageDataUrl({ ...input, userId: ctx.user.id });
      return { url: uploaded.url };
    })
  }),
  account: router({
    updateOwnCredentials: protectedProcedure.input(z2.object({ phone: z2.string().trim().min(7).max(32), currentPassword: z2.string().min(8).max(128), newPassword: z2.string().min(8).max(128).optional() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only Owner and Manager accounts can update these credentials here." });
      const account = await getUserById(ctx.user.id);
      if (!account?.passwordHash || !verifyPassword(input.currentPassword, account.passwordHash)) throw new TRPCError4({ code: "UNAUTHORIZED", message: "Current password is incorrect." });
      const phone = normalizePhone(input.phone);
      if (phone.length !== 10) throw new TRPCError4({ code: "BAD_REQUEST", message: "Enter a valid 10-digit phone number." });
      try {
        await updateOwnCredentials({ userId: ctx.user.id, phone, passwordHash: input.newPassword ? hashPassword(input.newPassword) : null });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Account credentials could not be updated." });
      }
      return { success: true };
    }),
    recoveryAccounts: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can access building credential recovery." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      return listBuildingRecoveryAccounts(input.buildingId);
    }),
    resetBuildingAccountPassword: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), userId: z2.number().int().positive(), password: z2.string().min(8).max(128) })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can reset a linked account password." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await resetBuildingAccountCredentials({ buildingId: input.buildingId, userId: input.userId, passwordHash: hashPassword(input.password), createdBy: ctx.user.id });
      return { success: true };
    })
  }),
  dashboard: router({
    get: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), periodMode: z2.enum(["monthly", "yearly"]).default("monthly"), periodKey: z2.string().regex(/^\d{4}(?:-(0[1-9]|1[0-2]))?$/).optional() }).superRefine((input, context) => {
      if (input.periodKey && (input.periodMode === "monthly" && !/^\d{4}-(0[1-9]|1[0-2])$/.test(input.periodKey) || input.periodMode === "yearly" && !/^\d{4}$/.test(input.periodKey))) context.addIssue({ code: "custom", message: "Choose a valid reporting month or year.", path: ["periodKey"] });
    })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "The Owner dashboard is intentionally limited to the approved summary." });
      await requireBuildingAccess(ctx.user, input.buildingId, "read");
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      return getDashboardOverview(input.buildingId, accessibleBuildings.length, input.periodMode, input.periodKey);
    })
  }),
  owner: router({
    overview: protectedProcedure.input(z2.object({ periodKey: monthString.optional() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the building Owner can view the Owner summary." });
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      return getOwnerOverview({ buildingIds: accessibleBuildings.map((building) => building.id), periodMode: "monthly", periodKey: input.periodKey });
    }),
    confirmSettlement: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), settlementId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the building Owner can confirm a settlement payment." });
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      if (!accessibleBuildings.some((building) => building.id === input.buildingId)) throw new TRPCError4({ code: "FORBIDDEN", message: "This building is not in your Owner portfolio." });
      await confirmOwnerSettlement({ id: input.settlementId, buildingId: input.buildingId, ownerId: ctx.user.id });
      return { success: true };
    }),
    addManagerCreditAdjustment: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), billingMonth: monthString, amountPaise: z2.number().int().min(-1e8).max(1e8).refine((value) => value !== 0, "Enter a non-zero credit adjustment."), notes: z2.string().trim().min(3).max(800) })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the building Owner can adjust Manager credit." });
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      if (!accessibleBuildings.some((building) => building.id === input.buildingId)) throw new TRPCError4({ code: "FORBIDDEN", message: "This building is not in your Owner portfolio." });
      await createManagerCreditAdjustment({ ...input, createdBy: ctx.user.id });
      return { success: true };
    }),
    remindManager: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), title: z2.string().trim().min(3).max(180), dueDate: dateString })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the building Owner can send a Manager follow-up." });
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      if (!accessibleBuildings.some((building) => building.id === input.buildingId)) throw new TRPCError4({ code: "FORBIDDEN", message: "This building is not in your Owner portfolio." });
      await createReminder({ buildingId: input.buildingId, tenantId: null, rentPaymentId: null, title: `Owner follow-up \xB7 ${input.title}`, dueDate: input.dueDate, createdBy: ctx.user.id });
      return { success: true };
    })
  }),
  profit: router({
    get: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), periodKey: monthString.optional() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can view the operational profit workspace." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      const accessibleBuildings = await listBuildingsForUser(ctx.user);
      return getManagerProfitWorkspace({ buildingId: input.buildingId, totalBuildings: accessibleBuildings.length, periodMode: "monthly", periodKey: input.periodKey });
    }),
    saveOwnerSettlement: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), billingMonth: monthString, expectedAmountPaise: z2.number().int().positive(), paidAmountPaise: z2.number().int().min(0), dueDate: dateString, paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer", "cheque"]).optional(), notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl }).refine((input) => input.paidAmountPaise <= input.expectedAmountPaise, { message: "Paid amount cannot exceed the Owner settlement amount.", path: ["paidAmountPaise"] })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can record an Owner settlement." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      await upsertOwnerSettlement({ ...input, paidOn: input.paidOn || null, paymentMethod: input.paymentMethod ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    deleteOwnerSettlement: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), id: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can remove an incorrect Owner settlement." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      return { success: true, ...await deleteOwnerSettlement({ ...input, createdBy: ctx.user.id }) };
    }),
    saveGovernmentElectricity: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), billingMonth: monthString, expectedAmountPaise: z2.number().int().positive(), paidAmountPaise: z2.number().int().min(0), dueDate: dateString, paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer", "cheque"]).optional(), notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl }).refine((input) => input.paidAmountPaise <= input.expectedAmountPaise, { message: "Paid amount cannot exceed the government electricity bill.", path: ["paidAmountPaise"] })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can record a government electricity payment." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      await upsertGovernmentElectricityPayment({ ...input, paidOn: input.paidOn || null, paymentMethod: input.paymentMethod ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    deleteGovernmentElectricity: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), id: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can remove an incorrect government electricity entry." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      return { success: true, ...await deleteGovernmentElectricityPayment({ ...input, createdBy: ctx.user.id }) };
    })
  }),
  operations: router({
    snapshot: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive() })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Operational data is available only in the Manager workspace." });
      await requireBuildingAccess(ctx.user, input.buildingId, "read");
      return getBuildingSnapshot(input.buildingId);
    }),
    addFloor: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), name: z2.string().trim().min(1).max(80), level: z2.number().int().min(0).max(200) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      await addFloor(input);
      return { success: true };
    }),
    addGeneratedFloors: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), floorCount: z2.number().int().min(0).max(200) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      return addGeneratedFloors(input);
    }),
    deleteFloor: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      try {
        await deleteFloor(input);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Floor cannot be deleted." });
      }
      return { success: true };
    }),
    addRoom: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), floorId: z2.number().int().positive().nullable(), number: z2.string().trim().min(1).max(32), capacity: z2.number().int().min(1).max(12).default(2), roomType: roomType2, billingMode: roomBillingMode2.optional(), airConditioning: z2.enum(["ac", "non_ac"]).default("non_ac"), balcony: z2.enum(["balcony", "non_balcony"]).default("non_balcony"), imageUrl: optionalStoredImageUrl, defaultRentPaise: z2.number().int().min(0) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      const settings = resolveRoomSettings(input);
      await addRoom({ ...input, ...settings, imageUrl: input.imageUrl || null });
      return { success: true };
    }),
    setupRoomWithTenant: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), floorId: z2.number().int().positive().nullable(), number: z2.string().trim().min(1).max(32), capacity: z2.number().int().min(1).max(12).default(2), roomType: roomType2, billingMode: roomBillingMode2.optional(), airConditioning: z2.enum(["ac", "non_ac"]).default("non_ac"), balcony: z2.enum(["balcony", "non_balcony"]).default("non_balcony"), imageUrl: optionalStoredImageUrl, defaultRentPaise: z2.number().int().min(0).default(0), tenant: z2.object({ fullName: z2.string().trim().min(2).max(120), phone: z2.string().trim().min(7).max(32), password: z2.string().min(8).max(128), email: z2.string().email().optional().or(z2.literal("")), emergencyContactName: z2.string().trim().max(120).optional(), emergencyContactPhone: z2.string().trim().max(32).optional(), address: z2.string().trim().max(800).optional(), identityDocumentUrl: optionalStoredImageUrl }), allocation: z2.object({ moveInDate: dateString, bedLabel: z2.string().trim().max(32).optional(), isPrimaryPayer: z2.enum(["no", "yes"]).optional(), monthlyRentPaise: z2.number().int().min(0), depositPaise: z2.number().int().min(0) }), services: z2.array(z2.object({ serviceType: z2.enum(["tiffin", "water_bottle", "other"]), monthlyChargePaise: z2.number().int().positive(), notes: z2.string().trim().max(800).optional() })).max(3) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        const settings = resolveRoomSettings(input);
        return await createRoomWithTenantSetup({ buildingId: input.buildingId, floorId: input.floorId, number: input.number, ...settings, roomType: input.roomType, airConditioning: input.airConditioning, balcony: input.balcony, imageUrl: input.imageUrl || null, defaultRentPaise: input.defaultRentPaise || input.allocation.monthlyRentPaise, tenant: { ...input.tenant, phone: normalizePhone(input.tenant.phone), email: input.tenant.email || null, emergencyContactName: input.tenant.emergencyContactName || null, emergencyContactPhone: input.tenant.emergencyContactPhone || null, address: input.tenant.address || null, identityDocumentUrl: input.tenant.identityDocumentUrl || null, passwordHash: hashPassword(input.tenant.password) }, allocation: { ...input.allocation, bedLabel: input.allocation.bedLabel || null, isPrimaryPayer: settings.billingMode === "primary_payer" ? "yes" : input.allocation.isPrimaryPayer ?? "no" }, services: input.services.map((service) => ({ serviceType: service.serviceType, monthlyChargePaise: service.monthlyChargePaise, notes: service.notes || null, createdBy: ctx.user.id })) });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Room and tenant setup could not be saved." });
      }
    }),
    updateRoom: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), floorId: z2.number().int().positive().nullable(), number: z2.string().trim().min(1).max(32), capacity: z2.number().int().min(1).max(12).default(2), roomType: roomType2, billingMode: roomBillingMode2.optional(), airConditioning: z2.enum(["ac", "non_ac"]).default("non_ac"), balcony: z2.enum(["balcony", "non_balcony"]).default("non_balcony"), imageUrl: optionalStoredImageUrl, defaultRentPaise: z2.number().int().min(0) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      const db = await getDb();
      if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const activeAllocations = await db.select({ id: roomAllocations.id, monthlyRentPaise: roomAllocations.monthlyRentPaise }).from(roomAllocations).where(and2(eq3(roomAllocations.roomId, input.id), eq3(roomAllocations.status, "active")));
      const settings = resolveRoomSettings(input);
      const capacity = settings.capacity;
      if (activeAllocations.length > capacity) throw new TRPCError4({ code: "CONFLICT", message: "The selected sharing type cannot be lower than the current active tenant count." });
      const derivedRoomRentPaise = activeAllocations.length > 0 ? activeAllocations.reduce((total, allocation) => total + allocation.monthlyRentPaise, 0) : input.defaultRentPaise;
      await updateRoom({ ...input, ...settings, capacity, defaultRentPaise: input.roomType === "individual" ? input.defaultRentPaise : derivedRoomRentPaise, imageUrl: input.imageUrl || null });
      return { success: true };
    }),
    deleteRoom: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRooms");
      try {
        await deleteRoom(input);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Room cannot be deleted." });
      }
      return { success: true };
    }),
    createTenant: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), fullName: z2.string().trim().min(2).max(120), phone: z2.string().trim().min(7).max(32), email: z2.string().email().optional().or(z2.literal("")), emergencyContactName: z2.string().trim().max(120).optional(), emergencyContactPhone: z2.string().trim().max(32).optional(), address: z2.string().trim().max(800).optional(), identityDocumentUrl: optionalStoredImageUrl, password: z2.string().min(8).max(128) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await createTenant({ ...input, phone: normalizePhone(input.phone), email: input.email || null, emergencyContactName: input.emergencyContactName || null, emergencyContactPhone: input.emergencyContactPhone || null, address: input.address || null, identityDocumentUrl: input.identityDocumentUrl || null, passwordHash: hashPassword(input.password) });
      return { success: true };
    }),
    updateTenant: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), fullName: z2.string().trim().min(2).max(120), phone: z2.string().trim().min(7).max(32), email: z2.string().email().optional().or(z2.literal("")), emergencyContactName: z2.string().trim().max(120).optional(), emergencyContactPhone: z2.string().trim().max(32).optional(), address: z2.string().trim().max(800).optional(), identityDocumentUrl: optionalStoredImageUrl, status: z2.enum(["active", "inactive"]) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        await updateTenant({ ...input, phone: normalizePhone(input.phone), email: input.email || null, emergencyContactName: input.emergencyContactName || null, emergencyContactPhone: input.emergencyContactPhone || null, address: input.address || null, identityDocumentUrl: input.identityDocumentUrl || null });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error && error.message.includes("Tenant not found") ? error.message : "A phone-password account with this mobile number already exists." });
      }
      return { success: true };
    }),
    resetTenantCredentials: protectedProcedure.input(z2.object({ tenantId: z2.number().int().positive(), buildingId: z2.number().int().positive(), password: z2.string().min(8).max(128) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        await resetTenantCredentials({ tenantId: input.tenantId, buildingId: input.buildingId, passwordHash: hashPassword(input.password) });
      } catch (error) {
        throw new TRPCError4({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Tenant login could not be reset." });
      }
      return { success: true };
    }),
    revokeTenantCredentials: protectedProcedure.input(z2.object({ tenantId: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await revokeTenantCredentials(input);
      return { success: true };
    }),
    archiveTenant: protectedProcedure.input(z2.object({ tenantId: z2.number().int().positive(), buildingId: z2.number().int().positive(), moveOutDate: dateString })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await archiveTenant(input);
      return { success: true };
    }),
    deleteTenant: protectedProcedure.input(z2.object({ tenantId: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        await deleteTenant(input);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant cannot be deleted." });
      }
      return { success: true };
    }),
    createTenantService: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), tenantId: z2.number().int().positive(), serviceType: z2.enum(["tiffin", "water_bottle", "other"]), monthlyChargePaise: z2.number().int().positive(), notes: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      const db = await getDb();
      if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const tenant = (await db.select({ id: tenants.id }).from(tenants).where(and2(eq3(tenants.id, input.tenantId), eq3(tenants.buildingId, input.buildingId))).limit(1))[0];
      if (!tenant) throw new TRPCError4({ code: "BAD_REQUEST", message: "Tenant must belong to the selected building." });
      await createTenantService({ ...input, notes: input.notes || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    updateTenantService: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), tenantId: z2.number().int().positive(), serviceType: z2.enum(["tiffin", "water_bottle", "other"]), monthlyChargePaise: z2.number().int().positive(), active: z2.enum(["active", "inactive"]), notes: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await updateTenantService({ ...input, notes: input.notes || null });
      return { success: true };
    }),
    deleteTenantService: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), tenantId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await deleteTenantService(input);
      return { success: true };
    }),
    allocateTenant: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive(), tenantId: z2.number().int().positive(), moveInDate: dateString, bedLabel: z2.string().trim().max(32).optional(), isPrimaryPayer: z2.enum(["no", "yes"]).optional(), monthlyRentPaise: z2.number().int().min(0), depositPaise: z2.number().int().min(0) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await assertRoomAndTenantBelongToBuilding(input.roomId, input.tenantId, input.buildingId);
      const db = await getDb();
      if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const active = await db.select().from(roomAllocations).where(and2(eq3(roomAllocations.roomId, input.roomId), eq3(roomAllocations.status, "active")));
      const tenantActiveAllocation = await db.select({ id: roomAllocations.id }).from(roomAllocations).where(and2(eq3(roomAllocations.tenantId, input.tenantId), eq3(roomAllocations.status, "active")));
      const room = await db.select().from(rooms).where(eq3(rooms.id, input.roomId)).limit(1);
      if (!room[0] || active.length >= room[0].capacity) {
        throw new TRPCError4({ code: "CONFLICT", message: "This room has no vacant bed remaining." });
      }
      try {
        assertTenantCanReceiveAllocation(tenantActiveAllocation.length);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant already allocated." });
      }
      try {
        await createAllocation(input);
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "This allocation could not be saved." });
      }
      return { success: true };
    }),
    allocateTenantWithServices: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive(), tenantId: z2.number().int().positive(), moveInDate: dateString, bedLabel: z2.string().trim().max(32).optional(), isPrimaryPayer: z2.enum(["no", "yes"]).optional(), monthlyRentPaise: z2.number().int().min(0), depositPaise: z2.number().int().min(0), services: z2.array(z2.object({ serviceType: z2.enum(["tiffin", "water_bottle", "other"]), monthlyChargePaise: z2.number().int().positive(), notes: z2.string().trim().max(800).optional() })).max(3) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await assertRoomAndTenantBelongToBuilding(input.roomId, input.tenantId, input.buildingId);
      try {
        const allocationId = await createAllocationWithServices({ ...input, bedLabel: input.bedLabel || void 0, isPrimaryPayer: input.isPrimaryPayer ?? "no", services: input.services.map((service) => ({ serviceType: service.serviceType, monthlyChargePaise: service.monthlyChargePaise, notes: service.notes || null, createdBy: ctx.user.id })) });
        return { allocationId };
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant allocation could not be saved." });
      }
    }),
    createTenantForRoom: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive(), tenant: z2.object({ fullName: z2.string().trim().min(2).max(120), phone: z2.string().trim().min(7).max(32), password: z2.string().min(8).max(128), email: z2.string().email().optional().or(z2.literal("")), emergencyContactName: z2.string().trim().max(120).optional(), emergencyContactPhone: z2.string().trim().max(32).optional(), address: z2.string().trim().max(800).optional(), identityDocumentUrl: optionalStoredImageUrl }), allocation: z2.object({ moveInDate: dateString, bedLabel: z2.string().trim().max(32).optional(), isPrimaryPayer: z2.enum(["no", "yes"]).optional(), monthlyRentPaise: z2.number().int().min(0), depositPaise: z2.number().int().min(0) }), services: z2.array(z2.object({ serviceType: z2.enum(["tiffin", "water_bottle", "other"]), monthlyChargePaise: z2.number().int().positive(), notes: z2.string().trim().max(800).optional() })).max(3) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        return await createTenantWithAllocationAndServices({ buildingId: input.buildingId, roomId: input.roomId, tenant: { ...input.tenant, phone: normalizePhone(input.tenant.phone), email: input.tenant.email || null, emergencyContactName: input.tenant.emergencyContactName || null, emergencyContactPhone: input.tenant.emergencyContactPhone || null, address: input.tenant.address || null, identityDocumentUrl: input.tenant.identityDocumentUrl || null, passwordHash: hashPassword(input.tenant.password) }, allocation: { ...input.allocation, bedLabel: input.allocation.bedLabel || null, isPrimaryPayer: input.allocation.isPrimaryPayer ?? "no" }, services: input.services.map((service) => ({ serviceType: service.serviceType, monthlyChargePaise: service.monthlyChargePaise, notes: service.notes || null, createdBy: ctx.user.id })) });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant room setup could not be saved." });
      }
    }),
    transferTenant: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), allocationId: z2.number().int().positive(), destinationRoomId: z2.number().int().positive(), effectiveDate: dateString, bedLabel: z2.string().trim().max(32).optional(), monthlyRentPaise: z2.number().int().positive(), depositPaise: z2.number().int().min(0), applyProration: z2.boolean().default(false) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        return await transferActiveTenant({ ...input, bedLabel: input.bedLabel || null, recordedBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant transfer could not be saved." });
      }
    }),
    vacateTenant: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), allocationId: z2.number().int().positive(), moveOutDate: dateString })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      try {
        await vacateAllocation(input);
      } catch (error) {
        throw new TRPCError4({ code: "NOT_FOUND", message: error instanceof Error ? error.message : "Active allocation could not be found." });
      }
      return { success: true };
    }),
    updateAllocation: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), moveInDate: dateString, bedLabel: z2.string().trim().max(32).optional(), monthlyRentPaise: z2.number().int().positive(), depositPaise: z2.number().int().min(0) })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageTenants");
      await updateAllocation({ ...input, bedLabel: input.bedLabel || null });
      return { success: true };
    })
  }),
  rent: router({
    upsert: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), allocationId: z2.number().int().positive(), tenantId: z2.number().int().positive(), rentMonth: monthString, dueDate: dateString, expectedAmountPaise: z2.number().int().positive(), paidAmountPaise: z2.number().int().min(0), paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      const db = await getDb();
      if (!db) throw new TRPCError4({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable." });
      const allocation = (await db.select().from(roomAllocations).where(and2(eq3(roomAllocations.id, input.allocationId), eq3(roomAllocations.buildingId, input.buildingId), eq3(roomAllocations.tenantId, input.tenantId), eq3(roomAllocations.status, "active"))).limit(1))[0];
      if (!allocation) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose an active allocation from the selected building." });
      const expectedAmountPaise = input.expectedAmountPaise > 0 ? input.expectedAmountPaise : allocation.monthlyRentPaise;
      const status = deriveRentStatus2(expectedAmountPaise, input.paidAmountPaise);
      await recordRentPayment({ ...input, expectedAmountPaise, status, paidOn: status === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), paymentMethod: status === "pending" ? null : input.paymentMethod ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, recordedBy: ctx.user.id });
      return { status, ownerAlertSent: false };
    }),
    generateCycle: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), rentMonth: monthString.optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      return ensureMonthlyRentCycles({ buildingId: input.buildingId, rentMonth: input.rentMonth ?? formatRentMonth(/* @__PURE__ */ new Date()), createdBy: ctx.user.id });
    }),
    update: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), expectedUpdatedAt: z2.date(), dueDate: dateString, expectedAmountPaise: z2.number().int().positive(), paidAmountPaise: z2.number().int().min(0), paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      const status = deriveRentStatus2(input.expectedAmountPaise, input.paidAmountPaise);
      try {
        await updateRentPayment({ ...input, status, paidOn: status === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), paymentMethod: status === "pending" ? null : input.paymentMethod ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, recordedBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Rent record could not be updated." });
      }
      return { status };
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can remove an incorrect rent record." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      return { success: true, ...await deleteRentPayment({ ...input, createdBy: ctx.user.id }) };
    }),
    triggerReminder: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      try {
        return await triggerRentPaymentReminder({ ...input, createdBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Unable to create a rent reminder." });
      }
    })
  }),
  notifications: router({
    list: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive() })).query(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      return getManagerNotifications(input.buildingId);
    }),
    markRead: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), notificationIds: z2.array(z2.number().int().positive()).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      await markManagerNotificationsRead(input);
      return { success: true };
    }),
    refresh: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageRent");
      return refreshManagerCollectionNotifications({ buildingId: input.buildingId, today: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
    })
  }),
  electricity: router({
    upsert: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive(), billingMonth: monthString, previousReading: z2.number().int().min(0), currentReading: z2.number().int().min(0), paidAmountPaise: z2.number().int().min(0).optional(), paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), dueDate: optionalDateString, notes: z2.string().trim().max(800).optional(), meterImageUrl: optionalStoredImageUrl, receiptUrl: optionalStoredImageUrl })).mutation(async ({ ctx, input }) => {
      const building = await requireBuildingAccess(ctx.user, input.buildingId, "manageElectricity");
      const calculation = calculateElectricityBill(input.previousReading, input.currentReading, building.electricityRatePaise);
      const paidAmountPaise = input.paidAmountPaise ?? 0;
      const status = deriveRentStatus2(calculation.billAmountPaise, paidAmountPaise);
      await recordElectricityBill({ ...input, ...calculation, paidAmountPaise, status, paidOn: status === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), paymentMethod: status === "pending" ? null : input.paymentMethod ?? null, ratePerUnitPaise: building.electricityRatePaise, dueDate: input.dueDate ?? null, notes: input.notes || null, meterImageUrl: input.meterImageUrl || null, receiptUrl: input.receiptUrl || null, recordedBy: ctx.user.id });
      return { ...calculation, status };
    }),
    update: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), expectedUpdatedAt: z2.date(), previousReading: z2.number().int().min(0), currentReading: z2.number().int().min(0), paidAmountPaise: z2.number().int().min(0), paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), meterImageUrl: optionalStoredImageUrl, receiptUrl: optionalStoredImageUrl, dueDate: optionalDateString, notes: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      const building = await requireBuildingAccess(ctx.user, input.buildingId, "manageElectricity");
      const calculation = calculateElectricityBill(input.previousReading, input.currentReading, building.electricityRatePaise);
      const status = deriveRentStatus2(calculation.billAmountPaise, input.paidAmountPaise);
      try {
        await updateElectricityBill({ ...input, ...calculation, status, paidOn: status === "pending" ? null : input.paidOn ?? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), paymentMethod: status === "pending" ? null : input.paymentMethod ?? null, ratePerUnitPaise: building.electricityRatePaise, dueDate: input.dueDate ?? null, notes: input.notes || null, meterImageUrl: input.meterImageUrl || null, receiptUrl: input.receiptUrl || null, recordedBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Electricity record could not be updated." });
      }
      return { ...calculation, status, reminderResolved: status === "paid" };
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can remove an incorrect electricity bill." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageElectricity");
      return { success: true, ...await deleteElectricityBill({ ...input, createdBy: ctx.user.id }) };
    }),
    createOverdueReminder: protectedProcedure.input(z2.object({ billId: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageElectricity");
      try {
        return await createElectricityOverdueReminder({ ...input, createdBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Unable to create electricity reminder." });
      }
    })
  }),
  tenantCharges: router({
    recordPayment: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), expectedUpdatedAt: z2.date(), paidAmountPaise: z2.number().int().min(0), paidOn: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), receiptUrl: optionalStoredImageUrl })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      try {
        return await recordTenantChargePayment({ ...input, paidOn: input.paidOn ?? null, paymentMethod: input.paymentMethod ?? null, receiptUrl: input.receiptUrl || null, recordedBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Tenant charge could not be updated." });
      }
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Manager can remove an uncollected tenant charge." });
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      return { success: true, ...await deleteTenantCharge({ ...input, createdBy: ctx.user.id }) };
    })
  }),
  receiptReviews: router({
    reviewers: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive() })).query(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "read");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can view receipt reviewers." });
      return listReceiptReviewers(input.buildingId);
    }),
    history: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), tenantId: z2.number().int().positive().optional(), reviewerId: z2.number().int().positive().optional(), reviewedFrom: optionalDateString, reviewedTo: optionalDateString, paymentMethod: z2.enum(["cash", "upi", "bank_transfer"]).optional(), amountMinPaise: z2.number().int().min(0).optional(), amountMaxPaise: z2.number().int().min(0).optional() }).refine((input) => !input.reviewedFrom || !input.reviewedTo || input.reviewedFrom <= input.reviewedTo, { message: "Review start date must be on or before the end date.", path: ["reviewedTo"] }).refine((input) => input.amountMinPaise === void 0 || input.amountMaxPaise === void 0 || input.amountMinPaise <= input.amountMaxPaise, { message: "Minimum amount must not exceed maximum amount.", path: ["amountMaxPaise"] })).query(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "read");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can view receipt review history." });
      return getReceiptReviewHistory({ buildingId: input.buildingId, tenantId: input.tenantId, reviewerId: input.reviewerId, reviewedFrom: input.reviewedFrom ? /* @__PURE__ */ new Date(`${input.reviewedFrom}T00:00:00.000Z`) : void 0, reviewedTo: input.reviewedTo ? /* @__PURE__ */ new Date(`${input.reviewedTo}T23:59:59.999Z`) : void 0, paymentMethod: input.paymentMethod, amountMinPaise: input.amountMinPaise, amountMaxPaise: input.amountMaxPaise });
    }),
    decide: protectedProcedure.input(z2.object({ type: z2.enum(["rent", "electricity", "tenant_charge"]), billId: z2.number().int().positive(), buildingId: z2.number().int().positive(), expectedUpdatedAt: z2.date(), status: z2.enum(["approved", "rejected"]), reviewNote: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can review tenant payment proof." });
      if (input.status === "rejected" && !input.reviewNote?.trim()) throw new TRPCError4({ code: "BAD_REQUEST", message: "A rejection note is required before rejecting tenant payment proof." });
      try {
        return await reviewTenantPaymentReceipt({ ...input, reviewNote: input.reviewNote || null, reviewedBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Payment proof could not be reviewed." });
      }
    })
  }),
  expenses: router({
    create: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), roomId: z2.number().int().positive().nullable().optional(), tenantId: z2.number().int().positive().nullable().optional(), liabilityMode: liabilityMode.default("building"), category: z2.enum(["maintenance", "groceries", "salaries", "utilities", "rent", "water", "labor", "tiffin", "other"]), amountPaise: z2.number().int().positive(), expenseDate: dateString, notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (!canCreateExpense(ctx.user.role, input.category)) {
        throw new TRPCError4({ code: "FORBIDDEN", message: "Cooks can record only groceries or tiffin expenses." });
      }
      if (input.liabilityMode === "room_shared" && !input.roomId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose an occupied room for a shared tenant cost." });
      if (input.liabilityMode === "tenant_assigned" && !input.tenantId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose the tenant responsible for this cost." });
      await createExpense({ ...input, roomId: input.roomId ?? null, tenantId: input.tenantId ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    update: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), roomId: z2.number().int().positive().nullable().optional(), tenantId: z2.number().int().positive().nullable().optional(), liabilityMode: liabilityMode.default("building"), category: z2.enum(["maintenance", "groceries", "salaries", "utilities", "rent", "water", "labor", "tiffin", "other"]), amountPaise: z2.number().int().positive(), expenseDate: dateString, notes: z2.string().trim().max(800).optional(), receiptUrl: optionalStoredImageUrl, expectedUpdatedAt: z2.date() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (!canCreateExpense(ctx.user.role, input.category)) throw new TRPCError4({ code: "FORBIDDEN", message: "You cannot update this expense category." });
      if (input.liabilityMode === "room_shared" && !input.roomId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose an occupied room for a shared tenant cost." });
      if (input.liabilityMode === "tenant_assigned" && !input.tenantId) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose the tenant responsible for this cost." });
      await updateExpense({ ...input, roomId: input.roomId ?? null, tenantId: input.tenantId ?? null, notes: input.notes || null, receiptUrl: input.receiptUrl || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    delete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      return { success: true, ...await deleteExpense({ ...input, createdBy: ctx.user.id }) };
    }),
    operatingCostCreate: protectedProcedure.input(operatingCostInput).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can record staff, supply, and maintenance costs." });
      assertOperatingCostInput(input);
      await createOperatingCost({ ...input, roomId: input.roomId ?? null, tenantId: input.tenantId ?? null, payeeName: input.payeeName || null, vendorName: input.vendorName || null, dueDate: input.dueDate || null, receiptUrl: input.receiptUrl || null, notes: input.notes || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    operatingCostUpdate: protectedProcedure.input(operatingCostInput.extend({ id: z2.number().int().positive(), expectedUpdatedAt: z2.date() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can update staff, supply, and maintenance costs." });
      assertOperatingCostInput(input);
      try {
        await updateOperatingCost({ ...input, roomId: input.roomId ?? null, tenantId: input.tenantId ?? null, payeeName: input.payeeName || null, vendorName: input.vendorName || null, dueDate: input.dueDate || null, receiptUrl: input.receiptUrl || null, notes: input.notes || null, createdBy: ctx.user.id });
      } catch (error) {
        throw new TRPCError4({ code: "CONFLICT", message: error instanceof Error ? error.message : "Operating cost could not be updated." });
      }
      return { success: true };
    }),
    operatingCostDelete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role !== "admin" && ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only the Owner or Manager can remove operating costs." });
      return { success: true, ...await deleteOperatingCost({ ...input, createdBy: ctx.user.id }) };
    }),
    serviceChargeCreate: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), name: z2.string().trim().min(2).max(120), amountPaise: z2.number().int().positive(), billingCycle: z2.enum(["monthly", "one_time"]), dueDay: z2.number().int().min(1).max(28), notes: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role === "cook") throw new TRPCError4({ code: "FORBIDDEN", message: "Cooks cannot configure recurring building charges." });
      await createServiceCharge({ ...input, notes: input.notes || null, createdBy: ctx.user.id });
      return { success: true };
    }),
    serviceChargeUpdate: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive(), name: z2.string().trim().min(2).max(120), amountPaise: z2.number().int().positive(), billingCycle: z2.enum(["monthly", "one_time"]), dueDay: z2.number().int().min(1).max(28), active: z2.enum(["active", "inactive"]), notes: z2.string().trim().max(800).optional() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role === "cook") throw new TRPCError4({ code: "FORBIDDEN", message: "Cooks cannot configure recurring building charges." });
      await updateServiceCharge({ ...input, notes: input.notes || null });
      return { success: true };
    }),
    serviceChargeDelete: protectedProcedure.input(z2.object({ id: z2.number().int().positive(), buildingId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageExpenses");
      if (ctx.user.role === "cook") throw new TRPCError4({ code: "FORBIDDEN", message: "Cooks cannot configure recurring building charges." });
      await deleteServiceCharge(input);
      return { success: true };
    })
  }),
  reminders: router({
    create: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), tenantId: z2.number().int().positive().nullable(), rentPaymentId: z2.number().int().positive().nullable(), title: z2.string().trim().min(3).max(180), dueDate: dateString })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageReminders");
      await createReminder({ ...input, createdBy: ctx.user.id });
      return { success: true };
    }),
    complete: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), reminderId: z2.number().int().positive() })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "manageReminders");
      await markReminderComplete(input.reminderId, input.buildingId);
      return { success: true };
    })
  }),
  exports: router({
    prepare: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), exportType: z2.enum(["tenants", "rent", "electricity", "expenses"]), dateFrom: optionalDateString, dateTo: optionalDateString })).mutation(async ({ ctx, input }) => {
      await requireBuildingAccess(ctx.user, input.buildingId, "export");
      if (!hasValidExportDateRange(input)) {
        throw new TRPCError4({ code: "BAD_REQUEST", message: "The start date must be before the end date." });
      }
      const rows = await getExportRows(input);
      await recordExport({ ...input, requestedBy: ctx.user.id, dateFrom: input.dateFrom ?? null, dateTo: input.dateTo ?? null });
      return rows;
    }),
    previewWorkbook: protectedProcedure.input(z2.object({
      buildingId: z2.number().int().positive(),
      mode: z2.enum(["selected", "complete"]),
      datasets: z2.array(z2.enum(workbookExportDatasets)).max(workbookExportDatasets.length).default([]),
      dateFrom: optionalDateString,
      dateTo: optionalDateString,
      paymentStatus: z2.enum(["all", "paid", "pending", "partial"]).default("all"),
      outstandingOnly: z2.boolean().default(false)
    })).query(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only a building Manager can preview operational workbook fields." });
      await requireBuildingAccess(ctx.user, input.buildingId, "export");
      if (input.mode === "selected" && input.datasets.length === 0) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose at least one data section to preview." });
      if (!hasValidExportDateRange(input)) throw new TRPCError4({ code: "BAD_REQUEST", message: "The start date must be before the end date." });
      return getWorkbookExportPreview(input);
    }),
    csv: protectedProcedure.input(z2.object({ buildingId: z2.number().int().positive(), dataset: z2.enum(["rooms", "tenants"]), dateFrom: optionalDateString, dateTo: optionalDateString })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only a building Manager can export room or tenant CSV data." });
      await requireBuildingAccess(ctx.user, input.buildingId, "export");
      if (!hasValidExportDateRange(input)) throw new TRPCError4({ code: "BAD_REQUEST", message: "The start date must be before the end date." });
      const csv = await getCsvExportData(input);
      await recordExport({ buildingId: input.buildingId, requestedBy: ctx.user.id, exportType: "selected", dateFrom: input.dateFrom ?? null, dateTo: input.dateTo ?? null });
      return csv;
    }),
    prepareWorkbook: protectedProcedure.input(z2.object({
      buildingId: z2.number().int().positive(),
      mode: z2.enum(["selected", "complete"]),
      datasets: z2.array(z2.enum(workbookExportDatasets)).max(workbookExportDatasets.length).default([]),
      dateFrom: optionalDateString,
      dateTo: optionalDateString,
      paymentStatus: z2.enum(["all", "paid", "pending", "partial"]).default("all"),
      outstandingOnly: z2.boolean().default(false),
      fieldSelections: z2.record(z2.string(), z2.array(z2.string().trim().min(1).max(120)).max(80)).optional()
    })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "manager") throw new TRPCError4({ code: "FORBIDDEN", message: "Only a building Manager can export operational workbooks." });
      await requireBuildingAccess(ctx.user, input.buildingId, "export");
      if (input.mode === "selected" && input.datasets.length === 0) throw new TRPCError4({ code: "BAD_REQUEST", message: "Choose at least one data section to export." });
      if (!hasValidExportDateRange(input)) throw new TRPCError4({ code: "BAD_REQUEST", message: "The start date must be before the end date." });
      const selectedFields = input.fieldSelections ?? {};
      if (input.mode === "selected" && input.datasets.some((dataset) => dataset in selectedFields && selectedFields[dataset].length === 0)) throw new TRPCError4({ code: "BAD_REQUEST", message: "Keep at least one field visible for every selected data section." });
      const workbook = await getWorkbookExportData(input);
      await recordExport({ buildingId: input.buildingId, requestedBy: ctx.user.id, exportType: input.mode, dateFrom: input.dateFrom ?? null, dateTo: input.dateTo ?? null });
      return workbook;
    })
  })
});

// server/routers/tenant.ts
init_db();
import { TRPCError as TRPCError5 } from "@trpc/server";
import { z as z3 } from "zod";
var storedReceiptUrl = z3.union([
  z3.string().url().max(1e3),
  z3.string().regex(/^\/manus-storage\/[A-Za-z0-9][A-Za-z0-9._/-]*$/, "Use a valid uploaded receipt URL.").max(1e3)
]);
var tenantRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "tenant") {
      throw new TRPCError5({ code: "FORBIDDEN", message: "Tenant access is required." });
    }
    const portal = await getTenantPortal(ctx.user.id);
    if (!portal) throw new TRPCError5({ code: "NOT_FOUND", message: "Tenant profile is not linked to this login." });
    return portal;
  }),
  requests: router({
    create: protectedProcedure.input(z3.object({ category: z3.enum(["maintenance", "payment", "room", "other"]), description: z3.string().trim().min(8).max(500) })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "tenant") throw new TRPCError5({ code: "FORBIDDEN", message: "Tenant access is required." });
      try {
        await createTenantSupportRequest({ userId: ctx.user.id, ...input });
        return { success: true };
      } catch (error) {
        throw new TRPCError5({ code: "NOT_FOUND", message: error instanceof Error ? error.message : "Tenant profile is not linked to this login." });
      }
    })
  }),
  payments: router({
    submitReceipt: protectedProcedure.input(z3.object({ type: z3.enum(["rent", "electricity", "tenant_charge"]), billId: z3.number().int().positive(), paymentMethod: z3.enum(["cash", "upi", "bank_transfer"]), receiptUrl: storedReceiptUrl })).mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "tenant") throw new TRPCError5({ code: "FORBIDDEN", message: "Tenant access is required." });
      try {
        return await submitTenantPaymentReceipt({ userId: ctx.user.id, type: input.type, billId: input.billId, paymentMethod: input.paymentMethod, receiptUrl: input.receiptUrl });
      } catch (error) {
        throw new TRPCError5({ code: "BAD_REQUEST", message: error instanceof Error ? error.message : "Payment receipt could not be submitted." });
      }
    })
  })
});

// server/routers.ts
import { z as z4 } from "zod";
import { TRPCError as TRPCError6 } from "@trpc/server";
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user ? toSafeUser(opts.ctx.user) : null),
    login: publicProcedure.input(z4.object({ phone: z4.string().trim().min(3).max(64), password: z4.string().min(1).max(128) })).mutation(async ({ ctx, input }) => {
      const user = await authenticatePhonePassword(input.phone, input.password);
      if (!user) throw new TRPCError6({ code: "UNAUTHORIZED", message: "Invalid phone number or password." });
      const token = await createPhoneSession(user);
      setPhoneSessionCookie(ctx.res, ctx.req, token);
      return toSafeUser(user);
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      clearPhoneSessionCookie(ctx.res, ctx.req);
      return { success: true };
    })
  }),
  pg: pgRouter,
  tenant: tenantRouter
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  user = await getPhoneSessionUser(opts.req);
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/scheduled/rentAlerts.ts
init_db();
async function sendOverdueRentAlerts(req, res) {
  try {
    const { sdk: sdk2 } = await Promise.resolve().then(() => (init_sdk(), sdk_exports));
    const user = await sdk2.authenticateRequest(req);
    if (!user.isCron || !user.taskUid) {
      return res.status(403).json({ error: "cron-only" });
    }
    const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const cycles = await ensureMonthlyRentCycles({ rentMonth: formatRentMonth(/* @__PURE__ */ new Date()) });
    const notifications = await refreshManagerCollectionNotifications({ today });
    const overduePayments = await getUnnotifiedOverdueRentPayments(today);
    if (overduePayments.length === 0) {
      return res.json({ ok: true, notified: 0, cycles, notifications, skipped: "no-unnotified-overdue-rent" });
    }
    const totalBalancePaise = overduePayments.reduce((total, payment) => total + Math.max(payment.expectedAmountPaise - payment.paidAmountPaise, 0), 0);
    const sent = await notifyOwner({
      title: `${overduePayments.length} overdue PG rent ${overduePayments.length === 1 ? "payment" : "payments"}`,
      content: `Outstanding balance: \u20B9${(totalBalancePaise / 100).toLocaleString("en-IN")}. Open Golden Prime PG to review overdue collections.`
    });
    if (!sent) {
      return res.status(503).json({ error: "owner-notification-unavailable", notified: 0 });
    }
    await markRentPaymentsOverdueNotified(overduePayments.map((payment) => payment.id));
    return res.json({ ok: true, notified: overduePayments.length, cycles, notifications });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "unknown-error",
      context: { url: req.originalUrl },
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
}

// server/_core/app.ts
function createApp() {
  const app = express();
  app.use((req, _res, next) => {
    try {
      const parsed = new URL(req.url || "/", "http://localhost");
      const apiPath = parsed.searchParams.get("__api_path");
      if (apiPath) {
        parsed.searchParams.delete("__api_path");
        const search = parsed.searchParams.toString();
        req.url = `/api/${apiPath.replace(/^\/+/, "")}${search ? `?${search}` : ""}`;
      } else if (req.url && !req.url.startsWith("/api/") && (req.url.startsWith("/trpc") || req.url.startsWith("/storage") || req.url.startsWith("/scheduled"))) {
        req.url = `/api${req.url}`;
      }
    } catch {
    }
    if (req.body !== void 0 && req.body !== null && !req._body) {
      if (Buffer.isBuffer(req.body) || typeof req.body === "string") {
        const raw = req.body.toString("utf8").trim();
        if (raw.startsWith("{") || raw.startsWith("[")) {
          try {
            req.body = JSON.parse(raw);
          } catch {
          }
        }
      }
      req._body = true;
    }
    next();
  });
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  app.post(["/api/scheduled/rent-overdue-alerts", "/scheduled/rent-overdue-alerts"], sendOverdueRentAlerts);
  app.use(
    ["/api/trpc", "/trpc"],
    createExpressMiddleware({ router: appRouter, createContext })
  );
  app.use((err, _req, res, _next) => {
    console.error("Express API error:", err);
    if (!res.headersSent) {
      res.status(500).json({
        error: {
          message: err instanceof Error ? err.message : "Internal server error"
        }
      });
    }
  });
  return app;
}
export {
  createApp
};
