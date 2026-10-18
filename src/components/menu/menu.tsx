import { Link } from "@tanstack/react-router";

export function Menu() {
  const menu: { to: string; text: string }[] = [
    { text: "Home", to: "/" },
    { text: "Dogs!", to: "/dogs" },
    { text: "Cats!", to: "/cats" },
  ];

  return (
    <div className="p-2 flex gap-4 border-b">
      {menu.map((item) => (
        <Link className="[&.active]:font-bold" key={item.text} to={item.to}>
          {item.text}
        </Link>
      ))}
    </div>
  );
}
