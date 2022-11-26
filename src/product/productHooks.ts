import { trpc } from "../utils/trpc";

export function useDeleteProduct() {
  const queryClient = trpc.useContext();
  return trpc.product.delete.useMutation({
    onSettled: () => queryClient.product.invalidate(),
  });
}
