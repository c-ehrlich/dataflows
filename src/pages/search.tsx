import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { Product } from "../product/Product";
import { trpc } from "../utils/trpc";

export default function Search() {
  const [name, setName] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);
  const [dateMin, setDateMin] = useState(new Date("2021-01-01"));
  const [dateMax, setDateMax] = useState(new Date());

  const search = trpc.product.search.useQuery(
    {
      ...(name && { name }),
      priceMin,
      priceMax,
      dateMin,
      dateMax,
    },
    {
      enabled: false,
    }
  );

  return (
    <Stack gap={2}>
      <Heading>Search</Heading>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <Flex gap={4}>
        <FormControl>
          <FormLabel>Min Price</FormLabel>
          <NumberInput
            defaultValue={priceMin}
            onChange={(e) => setPriceMin(Number(e))}
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
        <FormControl>
          <FormLabel>Max Price</FormLabel>
          <NumberInput
            defaultValue={priceMax}
            onChange={(e) => setPriceMax(Number(e))}
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
      </Flex>
      <Flex gap={4}>
        <FormControl>
          <FormLabel>Newer than</FormLabel>
          <DatePicker
            selected={dateMin}
            onChange={(date) => setDateMin(date ?? new Date())}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Older than</FormLabel>
          <DatePicker
            selected={dateMax}
            onChange={(date) => setDateMax(date ?? new Date())}
          />
        </FormControl>
      </Flex>
      <Button onClick={() => search.refetch()}>Search</Button>
      {search.data && (
        <Stack gap={2}>
          <Heading>Search Results</Heading>
          {search.data.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
