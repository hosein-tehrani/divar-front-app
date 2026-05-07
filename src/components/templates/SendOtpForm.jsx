import React from "react";
import { sendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css";
import toast from "react-hot-toast";
function SendOtpForm({ mobile, setMobile, setStep }) {
  let toastId;
  const sendOpt = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11) return;
    const { response, error } = await sendOtp(mobile);
    if (response) {
      console.log(response);
      toast.success(response.data.message, {
        duration: 30000,
        id: "otpCode",
      });

      setStep(2);
    }
    if (error) console.log(error.response);
  };

  return (
    <>
      <form onSubmit={sendOpt} className={styles.form}>
        <p>ورود به حساب کاربری</p>
        <span>
          برای استفاده از امکانات دیوار، لطفا شماره موبایل خود را وارد کنید. کد
          تایید به این شماره پیامک خواهد شد.
        </span>
        <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
        <input
          type="text"
          id="input"
          placeholder="شماره موبال"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <button type="submit">ارسال کد تایید</button>
      </form>
    </>
  );
}

export default SendOtpForm;
