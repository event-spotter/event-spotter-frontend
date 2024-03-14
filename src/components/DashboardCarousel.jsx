import * as React from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
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
    <>
    <div className="flex items-center justify-center">
      <Carousel className="w-full max-w-4xl h-full m-16">
        <CarouselContent>
          {events.slice(0, 5).map((event, index) => (
            <CarouselItem
              key={event.id || index}
              className="pl-2 sm:w-1/2 md:basis-1/3 lg:w-2/4"
            >
              <div className="p-1">
                <Card className="h-full w-full ml-2 bg-[color:var(--light-grey)]">
                  <CardContent className="flex flex-col gap-2 items-center justify-center">
                  <img
                      className="h-64 w-full object-cover"
                      src={event.image}
                      alt={event.title}
                    />
                    <span className="pt-1 text-xl font-semibold">{event.title}</span>
                   
                    <span className="text-md font-semibold mt-1">
                      {event.location}
                    </span>
                    <Link to={`/events/${event._id}`}>
                  <Button variant="button" size="sm" className="mx-4 mb-4">
                    See details
                  </Button>
                </Link>
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

<div className="flex flex-col justify-center items-center text-center mb-6">
<Link to={`/events`}>
  <Button variant="button" className="mb-20">See all Events</Button>
</Link>
</div>
</>
  );
}

export default DashboardCarousel;
