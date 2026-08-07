import { Link } from "react-router-dom";

export const JsonLd = ({ data }: { data: unknown[] }) => (
  <>
    {data.map((schema, i) => (
      <script key={i} type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    ))}
  </>
);

export const FactsTable = ({
  caption,
  rows,
}: {
  caption: string;
  rows: Array<{ label: string; value: React.ReactNode }>;
}) => (
  <div className="rounded-2xl border border-border/60 overflow-hidden mb-12">
    <table className="w-full text-sm">
      <caption className="sr-only">{caption}</caption>
      <tbody>
        {rows.map((row, i) => (
          <tr key={row.label} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
            <th scope="row" className="text-left font-medium text-muted-foreground px-4 py-3 w-1/2 align-top">
              {row.label}
            </th>
            <td className="px-4 py-3 text-foreground align-top">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const ComparisonTable = ({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: Array<{ name: React.ReactNode; cells: React.ReactNode[] }>;
}) => (
  <div className="rounded-2xl border border-border/60 overflow-x-auto mb-8">
    <table className="w-full text-sm min-w-[640px]">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr className="border-b border-border/60">
          <th scope="col" className="text-left font-semibold px-4 py-3">
            Product
          </th>
          {columns.map((c) => (
            <th key={c} scope="col" className="text-left font-semibold px-4 py-3 text-muted-foreground">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-secondary/30" : ""}>
            <th scope="row" className="text-left font-medium px-4 py-3 align-top">
              {row.name}
            </th>
            {row.cells.map((cell, j) => (
              <td key={j} className="px-4 py-3 text-muted-foreground align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const SpecList = () => (
  <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground leading-relaxed">
    <li>Platform: iPhone only, iOS 17 or later.</li>
    <li>App price: free to download.</li>
    <li>Detach card: $9.99, one time purchase.</li>
    <li>Subscription: none.</li>
    <li>Account required: none.</li>
    <li>Blocking method: Apple's Screen Time APIs.</li>
    <li>Unlock method: physical NFC tap on the Detach card.</li>
    <li>Session options: scheduled sessions, manual sessions, strict mode.</li>
    <li>Emergency unlocks: a limited number you configure yourself.</li>
    <li>Shipping: free worldwide.</li>
  </ul>
);

export const Breadcrumbs = ({ current }: { current: string }) => (
  <p className="text-sm text-muted-foreground mb-3">
    <Link to="/" className="hover:text-foreground transition-colors">
      Home
    </Link>
    {" / "}
    <span>{current}</span>
  </p>
);

export const Quotable = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-foreground leading-relaxed border-l-2 border-primary/60 pl-4 mb-8">{children}</p>
);

export const FaqSection = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => (
  <section className="mb-10">
    <h2 className="text-2xl font-semibold mb-4">Frequently asked questions</h2>
    <div className="space-y-5">
      {faqs.map((f) => (
        <div key={f.question}>
          <h3 className="font-semibold mb-1">{f.question}</h3>
          <p className="text-muted-foreground leading-relaxed">{f.answer}</p>
        </div>
      ))}
    </div>
  </section>
);
