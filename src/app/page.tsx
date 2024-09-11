'use client';

import { useEffect, useState } from 'react';
import style from './page.module.css';
import CardImovel from '@/shared/components/CardImovel';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';
import { ImoveisServices } from '@/shared/services/api';

export default function Home() {
  const [finalidadeOfImovel, setTypeOfImovel] = useState<string>('compra');
  const [imovels, setImovels] = useState<IListagemImoveis[]>();
  const changeTypeImovel = (typeImovel: string) => {
    console.log('mostrando tipo de imovel: ', typeImovel);

    setTypeOfImovel(typeImovel);
  };

  useEffect(() => {
    ImoveisServices.getAllImoveis(1, finalidadeOfImovel).then((result) => {
      if (result instanceof Error) {
        alert('Não foi possível consultar os dados');
      } else {
        setImovels(result.data);
      }
    });
  }, [finalidadeOfImovel]);

  return (
    <main id={style.main_home}>
      <h2>Referência em locação e vendas em Campinas</h2>
      <form className={style.form_home}>
        <div>
          <label>Finalidade</label>
          <div>
            <select id="finalidade">
              <option value="1">Alugar</option>
              <option value="2">Comprar</option>
            </select>
          </div>
        </div>

        <div>
          <label>Tipo</label>
          <div>
            <select id="tipo">
              <option value="0">Carregando...</option>
            </select>
          </div>
        </div>

        <div>
          <label>Localização</label>
          <div>
            <input
              id={style.endereco}
              type="text"
              placeholder="Bairro ou Cidade"
            />
          </div>
          <ul id="lista-endereco"></ul>
        </div>

        <div>
          <label>Quartos</label>
          <div>
            <select id="quartos">
              <option value="0">Quartos</option>
              <option value="1-quartos">1 Quarto</option>
              <option value="2-quartos">2 Quartos</option>
              <option value="3-quartos">3 Quartos</option>
              <option value="4-quartos">4+ Quartos</option>
            </select>
          </div>
        </div>

        <div>
          <label>Valor</label>
          <div>
            <input id={style.input_valor_min} type="text" placeholder="Min" />
            <input id={style.input_valor_max} type="text" placeholder="Max" />
          </div>
        </div>

        <div id="container-cond">
          <label>Condomínios</label>
          <div>
            <select id="condominio">
              <option value="0">Condomínio</option>
            </select>
          </div>
        </div>

        <div id={style.submit_busca}>
          <button type="submit">BUSCAR IMÓVEIS</button>
        </div>
      </form>
      <section className={style.container_best_imovel}>
        <h2>Imóveis em destaque</h2>
        <div>
          <span
            className={style.type_imovel}
            onClick={() => changeTypeImovel('compra')}
          >
            COMPRAR
          </span>
          <span
            className={style.type_imovel}
            onClick={() => changeTypeImovel('aluga')}
          >
            ALUGAR
          </span>
        </div>
        <div className={style.container_carrossel_best}>
          <div className={style.carrossel_best}>
            {imovels ? (
              imovels.map((imovel) => {
                return (
                  <CardImovel
                    key={imovel.idImovel}
                    valuation={imovel.valuationImovel}
                    codId={imovel.idImovel}
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
          <div className={style.controls_carrossel}>
            <span className={style.controls_btn}>{'<'}</span>
            <span className={style.controls_btn}>{'>'}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
