'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

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

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dados, setDados] = useState<Clientes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Clientes[]>('/clientes');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const edit = (id: string | null) => {
    router.push(`/cadastro/clientes/${id}`);
  };

  const deleteCliente = async (id: string) => {
    try {
      await api.delete(`/clientes/${id}`);
      message.success("Cliente deletado com sucesso!");
  
      setDados(prevDados => prevDados.filter(func => func.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          message.error("Erro ao deletar cliente. Cliente possui vendas/dividas associadas.");
        }
      } else {
        console.error('Erro ao deletar cliente:', error);
        message.error("Erro ao deletar cliente.");
      }
    }
  };

  const columns = [
    {
      title: 'NOME',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'TELEFONE',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'EDITAR',
      key: 'editar',
      render: (_text: any, record: Clientes) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => edit(record.id)}
          />
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteCliente(record.id)} />
        </span>
      ),
    },
  ];

  const items2 = [
    { key: "/", icon: <UserOutlined />, label: <Link href="/">Funcionários</Link> },
    { key: "/produtos", icon: <ProductOutlined />, label: <Link href="/produtos">Estoque</Link> },
    { key: "/clientes", icon: <UserOutlined />, label: <Link href="/clientes">Clientes</Link> },
    { key: "/fornecedores", icon: <RocketOutlined />, label: <Link href="/fornecedores">Fornecedores</Link> },
    { key: "/compras", icon: <ShopOutlined />, label: <Link href="/compras">Vendas</Link> },
    { key: "/dividas", icon: <DollarOutlined />, label: <Link href="/dividas">Dívidas</Link> },
  ];

  const pageNames: { [key: string]: string } = {
    "/": "Funcionários",
    "/produtos": "Estoque",
    "/clientes": "Clientes",
    "/fornecedores": "Fornecedores",
    "/compras": "Compras",
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
                <Button
                  type="primary"
                  icon={<BookOutlined />}
                  style={{ marginRight: 8 }}
                  onClick={() => handlePage("/cadastro/clientes")}
                />
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
