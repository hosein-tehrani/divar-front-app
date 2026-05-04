import { MdDeleteOutline } from "react-icons/md";
import styles from "./ProfilePostCard.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePost } from "src/services/post";
import { sp } from "src/utils/numbers";
import { Link } from "react-router-dom";
function ProfilePostCard({ options, createdAt, amount, images, id }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: removePost,
  });
  const { title, content } = options;
  const removeHandler = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      },
    });
  };
  return (
    <Link to={`/post/${id}`}>
      <div className={styles.post}>
        <img src={`${import.meta.env.VITE_API_BASEURL}${images}`} alt={title} />
        <div>
          <div>
            <h5>{title}</h5>
            <span>{content}</span>
          </div>
        </div>
        <div className={styles.price}>
          <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
          <span>{sp(amount)} تومان</span>
        </div>
        <button onClick={() => removeHandler()} disabled={isPending}>
          <MdDeleteOutline size="25px" />
        </button>
      </div>
    </Link>
  );
}

export default ProfilePostCard;
