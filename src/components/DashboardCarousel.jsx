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
    <Carousel className="w-11/12 max-w-xl h-11/12">
      <CarouselContent className="-ml-1 md:-ml-4">
        {events.slice(0, 5).map((event, index) => (
          <CarouselItem key={event.id || index} className="pl-2 md:basis-1/2 lg:basis-2/4">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{event.title}</span>
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