import { businessConfig } from "@/lib/config/business";

const linkClass =
  "inline-block border-b border-transparent py-xs transition-colors duration-(--motion-duration) ease-(--motion-ease) hover:border-current";

/**
 * WhatsApp, Instagram and email contact links. Every URL comes from
 * Business_Config; the Instagram URL carries no query or tracking parameters.
 * External links open in a new browsing context.
 */
export function SocialLinks() {
  const { facts } = businessConfig;

  return (
    <ul className="flex flex-col">
      <li>
        <a
          href={facts.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${facts.name} on WhatsApp`}
          className={linkClass}
        >
          WhatsApp
        </a>
      </li>
      <li>
        <a
          href={facts.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${facts.name} on Instagram`}
          className={linkClass}
        >
          Instagram
        </a>
      </li>
      <li>
        <a href={`mailto:${facts.email}`} className={`${linkClass} break-all`}>
          {facts.email}
        </a>
      </li>
    </ul>
  );
}
