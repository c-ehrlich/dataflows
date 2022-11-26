import { router } from "../trpc";
import { exampleRouter } from "./example";
import { productRouter } from "./product";

export const appRouter = router({
  example: exampleRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
