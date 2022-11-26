import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Box,
  Text,
  CardFooter,
  Flex,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { type RouterOutputs } from "../utils/trpc";
import { useDeleteProduct } from "./productHooks";

export function Product(props: {
  product: RouterOutputs["product"]["getAll"][number];
}) {
  const deleteProduct = useDeleteProduct();

  return (
    <Card key={props.product.id} shadow="lg" backgroundColor="white">
      <CardHeader>
        <Heading size="md">{props.product.name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Price
            </Heading>
            <Text pt="2" fontSize="sm">
              {props.product.price}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Created
            </Heading>
            <Text pt="2" fontSize="sm">
              {props.product.createdAt.toDateString()},{" "}
              {props.product.createdAt.toTimeString()}
            </Text>
          </Box>
        </Stack>
      </CardBody>
      <CardFooter>
        <Flex gap={4}>
          <Button as={Link} href={`/product/${props.product.id}`}>
            Details
          </Button>
          <Button
            onClick={() => deleteProduct.mutate({ id: props.product.id })}
          >
            Delete
          </Button>
        </Flex>
      </CardFooter>
    </Card>
  );
}
