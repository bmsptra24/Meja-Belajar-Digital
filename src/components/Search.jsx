import { useEffect, useState } from "react";
import { fetchDataRealtime, updateData } from "../Store/Database";
import { getDataFromChatGPT } from "../Store/OpenAI";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import validator from "validator";
import { VscNewFile } from "react-icons/vsc";
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey) return null;
    if (
      event.key === "Enter" &&
      !validator.isEmpty(inputSearch) &&
      !validator.isWhitelisted(inputSearch, " \n")
    ) {
      getAnswer(user, log, inputSearch, setInputSearch);
      setInputSearch("");
    }
  };

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
    message: "flex justify-end mt-6",
    aiMessage: "flex justify-start mt-6 mr-40",
  };

  return (
    <div className="lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-xl lg:bg-blue-300">
      <div className="h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-blue-400">
        <div className="flex h-full flex-col overflow-scroll lg:overflow-hidden p-3 bg-blue-50 border-2 border-slate-800 rounded-lg justify-between">
          <div className="grow overflow-y-scroll">
            {log.length > 0 ? (
              log.map((e, idx) => {
                return (
                  <div
                    key={"message-" + idx}
                    className={
                      e.role === "user" ? style.message : style.aiMessage
                    }
                  >
                    <div className="p-3 bg-blue-200 rounded-lg">
                      {e.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.aiMessage}>
                <div className="p-3 bg-blue-200 rounded-lg">
                  what do you want to search?
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end pt-2">
            <div
              className="group transition-all ease-out duration-700 w-14 h-14 rounded-full flex justify-center items-center bg-blue-300 border-2 border-blue-500 mr-2 cursor-pointer hover:w-36"
              onClick={() => {
                setLog([]);
                setInputSearch("");
                updateData(["users/" + user.uid + "/search"], []);
              }}
            >
              <VscNewFile className="text-2xl " />
              <p className="ml-2 hidden group-hover:block whitespace-nowrap">
                New topic
              </p>
            </div>

            <textarea
              autoFocus
              className="transition-all ease-in-out grow h-14 border-2 focus:outline-none border-slate-300 rounded-lg p-2 focus:h-24 focus:shadow-md focus:border-slate-400 hover:shadow-md"
              placeholder="search"
              maxLength={15000}
              value={inputSearch}
              onKeyDown={handleKeyPress}
              onChange={inputHandle}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
