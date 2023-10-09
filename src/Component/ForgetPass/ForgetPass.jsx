import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from 'react-helmet';
export default function ForgetPass() {
  let baseUrl = "https://ecommerce.routemisr.com";
  let [errorMessage, setError] = useState("");
  let [errorCodeMessage, setCodeError] = useState("");
  let [loading, setloading] = useState(false);
  let navTo = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().required("email required").email("enter vaild email"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendEmail,
  });
  async function sendEmail(val) {
    setloading(true);
    let senduserEmail = await axios
      .post(`${baseUrl}/api/v1/auth/forgotPasswords`, val)
      .catch((error) => {
        setError(error.response.data.message);
        setloading(false);
      });
    console.log(senduserEmail.data.statusMsg);
    if (senduserEmail.data.statusMsg == "success") {
      document.querySelector(".send-email").classList.add("d-none");
      document
        .querySelector(".verify-code")
        .classList.replace("d-none", "d-block");
      setloading(false);
    }
  }
  let validationCode = Yup.object({
    resetCode: Yup.string()
      .required("verify code")
      .matches(/^[0-9]{5,6}$/, "enter valide code"),
  });
  let resetCodeFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: validationCode,
    onSubmit: sendCode,
  });
  async function sendCode(val) {
    setloading(true);
    let { data } = await axios
      .post(`${baseUrl}/api/v1/auth/verifyResetCode`, val)
      .catch((error) => {
        setCodeError(error.response.data.message);
        setloading(false);
      });
    console.log(data);
    if (data.status == "Success") {
        navTo('/resetNewpass');
        setloading(false);
    }
  }
  return (
    <>
    <Helmet>
    <title>Forget password</title>
  </Helmet>
      <div className="container my-5">
        <div className="send-email">
          <h4 className="mb">Send Email</h4>
          {errorMessage == "" ? null : (
            <h5 className="mp-2 text-danger">{errorMessage}</h5>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="box my-2">
              <label htmlFor="email">email</label>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              {formik.touched.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            {loading ? <button type='button' className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button> :<button
              type="submit"
              disabled={!(formik.dirty && formik.isValid)}
              className="btn btn-success ms-auto d-block"
            >
              send email
            </button>}
            
          </form>
        </div>
        <div className="verify-code d-none">
          <h4 className="mb">Verify Code</h4>
          {errorCodeMessage == "" ? null : (
            <h5 className="mp-2 text-danger">{errorCodeMessage}</h5>
          )}
          <form onSubmit={resetCodeFormik.handleSubmit}>
            <div className="box my-2">
              <label htmlFor="resetCode">resetCode</label>
              <input
                onChange={resetCodeFormik.handleChange}
                onBlur={resetCodeFormik.handleBlur}
                type="text"
                name="resetCode"
                id="resetCode"
                className="form-control"
              />
              {resetCodeFormik.touched.resetCode ? (
                <p className="text-danger">{resetCodeFormik.errors.resetCode}</p>
              ) : (
                ""
              )}
            </div>
            {loading ? <button type='button' className='btn btn-success ms-auto d-block'><i className='fa-solid fa-spinner fa-spin'></i></button> :<button
              type="submit"
              disabled={!(resetCodeFormik.dirty && resetCodeFormik.isValid)}
              className="btn btn-success ms-auto d-block"
            >
              verify code
            </button>}
            
          </form>
        </div>
        <Link to="" className="text-center d-block fs-6 mt-5 text-muted link">
          Creat new acount
        </Link>
      </div>
    </>
  );
}
