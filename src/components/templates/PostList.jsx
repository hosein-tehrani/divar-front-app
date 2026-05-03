import { useQuery } from "@tanstack/react-query";
import styles from "./PostList.module.css";
import Loader from "components/modules/Loader";
import { getUserPosts } from "src/services/post";
import ProfilePostCard from "../modules/ProfilePostCard";

function PostList() {
  const queryKey = ["my-posts"];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: getUserPosts,
  });

  {
    isLoading && <Loader />;
  }
  return (
    <div className={styles.list}>
      <h3>آگهی های شما</h3>
      {!data?.data.posts.length && (
        <p className={styles.empty}>هنوز آگهی ثبت نکردید!</p>
      )}
      {data &&
        data.data.posts.map((post) => (
          <ProfilePostCard
            key={post._id}
            options={post.options}
            amount={post.amount}
            id={post._id}
            images={post.images}
            createdAt={post.createdAt}
          />
        ))}
    </div>
  );
}

export default PostList;
