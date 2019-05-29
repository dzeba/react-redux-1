import React from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { login } from "../ducks/auth";

function Login({ login }) {
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ login: "", password: "" }}
        validate={values => {
          let errors = {};
          if (!values.login) {
            errors.login = "Required";
          } else if (!/^[A-Z0-9._%+-]/i.test(values.login)) {
            errors.login = "Invalid login";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await login(values.login, values.password);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="login" />
              <ErrorMessage name="login" component="div" />
            </div>

            <div>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default connect(
  null,
  { login }
)(Login);
