'use client';

import { useEffect, useState } from 'react';
import style from './style.min.module.css';
import { useSearchParams } from 'next/navigation';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';
import { ImoveisServices } from '@/shared/services/api';

const DetalheImovel = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  const [imovel, setImovel] = useState<IListagemImoveis>();

  useEffect(() => {
    ImoveisServices.getImoveisById(id).then((result) => {
      if (result instanceof Error) {
        alert('Não foi possível consultar os dados');
      } else {
        setImovel(result);
      }
    });
  }, [id]);

  return (
    <main className={style.main_detalheImovel}>
      <h2>Pagina de detalhe do imovel: id - {id}</h2>
      {imovel && <p>{imovel.bairroImovel}</p>}
    </main>
  );
};

export default DetalheImovel;
