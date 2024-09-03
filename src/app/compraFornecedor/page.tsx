'use client';

import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, DollarOutlined, ShopOutlined, RocketOutlined, BookOutlined, UserOutlined, ProductOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

interface CompraFornecedor {
  id: number;
  razaoSocial: string;
  cnpj: string;
  telefone: string;
  email: string;
  logradouro: string;
  numero: number;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  descricao: string;
  valor: number;
}

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dados, setDados] = useState<CompraFornecedor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<CompraFornecedor[]>('/compraFornecedor'); 
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  

  const deleteItem = async (id: number) => {
    try {
      await api.delete(`/compras-fornecedores/${id}`);
      message.success("Registro deletado com sucesso!");
  
      setDados(prevDados => prevDados.filter(item => item.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          message.error("Erro ao deletar registro. O registro pode estar associado a outras transações.");
        }
      } else {
        console.error('Erro ao deletar registro:', error);
        message.error("Erro ao deletar registro.");
      }
    }
  };

  const columns = [
    {
      title: 'RAZAO SOCIAL',
      dataIndex: 'razaoSocial',
      key: 'razaoSocial',
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
    },
    {
      title: 'TELEFONE',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'VALOR',
      dataIndex: 'valor',
      key: 'valor',
      render: (value: number) => `R$ ${value.toFixed(2)}`, 
    },
    {
      title: 'EDITAR',
      key: 'editar',
      render: (_text: any, record: CompraFornecedor) => (
        <span>
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteItem(record.id)} />
        </span>
      ),
    },
  ];

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

  const handlePage = (path: string) => {
    router.push(path);
  };

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
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>{pageNames[pathname]}</Breadcrumb.Item>
            </Breadcrumb>
            <Layout
              style={{
                padding: "24px 0",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <Table dataSource={dados} columns={columns} />
               
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

export default App;
