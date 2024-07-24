import Link from 'next/link';
import style from './style.min.module.css';
import Button from '../buttons/Button';

const PlusRec = () => {
  return (
    <div className={style.plus_rec}>
      <Button>
        <Link href={'/contact'}>Contato</Link>
      </Button>
    </div>
  );
};
export default PlusRec;
