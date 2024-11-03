import React from "react";
import Api from "../api";

const useChannelAdmin = () => {
  const [channelAdminData, setChannelAdminData] = React.useState([]);
  const [editData, setEditData] = React.useState(false);

  const fetchChannelAdmin = async () => {
    try {
      const res = await Api.get("/channel-admin");
      setEditData(false);
      setChannelAdminData([res.data.data]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  React.useEffect(() => {
    fetchChannelAdmin();
  }, [editData]);

  return { channelAdminData, setEditData };
};

export default useChannelAdmin;
