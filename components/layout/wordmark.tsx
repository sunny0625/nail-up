import Link from "next/link";
import { businessConfig } from "@/lib/config/business";

/** The Nail Up wordmark, linking to the home route. The label comes from Business_Config. */
export function Wordmark() {
  return (
    <Link
      href="/"
      className="font-serif text-xl font-semibold tracking-tight md:text-2xl"
    >
      {businessConfig.facts.name}
    </Link>
  );
}
