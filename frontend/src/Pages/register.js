import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../Calls/user';
import './register.css';

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1 className="heading">Register to Task Manager</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Username"
                name="username"
                className="d-block"
                rules={[{ required: true, message: 'Username is required!' }]}
              >
                <Input type="text" placeholder="Enter your username" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: 'Email is required!' }]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: 'Password is required!' }]}
              >
                <Input type="password" placeholder="Enter your password" />
              </Form.Item>
              <Form.Item>
                <Button
                  className="submit-btn"
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: '#49180c', // Base color
                    borderColor: '#49180c', // Base border color
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Register;
