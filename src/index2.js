import React from 'react'
import ReactDOM from 'react-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
})

const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values)
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label>First name:</label>
          <Field name="firstName" />
          {errors.firstName && touched.firstName ? (
            <div>{errors.firstName}</div>
          ) : null}
          <br />
          <label>Last name:</label>
          <Field name="lastName" />
          {errors.lastName && touched.lastName ? (
            <div>{errors.lastName}</div>
          ) : null}
          <br />
          <label>Email:</label>
          <Field name="email" type="email" />
          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <br />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)

ReactDOM.render(
  <ValidationSchemaExample></ValidationSchemaExample>,
  document.getElementById('root')
)
