import React, { useState } from 'react'
import NavBar from '../../components/NavBar'
import styles from './index.module.scss'
import Input from '../../components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { login, sendCode } from '../../store/actions/login'
import { Toast } from 'antd-mobile'
import { useHistory } from 'react-router-dom'

export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [time, setTime] = useState(0)
  const onExtraClick = async () => {
    // 手機號
    const mobile = form.values.mobile
    // 加入手机格式不正确，把输入手机区域设置为触碰过，让其提示格式不正确的信息并退出
    if (!/^1[3456789]\d{9}$/.test(mobile)) {
      form.setTouched({
        mobile: true,
      })
      return
    }
    // 調用Action
    await dispatch(sendCode(mobile))
    Toast.show({
      icon: 'success',
      content: '获取验证码成功',
    })
    // 倒计时
    setTime(5)
    let timeId = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
  }

  const form = useFormik({
    initialValues: {
      mobile: '13911111111',
      code: '246810',
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

    onSubmit: (mobile, code) => {
      // 登录验证
      dispatch(login(mobile, code))
      // 跳转首页
      history.push('/home')
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
                extra={time === 0 ? '獲取驗證碼' : `${time}s后重新获取`}
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
