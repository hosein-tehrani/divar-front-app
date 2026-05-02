import { useState } from "react";
import styles from "./Header.module.css";
import { Link, redirect } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "src/services/user";
import { deleteCookies } from "src/utils/cookie";

function Header() {
  const queryKey = ["profile"];
  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn: getProfile,
  });

  const userInfo = data?.data;
  const exitUser = () => {
    deleteCookies();
    refetch();
    redirect("/");
    setShowDrop(false);
  };
  const [showDrop, setShowDrop] = useState(false);
  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        {userInfo?.role ? (
          <div className={styles.dropDownButton}>
            <span onClick={() => setShowDrop((prev) => !prev)}>
              <img src="profile.svg" />
              <p>دیوار من</p>
            </span>
            {showDrop && (
              <>
                <div className={styles.dropDown}>
                  <ul>
                    <li>
                      <Link
                        onClick={() => setShowDrop(false)}
                        to={userInfo.role === "USER" ? "/dashboard" : "/admin"}
                      >
                        داشبورد
                      </Link>
                    </li>
                    <li onClick={() => exitUser()}>خروج</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        ) : (
          <Link to="/auth">
            <span>
              <img src="profile.svg" />
              <p>ورود / ثبت نام</p>
            </span>
          </Link>
        )}
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
