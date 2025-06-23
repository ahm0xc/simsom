import { api } from "~/trpc/server";

import PageClient from "./page.client";

export default async function HomePage() {
  const { greeting } = await api.example.hello({ text: "ahmed" });

  return (
    <div>
      <p>greeting from server: {greeting}</p>
      <PageClient />
    </div>
  );
}
