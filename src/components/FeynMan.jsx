import { useEffect, useState } from "react";
import { updateData, fetchDataRealtime } from "../Store/Database";
import { getDataFromChatGPT } from "../Store/OpenAI";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import validator from "validator";
// import "../styles/Search.css";

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

const Feynman = () => {
  const [inputSearch, setInputSearch] = useState("");
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
    setInputSearch(event.target.value);
  };

  const style = {
    message: "",
    aiMessage: "",
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey) return null;
    if (
      event.key === "Enter" &&
      !validator.isEmpty(inputSearch) &&
      !validator.isWhitelisted(inputSearch, " \n")
    )
      return getAnswer(user, log, inputSearch, setInputSearch);
  };

  return (
    <div className="regular-size shadow ">
      <div className="regular-size p-3">
        <div className="relative flex justify-between flex-col rounded-lg border border-2 rounded rounded-3xl border-black bg-white-dark content-1 p-3">
          <div className="">
            <div className="">
              {log.length > 0 ? (
                log.map((e, idx) => {
                  return (
                    <div
                      key={"message-" + idx}
                      className={
                        e.role === "user" ? style.message : style.aiMessage
                      }
                    >
                      <div className="">{e.content}</div>
                    </div>
                  );
                })
              ) : (
                <div className={style.aiMessage}>
                  <div className="">what topic you want to learn about?</div>
                </div>
              )}
            </div>
          </div>
          <div className="flex ">
            <div className="icon">clear</div>
            <textarea
              autoFocus
              className=""
              placeholder="type here..."
              maxLength={15000}
              value={inputSearch}
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
