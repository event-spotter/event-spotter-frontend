import * as React from "react"

import { Card, CardContent } from "../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel"

function DashboardCarousel({events}) {
  return (
    <div className="flex items-center justify-center">
    <Carousel className="w-11/12 max-w-4xl h-11/12 mt-8 mb-8">
      <CarouselContent className="-ml-1 md:-ml-4">
        {events.slice(0, 5).map((event, index) => (
          <CarouselItem key={event.id || index} className="pl-2 md:basis-1/2 lg:basis-2/4">
            <div className="p-1">
              <Card className="h-80 w-80" >
                <CardContent className="flex flex-col gap-8 items-center justify-center">
                  <span className="text-xl font-semibold">{event.title}</span>
                  <span className="text-lg font-semibold">{event.description}</span>
                  <span className="text-md font-semibold">{event.location}</span>
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
  )
}



export default DashboardCarousel