'use client';

import React from "react";
import { UserOutlined, ShopOutlined, ProductOutlined, DollarOutlined, RocketOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme, Button, Form, Input, DatePicker, message } from "antd";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../../lib/axios";
import dayjs from "dayjs";

const { Content, Footer, Sider } = Layout;

const CadastroProdutos = () => {
    const pathname = usePathname();
    const router = useRouter();

    const onFinish = async (values: any) => {
        try {
           
            const formattedValues = {
                nome: values.nome,
                preco: parseFloat(values.preco),
                lote: values.lote,
                validade: values.validade ? dayjs(values.validade).format('YYYY-MM-DD') : '',
                quantidadeEmEstoque: parseInt(values.quantidadeEmEstoque, 10),
                estoqueMinimo: parseInt(values.estoqueMinimo, 10),
                estoqueMaximo: parseInt(values.estoqueMaximo, 10),
                valorDeReposicao: parseInt(values.valorDeReposicao, 10),
                linkFoto: values.linkFoto,
            };

            console.log("Form values:", formattedValues);
            const response = await api.post("/produtos", formattedValues);
            console.log("Response from API:", response.data);
            message.success("Produto cadastrado com sucesso!");
            router.push("/produtos");
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            message.error("Erro ao cadastrar produto.");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Content style={{ padding: "0 48px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Cadastro Produtos</Breadcrumb.Item>
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
                            <Form.Item
                                label="Nome"
                                name="nome"
                                rules={[{ required: true, message: 'O nome não é válido' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Preço"
                                name="preco"
                                rules={[{ required: true, message: 'O preço não é válido' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Lote"
                                name="lote"
                                rules={[{ required: true, message: 'O lote não é válido' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Validade"
                                name="validade"
                                rules={[{ required: true, message: 'A validade não é válida' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                            <Form.Item
                                label="Quantidade em estoque"
                                name="quantidadeEmEstoque"
                                rules={[{ required: true, message: 'A quantidade em estoque não é válida' }]}
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item
                                label="Estoque mínimo"
                                name="estoqueMinimo"
                                rules={[{ required: true, message: 'O estoque mínimo não é válido' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Estoque máximo"
                                name="estoqueMaximo"
                                rules={[{ required: true, message: 'O estoque máximo não é válido' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Reposição"
                                name="valorDeReposicao"
                                rules={[{ required: true, message: 'O valor de reposição não é válido' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Link da foto"
                                name="linkFoto"
                                rules={[{ required: true, message: 'O link da foto não é válido' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 20 }}>
                                    Salvar
                                </Button>
                                <Button type="default">
                                    Cancelar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Desenvolvido por Jonathas e Samuel ©2024
            </Footer>
        </Layout>
    );
};

export default CadastroProdutos;
