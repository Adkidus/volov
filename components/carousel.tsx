import React, { FC, ReactNode, useState, useEffect, useRef } from "react";
import { Block, Flex, IconButton } from "vcc-ui";

type Props = {
  items: number;
  children?: ReactNode;
};

let initX: number;
let firstX: number;

const Carousel: FC<Props> = ({ items, children }) => {
  const carouselWrapper = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (carouselWrapper && carouselWrapper.current) {
      window.addEventListener("resize", handleResize);
      carouselWrapper.current.addEventListener(
        "mousedown",
        function (e) {
          e.preventDefault();
          initX = getTransform();
          firstX = e.pageX;
          this.addEventListener("mousemove", drag, false);
          window.addEventListener(
            "mouseup",
            function () {
              carouselWrapper.current?.removeEventListener(
                "mousemove",
                drag,
                false
              );
            },
            false
          );
        },
        false
      );
      carouselWrapper.current.addEventListener(
        "touchstart",
        function (e) {
          e.preventDefault();
          initX = getTransform();
          var touch = e.touches;
          firstX = touch[0].pageX;
          carouselWrapper.current?.addEventListener("touchmove", swipe, false);
          window.addEventListener(
            "touchend",
            function (e) {
              carouselWrapper.current?.removeEventListener(
                "touchmove",
                swipe,
                false
              );
            },
            false
          );
        },
        false
      );
    }
  }, []);
  useEffect(() => {
    if (carouselWrapper.current)
      carouselWrapper.current.style.transform = `translate3d(0px,0,0)`;
    setSlide(0);
  }, [items]);
  function getTransform(): number {
    const transform = carouselWrapper.current?.style.transform;
    const re = /translate3d\((?<x>.*?)px, (?<y>.*?)px, (?<z>.*?)px/;
    let results;
    if (transform) results = re.exec(transform);
    return results ? +(results[1] || 0) : 0;
  }
  function drag(e: any): void {
    if (carouselWrapper.current) {
      const x = initX + e.pageX - firstX;
      let p = +(
        ((100 * x * -1) / carouselWrapper.current.offsetWidth) *
        -1 *
        -1
      ).toFixed(2);
      if (p < 0 || p >= 100) {
        return;
      }
      carouselWrapper.current.style.transform = `translate3d(${x}px,0,0)`;
      const itemWidth = carouselWrapper.current.children[0].clientWidth;
      const transform = -getTransform();
      setSlide(-Math.round(transform / itemWidth));
    }
  }
  function swipe(e: any): void {
    if (carouselWrapper.current) {
      const contact = e.touches;
      const x = initX + contact[0].pageX - firstX;
      const itemWidth = carouselWrapper.current.children[0].clientWidth;
      const maxW = itemWidth * items;
      const xvalue = -x;
      if (x > 0 || xvalue + itemWidth >= maxW) return;
      carouselWrapper.current.style.transform = `translate3d(${
        initX + contact[0].pageX - firstX
      }px,0,0)`;
      updateSlideMobile();
    }
  }
  function handleResize(): void {
    if (carouselWrapper.current)
      carouselWrapper.current.style.transform = `translate3d(0px,0,0)`;
  }
  function updateSlideMobile(): void {
    if (carouselWrapper.current) {
      const itemWidth = carouselWrapper.current.children[0].clientWidth;
      const transform = -getTransform();
      setSlide(Math.round(transform / itemWidth));
    }
  }
  function updateSlide(amount: number): void {
    setSlide((currentSlide: number): number => {
      if (amount > 0 && currentSlide === 0) return currentSlide;
      if (carouselWrapper.current) {
        const itemWidth = carouselWrapper.current.children[0].clientWidth;
        carouselWrapper.current.style.transform = `translate3d(${
          itemWidth * (currentSlide + amount)
        }px,0,0)`;
      }
      return currentSlide + amount;
    });
  }
  return (
    <Block extend={{ overflow: "hidden" }}>
      <Block className="carousel" extend={{ overflow: "hidden" }}>
        <Flex
          ref={carouselWrapper}
          extend={{
            width: "100%",
            flexFlow: "row nowrap",
            transition: "transform 1s linear",
          }}
        >
          {React.Children.map(children, (child) => {
            return (
              <Block
                extend={{
                  flex: "0 0 25%",
                  "@media (max-width: 768px)": {
                    flex: "0 0 70%",
                  },
                }}
              >
                {child}
              </Block>
            );
          })}
        </Flex>
      </Block>
      <Flex extend={{ marginTop: "1rem" }}>
        <Flex
          extend={{
            flexDirection: "row",
            justifyContent: "center",
            "@media (min-width: 769px)": {
              display: "none",
            },
          }}
        >
          {[...Array(items).keys()].map((key: number) => (
            <Block
              key={key}
              extend={{
                borderRadius: "100%",
                background: "#000",
                width: "8px",
                height: "8px",
                margin: "0 4px",
                opacity: slide === key ? 1 : 0.2,
              }}
            />
          ))}
        </Flex>
        <Flex
          extend={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            gap: ".5rem",
            "@media (max-width: 768px)": {
              display: "none",
            },
          }}
        >
          <Block>
            <IconButton
              disabled={slide === 0}
              iconName="navigation-chevronback"
              onClick={() => updateSlide(1)}
              variant="outline"
            />
          </Block>
          <Block>
            <IconButton
              disabled={slide - 3 < -items + 2}
              iconName="navigation-chevronforward"
              onClick={() => updateSlide(-1)}
              variant="outline"
            />
          </Block>
        </Flex>
      </Flex>
    </Block>
  );
};

export default Carousel;
