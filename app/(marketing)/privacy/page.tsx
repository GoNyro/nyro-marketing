import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Eyebrow } from "@/components/marketing/primitives/Eyebrow";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* Marketing-site privacy notice. Deliberately scoped to THIS site
   (engage.online): the logged-in platform at app.engage.online is governed by
   each customer's subscription agreement and the platform's own notices.
   Conflating them would misstate both.

   Entity details come from siteConfig.legal so they can't drift. */

const { legal } = siteConfig;

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Nyro collects and uses personal information on engage.online - cookies, analytics, contact enquiries, your rights under the NZ Privacy Act 2020, and how to reach us.",
  path: "/privacy",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* Cookie table. Keep this in step with what the site actually loads:
   components/analytics/Analytics.tsx and lib/analytics.ts are the source of
   truth. Third-party scripts only load when their IDs are configured - an
   inaccurate cookie notice is worse than none. */
const COOKIES: {
  name: string;
  provider: string;
  purpose: string;
  category: string;
}[] = [
  {
    name: "_ga, _ga_*",
    provider: "Google Analytics 4",
    purpose:
      "Aggregated, pseudonymised measurement of how many people visit, which pages they read, and which channels bring them here.",
    category: "Analytics",
  },
  {
    name: "__hs_opt_out, hubspotutk, __hstc",
    provider: "HubSpot (if enabled)",
    purpose:
      "Remembers cookie choices and, if you contact us, connects your enquiry to the pages you found useful so we can have a more informed conversation.",
    category: "Analytics",
  },
];

const RIGHTS = [
  "Ask for a copy of the personal information we hold about you.",
  "Ask us to correct information that is wrong or incomplete.",
  "Ask us to delete personal information we no longer need.",
  "Withdraw consent to analytics cookies at any time.",
  "Complain to the regulator if you think we've got it wrong.",
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ])}
      />
      <Container className="py-20 md:py-28">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="display-md mt-4">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Last updated {formatDate(legal.privacyUpdated)}
        </p>

        <div className="prose-like mt-10">
          <p data-speakable>
            This notice covers the {siteConfig.name} marketing website at{" "}
            {siteConfig.url.replace("https://", "")}, operated by {legal.entity}
            , a New Zealand company. The Engage platform itself (at
            app.engage.online and tenant subdomains) is governed by each
            customer&apos;s subscription agreement - if you use Engage through
            your employer or supplier, they control that data and this notice
            doesn&apos;t change it.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Enquiries.</strong> If you email us or book a demo, we
              keep your name, contact details and what you told us, so we can
              reply and follow up. Legal basis: taking steps you asked for
              ahead of a possible contract.
            </li>
            <li>
              <strong>Usage analytics.</strong> With your consent where
              required, we use analytics cookies to understand how the site is
              used. The data is aggregated and pseudonymised - we don&apos;t
              use it to identify you.
            </li>
            <li>
              <strong>Server logs.</strong> Our hosting provider records IP
              addresses and requests for security and debugging, retained
              briefly.
            </li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Third-party scripts load only when configured, and analytics
            cookies are set only after consent where consent is required.
          </p>
        </div>

        <div className="mt-8 max-w-3xl overflow-x-auto rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cookies</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COOKIES.map((cookie) => (
                <TableRow key={cookie.name}>
                  <TableCell className="whitespace-normal font-mono text-xs">
                    {cookie.name}
                  </TableCell>
                  <TableCell className="whitespace-normal">{cookie.provider}</TableCell>
                  <TableCell className="whitespace-normal">{cookie.purpose}</TableCell>
                  <TableCell className="whitespace-normal">{cookie.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="prose-like mt-10">
          <h2>Who we share it with</h2>
          <p>
            Service providers who host this site and process analytics on our
            behalf, under their own data-processing terms. We don&apos;t sell
            personal information, and we don&apos;t share enquiry details with
            anyone else unless the law requires it.
          </p>

          <h2>Your rights</h2>
          <ul>
            {RIGHTS.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
          <p>
            {legal.entity} is established in New Zealand, so the Privacy Act
            2020 applies and the regulator is the{" "}
            <a href={legal.regulatorUrl} target="_blank" rel="noopener noreferrer">
              {legal.regulator}
            </a>
            . To exercise any of these rights, email{" "}
            <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            {legal.entity}, {legal.address.join(", ")} ·{" "}
            <a href={`mailto:${legal.privacyEmail}`}>{legal.privacyEmail}</a>
          </p>
          <p>
            See also our <Link href="/terms">Terms of Use</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
