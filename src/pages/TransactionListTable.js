import { Row, Col, Card, Table, Button } from "antd";
import useTransactionList from "../hooks/UseTransactionList";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    align: "center",
  },
  {
    title: "Trans ID",
    dataIndex: "transId",
    key: "transId",
    align: "center",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    align: "center",
  },

  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => `${amount.toFixed(2)}`, // 2 ondalik raqam bilan ko'rsatish
  },
  {
    title: "Pay At",
    dataIndex: "payAt",
    key: "payAt",
    align: "center",
    render: (payAt) => {
      const date = new Date(...payAt); // payAt arrayidan sana olish
      return <span>{date.toLocaleDateString()}</span>;
    },
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    align: "center",
  },
  {
    title: "Success Transaction ID",
    dataIndex: "successTransId",
    key: "successTransId",
    align: "center",
  },

  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Link to={"/transaction-id/" + record.id}>
        <Button type="link">More Info</Button>
      </Link>
    ),
    align: "center",
  },
];

function TransactionListTable() {
  const { transactionListData } = useTransactionList();

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Transaction List"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={transactionListData} 
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default TransactionListTable;
