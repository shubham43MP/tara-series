"use client";

import { useLocale } from "next-intl";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const localActive = useLocale();
  const pathname = usePathname();

  const url = `${pathname}?${searchParams}`;
  console.log(url);
  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    console.log({ params, pathname }, "heaskasdkopasdk");
    const newPath = pathname.replace(`/${localActive}`, `/${nextLocale}`);
    const newUrl = `${newPath}?${searchParams}`;
    console.log(`${newPath}?${searchParams}`, "newPathnewPathnewPath");
    startTransition(() => {
      router.replace(newUrl);
    });
  };

  return (
    <label className="border-2 rounded">
      <p className="sr-only">Change language</p>
      <select
        defaultValue={localActive}
        className="bg-transparent p-2 rounded-md"
        onChange={onSelectChange}
        disabled={isPending}
      >
        <option value="en">EN</option>
        <option value="hi">HI</option>
      </select>
    </label>
  );
}
