'use client';

import style from './style.min.module.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CardImovel from '@/shared/components/CardImovel';
import { ImoveisServices } from '@/shared/services/api';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';
import { useRouter } from 'next/navigation';

const SearchImovel = () => {
  const [imovels, setImovels] = useState<IListagemImoveis[]>();

  const router = useRouter();

  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as string) || '';
  const cidade = (searchParams.get('cidade') as string) || '';
  const bairro = (searchParams.get('bairro') as string) || '';
  const quartos = (searchParams.get('quartos') as string) || '';
  const maxValue = (searchParams.get('maxValue') as string) || '';
  const finalidade = (searchParams.get('finalidade') as string) || '';
  const condominio = (searchParams.get('condominio') as string) || '';

  useEffect(() => {
    console.log(type, cidade, bairro, condominio, quartos, maxValue);
    ImoveisServices.getAllImoveis(
      1,
      finalidade,
      '',
      '',
      type,
      cidade,
      bairro,
      condominio,
      quartos,
      maxValue,
    ).then((result) => {
      if (result instanceof Error) {
        alert('Não foi possível consultar os dados');
      } else if (result.data.length == 0) {
        alert('Desculpe não conseguimos encontrar seu imóvel');
        router.push('/');
      } else {
        setImovels(result.data);
      }
    });
  }, []);

  return (
    <main className={style.main_searchImovel}>
      <h2>Busca de imoveis</h2>
      <div className={style.container_search}>
        {imovels ? (
          imovels.map((imovel) => {
            return (
              <CardImovel
                key={imovel.id}
                valuation={imovel.valuationImovel}
                codId={imovel.id}
                description={imovel.descriptionImovel}
                dimensao={imovel.dimensoesImovel}
                imgsCard={imovel.imgsCardImovel}
                altImg={imovel.imgsCardAlt}
                local={imovel.localImovel}
                qtdQuartos={imovel.qtdQuartos}
                qtdVagas={imovel.qtdVagas}
              />
            );
          })
        ) : (
          <h3>Carregando...</h3>
        )}
      </div>
    </main>
  );
};

export default SearchImovel;
