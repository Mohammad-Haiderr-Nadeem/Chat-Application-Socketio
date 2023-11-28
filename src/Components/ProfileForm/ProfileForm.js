/* eslint-disable semi */
/* eslint-disable eol-last */
import React from 'react';
import styles from './ProfileForm.module.css';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';

function ProfileForm () {
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, '*Must be atleast 3 characters*')
      .max(10, '*Not more than 10 characters*')
      .required('*Required*'),
    lastName: Yup.string()
      .min(3, '*Must be atleast 3 characters*')
      .max(10, '*Not more than 10 characters*')
      .required('*Required*'),
    email: Yup.string().email('Invalid email!').required('*Required*'),
    gender: Yup.string()
      .oneOf(['Male', 'Female'], '*Please select a gender*')
      .required('*Required*'),
    image: Yup.mixed()
      .test('fileSize', '*File size is too large*', (value) => {
        console.log('value size: ', value.size);
        return value && value.size <= 300 * 1024;
      })
      .test('fileType', '*Invalid file type*', (value) => {
        console.log('value type: ', value.type);
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
      })
      .required('*Required*')
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          gender: '',
          image: null
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm();
        }}
      >
        {({ errors, touched, dirty, isValid }) => (
          <Form className={styles.formContainer}>
            <div className={styles.firstNameField}>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              {errors.firstName && touched.firstName
                ? (
                <div className={styles.errorMessage}>{errors.firstName}</div>
                  )
                : null}
            </div>
            <div className={styles.lastNameField}>
              <label htmlFor="firstName">Last Name</label>
              <Field name="lastName" type="text" />
              {errors.lastName && touched.lastName
                ? (
                <div className={styles.errorMessage}>{errors.lastName}</div>
                  )
                : null}
            </div>
            <div className={styles.emailField}>
              <label htmlFor="firstName">Email</label>
              <Field name="email" type="email" />
              {errors.email && touched.email
                ? (
                <div className={styles.errorMessage}>{errors.email}</div>
                  )
                : null}
            </div>
            <div className={styles.checkboxDiv}>
              <label htmlFor="Gender">Gender</label>
              <label>
                <Field type="radio" name="gender" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="Female" />
                Female
              </label>
              {errors.gender && touched.gender
                ? (
                <div className={styles.errorMessage}>{errors.gender}</div>
                  )
                : null}
            </div>
            <div className={styles.imageField}>
              <label htmlFor="image">Image</label>
              <Field
                name="image"
                type="file"
                onChange={(event) => {
                  const file = event.target.files[0];
                  try {
                    ProfileSchema.validateSync({ image: file }, { abortEarly: false });
                  } catch (validationError) {
                    console.error(validationError);
                  }
                }}
              />
              {errors.image && touched.image && (
                <div className={styles.errorMessage}>{errors.image}</div>
              )}
            </div>
            <button className={styles.submitButton} type="submit" disabled={!(dirty && isValid)}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
export default ProfileForm;
