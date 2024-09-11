'use client';

import style from './style.min.module.css';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ImoveisServices } from '@/shared/services/api';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';

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
      <section className={style.detailsImovel_info}>
        <div>
          <span>R$ 4.150.000,00</span>
          <h2>
            Casa em Condomínio à venda com 435 m², 4 quartos 4 vagas em
            Residencial Parque das Araucárias, Campinas
          </h2>
          <p>Residencial Parque das Araucárias, Campinas - SP</p>
        </div>
        <div>
          <h3>Descricão do imóvel</h3>
          <p>
            Maravilhosa casa à venda no Residencial Parque das Araucárias no
            bairro Sousas em Campinas. Condomínio alto padrão. O imóvel possui
            434m² de área construída, terreno com 761m², contempla 04 suítes,
            amplo escritório com armários, home theater com armários,
            dependências de empregada, banheiro de serviço, depósito com 10m²
            com armário. Armários marca Dellano em todos os ambientes. Todos os
            pisos e bancadas dos banheiros são em mármore importado Thassos.
            Condomínio possui lazer completo, com piscina, academia,
            brinquedoteca, campo de futebol, salão de festas, sauna, portaria e
            vigilância 24 horas! Lote mais alto, próximo da portaria, piscina e
            da área verde, ao lado do pomar! Imóvel com documentação 100%
            regularizada! Proprietário analisa permuta por imóvel até 50% do
            valor como parte de pagamento! Venha conhecer. Agende agora sua
            visita no site zeloimoveis.com
          </p>
        </div>
        <div>
          <h3>Nome do condomínio</h3>
          <p>Parque das Araucárias</p>
        </div>
        <div>
          <h3>Características internas:
          </h3>
          <div>
            <div>/ <span></span></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DetalheImovel;
