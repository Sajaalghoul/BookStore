import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SignupSchema } from '../../Schemas/Schemas'
const FormVal = () => {
  return (
    <Formik initialValues={{ email: ""}} validationSchema={SignupSchema} onSubmit={values => {
      console.log(values);
    }}>
        <Form>
          <Field 
               type="email"
               name="email"
               placeholder="Enter your Email"/>
            <ErrorMessage name="email" component="div" />
            <Field 
               type="text"
               name="fullname"
               placeholder="Enter your name"/>
            <ErrorMessage name="fullname" component="div" />
   
        </Form>
        
    </Formik>
  )
}

export default FormVal
