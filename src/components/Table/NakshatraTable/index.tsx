import { useTranslations } from "next-intl";
import React from "react";

const NakshatraTable = ({ transposedNakshatra }: any) => {
  const t = useTranslations("nakshatraList");

  return (
    <div>
      <p className="text-center text-2xl font-semibold">{t("title")}</p>
      <div className="grid grid-cols-3 gap-2">
        {transposedNakshatra.map(
          (col: any[], colIndex: React.Key | null | undefined) => (
            <div key={colIndex} className="flex flex-col">
              {col.map(
                (nakshatra: {
                  id: React.Key | null | undefined;
                  name: any;
                }) => (
                  <div
                    className="border border-purple-500 p-2 w-60 text-center"
                    key={nakshatra.id}
                  >
                    {`${t(nakshatra.name)} ${nakshatra.id}`}
                  </div>
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default NakshatraTable;
