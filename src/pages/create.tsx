import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function Create() {
  const router = useRouter();
  const createProduct = trpc.product.create.useMutation();
  const queryClient = trpc.useContext();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(100);
  const [error, setError] = useState("");

  function handleCreate() {
    createProduct.mutate(
      {
        name,
        price,
      },
      {
        onSuccess: () => {
          queryClient.invalidate();
          router.push("/");
        },
        onError: (e: unknown) => {
          setError(JSON.stringify(e, null, 2));
          console.error("Failed to create product");
        },
      }
    );
  }
  return (
    <VStack spacing={4} alignItems="flex-start">
      <Heading>Create</Heading>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <NumberInput
          defaultValue={price}
          onChange={(e) => setPrice(Number(e))}
          min={0}
          max={99999}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <Button onClick={() => handleCreate()}>Create</Button>
      {error && <pre>Error: {error}</pre>}
    </VStack>
  );
}
