import { useEffect, useState } from "react";
import { updateData } from "../Store/Database";
import { getDataFromChatGPT } from "../Store/OpenAI";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { BsSearch } from "react-icons/bs";
import "../styles/Search.css";

// realtime databe
const DataRealtime = async (path, callback) => {
  const transferData = (snapshot) => {
    callback(snapshot);
  };
  const dbRef = ref(getDatabase(), path);
  await onValue(dbRef, (snapshot) => {
    if (snapshot.val() !== null) {
      let result = Object.entries(snapshot.val())
        .map((e, idx) => {
          if (idx !== 0) {
            return e[1];
          }
        })
        .filter((e, idx) => idx !== 0);
      transferData(result);
    }
  });
};

// get answer from api
const getAnswer = async (user, log, input, setState) => {
  //DEFAULT SYSTEM GPT
  const defaultSystem = {
    content:
      "Your name is Digital Learning Desk. You are a tool for learning with the Feynman Technique. If at the beginning of the chat the user has not told you about the topic, you should ask what the topic is. If you already know what the topic is, now you should ask the user to explain what he knows about the topic. Then you will critique what the user said and don't forget to make questions to the user about the topic, so that the user can improve his long-term memory (you are like an innocent child and always ask questions about the topic being discussed and don't ask like this 'Do you have any questions?') or if it turns out that the user doesn't know anything about the topic. Repeat this step.",
    role: "system",
  };

  // reset state
  setState("");

  if (input.length !== 0) {
    // const key = newKey("search");
    const templateUser = [
      defaultSystem,
      ...log,
      { content: input, role: "user" },
    ];
    await updateData(["users/" + user.uid + "/feynman"], templateUser);

    const data = await getDataFromChatGPT(templateUser);
    if (data) {
      updateData(["users/" + user.uid + "/feynman"], [...templateUser, data]);
    } else {
      const templateError = { role: "assistant", content: "error" };
      updateData(["users/" + user.uid + "/feynman"], templateError);
    }
  }
};

const Search = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [log, setLog] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    DataRealtime(`users/${user.uid}/feynman`, (snapshot) => {
      setLog(snapshot);
    });
  }, []);
  // console.log(log);
  const inputHandle = (event) => {
    setInputSearch(event.target.value);
  };

  const style = {
    message: "massage d-flex justify-content-end mb-4 ps-5",
    aiMessage: "ai-massage d-flex justify-content-start mb-4 pe-5",
  };

  return (
    <div className="regular-size shadow">
      <div className="regular-size p-3">
        <div className="d-flex justify-content-between flex-column rounded-3 border border-2 border-black bg-white-dark content-1 p-3">
          <div className="overflow-auto pb-5">
            <div className="log pt-2 pe-3">
              {log.length > 0 ? (
                log.map((e, idx) => {
                  return (
                    <div
                      key={"message-" + idx}
                      className={
                        e.role === "user" ? style.message : style.aiMessage
                      }
                    >
                      <div className="p-2 pt-1 rounded ">{e.content}</div>
                    </div>
                  );
                })
              ) : (
                <div className={style.aiMessage}>
                  <div className="p-2 pt-1 rounded ">
                    what topic you want to learn about?
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="position-relative mt-5 ">
            <div className="d-flex justify-content-between form-search start-0 end-0 bottom-0 position-absolute z-1 search-box">
              <textarea
                autoFocus
                className="form-control fs-6 rounded rounded-3 pe-4 "
                placeholder="type here..."
                maxLength={15000}
                id="floatingTextarea2"
                value={inputSearch}
                onChange={inputHandle}
              ></textarea>
            </div>
            <button
              onClick={() => getAnswer(user, log, inputSearch, setInputSearch)}
              className="position-absolute z-2 end-0 p-1 pt-0 me-2 fs-5 btn-search "
              style={{ bottom: "1vh" }}
            >
              <BsSearch />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
