import { ICar } from "../../types/car";
const cars: ICar[] = require("../../public/api/cars.json");
import { GetStaticProps } from 'next'
import * as React from "react";
import { Text } from "vcc-ui";

export const getStaticProps: GetStaticProps = async ({params}) => {
  const car = cars.find((c) => c.id.toString() === params?.id);
  return {
    props: {
      car,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = cars.map((car: ICar) => ({
    params: { id: car.id.toString() },
  }));

  return { paths, fallback: false };
};

type Props = {
    car: ICar;
};
  
const Shop: React.FC<Props> = ({
    car: { id },
}) => {
  return <Text>Shop: {id}</Text>;
};

export default Shop;
