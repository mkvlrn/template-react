import { Activity } from "react";
import { type Pet, usePets } from "#/components/pets/use-pets";

interface PetsProps {
  type: Pet;
}

export function Pets({ type }: PetsProps) {
  const pets = usePets(type);
  const loadingErrorMsg = "Error loading pet :(";
  const activityModes = ["hidden", "visible"] as const;
  function activityMode(active: boolean) {
    return activityModes[Number(active)];
  }
  const loadingIndicator = "🐾";
  return (
    <div className="flex m-auto items-center justify-center p-4 h-full overflow-hidden">
      <Activity mode={activityMode(pets.error)}>
        <div>{loadingErrorMsg}</div>
      </Activity>
      <Activity mode={activityMode(pets.loading)}>
        <div className="text-6xl animate-spin">{loadingIndicator}</div>
      </Activity>
      <Activity mode={activityMode(pets.ready)}>
        <img
          alt={`${type}!`}
          className="object-contain max-w-full max-h-full animate-fade-in"
          key={pets.data}
          src={pets.data}
        />
      </Activity>
    </div>
  );
}
