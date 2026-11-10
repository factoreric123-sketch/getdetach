import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Order = {
  date: string;
  email: string | null;
  country: string | null;
  isUs: boolean;
  quantity: number;
  amountCents: number;
  commissionCents: number;
  currency: string;
};

type DashboardData = {
  name: string | null;
  code: string;
  usCommissionCents: number;
  intlCommissionCents: number;
  totalOrders: number;
  usOrders: number;
  intlOrders: number;
  totalCommissionCents: number;
  orders: Order[];
};

const money = (cents: number, currency = "usd") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);

const AffiliateDashboard = () => {
  const { code } = useParams<{ code: string }>();
  const [searchParams] = useSearchParams();
  const affiliateCode = (code || "").toLowerCase().trim();

  const storageKey = `detach_affiliate_key_${affiliateCode}`;
  const [token, setToken] = useState(() => searchParams.get("key") || "");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async (key: string) => {
    if (!affiliateCode || !key) return;
    setLoading(true);
    setError(null);
    const { data: result, error: fnError } = await supabase.functions.invoke("affiliate-dashboard", {
      body: { code: affiliateCode, token: key },
    });
    setLoading(false);
    if (fnError || !result || result.error) {
      setData(null);
      setError("This link is not valid. Check your affiliate dashboard link and try again.");
      return;
    }
    setData(result as DashboardData);
    try {
      localStorage.setItem(storageKey, key);
    } catch {
      // storage unavailable, page still works
    }
  };

  useEffect(() => {
    let initial = searchParams.get("key") || "";
    if (!initial) {
      try {
        initial = localStorage.getItem(storageKey) || "";
      } catch {
        initial = "";
      }
    }
    if (initial) {
      setToken(initial);
      void load(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [affiliateCode]);

  useEffect(() => {
    document.title = data?.name ? `${data.name} | Affiliate Dashboard` : "Affiliate Dashboard";
  }, [data?.name]);

  const monthlyOrders = useMemo(() => {
    if (!data) return 0;
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return data.orders.filter((o) => new Date(o.date).getTime() >= cutoff).length;
  }, [data]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        {!data ? (
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-3xl font-semibold tracking-tight">Affiliate Dashboard</h1>
            <p className="mt-3 text-foreground/80">
              Enter the access key from your personal affiliate link to see your referred orders and earnings.
            </p>
            <form
              className="mt-8 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                void load(token.trim());
              }}
            >
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Access key"
                className="bg-card text-center"
                autoComplete="off"
              />
              <Button type="submit" disabled={loading || !token.trim()}>
                {loading ? "Loading…" : "View dashboard"}
              </Button>
            </form>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            <p className="mt-8 text-sm text-foreground/80">
              Need help? Email us at{" "}
              <a href="mailto:getdetach@gmail.com" className="text-foreground underline">
                getdetach@gmail.com
              </a>
              .
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-semibold tracking-tight">
              Hi{data.name ? ` ${data.name.split(" ")[0]}` : ""}, here are your numbers
            </h1>
            <p className="mt-2 text-foreground/80">
              Your affiliate link:{" "}
              <span className="text-foreground">{`https://getdetach.app/?ref=${data.code}`}</span>
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-foreground/80">Total earned</p>
                <p className="mt-1 text-2xl font-semibold">{money(data.totalCommissionCents)}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-foreground/80">Orders</p>
                <p className="mt-1 text-2xl font-semibold">{data.totalOrders}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-foreground/80">Last 30 days</p>
                <p className="mt-1 text-2xl font-semibold">{monthlyOrders}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm text-foreground/80">Per order</p>
                <p className="mt-1 text-2xl font-semibold">{money(data.usCommissionCents)}</p>
                <p className="text-xs text-foreground/80">
                  US · {money(data.intlCommissionCents)} intl
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-xl font-semibold">Referred orders</h2>
            {data.orders.length === 0 ? (
              <p className="mt-3 text-foreground/80">
                No orders yet. Share your link and new orders will show up here in real time.
              </p>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-card text-foreground/80">
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Customer</th>
                      <th className="px-4 py-3 font-medium">Country</th>
                      <th className="px-4 py-3 font-medium text-right">Order</th>
                      <th className="px-4 py-3 font-medium text-right">Your cut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((o, i) => (
                      <tr key={i} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(o.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-4 py-3">{o.email || "—"}</td>
                        <td className="px-4 py-3">{o.country || "—"}</td>
                        <td className="px-4 py-3 text-right">{money(o.amountCents, o.currency)}</td>
                        <td className="px-4 py-3 text-right font-medium">{money(o.commissionCents, o.currency)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="mt-6 text-sm text-foreground/80">
              Customer emails are partially hidden for privacy. Orders appear here the moment a purchase with your link
              is completed.
            </p>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AffiliateDashboard;
