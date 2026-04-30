import Footer from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className={styles.main}>{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
