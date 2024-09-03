'use client';

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import api from '../../../lib/axios';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      const response = await api.post('/usuarios/auth', values);
      localStorage.setItem('token', response.data.token);
      
      
      const isAdmin = response.data.admin; 
      localStorage.setItem('role', isAdmin ? 'ADMIN' : 'USER');
      
      console.log('Token armazenado:', response.data.token);
      console.log('Role armazenada:', isAdmin ? 'ADMIN' : 'USER');
      
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      message.error('Erro ao fazer login.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px 0' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Login
      </Title>
      <Form name="login_form" onFinish={onFinish} layout="vertical" style={{ maxWidth: '100%' }}>
        <Form.Item
          label="Login"
          name="login"
          rules={[{ required: true, message: 'Por favor insira o login!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="senha"
          rules={[{ required: true, message: 'Por favor insira a senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="link" block onClick={() => router.push("/cadastro/usuarios")}>
            Cadastrar um novo usuário
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
