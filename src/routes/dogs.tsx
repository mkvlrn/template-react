import { createFileRoute } from "@tanstack/react-router";
import { Pets } from "#/components/pets/pets";

function Dogs() {
  return <Pets type="dog" />;
}

export const Route = createFileRoute("/dogs")({ component: Dogs });
