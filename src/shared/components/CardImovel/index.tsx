'use client';

import Link from 'next/link';
import style from './style.min.module.css';
import Button from '../buttons/Button';

type TCardImovelProps = {
  imgsCard: string[];
  altImg: string;
  local: string;
  description: string;
  valuation: number;
  codId: string;
  dimensao: number;
  qtdQuartos: number;
  qtdVagas: number;
};

const CardImovel = ({
  imgsCard,
  altImg,
  local,
  description,
  valuation,
  codId,
  dimensao,
  qtdQuartos,
  qtdVagas,
}: TCardImovelProps) => {
  return (
    <div className={style.card_container}>
      <div className={style.carrosel_container}>
        <button className={style.controls_card_btn} type="button">
          {'<'}
        </button>
        <div className={style.carrosel}>
          {imgsCard &&
            imgsCard.map((img, idx) => {
              return <img key={idx} src={img} alt={altImg} />;
            })}
        </div>
        <button className={style.controls_card_btn} type="button">
          {'>'}
        </button>
      </div>
      <div className={style.info_container}>
        <h3 className={style.local}>{local}</h3>
        <p className={style.description}>{description}</p>
      </div>
      <div className={style.box_plus}>
        <span>{valuation}</span>
        <span>Cod.: {codId}</span>
      </div>
      <div className={style.box_desc}>
        <span>{dimensao}</span>
        <span>{qtdQuartos} quartos</span>
        <span>{qtdVagas} vagas</span>
      </div>
      <div className={style.button_info}>
        <Button>
          <Link href={{ pathname: '/', query: { id: codId } }}>
            Conhecer o imóvel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CardImovel;
