import { db } from '@/db/drizzle';
import { history, insertHistorySchema } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { and, eq, inArray } from 'drizzle-orm';
import { Hono } from 'hono';
import { createId } from '@paralleldrive/cuid2';
import { z } from 'zod';

const app = new Hono();

app
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    const data = await db
      .select({
        id: history.id,
        company: history.company,
        type: history.type,
        model: history.model,
      })
      .from(history)
      .where(eq(history.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    '/:id',
    zValidator(
      'param',
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid('param');
      if (!id) {
        return c.json({ error: 'Missing ID' }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const [data] = await db
        .select({ id: history.id, name: history.company })
        .from(history);
      // .where(and(eq(history.userId, auth.userId), eq(history.id, id)));

      if (!data) {
        return c.json({ error: 'Not Found' }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertHistorySchema.pick({
        company: true,
        type: true,
        model: true,
        // date: true,
        // manager: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid('json');
      // console.log('==============================');
      // console.log('auth: ', auth);
      // console.log('values: ', values);
      // console.log('==============================');
      if (!auth?.userId) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      const data = await db.insert(history).values({
        id: createId(),
        userId: auth.userId,
        ...values,
      });

      return c.json({ data });
    }
  );
// .post(
//   '/bulk-delete',
//   clerkMiddleware(),
//   zValidator(
//     'json',
//     z.object({
//       ids: z.array(z.string()),
//     })
//   ),
//   async (c) => {
//     const auth = getAuth(c);
//     const values = c.req.valid('json');

//     if (!auth?.userId) {
//       return c.json({ error: 'Unauthorized' }, 401);
//     }

//     const data = await db
//       .delete(history)
//       // .where(
//       //   and(eq(history.userId, auth.userId), inArray(history.id, values.ids))
//       // )
//       .returning({
//         id: history.id,
//       });
//     return c.json({ data });
//   }
// )
// .patch(
//   '/:id',
//   clerkMiddleware(),
//   zValidator('param', z.object({ id: z.string().optional() })),
//   zValidator('json', insertAccountSchema.pick({ name: true })),
//   async (c) => {
//     const auth = getAuth(c);
//     const { id } = c.req.valid('param');
//     const values = c.req.valid('json');
//     if (!id) {
//       return c.json({ error: 'Missing ID' }, 400);
//     }

//     if (!auth?.userId) {
//       return c.json({ error: 'Unauthorized' }, 401);
//     }

//     //   const [data] = await db
//     //     .update(history)
//     //     .set(values)
//     //     .where(and(eq(history.userId, auth.userId), eq(history.id, id)))
//     //     .returning();

//     //   if (!data) {
//     //     return c.json({ error: 'Not found' }, 404);
//     //   }

//     return c.json({});
//   }
// )
// .delete(
//   '/:id',
//   clerkMiddleware(),
//   zValidator('param', z.object({ id: z.string().optional() })),
//   async (c) => {
//     const auth = getAuth(c);
//     const { id } = c.req.valid('param');
//     if (!id) {
//       return c.json({ error: 'Missing ID' }, 400);
//     }

//     if (!auth?.userId) {
//       return c.json({ error: 'Unauthorized' }, 401);
//     }

//     const [data] = await db
//       .delete(history)
//       // .where(and(eq(history.userId, auth.userId), eq(history.id, id)))
//       .returning({
//         id: history.id,
//       });

//     if (!data) {
//       return c.json({ error: 'Not found' }, 404);
//     }

//     return c.json({});
//   }
// );

export default app;
