import { useQuery } from "@tanstack/react-query";
import styles from "./CategoryList.module.css";
import { getCategories } from "services/admin";
import Category from "components/modules/Category";
import Loader from "components/modules/Loader";

function CategoryList() {
  const queryKey = ["categories"];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: getCategories,
  });
  console.log(data);

  {
    isLoading && <Loader />;
  }
  return (
    <div className="styles.list">
      {!data?.data.length && (
        <p className={styles.empty}>هنوز دسته بندی وجود ندارد!</p>
      )}
      {data &&
        data.data.map((cat) => (
          <Category
            key={cat._id}
            name={cat.name}
            slug={cat.slug}
            id={cat._id}
            icon={cat.icon}
          />
        ))}
    </div>
  );
}

export default CategoryList;
