'use client';

import React from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

// Definindo a estrutura dos dados para o TypeScript
interface DataType {
  key: string;
  nome: string;
  preco: number;
  lote: string;
  validade: Date;
  qtd_estoque: number;
  reposicao: number;
}

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dataSource: DataType[] = [
    {
      key: '1',
      nome: 'Potenay',
      preco: 29.90,
      lote: '1L2OPQ9',
      validade: new Date('2022-12-31'),
      qtd_estoque: 50,
      reposicao: 15,
    },
    {
      key: '2',
      nome: 'Ração de cachorro',
      preco: 29.90,
      lote: '1L2OPQ9',
      validade: new Date('2022-12-31'),
      qtd_estoque: 50,
      reposicao: 15,
    },
    {
      key: '3',
      nome: 'Ivomec',
      preco: 29.90,
      lote: '1L2OPQ9',
      validade: new Date('2022-12-31'),
      qtd_estoque: 50,
      reposicao: 15,
    },
    {
      key: '4',
      nome: 'Milho',
      preco: 29.90,
      lote: '1L2OPQ9',
      validade: new Date('2022-12-31'),
      qtd_estoque: 50,
      reposicao: 15,
    },
   
  ];

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
      dataIndex: 'qtd_estoque',
      key: 'qtd_estoque',
    },
    {
      title: 'VALOR DE REPOSIÇÃO',
      dataIndex: 'reposicao',
      key: 'reposicao',
    },
    {
      title: 'EDITAR',
      key: 'editar',
      render: (_text: any, _record: DataType) => (
        <span>
          <Button type="primary" icon={<EditOutlined />} style={{ marginRight: 8 }} />
          <Button type="default" icon={<DeleteOutlined />} />
        </span>
      ),
    },
  ];

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

  // Mapear paths para nomes de páginas
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
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
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
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              selectedKeys={[pathname]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Table dataSource={dataSource} columns={columns} />
            <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/produtos")}/>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
