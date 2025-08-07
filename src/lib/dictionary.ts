export async function getDictionary(locale: string) {
  const dictionaries = {
    en: () => import("@/dictionaries/en.json").then((module) => module.default),
    ua: () => import("@/dictionaries/ua.json").then((module) => module.default),
  };

  return (
    dictionaries[locale as keyof typeof dictionaries] || dictionaries.en
  )();
}
