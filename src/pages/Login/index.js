import React from 'react'
import NavBar from '../../components/NavBar'
import styles from './index.module.scss'
import Input from '../../components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'

export default function Login() {
  const onExtraClick = () => {
    console.log('clicked')
  }

  const form = useFormik({
    initialValues: {
      mobile: '',
      code: '',
    },
    validationSchema: Yup.object().shape({
      // validate mobile
      mobile: Yup.string()
        .required('請輸入手機號')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),
      // validate code
      code: Yup.string()
        .required('請輸入驗證碼')
        .matches(/^\d{6}$/, '验证码6个数字'),
    }),

    onSubmit: (values) => {
      console.log(form)
    },
  })
  return (
    <div className={styles.root}>
      {/* 導航條 */}
      <NavBar></NavBar>
      <div className="content">
        {/* 登錄標題 */}
        <h3>短信登錄</h3>

        <form onSubmit={form.handleSubmit}>
          {/* 輸入手機號碼 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                className="input"
                name="mobile"
                placeholder="請輸入手機號碼"
                value={form.values.mobile}
                onChange={form.handleChange}
              />
            </div>
            {/* <div className="validate ">驗證碼格式有誤</div> */}
            {form.errors.mobile && form.touched.mobile && (
              <div className="validate">{form.errors.mobile}</div>
            )}
          </div>
          {/* 輸入驗證碼 */}
          <div className="input-item">
            <div className="input-box">
              <Input
                className="input"
                name="code"
                placeholder="請輸入驗證碼"
                extra="獲取驗證碼"
                onExtraClick={onExtraClick}
                maxLength={6}
                value={form.values.code}
                onChange={form.handleChange}
              />
            </div>
            {/* <div className="validate ">驗證碼格式有誤</div> */}
            {form.errors.code && form.touched.code && (
              <div className="validate">{form.errors.code}</div>
            )}
          </div>
          {/* 登錄按鈕 */}
          <button
            className={classNames(
              'login-btn',
              form.isValid === true ? '' : 'disabled'
            )}
            type="submit"
            disabled={!form.isValid}
          >
            登錄
          </button>
        </form>
      </div>
    </div>
  )
}
