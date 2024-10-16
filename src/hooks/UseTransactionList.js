import React from "react";
import Api from "../api";

const useTransactionList= () => {
  const [transactionListData, setTransactionListData] = React.useState();

  const fetchTransactionData = async () => {
    try {
      const res = await Api.get("/transaction/read-all");
      setTransactionListData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchTransactionData();
  }, []);

  return {
    transactionListData,
  };
};

export default useTransactionList;
