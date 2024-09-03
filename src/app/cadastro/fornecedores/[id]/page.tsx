'use client'
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
  message,
} from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../../../lib/axios";
import { estadosBrasileiros } from "../../clientes/page";

const { Content, Footer, Sider } = Layout;

interface Props {
  params: {
    id: string;
  };
}

type Endereco = {
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
};

type Fornecedor = {
  id: string;
  key: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  descricao: string;
  endereco: Endereco; // Adiciona o objeto `endereco` aqui
};

const CadastroFuncionarios: React.FC<Props> = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const pathname = usePathname();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        try {
          const response = await api.get<Fornecedor>(`/fornecedores/${id}`);
          form.setFieldsValue(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchCliente();
    }
  }, [id]);

  const onFinish = async (values: Fornecedor) => {
    try {
      await api.put(`/fornecedores/${id}`, values);
      message.success('Fornecedor atualizado com sucesso');
      router.push("/fornecedores"); 
    } catch (error) {
      message.error('Erro ao atualizar Fornecedor:');
    }
  };

  const onFinishFailed: FormProps<Fornecedor>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const items2 = [
    { key: "/", icon: <UserOutlined />, label: <Link href="/">Funcionários</Link> },
    { key: "/produtos", icon: <ProductOutlined />, label: <Link href="/produtos">Estoque</Link> },
    { key: "/clientes", icon: <UserOutlined />, label: <Link href="/clientes">Clientes</Link> },
    { key: "/fornecedores", icon: <RocketOutlined />, label: <Link href="/fornecedores">Fornecedores</Link> },
    { key: "/vendas", icon: <ShopOutlined />, label: <Link href="/vendas">Vendas</Link> },
    { key: "/dividas", icon: <DollarOutlined />, label: <Link href="/dividas">Dívidas</Link> },
  ];

  const pageNames: { [key: string]: string } = {
    "/": "Funcionários",
    "/produtos": "Estoque",
    "/clientes": "Clientes",
    "/fornecedores": "Fornecedores",
    "/vendas": "Vendas",
    "/dividas": "Dívidas",
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Cadastro funcionários</Breadcrumb.Item>
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
            {!loading && (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
              >
                <Form.Item<Fornecedor>
                  label="Nome"
                  name="razaoSocial"
                  rules={[{ required: true, message: "O nome não é válido" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Cnpj"
                  name="cnpj"
                  rules={[{ required: true, message: "O cnpj não é válido" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "O email não é válido" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Telefone"
                  name="telefone"
                  rules={[
                    { required: true, message: "O telefone não é válido" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Logradouro"
                  name={["endereco", "logradouro"]}
                  rules={[
                    { required: true, message: "A rua não é válida" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Número"
                  name={["endereco", "numero"]}
                  rules={[
                    { required: true, message: "O número não é válido" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Complemento"
                  name={["endereco", "complemento"]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Bairro"
                  name={["endereco", "bairro"]}
                  rules={[
                    { required: true, message: "O bairro não é válido" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Cidade"
                  name={["endereco", "cidade"]}
                  rules={[
                    { required: true, message: "A cidade não é válida" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Estado"
                  name={['endereco', 'uf']}
                  rules={[
                    { required: true, message: "O estado não é válido" },
                  ]}
                >
                  <Select
                    placeholder="Selecione um estado"
                    style={{ width: 200 }}
                  >
                    {estadosBrasileiros.map((estado) => (
                      <Select.Option
                        key={estado.sigla}
                        value={estado.sigla}
                      >
                        {estado.sigla}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Cep"
                  name={["endereco", "cep"]}
                  rules={[
                    { required: true, message: "O cep não é válido" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<Fornecedor>
                  label="Descrição"
                  name="descricao"
                  rules={[
                    {
                      required: true,
                      message: "A descrição não é válida",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ marginRight: 20 }}
                    >
                      Salvar
                    </Button>
                    <Button type="default" onClick={() => router.push("/fornecedores")}>
                      Cancelar
                    </Button>
                  </Form.Item>
              </Form>
            )}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Desenvolvido por Jonathas e Samuel ©2024
      </Footer>
    </Layout>
  );
};

export default CadastroFuncionarios;
