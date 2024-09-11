'use client';

import style from './style.min.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ImoveisServices } from '@/shared/services/api';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';
import {
  FaBath,
  FaBed,
  FaBuilding,
  FaCar,
  FaCheck,
  FaHome,
  FaShower,
} from 'react-icons/fa';

const DetalheImovel = () => {
  const [imovel, setImovel] = useState<IListagemImoveis>();
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;

  const carrosselImgDetails = useRef({} as HTMLDivElement);

  const nextImgDetails = () => {
    carrosselImgDetails.current.scrollLeft =
      +carrosselImgDetails.current.scrollLeft + 310;
  };

  const previoustImgDetails = () => {
    carrosselImgDetails.current.scrollLeft =
      +carrosselImgDetails.current.scrollLeft - 310;
  };

  const formatCurrency = (money: number) => {
    if (money) {
      return money.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }
  };
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
      <section className={style.container_detail_imovel}>
        <div
          ref={carrosselImgDetails}
          className={style.container_carrossel_detail}
        >
          <div className={style.carrossel_detail}>
            {imovel ? (
              imovel.imgsCardImovel.map((img, idx) => {
                return <img key={idx} src={img} alt={imovel.imgsCardAlt} />;
              })
            ) : (
              <h3>Carregando...</h3>
            )}
          </div>
        </div>
        <div className={style.controls_carrossel}>
          <span onClick={previoustImgDetails} className={style.controls_btn}>
            {'<'}
          </span>
          <span onClick={nextImgDetails} className={style.controls_btn}>
            {'>'}
          </span>
        </div>
      </section>
      {imovel && (
        <section className={style.detailsImovel_info}>
          <div className={style.title}>
            <span>{formatCurrency(imovel.valuationImovel)}</span>
            <h2>{imovel.descriptionImovel}</h2>
            <p>{imovel.localImovel}</p>
          </div>
          <div className={style.caracteristicas}>
            <div>
              <FaHome />
              <span>{imovel.dimensoesImovel}</span>
            </div>
            <div>
              <FaBuilding />
              <span>{imovel.dimensaoTotal}</span>
            </div>
            <div>
              <FaBed />
              <p>
                <span>{imovel.qtdQuartos}</span> quarto(s)
              </p>
            </div>
            <div>
              <FaShower />
              <p>
                <span>{imovel.qtdBanheiros}</span> banheiro(s)
              </p>
            </div>
            <div>
              <FaCar />
              <p>
                <span>{imovel.qtdVagas}</span> vaga(s)
              </p>
            </div>
            <div>
              <FaBath />
              <p>
                <span>{imovel.qtdSuite}</span> suite(s)
              </p>
            </div>
          </div>
          <div className={style.description}>
            <h3>Descricão do imóvel:</h3>
            <p>{imovel.longDesc}</p>
          </div>
          <div>
            <h3>Nome do condomínio:</h3>
            <p>{imovel.nomeCondominio}</p>
          </div>
          <div>
            <h3>Caracteristicas internas:</h3>
            <div className={style.plus}>
              {imovel.caracteristicasInternas.map((carac, idx) => {
                return (
                  <div key={idx}>
                    <FaCheck /> <span>{carac}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3>Caracteristicas externas: </h3>
            <div className={style.plus}>
              {imovel.caracteristicasExternas.map((carac, idx) => {
                return (
                  <div key={idx}>
                    <FaCheck /> <span>{carac}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3>Lazer: </h3>
            <div className={style.plus}>
              {imovel.lazer.map((carac, idx) => {
                return (
                  <div key={idx}>
                    <FaCheck /> <span>{carac}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3>Caracteristicas extras: </h3>
            <div className={style.plus}>
              {imovel.caracteristicasExtras.map((carac, idx) => {
                return (
                  <div key={idx}>
                    <FaCheck /> <span>{carac}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default DetalheImovel;
