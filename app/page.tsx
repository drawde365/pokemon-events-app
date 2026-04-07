import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database/event.model";
// import { events } from "@/lib/Constants";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function HomePage() {
  const response = await fetch(`${BASE_URL}/api/events`);
  const { events }: { events: IEvent[] } = await response.json();
  // console.log(events);
  if (events) {
    console.log(events);
  } else console.log("Nada");
  return (
    <section>
      <h1 className={"text-center"}>
        Bienvenido a la mejor pagina sobre eventos de Pokemon
      </h1>
      <p className={"text-center"}>
        Aqui encontraras los mejores y mas próximos eventos de tu Pokemon
      </p>
      <ExploreBtn />
      <div className={"mt-20 space-y-7"}>
        <h3>Featured Events</h3>
        <ul className={"events"}>
          {events &&
            events.length > 0 &&
            events.map((event) => (
              <li key={event.title}>
                <EventCard {...event} />
                {/*<EventCard title={event.title} image={event.image} />*/}
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
