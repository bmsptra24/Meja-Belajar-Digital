import { useEffect, useState } from "react";
import { fetchDataRealtime, updateData } from "../Store/Database";
import { getDataFromChatGPT } from "../Store/OpenAI";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { BsSearch } from "react-icons/bs";
import "../styles/Search.css";

// get answer from api
const getAnswer = async (user, log, input, setState) => {
  //DEFAULT SYSTEM GPT
  const defaultSystem = {
    content:
      "Your name is Meja Belajar Digital. You are a helpful search engine designed to assist students in their learning journey.",
    role: "system",
  };

  // reset state
  setState("");

  if (input.length !== 0) {
    const templateUser = [
      defaultSystem,
      ...log,
      { content: input, role: "user" },
    ];
    await updateData(["users/" + user.uid + "/search"], templateUser);

    const data = await getDataFromChatGPT(templateUser);
    if (data) {
      updateData(["users/" + user.uid + "/search"], [...templateUser, data]);
    } else {
      const templateError = { role: "assistant", content: "error" };
      updateData(["users/" + user.uid + "/search"], templateError);
    }
  }
};

const Search = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [log, setLog] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/search`, (snapshot) => {
      snapshot !== null &&
        setLog(
          Object.entries(snapshot)
            .slice(1) // remove first element
            .map((e) => e[1])
        );
    });
  }, [user.uid]);

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
                    ada yang bisa dibantu?
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
                placeholder="search"
                maxLength={15000}
                id="floatingTextarea2"
                value={inputSearch}
                onChange={inputHandle}
              ></textarea>
            </div>
            <button
              title="Send"
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
