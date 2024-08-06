'use client'
import React from 'react';
import { Card, Select, Button, Row, Col, Layout, Menu,  theme } from 'antd';
import { UserOutlined, ProductOutlined, RocketOutlined, ShopOutlined, DollarOutlined } from "@ant-design/icons";
import { SelectProps } from 'antd/es/select';
import Image from 'next/image';
import Sider from 'antd/es/layout/Sider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Footer } from 'antd/es/layout/layout';

const { Option } = Select;
const { Content } = Layout;

const ProductPage: React.FC = () => {
  const pathname = usePathname();
  
  const handleSelectChange: SelectProps<number>['onChange'] = (value) => {
    console.log(`selected ${value}`);
  };

  const items2 = [
    { key: "/", icon: <UserOutlined />, label: <Link href="/">Funcionários</Link> },
    { key: "/produtos", icon: <ProductOutlined />, label: <Link href="/produtos">Estoque</Link> },
    { key: "/clientes", icon: <UserOutlined />, label: <Link href="/clientes">Clientes</Link> },
    { key: "/fornecedores", icon: <RocketOutlined />, label: <Link href="/fornecedores">Fornecedores</Link> },
    { key: "/compras", icon: <ShopOutlined />, label: <Link href="/compras">Vendas</Link> },
    { key: "/dividas", icon: <DollarOutlined />, label: <Link href="/dividas">Dívidas</Link> },
  ];

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
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
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={24}>
              <Card hoverable style={{ width: '100%' }}>
                <Image alt="produto" src="https://via.placeholder.com/300" width={250} height={250} unoptimized />
                <Card.Meta title="Nome do Produto" description="Descrição do produto" />
                <div style={{ marginTop: 16 }}>
                  <p><strong>Preço:</strong> R$ 100,00</p>
                  <Select defaultValue={1} style={{ width: 120 }} onChange={handleSelectChange}>
                    {Array.from({ length: 10 }, (_, index) => (
                      <Option key={index + 1} value={index + 1}>
                        {index + 1}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                  <Button type="primary">Adicionar ao Carrinho</Button>
                  <Button type="default">Comprar Agora</Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProductPage;
