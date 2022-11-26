import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const product = trpc.product.getOne.useQuery({ id: id as string });
  const deleteProduct = trpc.product.delete.useMutation();

  function handleDelete() {
    deleteProduct.mutate({ id: id as string });
    router.push("/");
  }

  return (
    <div>
      <pre>Product: {JSON.stringify(product, null, 2)}</pre>
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
}
