import { useTranslations } from 'next-intl';

const NavtaraTable = ({ taraChakra }: { taraChakra: string[] }) => {
  const t = useTranslations('navtara');
  return (
    <div>
      <p className="text-center text-2xl font-semibold">{t('title')}</p>
      <div className="grid grid-cols-1">
        {taraChakra.map((tara, index) => (
          <div
            className="border border-purple-500 p-2 w-60 text-center"
            key={index}
          >
            {t(tara)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavtaraTable;
