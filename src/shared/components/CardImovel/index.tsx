import Link from 'next/link';
import style from './style.min.module.css';

const CardImovel = () => {
  return (
    <div className={style.card_container}>
      <div className={style.carrosel_container}>
        <button type="button">{'<'}</button>
        <div className={style.carrosel}>
          <img src="#" alt="#" />
          <img src="#" alt="#" />
          <img src="#" alt="#" />
          <img src="#" alt="#" />
          <img src="#" alt="#" />
        </div>
        <button type="button">{'>'}</button>
      </div>
      <div className={style.info_container}>
        <h3 className={style.local}>Localização do imovel</h3>
        <p className={style.description}>
          Descrição do imóvel, casa, apartamento, terreno
        </p>
        <div className={style.box_plus}>
          <span>R$ 5000,00</span>
          <span>Cod.: 12345</span>
        </div>
      </div>
      <div className={style.button_info}>
        <button type="button">
          <Link href={{ pathname: '/', query: { id: 34, page: 1 } }}>
            Mais informações do imóvel
          </Link>
        </button>
      </div>
    </div>
  );
};

export default CardImovel;
