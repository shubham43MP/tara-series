'use client';
import LocalSwitcher from '../LocalSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/helper';
import React from 'react';

const Header = () => {
  const t = useTranslations();

  return (
    <header className="p-4 sticky top-0 left-0 right-0 z-50 bg-slate-50">
      <nav className="flex justify-between">
        <Link href={APP_ROUTES.TARASERIES} className="text-xl text-purple-500">
          {t('home.title')}
        </Link>
        <div className="ml-4 flex justify-between gap-8">
          <Link
            href={APP_ROUTES.TRANSIT}
            className="bg-purple-400 text-white p-4 rounded-xl"
          >
            {t('generic.transit')}
          </Link>
          <Link
            href={APP_ROUTES.TARASERIES}
            className="bg-purple-400 text-white p-4 rounded-xl"
          >
            {t('generic.taraSeries')}
          </Link>
        </div>
        <div className="self-end">
          <LocalSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
