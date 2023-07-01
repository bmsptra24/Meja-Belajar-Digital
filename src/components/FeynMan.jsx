import { useEffect, useState } from "react";
import { updateData, fetchDataRealtime } from "../store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../store/Firebase";
import validator from "validator";
import { AiOutlineClear } from "react-icons/ai";
import { getAnswer } from "../store/OpenAI";

const Feynman = () => {
  const [inputFeynman, setInputFeynman] = useState("");
  const [log, setLog] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/feynman`, (snapshot) => {
      setLog(
        Object.entries(snapshot)
          .slice(1) // remove first element
          .map((e) => e[1])
      );
    });
  }, [user.uid]);

  const inputHandle = (event) => {
    setInputFeynman(event.target.value);
  };

  const style = {
    message: "flex justify-end mt-6 ml-12 mr-2",
    aiMessage: "flex justify-start mt-6 mr-12 ml-2",
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey) return null;
    if (
      event.key === "Enter" &&
      !validator.isEmpty(inputFeynman) &&
      !validator.isWhitelisted(inputFeynman, " \n")
    ) {
      const defaultSystem = {
        content:
          "Your name is Digital Learning Desk. You are a tool for learning with the Feynman Technique. If at the beginning of the chat the user has not told you about the topic, you should ask what the topic is. If you already know what the topic is, now you should ask the user to explain what he knows about the topic. Then you will critique what the user said and don't forget to make questions to the user about the topic, so that the user can improve his long-term memory (you are like an innocent child and always ask questions about the topic being discussed and don't ask like this 'Do you have any questions?') or if it turns out that the user doesn't know anything about the topic. Repeat this step.",
        role: "system",
      };
      getAnswer(
        ["users/" + user.uid + "/feynman"],
        log,
        inputFeynman,
        setInputFeynman,
        defaultSystem
      );
      setInputFeynman("");
    }
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
                    <div className="p-3 bg-blue-200 rounded-lg text-justify justify-end">
                      {""}
                      {e.content}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={style.aiMessage}>
                <div className="p-3 bg-blue-200 rounded-lg">
                  what topic do you want to learn about?
                </div>
              </div>
            )}
          </div>
          <div className="flex items-end pt-2">
            <div
              className="group transition-all ease-out duration-700 w-14 h-14 rounded-full flex justify-center items-center bg-blue-300 border-2 border-blue-500 mr-2 cursor-pointer hover:w-36"
              onClick={() => {
                setLog([]);
                setInputFeynman("");
                updateData(["users/" + user.uid + "/feynman"], []);
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
              placeholder="type here..."
              maxLength={15000}
              value={inputFeynman}
              onChange={inputHandle}
              onKeyDown={handleKeyPress}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feynman;
