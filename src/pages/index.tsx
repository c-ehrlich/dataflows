import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Spinner, Heading, Stack } from "@chakra-ui/react";

import { trpc } from "../utils/trpc";
import { Product } from "../product/Product";

export default function Index() {
  const products = trpc.product.getAll.useQuery();

  return (
    <div>
      <Heading>Products</Heading>
      {products.status === "success" ? (
        <Stack spacing="4">
          {products.data.length === 0 && <div>No products</div>}
          {products.data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Stack>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
