import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./Category.module.css";
import { removeCategory } from "src/services/admin";
import { MdDeleteOutline } from "react-icons/md";
function Category({ name, slug, icon, id }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, data } = useMutation({
    mutationFn: removeCategory,
  });
  const removeHandler = () => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });
  };

  return (
    <div className={styles.category}>
      <div>
        <img src={`${icon}.svg`} alt={name} />
        <h5>{name}</h5>
      </div>
      <div>
        <p>slug: {slug}</p>
        <button onClick={() => removeHandler()} disabled={isPending}>
          <MdDeleteOutline size="25px" />
        </button>
      </div>
    </div>
  );
}

export default Category;
