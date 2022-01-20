import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";

import * as Yup from "yup";
import TextError from "./TextError";
//var
const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};
//var
const onSubmit = (values, onSubmitProps) => {
  console.log("Form data", values);
  console.log("Submit props", onSubmitProps);
  onSubmitProps.setSubmitting(false)
};

//var  - Yup is better way to validate
const validationSchema = Yup.object({
  name: Yup.string().required("Required Name!"),
  email: Yup.string().email("Invalid email format").required("required email"),
  channel: Yup.string().required("required channel"),
});

//validate Comments
const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required !";
  }
  return error;
};

//
function YoutubeForm() {
  //Step 2 - add onchange and the value prop each of the formfields
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      // validateOnMount
    >
      {/* access formik props - function as childrren then return form*/}
      {(formik) => {
        console.log('Formik props', formik)
        return (
          <Form>
            {/* name */}
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            {/* email */}
            <div className="form-control">
              <label htmlFor="email">E-mail</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email">
                {(errorMsg) => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            {/* channel */}
            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="Youtube Channel Name"
              />
              <ErrorMessage name="channel" component={TextError} />
            </div>

            {/* comments  - as prop gives what element to render it can be textarea,select or custom react component*/}
            {/* field level validation with validate props*/}
            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            {/* address render props way*/}
            <div className="form-control">
              <label htmlFor="address">address</label>
              <FastField name="address">
                {(props) => {
                  console.log("Field render");
                  const { field, form, meta } = props;
                  console.log("Render props", props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            {/* social.facebook*/}
            <div className="form-control">
              <label htmlFor="facebook">facebook profile</label>
              <Field type="text" id="comments" name="social.facebook" />
            </div>

            {/* social.twitter*/}
            <div className="form-control">
              <label htmlFor="twitter">twitter profile</label>
              <Field type="text" id="comments" name="social.twitter" />
            </div>

            {/*phone Numbers*/}
            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="comments" name="phoneNumbers[0]" />
            </div>

            {/* phone Numbers */}
            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="comments" name="phoneNumbers[1]" />
            </div>

            {/* phNumbers[] */}
            <div className="form-control">
              <label>List phone number</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  // console.log('fieldArrYayProps', fieldArrayProps)
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log("Form errors - from fieldArrayProps", form.errors);
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

                <button type='button' onClick={() => formik.validateField('comments')}>Validate comments</button>
                <button type='button' onClick={() => formik.validateForm()}>Validate all</button>

                <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit comments</button>
                <button type='button' onClick={() => formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true
                  })}>Visit fields</button>
                  {/* // isValid is a prop tells us if the form  has no errors - disable button if their is error */}
                  {/* // dirty is a prop tells us if anyfield values has change  */}
                  {/* // disable if form is submitting  */}
            {/* <button type="submit" disabled={!formik.isValid}>Submit</button> */}
            <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
