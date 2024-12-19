import Link from "next/link";

type LinkProps = typeof Link extends (props: infer P) => any ? P : never;
export function PositionLink({
  href,
  children,
  topOffset = 90,
  ...props
}: LinkProps & {
  topOffset?: number;
}) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const hash = href as string;
        const target = document.querySelector(hash);
        if (target) {
          const elementPosition =
            target.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - topOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
