'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Form, Input, Select, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../../../lib/axios";

const { Content, Footer, Sider } = Layout;

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

export const estadosBrasileiros = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

const CadastroClientes: React.FC<Props> = ({ params }) => {
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

  const onFinish = async (values: Pessoa) => {
    try {
      const response = await api.post("/clientes", values);
      console.log("Response from API:", response.data);
      message.success("Cliente cadastrado com sucesso!");
      router.push("/clientes");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      message.error("Erro ao cadastrar cliente.");
    }
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
      key: "/produtos",
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
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ flex: 1 }}>
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ flex: 1 }}>
          <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Cadastro de Clientes</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              style={{
                padding: "24px 0",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
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
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Desenvolvido por Jonathas e Samuel ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default CadastroClientes;
