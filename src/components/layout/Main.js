import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");

  const openDrawer = () => setVisible(!visible);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary`}
          >
            <Sidenav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary `}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <AntHeader>
          <Header onPress={openDrawer} />
        </AntHeader>
        <Content className="content-ant">{children}</Content>
      </Layout>
    </Layout>
  );
}

export default Main;
