import HomePostCard from "components/modules/HomePostCard";
import styles from "./Main.module.css";
import { ImSearch } from "react-icons/im";

function Main({ data, selectedCategory, search, setSearch, searchHandler }) {
  return (
    <div className={styles.main}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجو"
        />
        <button onClick={() => searchHandler(search)}>
          <ImSearch />
        </button>
      </div>
      {selectedCategory && !data?.length && (
        <div className={styles.empty}>
          آگهی در این دسته بندی موجود نمی باشد!
        </div>
      )}
      <div className={styles.container}>
        {data &&
          !!data?.length &&
          data.map((post) => (
            <HomePostCard
              key={post._id}
              options={post.options}
              amount={post.amount}
              id={post._id}
              images={post.images}
              createdAt={post.createdAt}
            />
          ))}
      </div>
    </div>
  );
}

export default Main;
