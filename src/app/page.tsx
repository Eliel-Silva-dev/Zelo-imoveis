'use client';

import Link from 'next/link';
import style from './page.module.css';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import CardImovel from '@/shared/components/CardImovel';
import { ImoveisServices } from '@/shared/services/api';
import Button from '@/shared/components/buttons/Button';
import { IListagemImoveis } from '@/shared/services/api/imoveis/ImoveisServices';

type TFormProps = {
  type: string;
  cidade: string;
  quartos: string;
  finalidade: string;
  condominio: string;
};

export default function Home() {
  const [finalidadeOfImovel, setTypeOfImovel] = useState<string>('compra');
  const [imovels, setImovels] = useState<IListagemImoveis[]>();
  const { register, watch } = useForm<TFormProps>({
    defaultValues: {
      cidade: '',
      condominio: '',
      finalidade: 'aluga',
      quartos: '',
      type: '',
    },
  });

  const carroselCard = useRef({} as HTMLDivElement);

  const type = watch('type');
  const cidade = watch('cidade');
  const quartos = watch('quartos');
  const finalidade = watch('finalidade');
  const condominio = watch('condominio');

  const changeTypeImovel = (typeImovel: string) => {
    setTypeOfImovel(typeImovel);
  };

  const nextCard = () => {
    carroselCard.current.scrollLeft = +carroselCard.current.scrollLeft + 310;
  };

  const previoustCard = () => {
    carroselCard.current.scrollLeft = +carroselCard.current.scrollLeft - 310;
  };

  useEffect(() => {
    console.log(type, cidade, quartos, finalidade, condominio);
    ImoveisServices.getAllImoveis(1, finalidadeOfImovel, 'best').then(
      (result) => {
        if (result instanceof Error) {
          alert('Não foi possível consultar os dados');
        } else {
          console.log(result.data);
          setImovels(result.data);
        }
      },
    );
  }, [finalidadeOfImovel]);

  return (
    <main id={style.main_home}>
      <section className={style.header}>
        <h2>Referência em locação e vendas em Campinas</h2>
        <form className={style.form_home}>
          <div>
            <label>Finalidade</label>
            <div>
              <select {...register('finalidade')} id="finalidade">
                <option value="aluga">Alugar</option>
                <option value="compra">Comprar</option>
              </select>
            </div>
          </div>
          <div>
            <label>Tipo</label>
            <div>
              <select {...register('type')} id="tipo">
                <option value="">tipo imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
              </select>
            </div>
          </div>
          <div>
            <label>Localização</label>
            <div>
              <select {...register('cidade')} id={style.endereco}>
                <option value="">localização</option>
                <option value="Campinas">Campinas</option>
                <option value="Vinhedo">Vinhedo</option>
                <option value="Sumare">Sumaré</option>
              </select>
            </div>
          </div>
          <div>
            <label>Quartos</label>
            <div>
              <select {...register('quartos')} id="quartos">
                <option value="">quarto</option>
                <option value="1">1 Quarto</option>
                <option value="2">2 Quartos</option>
                <option value="3">3 Quartos</option>
                <option value="4">4+ Quartos</option>
              </select>
            </div>
          </div>
          {/* proximo update
          <div>
            <label>Valor</label>
            <div>
              <input id={style.input_valor_min} type="text" placeholder="Min" />
              <input
                {...register('maxValue')}
                placeholder="Max"
                id={style.input_valor_max}
                type="text"
              />
            </div>
          </div>
           */}
          <div id="container-cond">
            <label>Condomínios</label>
            <div>
              <select {...register('condominio')} id="condominio">
                <option value="">condominio</option>
                <option value="Residencial Takanos 1">
                  Residencial Takanos 1
                </option>
                <option value="Residencial Takanos 2">
                  Residencial Takanos 2
                </option>
                <option value="Residencial Takanos 3">
                  Residencial Takanos 3
                </option>
              </select>
            </div>
          </div>
          <div id={style.submit_busca}>
            <Button>
              <Link
                href={{
                  pathname: '/searchImovel',
                  query: {
                    type: type,
                    bairro: '',
                    maxValue: '',
                    cidade: cidade,
                    quartos: quartos,
                    finalidade: finalidade,
                    condominio: condominio,
                  },
                }}
              >
                BUSCAR IMÓVEL
              </Link>
            </Button>
          </div>
        </form>
      </section>
      <section className={style.container_best_imovel}>
        <h2>Imóveis em destaque</h2>
        <div className={style.type_imovel}>
          <span onClick={() => changeTypeImovel('compra')}>COMPRAR</span>
          <span onClick={() => changeTypeImovel('aluga')}>ALUGAR</span>
        </div>
        <div ref={carroselCard} className={style.container_carrossel_best}>
          <div className={style.carrossel_best}>
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
        </div>
        <div className={style.controls_carrossel}>
          <span onClick={previoustCard} className={style.controls_btn}>
            {'<'}
          </span>
          <span onClick={nextCard} className={style.controls_btn}>
            {'>'}
          </span>
        </div>
      </section>
    </main>
  );
}
