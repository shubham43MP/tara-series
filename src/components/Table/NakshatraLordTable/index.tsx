import { useTranslations } from "next-intl";
import React from "react";

const NakshatraLordTable = ({ uniqueLords }: { uniqueLords: string[] }) => {
  const t = useTranslations("nakshatraLord");
  return (
    <div>
      <p className="text-center text-2xl font-semibold">{t("title")}</p>
      <div className="grid grid-cols-1">
        {uniqueLords.map((lord, index) => (
          <div
            className="border border-purple-500 p-2 w-60 text-center"
            key={index}
          >
            {t(lord)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NakshatraLordTable;
