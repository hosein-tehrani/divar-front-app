import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPost } from "src/services/post";
import { getCategories } from "src/services/admin";
import toast from "react-hot-toast";
import styles from "./AddPost.module.css";
function AddPost() {
  //----------variables-------------
  const queryKey = ["categories"];
  const [form, setForm] = useState({
    title: "",
    content: "",
    images: null,
    amount: null,
    category: "",
    city: "",
  });
  const [customError, setCustomError] = useState("");

  //---------react query and mutations----------
  const { data } = useQuery({
    queryKey,
    queryFn: getCategories,
  });
  const { isPending, error, mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error("مشکلی پیش آمده است!");
      console.log("error: ", error);
    },
  });

  //-----------handlers------------
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !form.title ||
      !form.category ||
      !form.content ||
      !form.amount ||
      !form.images ||
      !form.city
    ) {
      setCustomError("اطلاعات را کامل وارد کنید");
      return;
    }
    mutate(form);
  };
  const formChangeHandler = (event) => {
    setCustomError("");
    const name = event.target.name;
    const value = event.target.value;
    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  //   -------template----------
  return (
    <form
      onSubmit={submitHandler}
      onChange={formChangeHandler}
      className={styles.form}
    >
      <h3>افزودن آگهی</h3>
      {customError && <p className={styles.error}>{customError}</p>}
      {data?.status === 201 && (
        <p className={styles.success}>ثبت دسته بندی با موفقیت انجام شد</p>
      )}
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="content">توضیحات</label>
      <textarea type="text" name="content" id="content" />
      <label htmlFor="amount">قیمت</label>
      <input type="number" name="amount" id="amount" />
      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" />
      <label htmlFor="category">دسته بندی</label>
      <select name="category" id="category">
        <option value=""></option>
        {data?.data.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <label htmlFor="images">عکس</label>
      <input type="file" name="images" id="images" />
      <button type="submit" disabled={isPending}>
        ایجاد آگهی
      </button>
    </form>
  );
}

export default AddPost;
