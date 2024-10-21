import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../Calls/user';
import './register.css';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  

  const onFinish = async (values) => {
    try {
        const response = await LoginUser(values);
        if (response.success) {
            message.success(response.message);
            localStorage.setItem('token', response.token);
            navigate('/');
        } else {
            message.error(response.message || 'Login failed');
        }
    } catch (error) {
        message.error(error.response?.data?.message || 'An error occurred during login');
    }
    };
  
  if (loading) return <div>Loading...</div>; 

  return (
    <div className='form-container'>
      <header className="App-header">
        <main className="main-area">
          <section className="left-section">
            <h1 className='heading'>Login to Task Manager</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input id="email" type="text" placeholder="Enter your Email" />
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input id="password" type="password" placeholder="Enter your Password" />
              </Form.Item>

              <Form.Item className="d-block">
                <Button type="primary" htmlType="submit" className='submit-btn'
                  style={{
                    backgroundColor: '#49180c',
                    borderColor: '#49180c', 
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </div>
  );
}

export default Login;
