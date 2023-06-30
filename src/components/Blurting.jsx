import { useEffect, useState } from "react";
import {
  fetchDataRealtime,
  newKey,
  timestamp,
  updateData,
} from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import "../styles/Icon.css";
import { useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsTrash, BsPlusLg } from "react-icons/bs";

// add new module
const addModule = async (user) => {
  const template = {
    title: "",
    date: `${timestamp().day}/${timestamp().month}/${timestamp().year}`,
    remembered: "",
    forgotten: "",
    questions: "",
  };
  const key = newKey("moduls");
  updateData(["users/" + user.uid + "/moduls/" + key], template);
};

// remove a module
const removeModul = async (user, data, lastOpen) => {
  const key = data[lastOpen][0];
  updateData(["users/" + user.uid + "/moduls/" + key], null);
};

const Blurting = () => {
  const [user] = useAuthState(auth);
  const [modul, setModul] = useState([]);
  const [lastOpen, setLastOpen] = useState(0);
  const [data, setData] = useState([]);
  const [isListModuksClicked, setIsListModuksClicked] = useState(false);
  const refTitle = useRef(null);

  // change state
  const changeState = {
    title: (event) => {
      handleModulUpdate("title", event.target.value);
    },
    remembered: (event) => {
      handleModulUpdate("remembered", event.target.value);
    },
    forgotten: (event) => {
      handleModulUpdate("forgotten", event.target.value);
    },
    questions: (event) => {
      handleModulUpdate("questions", event.target.value);
    },
  };

  const handleModulUpdate = (key, value) => {
    if (lastOpen !== undefined) {
      setModul((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
      updateData(
        ["users/" + user.uid + "/moduls/" + data[lastOpen][0] + "/" + key],
        value
      );
    }
  };

  const handleClickRefTitle = () => {
    refTitle.current.focus();
  };

  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/moduls`, (snapshot) => {
      setData(Object.entries(snapshot).map((e) => e));
    });
  }, [user.uid]);

  useEffect(() => {
    if (data.length > 1) {
      setLastOpen(data[data.length - 1][1]);
    } else {
      setLastOpen(-1);
    }
  }, [data]);

  useEffect(() => {
    if (lastOpen >= 0 && data.length !== 0) {
      setModul(data[lastOpen][1]);
    }
  }, [lastOpen, data]);

  return (
    <div className="z-10 lg:h-5/6 lg:w-11/12 xl:w-5/6 h-full w-full lg:border-2 border-slate-800 rounded-xl lg:bg-blue-300">
      <div className="h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-blue-400">
        <div className="bg-slate-50 lg:bg-transparent flex-col overflow-x-hidden overflow-y-scroll lg:overflow-hidden lg:flex-row flex justify-between h-full">
          <div
            className={
              "bg-slate-50 lg:bg-blue-50 w-screen lg:w-1/5 py-3 p-2 rounded-xl lg:border-2 border-slate-800 lg:flex flex-col justify-between h-full z-10 lg:h-auto absolute lg:static " +
              (isListModuksClicked === true
                ? "visible lg:visible"
                : "hidden lg:visible")
            }
          >
            <div className="overflow-y-scroll mr-3 lg:mr-0 grow h-9/10 lg:h-auto mb-0 lg:mb-1">
              {lastOpen >= 0
                ? data.map((e, idx) => {
                    if (idx !== data.length - 1) {
                      return (
                        <div
                          key={"modul-" + idx}
                          className={`${
                            idx === lastOpen
                              ? "bg-slate-50 border-2 border-blue-300 drop-shadow-lg"
                              : "bg-slate-200 border-2 border-blue-50 hover:border-slate-300 hover:bg-slate-300"
                          } px-2 py-1 rounded-lg mb-1`}
                          style={({ cursor: "pointer" }, { minHeight: "35px" })}
                          onClick={() => {
                            setIsListModuksClicked((e) => !e);
                            data.map((e, index) => {
                              if (idx === index && idx !== data.length) {
                                updateData(
                                  [
                                    "users/" +
                                      user.uid +
                                      "/moduls/" +
                                      "lastOpen",
                                  ],
                                  idx
                                );
                              }
                            });
                          }}
                        >
                          <div
                            style={{ cursor: "pointer" }}
                            className="user-select-none"
                          >
                            {e[1].title}
                          </div>
                        </div>
                      );
                    }
                  })
                : data.length === 0
                ? "Loading..."
                : "Tidak ada modul..."}
            </div>
            <div className="w-full flex justify-end lg:justify-start pr-3 lg:pr-0 h-1/10 lg:h-auto items-center">
              <div
                title="Add new module"
                className="icon text-2xl transition ease-out bg-blue-200 hover:bg-blue-300 border-2 border-blue-500"
                onClick={async () => {
                  setIsListModuksClicked(false);
                  addModule(user);
                  if (lastOpen >= 0) {
                    // jika data masih ada maka:
                    await updateData(
                      ["users/" + user.uid + "/moduls/" + "lastOpen"],
                      data.length - 1
                    );
                  } else {
                    // jika tidak ada data:
                    await updateData(
                      ["users/" + user.uid + "/moduls/" + "lastOpen"],
                      0
                    );
                  }
                  handleClickRefTitle();
                }}
              >
                <BsPlusLg />
              </div>
            </div>
          </div>
          <div className="grow rounded-xl h-full border-0 lg:border-2 border-slate-800 bg-slate-50 lg:bg-blue-50 ml-0 lg:ml-2 p-3 pt-2 flex flex-col w-screen lg:w-auto">
            {lastOpen >= 0 ? (
              <>
                <div className="flex justify-between mb-3 pb-1 border-b-2 ">
                  {!isListModuksClicked && (
                    <div
                      className="visible lg:hidden text-xl hover:text-slate-400"
                      onClick={() => {
                        setIsListModuksClicked((e) => !e);
                      }}
                    >
                      <RxHamburgerMenu />
                    </div>
                  )}
                  <div>{modul.date}</div>
                  <div
                    title="Delete module"
                    onClick={() => {
                      // jika menghapus elemen terakhir dan data > 1
                      if (data.length - 2 === lastOpen) {
                        updateData(
                          ["users/" + user.uid + "/moduls/" + "lastOpen"],
                          lastOpen - 1
                        );
                      }
                      removeModul(user, data, lastOpen);
                    }}
                  >
                    <BsTrash className="hover:text-red-700 cursor-pointer text-xl transition ease-out" />
                  </div>
                </div>
                <div className="flex flex-col justify-between grow w-full lg:w-auto h-screen lg:h-auto">
                  <textarea
                    autoFocus
                    spellCheck={false}
                    className="resize-none transition ease-in-out bg-slate-50 lg:bg-blue-50 focus:outline-none focus:border-0 rounded-lg py-3 px-1 lg:px-3 h-16 text-2xl"
                    placeholder="Judul"
                    maxLength={44}
                    rows={5}
                    onChange={changeState.title}
                    value={modul.title}
                    ref={refTitle}
                  ></textarea>
                  <label
                    htmlFor="remembered"
                    className="lg:ml-3 text-slate-400 font-semibold"
                  >
                    Hal yang diingat
                  </label>
                  <textarea
                    id="remembered"
                    className="grow border-2 lg:border-0 mt-3 lg:mt-0 focus:border-slate-300 resize-none transition ease-in-out bg-slate-50 lg:bg-blue-50 focus:outline-none rounded-lg px-3 py-2 lg:py-0 mr-2 lg:mr-0"
                    placeholder="..."
                    spellCheck={false}
                    rows={5}
                    maxLength={20000}
                    onChange={changeState.remembered}
                    value={modul.remembered}
                  ></textarea>
                </div>
              </>
            ) : (
              <div>...</div>
            )}
          </div>
          <div className="min-h-screen lg:min-h-0 lg:h-full lg:w-4/12 p-0 flex justify-between flex-col mt-3 lg:mt-0 ml-0 lg:ml-2 lg:mr-0 gap-3 lg:px-0">
            <div className="h-1/2 rounded-xl border-0 lg:border-2 border-slate-800 bg-slate-50 lg:bg-blue-50  p-3 pt-1 flex flex-col">
              {lastOpen >= 0 ? (
                <>
                  <label
                    htmlFor="forgotten"
                    className="text-lsm mt-1 text-slate-400 font-semibold"
                  >
                    Hal yang dilupa
                  </label>
                  <textarea
                    className="grow border-2 lg:border-0 lg:mt-0 focus:border-slate-300 mt-1 resize-none transition ease-in-out bg-slate-50 lg:bg-blue-50 focus:outline-none rounded-lg px-3 lg:px-0 py-2 lg:py-0"
                    id="forgotten"
                    spellCheck={false}
                    placeholder="..."
                    onChange={changeState.forgotten}
                    value={modul.forgotten}
                    maxLength={10000}
                    rows={5}
                  ></textarea>
                </>
              ) : (
                <div>...</div>
              )}
            </div>
            <div className="h-1/2 rounded-xl border-0 lg:border-2 border-slate-800 bg-slate-50 lg:bg-blue-50 p-3 pt-1 flex flex-col ">
              {lastOpen >= 0 ? (
                <>
                  <label
                    htmlFor="questions"
                    className="text-lsm mt-1 text-slate-400 font-semibold"
                  >
                    Pertanyaan
                  </label>
                  <textarea
                    spellCheck={false}
                    id="questions"
                    placeholder="..."
                    className="grow border-2 lg:border-0 lg:mt-0 mt-1 focus:border-slate-300 resize-none transition ease-in-out bg-slate-50 lg:bg-blue-50 focus:outline-none rounded-lg px-3 lg:px-0 py-2 lg:py-0"
                    rows={5}
                    maxLength={5000}
                    onChange={changeState.questions}
                    value={modul.questions}
                  ></textarea>
                </>
              ) : (
                <div>...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blurting;
