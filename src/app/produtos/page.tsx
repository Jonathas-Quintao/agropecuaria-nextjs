'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, ShoppingOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

interface Produto {
  id: string;
  key: string;
  nome: string;
  preco: number;
  lote: string;
  validade: Date;
  quantidadeEmEstoque: number;
  estoque_minimo: number;
  estoque_maximo: number;
  valorDeReposicao: number;
}

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dados, setDados] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Produto[]>('/produtos');
        setDados(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);
  
  const deleteProduto = async (id: string) => {
    try {
      await api.delete(`/produtos/${id}`);
      message.success("Produto deletado com sucesso!");

      setDados(prevDados => prevDados.filter(func => func.id !== id));
    } catch (error) {
      if(axios.isAxiosError(error)){
        if (error.response?.status === 500) {
          message.error("Erro ao deletar produto. Produto possui vendas associadas.");
        }
      }
      console.error('Erro ao deletar produto:', error);
      message.error("Erro ao deletar produto.");
    }
  };

  const columns = [
    {
      title: 'NOME',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'PRECO',
      dataIndex: 'preco',
      key: 'preco',
    },
    {
      title: 'LOTE',
      dataIndex: 'lote',
      key: 'lote',
    },
    {
      title: 'VALIDADE',
      dataIndex: 'validade',
      key: 'validade',
    },
    {
      title: 'QTD ESTOQUE',
      dataIndex: 'quantidadeEmEstoque',
      key: 'quantidadeEmEstoque',
    },
    {
      title: 'VALOR DE REPOSIÇÃO',
      dataIndex: 'valorDeReposicao',
      key: 'valorDeReposicao',
    },
    {
      title: 'EDITAR',
      key: 'editar',
      render: (_text: any, record: Produto) => (
        <span>
          <Button type="primary" icon={<ShoppingOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage('/produtos', record.id)}/>
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteProduto(record.id)}/>
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

  const handlePage = (path: string, id?: string) => {
    router.push(id ? `${path}/${id}` : path);
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
                <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/produtos")}/>
                <Button type="default" icon={<ShoppingCartOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/carrinho")}/>
                
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
