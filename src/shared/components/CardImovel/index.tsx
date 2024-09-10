'use client';

import Link from 'next/link';
import style from './style.min.module.css';
import Button from '../buttons/Button';

type TCardImovelProps = {
  imgsCard: string[];
  local: string;
  description: string;
  valuation: number;
  codId: string;
};

const CardImovel = ({
  imgsCard,
  local,
  description,
  valuation,
  codId,
}: TCardImovelProps) => {
  return (
    <div className={style.card_container}>
      <div className={style.carrosel_container}>
        <button className={style.controls_card_btn} type="button">
          {'<'}
        </button>
        <div className={style.carrosel}>
          <img src="" alt="image ilustrativa 01" />
          <img src="https://picsum.photos/300/250" alt="image ilustrativa 02" />
          <img src="https://picsum.photos/300/250" alt="image ilustrativa 03" />
          <img src="https://picsum.photos/300/250" alt="image ilustrativa 04" />
          <img src="https://picsum.photos/300/250" alt="image ilustrativa 05" />
        </div>
        <button className={style.controls_card_btn} type="button">
          {'>'}
        </button>
      </div>
      <div className={style.info_container}>
        <h3 className={style.local}>Localização do imovel</h3>
        <p className={style.description}>
          Descrição do imóvel, casa, apartamento, terreno
        </p>
      </div>
      <div className={style.box_plus}>
        <span>R$ 5000,00</span>
        <span>Cod.: 12345</span>
      </div>
      <div className={style.button_info}>
        <Button>
          <Link href={{ pathname: '/', query: { id: 34 } }}>
            Conhecer o imóvel
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CardImovel;
