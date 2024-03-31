import styles from '@/styles/notFound.module.scss';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';

export default function Custom404() {
  return (
    <div className={styles.root} data-testid="not-found">
      <div className={styles.bgText}>404</div>
      <div className={styles.mainWrap}>
        <h1>404 - Page Not Found</h1>
        <ButtonLink href="/" variant="primary" label="Return Home" />
      </div>
    </div>
  );
}
