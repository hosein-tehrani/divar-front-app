import styles from "./HomePostCard.module.css";
import { sp } from "src/utils/numbers";
function HomePostCard({ options, createdAt, amount, images, id }) {
  const { title, city } = options;

  return (
    <div className={styles.post}>
      <div className={styles.info}>
        <p>{title}</p>
        <div>
          <p>{sp(amount)} تومان</p>
          <span>{city}</span>
        </div>
      </div>
      <img src={`${import.meta.env.VITE_API_BASEURL}${images}`} alt={title} />
    </div>
  );
}

export default HomePostCard;
