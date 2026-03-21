import ExploreBtn from "@/components/ExploreBtn";

export default function HomePage() {
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
          {[1, 2, 3, 4].map((event) => (
            <li key={event}>Evento {event}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
