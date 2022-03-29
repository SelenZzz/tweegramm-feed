import styles from './Loading.module.css';

import { Spinner } from '../../../../components/Spinner/Spinner';

export const Loading = ({ error }: { error: boolean }) => {
  return <div className={styles.loader}>{!error ? <Spinner /> : 'Error'}</div>;
};
