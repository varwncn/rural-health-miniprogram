import { pgTable, serial, timestamp, varchar, integer, text, jsonb, index } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const healthCheck = pgTable("health_check", {
	id: serial().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
});

export const userBasicInfo = pgTable(
  "user_basic_info",
  {
    id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
    name: varchar("name", { length: 128 }).notNull(),
    age: integer("age").notNull(),
    gender: varchar("gender", { length: 10 }).notNull(), // 男/女
    phone: varchar("phone", { length: 20 }).notNull(),
    address: text("address").notNull(),
    health_status: varchar("health_status", { length: 100 }).notNull(), // 健康状况
    allergies: text("allergies"), // 过敏史
    chronic_diseases: text("chronic_diseases"), // 慢性病史
    emergency_contact_name: varchar("emergency_contact_name", { length: 128 }), // 紧急联系人姓名
    emergency_contact_phone: varchar("emergency_contact_phone", { length: 20 }), // 紧急联系人电话
    metadata: jsonb("metadata"), // 扩展信息
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updated_at: timestamp("updated_at", { withTimezone: true }),
  },
  (table) => [
    index("user_basic_info_phone_idx").on(table.phone), // 常用查询字段
    index("user_basic_info_created_at_idx").on(table.created_at), // 排序字段
  ]
);
