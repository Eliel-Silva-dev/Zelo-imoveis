import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

import NavBar from '@/shared/components/NavBar';
import Footer from '@/shared/components/Footer';

import { Suspense } from 'react';

import './globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] });

export const metadata: Metadata = {
  title: 'Zelo Imoveis | Hydrah Tec',
  description: 'Pagina da imobiliária zelo imoveis',
  keywords:
    'imobiliaria,zelo imoveis, imobiliaria zelo imoveis, alugar casas, aluguel de casas, casas para alugar, casa nova, casa barata',
  icons: '/img/imgfavicon_zeloimoveis.ico',
  robots: 'index, follow',
  authors: [{ name: 'Eliel Silva', url: 'https://github.com/Eliel-Silva-dev' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <NavBar />
        <Suspense fallback={<div>Carregando dados da pagina...</div>}>
          {children}
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
