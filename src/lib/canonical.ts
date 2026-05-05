export const setCanonical = (path: string) => {
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
};
