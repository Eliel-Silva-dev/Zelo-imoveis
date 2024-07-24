import Link from 'next/link';
import style from './style.min.module.css';
import { FaCookieBite } from 'react-icons/fa';

const Logo = () => {
  return (
    <div id={style.logo_title}>
      <h2>
        <Link href={'/'}>
          <img
            src="/img/imgzeloimoveislogo.png"
            alt="logo zelo imoveis"
          />
        </Link>
      </h2>
    </div>
  );
};

export default Logo;
