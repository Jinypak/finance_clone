import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
});

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  note: text('notes'),
  date: timestamp('date', { mode: 'date' }).notNull(),
  accountId: text('account_id').references(() => accounts.id, {
    onDelete: 'cascade',
  }),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'set null',
  }),
});

export const insertTransActionSchema = createInsertSchema(transactions);

export const history = pgTable('history', {
  id: text('id').primaryKey(),
  company: text('company').notNull(),
  type: text('type').notNull(),
  model: text('model').notNull(),
  serial: text('serial'),
  // date: timestamp('date', { mode: 'date' }).notNull(),
  customer: text('customer'),
  phone: text('phone'),
  email: text('email'),
  // manager: text('manager').notNull(),
  etc: text('etc'),
  userId: text('user_id').notNull(),
});

export const insertHistorySchema = createInsertSchema(history);
