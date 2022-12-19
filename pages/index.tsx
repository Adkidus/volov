import { useState } from "react";
import Car from "../components/car";
import { ICar } from "../types/car";
import { InferGetStaticPropsType } from "next";
import Carousel from "../components/carousel";
import { Spacer, TextInput, View } from "vcc-ui";
const cars: ICar[] = require("../public/api/cars.json");

export default function IndexPage({
  cars,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [carsList, setCarsList] = useState([...cars]);
  const [term, setTerm] = useState("");
  const search = (e: { target: { value: string } }) => {
    const keyword = e.target.value;
    const results = cars.filter((car: ICar) =>
      car.bodyType
        .toLocaleLowerCase()
        .trim()
        .includes(keyword.toLocaleLowerCase().trim())
    );
    setCarsList(results);
    setTerm(keyword);
  };
  return (
    <View margin={{ default: 1, fromM: 2, fromL: 4, fromXL: 4 }}>
      <TextInput value={term} label="Search" onChange={search} />
      <Spacer size={{ default: 4 }} />
      <Carousel items={carsList.length}>
        {carsList.map((car: ICar) => (
          <Car key={car.id} car={car} />
        ))}
      </Carousel>
    </View>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      cars,
    },
  };
};
