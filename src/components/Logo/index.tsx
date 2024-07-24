import Link from 'next/link';
import style from './style.min.module.css';
import { FaCookieBite } from 'react-icons/fa';

const Logo = () => {
  return (
    <div id={style.logo_title}>
      <img src="/img/logo.png" alt="logo imobiliaria Santos" />
      <h2>
        <Link href={'/'}>Zelo Imoveis</Link>
      </h2>
    </div>
  );
};

export default Logo;
