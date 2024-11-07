import React from "react";
import Api from "../api";

const useUserList = () => {
  const [userListData, setUserListData] = React.useState([]);
  const [next, setNext] = React.useState(1);

  const fetchUserListData = async () => {
    try {
      const res = await Api.get(`/users/list?limit=50&page=${next}`);
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const fetchUserPhoneNumberData = async (phoneNumber) => {
    try {
      const res = await Api.get(
        `/users/list?limit=50&page=${next}&phone=${phoneNumber}`
      );
      setUserListData(res.data.data);
    } catch (error) {
      console.error(error);
      if (error.message === "Request failed with status code 404") {
        setUserListData([]);
      }
      // throw error;
    }
  };

  React.useEffect(() => {
    fetchUserListData();
  }, [next]);

  return {
    userListData,
    next,
    setNext,
    fetchUserPhoneNumberData,
  };
};

export default useUserList;
