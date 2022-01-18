import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'
//var
const initialValues = {
  name: "",
  email: "",
  channel: "",
};
//var
const onSubmit = (values) => {
  console.log("Form data", values);
};



//var - Custom validate function
const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(
      values.email
    )
  ) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }

  return errors;
};

//var  - Yup is better way to validate
const validationSchema = Yup.object({
  name: Yup.string().required('Required Name!'),
  email: Yup.string().email('Invalid email format').required('required email'),
  channel: Yup.string().required('required channel')
})
//
function OldYoutubeForm() {
  //Step 1 -  pass in the initial values for formfields. Note:  initialValues properties should correspond to the name attribute of the formfileds/input
  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  });

  console.log("Visited fields", formik.touched);
  // console.log("Form errors", formik.errors);
  //   console.log('Form values', formik.values)

  //Step 2 - add onchange and the value prop each of the formfields
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} // if the form is visited  blur prop control
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? <div className="error">{formik.errors.channel}</div> : null}
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OldYoutubeForm;
