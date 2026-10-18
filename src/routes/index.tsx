import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "#/components/logo/logo";
import { Tagline } from "#/components/tagline/tagline";
import { Title } from "#/components/title/title";

function Home() {
  return (
    <div className="m-auto">
      <Title />
      <Tagline />
      <Logo />
    </div>
  );
}

export const Route = createFileRoute("/")({ component: Home });
