import { useParams } from "react-router-dom";
import { getPostDetail } from "src/services/post";
import Loader from "src/components/modules/Loader";
import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { MdOutlineFileCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { e2p } from "src/utils/numbers";
import { SlShare } from "react-icons/sl";
function Post() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [showUserMobile, setShowUserMobile] = useState(false);
  // -----useQueries----------
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getPostDetail(id);
        setDetails(response.data.post);

        console.log("response: ", response);
        // setDetails(response);

        console.log("details: ", details);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (loading || !details || !details.options) return <Loader />;
  const { title, city, content } = details.options;
  const copyUserMobile = async () => {
    await navigator.clipboard.writeText(details.userMobile);
    toast.success("شماره موبایل کپی شد!");
  };
  const copyLink = async () => {
    const pageLink = window.location.href;
    await navigator.clipboard.writeText(pageLink);
    toast.success("لینک کپی شد!");
  };
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>{title}</h1>
        <h2>
          {new Date(details.createdAt).toLocaleDateString("fa-IR")} در {city}
        </h2>
        <hr />
        <div className={styles.userBox}>
          <div className={styles.buttons}>
            <button onClick={() => setShowUserMobile((prev) => !prev)}>
              اطلاعات تماس
            </button>
            <SlShare size={25} color="gray" onClick={() => copyLink()} />
          </div>
          {showUserMobile && (
            <>
              <div className={styles.userMobile}>
                <span className={styles.title}>شماره موبایل</span>
                <div className={styles.mobile}>
                  <span>{e2p(details.userMobile)}</span>
                  <MdOutlineFileCopy
                    size={25}
                    onClick={() => copyUserMobile()}
                  />
                </div>
              </div>
              <div className={styles.warning}>
                <div>درخواست بیعانه، از نشانه‌های کلاهبرداری</div>
                <p>
                  برای هر نوع پرداخت (بیعانه یا کل مبلغ)، از «پرداخت امن»
                  استفاده کنید.
                </p>
              </div>
            </>
          )}
        </div>
        <h3>توضیحات</h3>
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.imageBox}>
        <img
          src={`${import.meta.env.VITE_API_BASEURL}${details.images[0]}`}
          alt={title}
          className={styles.image}
        />
      </div>
    </div>
  );
}

export default Post;
