"use client";

import { api } from "~/trpc/react";

export default function PageClient() {
  const { data } = api.example.hello.useQuery({ text: "ahmed" });
  return <div>greeting from client: {data?.greeting}</div>;
}
