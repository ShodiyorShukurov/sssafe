import { Table } from "antd";
import { data } from "../../../mock/data";

const userData = ({ userListData }) => {
  const dataIndex =
    userListData?.length > 0
      ? userListData.map((user, index) => ({
          id: index + 1,
          name: user.name,
          chat_id: user.chat_id,
          phone_number: user.phone_number,
          guarantee: user.guarantee,
          create_at: user.create_at.slice(0, 10),
        }))
      : [];

  const columns = [
    {
      title: data.userListPageTable.id,
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: data.userListPageTable.name,
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (name) =>
        name ? name : <span style={{ color: "red" }}>Hе доступен</span>,
    },
    {
      title: data.userListPageTable.user_id,
      dataIndex: "chat_id",
      key: "chat_id",
      align: "center",
    },
    {
      title: data.userListPageTable.phone_number,
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
      render: (phone_number) =>
        phone_number ? (
          <a href={"tel:" + phone_number}>{phone_number}</a>
        ) : (
          "N/A"
        ),
    },
    {
      title: data.userListPageTable.guarantee,
      dataIndex: "guarantee",
      key: "guarantee",
      align: "center",
      render: (guarantee) => (guarantee ? guarantee : <span style={{color: "red"}}>Hе доступен</span>),
    },
    {
      title: data.userListPageTable.create,
      dataIndex: "create_at",
      key: "create_at",
      align: "center",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataIndex}
      pagination={false}
      className="ant-border-space"
    />
  );
};

export default userData;
