import Image from "next/image";
import * as React from "react";
import { Block, Flex, Link, Spacer, Text } from "vcc-ui";
import { ICar } from "../types/car";

type Props = {
  car: ICar;
};

const Car: React.FC<Props> = ({
  car: { id, modelName, bodyType, modelType, imageUrl },
}) => {
  return (
    <Block>
      <Flex extend={{ margin: "0 .5rem" }}>
        <Text
          fg="foreground.secondary"
          subStyle="emphasis"
          variant="bates"
          extend={{ textTransform: "uppercase" }}
        >
          {bodyType}
        </Text>
        <Flex
          extend={{
            flexDirection: "row",
            gap: ".25rem",
            "@media (max-width: 768px)": {
              flexDirection: "column",
              gap: 0,
            },
          }}
        >
          <Text subStyle="emphasis">{modelName}</Text>
          <Text fg="foreground.secondary">{modelType}</Text>
        </Flex>
        <Spacer size={{ default: 2 }} />
        <Image
          src={imageUrl}
          alt={id}
          width={800}
          height={600}
          layout="responsive"
          draggable="false"
        />
        <Flex
          extend={{
            marginTop: ".5rem",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Link href={`/learn/${id}`} arrow="right">
            Learn
          </Link>
          <Link href={`/shop/${id}`} arrow="right">
            Shop
          </Link>
        </Flex>
      </Flex>
    </Block>
  );
};

export default Car;
