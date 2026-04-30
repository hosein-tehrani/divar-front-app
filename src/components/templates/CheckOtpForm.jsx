import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { checkCode } from "services/auth";
import { getProfile } from "src/services/user";
import { setCookie } from "utils/cookie";
import styles from "./CheckOtpForm.module.css";


function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const queryKey = ["profile"];
  const { refetch } = useQuery({ queryKey, queryFn: getProfile });
  const sendCode = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { response, error } = await checkCode(mobile, code);
    if (response) {
      setCookie(response.data);
      refetch();
      navigate("/");
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form onSubmit={sendCode} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
