import React from "react";
import Api from "../api";

const useUserList = () => {
  const [userListData, setUserListData] = React.useState();
  
  const fetchUserListData = async () => {
    try {
      const res = await Api.get("/user/read-all");
      setUserListData(res.data);
    } catch (error) {
      console.error(error); // Xato xabarini konsolga chiqarish
      throw error;
    }
  };


  React.useEffect(() => {
    fetchUserListData();
  }, []);

  return {
    userListData,
  };
};

export default useUserList;
