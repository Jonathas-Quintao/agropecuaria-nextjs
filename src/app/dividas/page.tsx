'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, ShopOutlined, DeleteOutlined, DollarOutlined, BookOutlined, RocketOutlined, ShoppingCartOutlined, ProductOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

interface DividaDTO {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  valor: number;
  vencimento: string;
}

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dados, setDados] = useState<DividaDTO[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<DividaDTO[]>('/dividas');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const edit = (id: number) => {
    router.push(`/cadastro/dividas/${id}`);
  };
  
  const deleteDivida = async (id: number) => {
    try {
      await api.delete(`/dividas/${id}`);
      message.success("Dívida deletada com sucesso!");

      setDados(prevDados => prevDados.filter(divida => divida.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          message.error("Erro ao deletar dívida. Dívida possui registros associados.");
        }
      }
      console.error('Erro ao deletar dívida:', error);
      message.error("Erro ao deletar dívida.");
    }
  };

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'CPF',
      dataIndex: 'cpf',
      key: 'cpf',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number) => `R$ ${valor.toFixed(2)}`,
    },
    {
      title: 'Vencimento',
      dataIndex: 'vencimento',
      key: 'vencimento',
    },
    {
      title: 'Excluir',
      key: 'editar',
      render: (_text: any, record: DividaDTO) => (
        <span>
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteDivida(record.id)} />
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
                <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/dividas")}/>
                <Button icon={<ShoppingCartOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/compraFornecedor")}/>
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
