import React from 'react';
import Api from '../api';

const useUserTransaction = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);

  const fetchTransactionData = async (userId) => {
    if (!userId) return; 
    try {
      console.log(userId)
      const res = await Api.get(`/transaction/read-all-by-user-id/${userId}`);
      setTransactionListData(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    transactionListData,
    fetchTransactionData,
  };
};

export default useUserTransaction;
