"use client";
import React, { useState } from "react";
import { Carousel } from "flowbite-react";
import Timer from "../../components/Timer";

const PersonalisedPageComponent = (props) => {
  const [templateImages, setTemplateImages] = useState([1, 2, 3, 4]);

  return (
    <>
      <div className="py-12">
        <h2 className="text-5xl font-bold">{props.couplesName}</h2>
      </div>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          {props.images && props.images.length > 0
            ? props.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="object-cover rounded-md"
                />
              ))
            : templateImages &&
              templateImages.length > 0 &&
              templateImages.map((imageNumber) => {
                return (
                  <img
                    src={`https://flowbite.com/docs/images/carousel/carousel-${imageNumber}.svg`}
                    alt="..."
                  />
                );
              })}
        </Carousel>
      </div>
      <div>
        <Timer
          startDate={"2024-06-15"}
          // startDate={props.startDate}
        ></Timer>
      </div>
      <div className="sm:mt-4 sm:mb-2 xl:pb-16">
        <article className="leading-loose">{props.message}</article>
      </div>
    </>
  );
};

export default PersonalisedPageComponent;
