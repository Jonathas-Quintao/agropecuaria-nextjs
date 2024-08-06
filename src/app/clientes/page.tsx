'use client';

import React from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

// Definindo a estrutura dos dados para o TypeScript
interface DataType {
  key: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

const App: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const dataSource: DataType[] = [
    {
      key: '1',
      nome: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao.silva@example.com',
      telefone: '(11) 91234-5678',
    },
    {
      key: '2',
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      email: 'maria.oliveira@example.com',
      telefone: '(21) 99876-5432',
    },

  ];

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

  // Mapear paths para nomes de páginas
  const pageNames: { [key: string]: string } = {
    "/": "Funcionários",
    "/produto": "Estoque",
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
            <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/clientes")}/>
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
