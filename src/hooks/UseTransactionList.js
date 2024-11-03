import React from "react";
import Api from "../api";

const useTransactionList= () => {
  const [transactionListData, setTransactionListData] = React.useState([]);
  const [next, setNext] = React.useState(1);
  const [addData, setAddData] = React.useState(false)

  const fetchTransactionData = async () => {
    try {
      const res = await Api.get(`/transactions/list?limit=50&page=${next}`);
      setTransactionListData(res.data.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransactionData();
  }, [next, addData]);

  return {
    transactionListData,
    setNext,
    next,
    setAddData,
  };
};

export default useTransactionList;
