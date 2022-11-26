import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const productRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1), price: z.number().int() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.create({
        data: {
          name: input.name,
          price: input.price,
        },
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.product.delete({
        where: {
          id: input.id,
        },
      });
    }),

  search: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        priceMin: z.number().int().optional(),
        priceMax: z.number().int().optional(),
        dateMin: z.date().optional(),
        dateMax: z.date().optional(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.product.findMany({
        where: {
          ...(input.name && { name: { contains: input.name } }),
          ...(input.priceMin && { price: { gte: input.priceMin } }),
          ...(input.priceMax && { price: { lte: input.priceMax } }),
          ...(input.dateMin && { createdAt: { gte: input.dateMin } }),
          ...(input.dateMax && { createdAt: { lte: input.dateMax } }),
        },
      });
    }),
});
