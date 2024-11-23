import { FC } from 'react';
import css from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={css.btnWrapper}>
      <button className={css.btn} onClick={onClick} type="button">
        Load more
      </button>
    </div>
  );
}

export default LoadMoreBtn;