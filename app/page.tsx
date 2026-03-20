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
    </section>
  );
}
