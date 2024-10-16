import { Row, Col, Card, Table, Button } from "antd";
import { Link } from "react-router-dom";
import useUserList from "../hooks/UseUserList";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Phone Number",
    dataIndex: "contactNumber",
    key: "contactNumber",
    align: "center",
    render: (contactNumber) => (contactNumber ? contactNumber : "N/A"),
  },
  {
    title: "Admin (0-5)",
    dataIndex: "admin",
    key: "admin",
    align: "center",
  },
  {
    title: "Subscribed",
    dataIndex: "subscribed",
    key: "subscribed",
    align: "center",
    render: (subscribed) => (
      <Button
        type={subscribed ? "primary" : "default"}
        className={subscribed ? "tag-primary" : "tag-badge"}
      >
        {subscribed ? "Subscribed" : "Not Subscribed"}
      </Button>
    ),
  },
  {
    title: "Subscription End Time",
    dataIndex: "subscriptionEndTime",
    key: "subscriptionEndTime",
    align: "center",
    render: (time) => {
      const endDate = new Date(...time);
      return <span>{endDate.toLocaleDateString()}</span>;
    },
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    align: "center",
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Link to={"/user-list/" + record.id}>
        <Button type="link">More Info</Button>
      </Link>
    ),
    align: "center",
  },
];

function UsersListTable() {
  const { userListData } = useUserList(); 

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="User List"
          >
            <div className="table-responsive">
              <Table
                columns={columns}
                dataSource={userListData} 
                pagination={false}
                className="ant-border-space"
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UsersListTable;
