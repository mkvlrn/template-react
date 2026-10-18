import { useQuery } from "@tanstack/react-query";

type Pet = "dog" | "cat";

const PET_TO_URL: Record<Pet, string> = {
  cat: "https://api.thecatapi.com/v1/images/search",
  dog: "https://dog.ceo/api/breeds/image/random",
};

function isDogResponse(value: unknown): value is { message: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "message" in value &&
    typeof value.message === "string"
  );
}

function isCatResponse(value: unknown): value is [{ url: string }] {
  if (!Array.isArray(value)) {
    return false;
  }
  const [first] = value;
  return (
    typeof first === "object" && first !== null && "url" in first && typeof first.url === "string"
  );
}

function extractUrlFromResponse(pet: Pet, response: unknown): string {
  switch (pet) {
    case "dog": {
      if (!isDogResponse(response)) {
        throw new Error("Invalid dog response");
      }
      return response.message;
    }
    case "cat": {
      if (!isCatResponse(response)) {
        throw new Error("Invalid cat response");
      }
      const [first] = response;
      return first.url;
    }
    default: {
      throw new Error("Invalid pet type");
    }
  }
}

async function getPet(pet: Pet): Promise<string> {
  const preUrl = `${PET_TO_URL[pet]}?t=${Date.now()}`;
  const response = await fetch(preUrl);
  const json = await response.json();
  return extractUrlFromResponse(pet, json);
}

function usePets(pet: Pet): {
  data: string | undefined;
  error: boolean;
  loading: boolean;
  ready: boolean;
} {
  const query = useQuery({
    queryFn: async () => getPet(pet),
    queryKey: [pet],
    refetchInterval: 5000,
  });

  return {
    data: query.data,
    error: query.isError,
    loading: query.isFetching,
    ready: !query.isFetching && !query.isError,
  };
}

export { type Pet, usePets };
