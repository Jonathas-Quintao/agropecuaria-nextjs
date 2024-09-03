'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, ShoppingOutlined, DeleteOutlined, ShopOutlined, DollarOutlined, RocketOutlined, ProductOutlined, BookOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

interface CarrinhoProduto {
  id: string;
  key: string;
  nome: string;
  preco: number;
  quantidade: number;
}

const Carrinho: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [carrinho, setCarrinho] = useState<CarrinhoProduto[]>([]);

  useEffect(() => {
    const storedCarrinho = localStorage.getItem('carrinho');
    if (storedCarrinho) {
      setCarrinho(JSON.parse(storedCarrinho));
    } else {
      setCarrinho([]);
    }
  }, []);

  const deleteItem = (id: string) => {
    const updatedCarrinho = carrinho.filter(item => item.id !== id);
    setCarrinho(updatedCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(updatedCarrinho));
    message.success("Item removido com sucesso!");
  };

  const finalizarCompra = () => {
    
    
    router.push('/finalizarCompraCarrinho'); 
  };

  const columns = [
    {
      title: 'NOME',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'PREÇO',
      dataIndex: 'preco',
      key: 'preco',
    },
    {
      title: 'QUANTIDADE',
      dataIndex: 'quantidade',
      key: 'quantidade',
    },
    {
      title: 'TOTAL',
      key: 'total',
      render: (_text: any, record: CarrinhoProduto) => (
        <span>{(record.preco * record.quantidade).toFixed(2)}</span>
      ),
    },
    {
      title: 'AÇÕES',
      key: 'acoes',
      render: (_text: any, record: CarrinhoProduto) => (
        <span>
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteItem(record.id)}/>
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
    { key: "/carrinho", icon: <ShoppingCartOutlined />, label: <Link href="/carrinho">Carrinho</Link> },
  ];

  const pageNames: { [key: string]: string } = {
    "/": "Funcionários",
    "/produtos": "Estoque",
    "/clientes": "Clientes",
    "/fornecedores": "Fornecedores",
    "/vendas": "Vendas",
    "/dividas": "Dívidas",
    "/carrinho": "Carrinho",
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
                <Table dataSource={carrinho} columns={columns} rowKey="id" />
                <Button type="primary" icon={<BookOutlined />} onClick={finalizarCompra} style={{ marginTop: 16 }}>Finalizar Compra</Button>
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

export default Carrinho;
