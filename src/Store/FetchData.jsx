import { auth } from "../Store/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchDataRealtime, updateData } from "../Store/Database";
import { setConfig } from "../Features/Database";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const FetchData = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/config`, (snapshot) => {
        dispatch(setConfig(snapshot));
      });
    }
  }, [user, dispatch]);

  return <></>;
};

export default FetchData;
