import * as React from "react";

import { Card, CardContent } from "../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

function DashboardCarousel({ events }) {
  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-full max-w-4xl h-full mt-8 mb-8">
        <CarouselContent className="-ml-1 md:-ml-4">
          {events.slice(0, 5).map((event, index) => (
            <CarouselItem
              key={event.id || index}
              className="pl-2 md:basis-1/2 lg:basis-2/4"
            >
              <div className="p-1">
                <Card className="h-full w-full bg-sky-50">
                  <CardContent className="flex flex-col gap-2 items-center justify-center">
                    <span className="pt-6 text-xl font-semibold">{event.title}</span>
                    <img
                      className="h-56 w-full rounded-lg object-cover"
                      src={event.image}
                      alt={event.title}
                    />
                    <span className="text-md font-semibold">
                      {event.location}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default DashboardCarousel;
