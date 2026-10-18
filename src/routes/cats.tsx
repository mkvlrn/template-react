import { createFileRoute } from "@tanstack/react-router";
import { Pets } from "#/components/pets/pets";

function Cats() {
  return <Pets type="cat" />;
}

export const Route = createFileRoute("/cats")({ component: Cats });
