import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { withRouter } from "react-router-dom";

class ProductForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={this.props.product}
        validate={values => {
          let errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.props.saveProduct(values).then(product => {
            setSubmitting(false);

            if (product) {
              const url = `/products/${product.id}`;
              this.props.history.push(url);
            }
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" />
            </div>

            <div>
              <label>description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" />
            </div>

            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withRouter(ProductForm);
