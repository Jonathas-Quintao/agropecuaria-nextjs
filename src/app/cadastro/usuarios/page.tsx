'use client'
import React from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/axios';

const { Title } = Typography;

const CadastroPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: any) => {
    if (values.senha !== values.senhaRepeticao) {
      message.error('As senhas não coincidem!');
      return;
    }

    try {
      await api.post('/usuarios', {
        login: values.login,
        senha: values.senha,
        senhaRepeticao: values.senhaRepeticao,
        admin: values.admin || false
      });
      message.success('Usuário cadastrado com sucesso!');
      router.push('/login'); 
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      message.error('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px 0' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Cadastro
      </Title>
      <Form name="cadastro_form" onFinish={onFinish} layout="vertical" style={{ maxWidth: '100%' }}>
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
        <Form.Item
          label="Repetir Senha"
          name="senhaRepeticao"
          rules={[{ required: true, message: 'Por favor repita a senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="admin"
          valuePropName="checked"
        >
          <Checkbox>Administrador</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CadastroPage;
