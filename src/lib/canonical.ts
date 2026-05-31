const SITE = "https://getdetach.app";

export const setCanonical = (path: string) => {
  const href = path.startsWith("http") ? path : `${SITE}${path}`;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
};

export const resetCanonical = () => {
  const link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (link) link.href = `${SITE}/`;
};

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const DEFAULTS = {
  title: "Detach App Blocker – Block Social Media & Reduce Screen Time",
  description:
    "Detach is an app blocker that helps you reduce screen time by blocking social media and distracting apps. Free for iOS 17+.",
  type: "website" as const,
  url: `${SITE}/`,
};

export interface SocialMetaOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

export const setSocialMeta = ({ title, description, path, type = "website" }: SocialMetaOptions) => {
  const url = path.startsWith("http") ? path : `${SITE}${path}`;
  document.title = title;
  setMeta('meta[name="description"]', "name", "description", description);
  setMeta('meta[property="og:title"]', "property", "og:title", title);
  setMeta('meta[property="og:description"]', "property", "og:description", description);
  setMeta('meta[property="og:url"]', "property", "og:url", url);
  setMeta('meta[property="og:type"]', "property", "og:type", type);
  setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
};

export const resetSocialMeta = () => {
  setSocialMeta({
    title: DEFAULTS.title,
    description: DEFAULTS.description,
    path: "/",
    type: "website",
  });
};
