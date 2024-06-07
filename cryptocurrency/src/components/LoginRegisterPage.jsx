// components/LoginRegisterPage.jsx
import React, { useState } from 'react';
import './LoginRegisterPage.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext'; // Import the AuthContext

const LoginRegisterPage = () => {
  const { addNotification } = useNotification();
  const { setCurrentUser } = useAuth(); // Get setCurrentUser from AuthContext
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Define Yup validation schema for registration form
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  });

  // Function to handle registration form submission
  const handleRegisterSubmit = (values, { setSubmitting, resetForm }) => {
    if (registeredUsers.find(user => user.email === values.email)) {
      addNotification({ type: 'error', message: 'User already exists!' });
      setSubmitting(false);
      return;
    }

    setRegisteredUsers(prevUsers => [...prevUsers, values]);
    addNotification({ type: 'success', message: 'User registered successfully!' });
    resetForm();
    setSubmitting(false);
  };

  // Define Yup validation schema for login form
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  // Function to handle login form submission
  const handleLoginSubmit = (values, { setSubmitting }) => {
    const user = registeredUsers.find(user => user.email === values.email && user.password === values.password);
    if (user) {
      addNotification({ type: 'success', message: 'Login successful!' });
      setCurrentUser(user); // Set the current user
    } else {
      addNotification({ type: 'error', message: 'Invalid email or password!' });
    }
    setSubmitting(false);
  };

  return (
    <div className="login-register-page">
      <div className="registration-section">
        <h2>REGISTER</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                REGISTER
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login-section">
        <h2>LOGIN</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                LOGIN
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
