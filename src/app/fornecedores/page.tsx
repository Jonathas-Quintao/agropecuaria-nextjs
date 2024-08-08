'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../lib/axios";

const { Header, Content, Footer, Sider } = Layout;


interface Fornecedor {
  id: string;
  key: string;
  razaoSocial: string;
  cnpj: string;
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
  const [dados, setDados] = useState<Fornecedor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await api.get<Fornecedor[]>('/fornecedores');
        
        console.log('Dados recebidos:', response.data); 
        setDados(response.data);
        
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData(); 
  }, []);
  const edit = (id: string | null) => {
    router.push(`/cadastro/fornecedores/${id}`);
  };



  const columns = [
    {
      title: 'RAZÃO SOCIAL',
      dataIndex: 'razaoSocial',
      key: 'razaoSocial',
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
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
      title: 'DESCRIÇÃO',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'EDITAR',
      key: 'editar',
      render: (_text: any, record: Fornecedor) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => edit(record.id)}
          />
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
            <Table dataSource={dados} columns={columns} />
            <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/fornecedores")}/>
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
