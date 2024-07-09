"use client";
import { useRouter } from "next/navigation";
import LocalSwitcher from "../LocalSwitcher";
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const router = useRouter();
  const t = useTranslations("home");
  const localActive = useLocale();

  const directToRashifal = () => router.push(`/${localActive}/rashifal`);

  return (
    <header className="p-4 sticky top-0 left-0 right-0 z-50 bg-slate-50">
      <nav className="flex items-center justify-between">
        <p onClick={directToRashifal} className="text-xl text-purple-500">
          {t("title")}
        </p>
        <LocalSwitcher />
      </nav>
    </header>
  );
}
