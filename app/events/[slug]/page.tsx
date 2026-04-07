import Image from "next/image";
import { notFound } from "next/navigation";

import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function formatDate(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

function getModeLabel(mode: string) {
  const labels: Record<string, string> = {
    online: "Combate Online",
    offline: "Encuentro Presencial",
    hybrid: "Modo Hibrido",
  };

  return labels[mode] ?? mode;
}

async function getEvent(slug: string) {
  const response = await fetch(`${BASE_URL}/api/events/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    notFound();
  }

  const { event }: { event: IEvent | null } = await response.json();

  if (!event) {
    notFound();
  }

  return event;
}

export default async function EventDetailPage(
  props: PageProps<"/events/[slug]">,
) {
  const { slug } = await props.params;
  const event = await getEvent(slug);

  return (
    <section
      id="event"
      className="relative overflow-hidden rounded-[32px] border border-[#eadfcb] bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,244,214,0.92)_100%)] px-6 py-8 shadow-[0_30px_80px_rgba(42,117,187,0.12)] sm:px-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-3rem] top-[-4rem] h-40 w-40 rounded-full border-[14px] border-[#ef5350]/20 bg-white/40" />
        <div className="absolute right-[-2rem] top-10 h-28 w-28 rounded-full border-[10px] border-[#2a75bb]/20 bg-white/40" />
        <div className="absolute bottom-[-5rem] left-1/2 h-44 w-44 -translate-x-1/2 rounded-full border-[16px] border-[#ffca28]/20 bg-white/30" />
      </div>

      <div className="relative z-10 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-[#b71c1c]/30 bg-[#ef5350] px-4 py-2 text-sm font-semibold text-white">
              {getModeLabel(event.mode)}
            </span>
            <span className="rounded-full border border-[#d6b756] bg-[#fff4bf] px-4 py-2 text-sm font-semibold text-[#5a4300]">
              {event.audience}
            </span>
            <span className="rounded-full border border-[#7fa8d0] bg-[#dcecff] px-4 py-2 text-sm font-semibold text-[#154773]">
              Organiza {event.organizer}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#2a75bb]">
              Pokemon Trainer Event
            </p>
            <h1 className="max-w-4xl text-left text-5xl leading-none sm:text-6xl">
              {event.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-[#4c5663] sm:text-xl">
              {event.overview}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <article className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_rgba(239,83,80,0.12)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ef5350]">
                Fecha
              </p>
              <p className="mt-3 text-2xl font-black text-[#20242b]">
                {formatDate(event.date)}
              </p>
              <p className="mt-2 text-sm text-[#5f6b7a]">{event.time}</p>
            </article>

            <article className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_rgba(42,117,187,0.12)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#2a75bb]">
                Ubicacion
              </p>
              <p className="mt-3 text-2xl font-black text-[#20242b]">
                {event.location}
              </p>
              <p className="mt-2 text-sm text-[#5f6b7a]">{event.venue}</p>
            </article>

            <article className="rounded-[24px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_40px_rgba(255,202,40,0.22)] backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#ad7b00]">
                Entrenadores
              </p>
              <p className="mt-3 text-2xl font-black text-[#20242b]">
                {event.tags.length}
              </p>
              <p className="mt-2 text-sm text-[#5f6b7a]">
                tipos de experiencia destacados
              </p>
            </article>
          </div>

          <div className="rounded-[28px] border border-[#eadfcb] bg-white/70 p-6 shadow-[0_24px_60px_rgba(42,117,187,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black text-[#20242b]">
                Mision del evento
              </h2>
              <div className="h-4 w-4 rounded-full bg-[#ef5350] shadow-[20px_0_0_#ffca28,40px_0_0_#2a75bb]" />
            </div>
            <p className="mt-4 text-base leading-8 text-[#46515f] sm:text-lg">
              {event.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[30px] border-4 border-white bg-[#fff8e7] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.12)]">
            <div className="absolute left-1/2 top-0 z-10 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-[#1f1f1f] bg-white" />
            <Image
              src={event.image}
              alt={event.title}
              width={900}
              height={1100}
              className="h-[320px] w-full rounded-[24px] object-cover sm:h-[420px]"
              priority
            />
          </div>

          <div className="rounded-[28px] border border-[#eadfcb] bg-[linear-gradient(135deg,rgba(42,117,187,0.08)_0%,rgba(255,255,255,0.88)_35%,rgba(255,202,40,0.12)_100%)] p-6">
            <h2 className="text-2xl font-black text-[#20242b]">
              Ruta del entrenador
            </h2>
            <ul className="mt-5 space-y-4">
              {event.agenda.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="flex gap-4 rounded-[20px] border border-white/80 bg-white/80 px-4 py-4 shadow-[0_16px_36px_rgba(42,117,187,0.08)]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2a75bb] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <p className="text-base leading-7 text-[#33404f]">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#eadfcb] bg-white/80 p-6 shadow-[0_16px_36px_rgba(239,83,80,0.08)]">
            <h2 className="text-2xl font-black text-[#20242b]">
              Insignias del evento
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#d8c59a] bg-[#fff8db] px-4 py-2 text-sm font-semibold text-[#5a4300]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
