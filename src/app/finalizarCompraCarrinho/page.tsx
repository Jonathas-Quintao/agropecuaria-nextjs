"use client";

import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Typography,
  Input,
  Form,
  Select,
  Space,
  message,
  theme,
} from "antd";
import {
  BookOutlined,
  ShopOutlined,
  UserOutlined,
  RocketOutlined,
  DollarOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const { Option } = Select;

interface Props {
  params: {
    id: string;
  };
}

interface CarrinhoProduto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
}

interface Clientes {
  id: string;
  key: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

interface Venda {
  clienteId: string;
  formaDePagamento: string;
  produtos: CarrinhoProduto[];
}

const FinalizarCompra: React.FC<Props> = ({ params }) => {
  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoProduto[]>([]);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchClientes = async () => {
        try {
          const response = await api.get<Clientes[]>("/clientes");
          setClientes(response.data);
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      };

    const fetchCarrinho = () => {
      const storedCarrinho = localStorage.getItem("carrinho");
      if (storedCarrinho) {
        setCarrinho(JSON.parse(storedCarrinho));
      } else {
        setCarrinho([]);
      }
    };

    fetchClientes();
    fetchCarrinho();
    setLoading(false);
  }, []);

  const cadastroDivida = async () => {
    
    const clienteSelecionado = clientes.find(
      (cliente) => cliente.id === form.getFieldValue("clienteId")
    );
  
    if (clienteSelecionado && valorTotal > 0) {
      const dividaDTO = {
        nome: clienteSelecionado.nome,
        cpf: clienteSelecionado.cpf,
        email: clienteSelecionado.email,
        telefone: clienteSelecionado.telefone,
        valor: valorTotal,
        vencimento: calcularVencimento(), 
      };
  
      try {
        const response = await api.post("/dividas", dividaDTO);
        console.log("Response from Dividas API:", response.data);
        message.success("Dívida registrada com sucesso!");
      } catch (error) {
        message.error("Erro ao registrar a dívida.");
        console.error("Erro ao registrar a dívida:", error);
      }
    }
  };
  

  const calcularVencimento = () => {
    const dataAtual = new Date();
    const vencimento = new Date(dataAtual.setMonth(dataAtual.getMonth() + 1)); 
    return vencimento.toISOString().split('T')[0]; 
  };

  const handleFinish = async (values: any) => {
    const clienteSelecionado = clientes.find(
      (cliente) => cliente.id === values.clienteId
    );

    const venda: Venda = {
      clienteId: clienteSelecionado?.id || "",
      formaDePagamento: values.pagamento,
      produtos: carrinho,
    };

    if(venda.formaDePagamento === "credito") {
        cadastroDivida();
    }

    try {
        const response = await api.post("/vendas", venda);
        console.log("Response from API:", response.data);
        message.success("Compra finalizada com sucesso!");
        localStorage.removeItem("carrinho");
        router.push("/vendas");
      } catch (error) {
        message.error("Erro ao finalizar a compra.");
        console.error("Erro ao finalizar a compra:", error);
      }
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
      key: "/vendas",
      icon: <ShopOutlined />,
      label: <Link href="/vendas">Vendas</Link>,
    },
    {
      key: "/dividas",
      icon: <DollarOutlined />,
      label: <Link href="/dividas">Dívidas</Link>,
    },
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

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>Carregando...</div>
    );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ flex: 1 }}>
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["/finalizarCompra"]}
            selectedKeys={["/finalizarCompra"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ flex: 1 }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{pageNames["/finalizaCompra"]}</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              style={{
                padding: "24px 0",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Title level={3}>Finalizar Compra</Title>
                {carrinho.length > 0 ? (
                  <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical"
                  >
                    <Form.Item label="Valor Total">
                      <Input value={`R$ ${valorTotal.toFixed(2)}`} readOnly />
                    </Form.Item>

                    <Form.Item
                      label="Cliente"
                      name="clienteId"
                      rules={[
                        { required: true, message: "O cliente não é válido" },
                      ]}
                    >
                      <Select
                        style={{ width: 200 }}
                        placeholder="Selecione um cliente"
                      >
                        {clientes.map((cliente) => (
                          <Select.Option key={cliente.id} value={cliente.id}>
                            {cliente.nome}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Forma de Pagamento"
                      name="pagamento"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione a forma de pagamento!",
                        },
                      ]}
                    >
                      <Select placeholder="Selecione a forma de pagamento">
                        <Option value="credito">Crédito</Option>
                        <Option value="debito">Débito</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        <Button type="default" onClick={() => router.back()}>
                          Voltar
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          icon={<BookOutlined />}
                        >
                          Finalizar Compra
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                ) : (
                  <p>O carrinho está vazio.</p>
                )}
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Desenvolvido por Jonathas e Samuel ©2024
      </Footer>
    </Layout>
  );
};

export default FinalizarCompra;
