"use client";
import React, { useEffect, useState } from "react";
import { Card, Select, Button, Row, Col, Layout, Menu, theme, Spin, Alert } from "antd";
import { UserOutlined, ProductOutlined, RocketOutlined, ShopOutlined, DollarOutlined } from "@ant-design/icons";
import { SelectProps } from "antd/es/select";
import Image from "next/image";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import { Footer } from "antd/es/layout/layout";
import { usePathname, useRouter } from "next/navigation";
import api from "../../../../lib/axios";

interface Props {
  params: {
    id: string;
  };
}

interface Produto {
  id: string;
  nome: string;
  preco: number;
  lote: string;
  validade: string;
  quantidadeEmEstoque: number;
  estoque_minimo: number;
  estoque_maximo: number;
  valorDeReposicao: number;
  linkFoto: string;
}

const { Option } = Select;
const { Content } = Layout;

const ProductPage: React.FC<Props> = ({ params }) => {
  const pathname = usePathname();
  const { id } = params;
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1); // Estado para a quantidade selecionada
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchProduto = async () => {
        try {
          const response = await api.get<Produto>(`/produtos/${id}`);
          setProduto(response.data);
          console.log(response.data);
        } catch (error) {
          setError("Erro ao carregar dados do produto.");
          console.error("Erro ao carregar dados do produto:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduto();
    }
  }, [id]);

  const handleSelectChange: SelectProps<number>["onChange"] = (value) => {
    setQuantidade(value);
    console.log(`Quantidade selecionada: ${value}`);
  };

  const handleFinalizarCompra = () => {
    if (produto) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      carrinho.push({ ...produto, quantidade });
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      router.push(`/finalizarCompra/${id}?quantidade=${quantidade}`);
    }
  };

  const handleAdicionarCarrinho = () => {
    if (produto) {
      // Adiciona o produto ao localStorage
      const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
      carrinho.push({ ...produto, quantidade });
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
  };

  const items2 = [
    { key: "/", icon: <UserOutlined />, label: <Link href="/">Funcionários</Link> },
    { key: "/produtos", icon: <ProductOutlined />, label: <Link href="/produtos">Estoque</Link> },
    { key: "/clientes", icon: <UserOutlined />, label: <Link href="/clientes">Clientes</Link> },
    { key: "/fornecedores", icon: <RocketOutlined />, label: <Link href="/fornecedores">Fornecedores</Link> },
    { key: "/vendas", icon: <ShopOutlined />, label: <Link href="/vendas">Vendas</Link> },
    { key: "/dividas", icon: <DollarOutlined />, label: <Link href="/dividas">Dívidas</Link> },
  ];

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (loading) return <Spin style={{ margin: "20px auto", display: "block" }} />;

  if (error) return <Alert message={error} type="error" showIcon style={{ margin: "20px auto", display: "block" }} />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          selectedKeys={[pathname]}
          style={{ height: "100%", borderRight: 0 }}
          items={items2}
        />
      </Sider>
      <Layout style={{ flex: 1 }}>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={24}>
              {produto && (
                <Card hoverable style={{ width: "100%" }}>
                  <Image
                    alt={produto.nome}
                    src={produto.linkFoto}
                    width={250}
                    height={250}
                    unoptimized
                  />
                  <Card.Meta
                    title={produto.nome}
                    description={`Lote: ${produto.lote} | Validade: ${produto.validade}`}
                  />
                  <div style={{ marginTop: 16 }}>
                    <p>
                      <strong>Preço:</strong> {produto.preco}
                    </p>
                    <Select
                      value={quantidade}
                      style={{ width: 120 }}
                      onChange={handleSelectChange}
                    >
                      {Array.from({ length: produto.quantidadeEmEstoque }, (_, index) => (
                        <Option key={index + 1} value={index + 1}>
                          {index + 1}
                        </Option>
                      ))}
                    </Select>
                    <p><strong>Valor Total:</strong> R$ {produto.preco * quantidade}</p>
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      display: "flex",
                      gap: 16,
                    }}
                  >
                    <Button type="primary" onClick={handleFinalizarCompra}>Finalizar Compra</Button>
                    <Button type="default" onClick={handleAdicionarCarrinho}>Adicionar ao Carrinho</Button>
                  </div>
                </Card>
              )}
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Desenvolvido por Jonathas e Samuel ©2024
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
