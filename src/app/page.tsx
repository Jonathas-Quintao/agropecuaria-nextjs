'use client';

import React, { useEffect, useState } from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../lib/axios";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;

interface Funcionario {
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
  const [dados, setDados] = useState<Funcionario[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<Funcionario[]>('/funcionarios');
        setDados(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        } else {
          console.error('Erro ao carregar dados:', error);
        }
      }
    };
  
    fetchData(); 
  }, []);

useEffect(() => {
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'ADMIN') {
      message.error('Você não tem permissão para acessar esta página.');
      router.push('/produtos');
    }
  };

  checkAuthentication();
}, [router]);

 
  const checkAuthentication = () => {
    
    return false;
  };

  const edit = (id: string | null) => {
    router.push(`/cadastro/funcionarios/${id}`);
  };

  const deleteFuncionario = async (id: string) => {
    try {
      await api.delete(`/funcionarios/${id}`);
      message.success("Funcionário deletado com sucesso!");

      setDados(prevDados => prevDados.filter(func => func.id !== id));
    } catch (error) {
      if(axios.isAxiosError(error)){
        if (error.response?.status === 500) {
          message.error("Erro ao deletar funcionário. Funcionário possui vendas associadas.");
        }
      }
      console.error('Erro ao deletar funcionário:', error);
      message.error("Erro ao deletar funcionário.");
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
      render: (_text: any, record: Funcionario) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => edit(record.id)}
          />
          <Button type="default" icon={<DeleteOutlined />} onClick={() => deleteFuncionario(record.id)} />
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
                <Button type="primary" icon={<BookOutlined />} style={{ marginRight: 8 }} onClick={() => handlePage("/cadastro/funcionarios")}/>
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
