import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import style from './style.min.module.css';
import Link from 'next/link';

const Contact = () => {
  return (
    <>
      <header id={style.header_contact}>
        <h2>Entre em contato conosco</h2>
      </header>
      <main id={style.main_contact}>
        <div>
          <h2>Contato</h2>
          <h3>E-mail:</h3>
          <p>
            <Link href={'mailto:contato@zeloimoveis.com'}>
              contato@zeloimoveis.com
            </Link>
          </p>
          <h3>Endereço:</h3>
          <p>R. Ferreira Penteado, 1121 - Cambuí, Campinas - SP, 13010-041</p>
          <h3>Telefones de contato:</h3>
          <p>
            <FaWhatsapp /> -{' '}
            <Link href={'tel:+551937363377'}>(19) 3736-3377</Link> - Comercial
          </p>
          <p>
            <FaWhatsapp /> -{' '}
            <Link href={'tel:+551937375555'}>(19) 3737-5555</Link> - Zelo
            Condomínios
          </p>
          <p>
            <FaWhatsapp /> -{' '}
            <Link href={'tel:+551937363376'}>(19) 3736-3376</Link> -
            Administração de Contratos
          </p>
          <p>
            <FaWhatsapp /> -{' '}
            <Link href={'tel:+5519981611842'}>(19) 9 8161-1842</Link> - Setor
            Comercial
          </p>
          <h3>Redes Sociais:</h3>
          <section id={style.redes}>
            <Link href={'https://www.facebook.com/zeloimoveis/?locale=pt_BR'}>
              <FaFacebook />
            </Link>
            <Link href={'https://www.youtube.com/@zeloimoveis'}>
              <FaYoutube />
            </Link>
            <Link href={'https://www.instagram.com/zeloimoveis_/'}>
              <FaInstagram />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};

export default Contact;
