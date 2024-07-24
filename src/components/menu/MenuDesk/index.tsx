import style from './style.min.module.css';

import Link from 'next/link';

const MenuDesk = () => {
  return (
    <ul className={style.menu_desk}>
      <li>
        <Link href={'/'}>Inicio</Link>
      </li>
      <li>
        <Link href={'/sobre'}>Sobre</Link>
      </li>
      <li>
        <Link href={'/servicos'}>Serviços</Link>
      </li>
      <li>
        <Link href={'/corretores'}>Corretores</Link>
      </li>
    </ul>
  );
};

export default MenuDesk;
