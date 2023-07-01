import { useEffect, useState } from "react";
import { fetchDataRealtime, updateData } from "../store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../store/Firebase";
import { AiOutlineClear } from "react-icons/ai";
import { ImSpinner9 } from "react-icons/im";
import { BsFillClipboard2Fill } from "react-icons/bs";
import { getAnswer } from "../store/OpenAI";
import { useSelector, useDispatch } from "react-redux";
import { setIsGeneratingGpt } from "../features/loading/isLoading";
import { HandleEnterPress } from "../store/HandleEnterPress";
// // get answer from api
// const getAnswer = async (user, log, input, setState) => {
//   //DEFAULT SYSTEM GPT
//   const defaultSystem = {
//     content:
//       "Your name is Meja Belajar Digital. You are a helpful search engine designed to assist students in their learning journey.",
//     role: "system",
//   };

//   // reset state
//   setState("");

//   if (input.length !== 0) {
//     const templateUser = [
//       defaultSystem,
//       ...log,
//       { content: input, role: "user" },
//     ];
//     await updateData(["users/" + user.uid + "/search"], templateUser);

//     const data = await getDataFromChatGPT(templateUser);
//     if (data) {
//       updateData(["users/" + user.uid + "/search"], [...templateUser, data]);
//     } else {
//       const templateError = { role: "assistant", content: "error" };
//       updateData(["users/" + user.uid + "/search"], templateError);
//     }
//   }
// };

const Search = () => {
  const [inputSearch, setInputSearch] = useState("");
  const [log, setLog] = useState([]);
  const [user] = useAuthState(auth);
  const { isGeneratingGpt } = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

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
    message: "flex justify-end mt-6 ml-12 mr-2",
    aiMessage: "flex justify-start mt-6 mr-12 ml-2 group",
  };

  return (
    <div className="z-10 lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-xl lg:bg-blue-300">
      <div className="h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-blue-400">
        <div className="flex h-full flex-col p-3 bg-blue-50 border-0 lg:border-2 border-slate-800 rounded-lg justify-between">
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
                    <div className="p-3 bg-blue-200 rounded-lg text-justify justify-end relative">
                      {e.content.split("\n").map((e, i) => {
                        return (
                          <div key={i}>
                            <p>{e}</p>
                          </div>
                        );
                      })}
                      <div
                        className="transition-all ease-in-out m-1 shadow-sm hover:shadow-lg opacity-0 group-hover:opacity-100 absolute right-0 top-0 bg-slate-200/75 hover:bg-slate-100 p-1.5 rounded-md cursor-pointer"
                        onClick={() => {
                          navigator.clipboard.writeText(e.content);
                        }}
                      >
                        <BsFillClipboard2Fill className="text-slate-600" />
                      </div>
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
            {isGeneratingGpt && (
              <div className={style.aiMessage}>
                <div className="p-3 bg-blue-200 rounded-lg flex">
                  <ImSpinner9 className="animate-spin" />
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end pt-2">
            <div
              className="group transition-all ease-out duration-700 w-14 h-14 rounded-full flex justify-center items-center bg-blue-300 border-2 border-blue-500 mr-2 cursor-pointer hover:w-36 hover:bg-blue-400 hover:drop-shadow-md"
              onClick={() => {
                setLog([]);
                setInputSearch("");
                updateData(["users/" + user.uid + "/search"], []);
                dispatch(setIsGeneratingGpt(false));
              }}
            >
              <AiOutlineClear className="text-3xl" />
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
              onKeyDown={(event) =>
                HandleEnterPress(event, inputSearch, async () => {
                  const defaultSystem = {
                    content:
                      "Your name is Meja Belajar Digital. You are a helpful search engine designed to assist students in their learning journey.",
                    role: "system",
                  };
                  dispatch(setIsGeneratingGpt(true));
                  await getAnswer(
                    ["users/" + user.uid + "/search"],
                    log,
                    inputSearch,
                    setInputSearch,
                    defaultSystem
                  );
                  setInputSearch("");
                  dispatch(setIsGeneratingGpt(false));
                })
              }
              onChange={inputHandle}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
