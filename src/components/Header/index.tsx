"use client";
import { useRouter } from "next/navigation";
import LocalSwitcher from "../LocalSwitcher";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { APP_ROUTES } from "@/constants/helper";

export default function Header() {
  const router = useRouter();
  const t = useTranslations("home");
  const localActive = useLocale();

  const directToRashifal = () => router.push(`/${localActive}/rashifal`);

  return (
    <header className="p-4 sticky top-0 left-0 right-0 z-50 bg-slate-50">
      <nav className="flex justify-between">
        <p onClick={directToRashifal} className="text-xl text-purple-500">
          {t("title")}
        </p>
        <div className="ml-4 flex justify-between gap-8">
          <Link href={APP_ROUTES.TRANSIT} className="bg-purple-400 text-white p-4 rounded-xl">Transit</Link>
          <Link href={APP_ROUTES.TARASERIES} className="bg-purple-400 text-white p-4 rounded-xl">Tara Series</Link>
        </div>
        <div className="self-end">
          <LocalSwitcher />
        </div>
      </nav>
    </header>
  );
}
