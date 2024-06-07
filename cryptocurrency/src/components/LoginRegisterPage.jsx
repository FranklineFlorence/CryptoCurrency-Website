import React, { useState } from 'react';
import './LoginRegisterPage.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNotification } from './NotificationContext';
import { useAuth } from './AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginRegisterPage = () => {
  const { setCurrentUser } = useAuth();
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const { addNotification } = useNotification();

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  });

  const handleRegisterSubmit = (values, { setSubmitting, resetForm }) => {
    if (registeredUsers.find(user => user.email === values.email)) {
      toast.error('User already exists!');
      setSubmitting(false);
      return;
    }

    setRegisteredUsers(prevUsers => [...prevUsers, values]);
    toast.success('User registered successfully!');
    resetForm();
    setSubmitting(false);
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleLoginSubmit = (values, { setSubmitting }) => {
    const user = registeredUsers.find(user => user.email === values.email && user.password === values.password);
    if (user) {
      toast.success('Login successful!');
      setCurrentUser(user);
    } else {
      toast.error('Invalid email or password!');
    }
    setSubmitting(false);
  };

  return (
    <div className="login-register-page">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
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
                <label htmlFor="registerName">Name</label>
                <Field type="text" id="registerName" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="registerEmail">Email</label>
                <Field type="email" id="registerEmail" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="registerPassword">Password</label>
                <Field type="password" id="registerPassword" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
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
                <label htmlFor="loginEmail">Email</label>
                <Field type="email" id="loginEmail" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <Field type="password" id="loginPassword" name="password" />
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
