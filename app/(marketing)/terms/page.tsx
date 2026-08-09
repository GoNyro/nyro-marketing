import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Eyebrow } from "@/components/marketing/primitives/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/* Terms for THIS marketing site only. Use of the Engage platform is governed
   by each customer's subscription agreement - these terms deliberately do not
   reach into the product. */

const { legal } = siteConfig;

export const metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "The terms that govern use of the engage.online marketing website, operated by Nyro.",
  path: "/terms",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Terms of Use", href: "/terms" },
        ])}
      />
      <Container className="py-20 md:py-28">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="display-md mt-4">Terms of Use</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated {formatDate(legal.termsUpdated)}
        </p>

        <div className="prose-like mt-10">
          <p data-speakable>
            These terms govern your use of the {siteConfig.name} marketing
            website at {siteConfig.url.replace("https://", "")}, operated by{" "}
            {legal.entity} (&quot;we&quot;, &quot;us&quot;). By using the site
            you accept them. Use of the Engage platform itself is governed by
            the subscription agreement between {legal.entity} and the customer
            organisation - not by these terms.
          </p>

          <h2>Use of the site</h2>
          <p>
            You may browse the site and share its content for evaluating
            Engage. Don&apos;t misuse it: no attempting to break, probe or
            overload it, no scraping at volumes that affect others, and no
            passing our content off as your own.
          </p>

          <h2>Content and accuracy</h2>
          <p>
            We keep the site accurate and current, but its content is provided
            for general information about our products and doesn&apos;t form
            part of any contract. Product capabilities, availability and
            roll-out described here can change as the platform develops.
            Pricing is always confirmed in writing per engagement.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The site, the Engage name, the wordmark and all site content belong
            to {legal.entity} or its licensors. Third-party names mentioned on
            the site belong to their owners and are used for identification
            only.
          </p>

          <h2>Liability</h2>
          <p>
            To the extent the law allows, we exclude liability for loss arising
            from reliance on the site&apos;s content or from interruptions to
            its availability. Nothing in these terms limits rights you have
            under the New Zealand Consumer Guarantees Act 1993 or other law
            that can&apos;t be contracted out of.
          </p>

          <h2>Governing law</h2>
          <p>
            These terms are governed by New Zealand law, and the New Zealand
            courts have exclusive jurisdiction.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms:{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
            . See also our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
