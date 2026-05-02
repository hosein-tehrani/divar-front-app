import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "services/admin";
import toast from "react-hot-toast";
function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const [customError, setCustomError] = useState("");
  const { data, isPending, error, mutate } = useMutation({
    mutationFn: addCategory,
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(response.data.message);
    },
    onError: (error) => {
      toast.error("مشکلی پیش آمده است!");
      console.log("error: ", error);
    },
  });

  const formChangeHandler = (event) => {
    setCustomError("");
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) {
      setCustomError("اطلاعات را کامل وارد کنید");
      return;
    }
    mutate(form);
  };
  return (
    <form
      onChange={formChangeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته بندی جدید</h3>
      {customError && <p className={styles.error}>{customError}</p>}
      <label htmlFor="name">نام</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکون</label>
      {/* <input type="text" name="icon" id="icon" /> */}
      <select name="icon" id="icon">
        <option value=""></option>
        <option value="car">ماشین</option>
        <option value="digital">وسایل دیجیتال</option>
        <option value="game">اوقات فراغت</option>
        <option value="home">اسباب خانه</option>
        <option value="personal">شخصی</option>
        <option value="service">خدمات</option>
      </select>
      <button type="submit" disabled={isPending}>
        ایجاد دسته بندی
      </button>
    </form>
  );
}

export default CategoryForm;
