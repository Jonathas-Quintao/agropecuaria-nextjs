"use client";

import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  ProductOutlined,
  DollarOutlined,
  RocketOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Breadcrumb,
  theme,
  Button,
  Table,
  Form,
  Input,
  FormProps,
  Checkbox,
  Cascader,
  Select,
} from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { estadosBrasileiros } from "../../clientes/page";
import api from "../../../../../lib/axios";

const { Header, Content, Footer, Sider } = Layout;

interface Props {
  params: {
    id: string;
  };
}

type Pessoa = {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    cidade: string;
    uf: string;
    bairro: string;
    logradouro: string;
    numero: string;
    complemento?: string;
  };

const CadastroFuncionarios: React.FC<Props> = ({ params }) => {
    const { id } = params;
    const pathname = usePathname();
    const router = useRouter();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (id) {
        const fetchCliente = async () => {
          try {
            const response = await api.get<Pessoa>(`/clientes/${id}`);
            form.setFieldsValue(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Erro ao carregar dados do cliente:', error);
            setLoading(false);
          }
        };
        fetchCliente();
      }
    }, [id]);
  
    const onFinish = (values: Pessoa) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  
    const items2 = [
      {
        key: "/",
        icon: <UserOutlined />,
        label: <Link href="/">Funcionários</Link>,
      },
      {
        key: "/produto",
        icon: <ProductOutlined />,
        label: <Link href="/produtos">Estoque</Link>,
      },
      {
        key: "/clientes",
        icon: <UserOutlined />,
        label: <Link href="/clientes">Clientes</Link>,
      },
      {
        key: "/fornecedores",
        icon: <RocketOutlined />,
        label: <Link href="/fornecedores">Fornecedores</Link>,
      },
      {
        key: "/compras",
        icon: <ShopOutlined />,
        label: <Link href="/compras">Vendas</Link>,
      },
      {
        key: "/dividas",
        icon: <DollarOutlined />,
        label: <Link href="/dividas">Dívidas</Link>,
      },
    ];
    
  
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
  
    return (
      <Layout>
        <Content style={{ padding: "0 48px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Cadastro clientes</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{
              padding: "24px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[pathname]}
                selectedKeys={[pathname]}
                style={{ height: "100%" }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item<Pessoa>
                  label="Nome"
                  name="nome"
                  rules={[{ required: true, message: 'O nome não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Cpf"
                  name="cpf"
                  rules={[{ required: true, message: 'O cpf não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'o email não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Telefone"
                  name="telefone"
                  rules={[{ required: true, message: 'o telefone não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Cidade"
                  name="cidade"
                  rules={[{ required: true, message: 'a cidade não é válida' }]}
                >
                  <Input />
                </Form.Item>
                
                <Form.Item<Pessoa> label="Estado" name="uf" rules={[{required: true, message: 'o estado não é válido'}]}>
                <Select placeholder="Selecione um estado" style={{ width: 200 }}>
                  {estadosBrasileiros.map((estado) => (
                    <Select.Option key={estado.sigla} value={estado.sigla}>
                      {estado.sigla}
                    </Select.Option>
                  ))}
                </Select>
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Bairro"
                  name="bairro"
                  rules={[{ required: true, message: 'o bairro não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Rua"
                  name="logradouro"
                  rules={[{ required: true, message: 'a rua não é válida' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Número"
                  name="numero"
                  rules={[{ required: true, message: 'o número não é válido' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Pessoa>
                  label="Complemento"
                  name="complemento"
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                    Salvar
                  </Button>
                  <Button type="default">
                    Cancelar
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    );
};

export default CadastroFuncionarios;
