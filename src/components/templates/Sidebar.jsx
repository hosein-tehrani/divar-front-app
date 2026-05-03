import styles from "./Sidebar.module.css";

function Sidebar({ selectCategory, data, selectedCategory }) {
  return (
    <div className={styles.sidebar}>
      <h4>دسته ها</h4>
      <ul>
        <li
          onClick={() => selectCategory("")}
          className={selectedCategory === "" ? styles.selected : undefined}
        >
          <img />
          <span className={styles.all}>همه</span>
        </li>
        {data?.data.map((cat) => (
          <li
            onClick={() => selectCategory(cat._id)}
            key={cat._id}
            className={
              selectedCategory === cat._id ? styles.selected : undefined
            }
          >
            <img src={`${cat.icon}.svg`} />
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
