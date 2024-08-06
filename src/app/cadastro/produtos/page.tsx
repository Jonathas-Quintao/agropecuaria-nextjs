'use client';

import React from "react";
import { UserOutlined, EditOutlined, DeleteOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Table, Form, Input, FormProps, Checkbox, Cascader, Select, DatePicker, DatePickerProps } from "antd";
import Link from "next/link";
import type { Dayjs } from 'dayjs'
import { usePathname } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;


type Produto = {
    nome: string;
    preco: number;
    lote: string;
    validade: Date;
    qtd_estoque: number;
    estoque_minimo: number;
    estoque_maximo: number;
    reposicao: number;
    url_produto: string;
};



const CadastroProdutos = () => {
  const pathname = usePathname();

  const onFinish: FormProps<Produto>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed: FormProps<Produto>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
 

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
  const pageNames: { [key: string]: string } = {
    "/": "Funcionários",
    "/produto": "Estoque",
    "/clientes": "Clientes",
    "/fornecedores": "Fornecedores",
    "/compras": "Compras",
    "/dividas": "Dívidas",
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Cadastro funcionários</Breadcrumb.Item>
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
          <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
          <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<Produto>
      label="Nome"
      name="nome"
      rules={[{ required: true, message: 'O nome não é válido' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Preco"
      name="preco"
      rules={[{ required: true, message: 'O preço não é válido',  }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Lote"
      name="lote"
      rules={[{ required: true, message: 'o lote não é válido' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Validade"
      name="validade"
      rules={[{ required: true, message: 'a validade não é válido' }]}
    >
      <DatePicker  needConfirm format="DD/MM/YYYY" />
    </Form.Item>
    <Form.Item<Produto>
      label="Quantidade em estoque"
      name="qtd_estoque"
      rules={[{ required: true, message: 'o valor não é válido' }]}
    >
      <Input />
    </Form.Item>
    
    <Form.Item<Produto>
      label="Estoque mínimo"
      name="estoque_minimo"
      rules={[{ required: true, message: 'o valor não é válido' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Estoque máximo"
      name="estoque_maximo"
      rules={[{ required: true, message: 'o valor não é válido' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Reposição"
      name="reposicao"
      rules={[{ required: true, message: 'o valor não é válido' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<Produto>
      label="Url do produto"
      name="url_produto"
      rules={[{ required: true, message: 'a url não é válida' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16, }}>
      <Button type="primary" htmlType="submit" style={{marginRight: 20}}>
        Salvar
      </Button>
      <Button type="default" >
        Cancelar
      </Button>
    </Form.Item>
  </Form>
            
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CadastroProdutos;
