import React from 'react';
import Api from '../api';

const useUserTransaction = () => {
  const [transactionListData, setTransactionListData] = React.useState([]);

  const fetchTransactionData = async (userId) => {
    if (!userId) return; 
    try {
      console.log(userId)
      const res = await Api.get(`/transactions/user?user_id=${userId}`);
      setTransactionListData(res.data.data);
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
