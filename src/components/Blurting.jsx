import { useEffect, useState } from "react";
import "../styles/Blurting.css";
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
  const refTitle = useRef(null);
  const [data, setData] = useState([]);

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
  }, [lastOpen]);

  return (
    <div className="full-size shadow">
      <div className="full-size">
        <div className="container">
          <div className="row d-flex justify-content-between p-3">
            <div className="d-flex justify-content-between flex-column col-2 rounded-3 border border-2 border-black bg-white-dark content-1 p-2">
              <div>
                {lastOpen >= 0
                  ? data.map((e, idx) => {
                      if (idx !== data.length - 1) {
                        return (
                          <div
                            key={"modul-" + idx}
                            className={`${
                              idx === lastOpen
                                ? "bg-white-clicked"
                                : "bg-white-unclicked"
                            } px-2 py-1 rounded-3 border border-2 border-dark mb-1`}
                            style={
                              ({ cursor: "pointer" }, { minHeight: "35px" })
                            }
                            onClick={() => {
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
              <div
                title="Add new module"
                className="icon"
                onClick={async () => {
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
                <BsPlusLg style={{ fontSize: "x-large" }} />
              </div>
            </div>
            <div className="col rounded-3 border border-2 border-black bg-white content-1 ms-2 p-3 pt-2">
              {lastOpen >= 0 ? (
                <div>
                  <div className="d-flex justify-content-between mb-3 pb-1 border-bottom">
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
                      <BsTrash style={{ fontSize: "22px" }} />
                    </div>
                  </div>

                  <div>
                    <textarea
                      autoFocus
                      className="form-control fs-4 mb-1"
                      placeholder="Judul"
                      maxLength={44}
                      id="floatingTextarea2"
                      rows={5}
                      onChange={changeState.title}
                      value={modul.title}
                      ref={refTitle}
                    ></textarea>
                  </div>
                  <div className="form-floating form-remembered">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      rows={5}
                      maxLength={20000}
                      onChange={changeState.remembered}
                      value={modul.remembered}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Hal yang diingat</label>
                  </div>
                </div>
              ) : (
                <div>...</div>
              )}
            </div>
            <div className="col-4 content-1 p-0 d-flex justify-content-between flex-column ms-2">
              <div className=" rounded-3 border border-2 border-black bg-white content-2 p-3 pt-1">
                {lastOpen >= 0 ? (
                  <div className="form-floating form-forget pb-1 mt-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      onChange={changeState.forgotten}
                      value={modul.forgotten}
                      maxLength={10000}
                      rows={5}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Hal yang dilupa</label>
                  </div>
                ) : (
                  <div>...</div>
                )}
              </div>
              <div className=" rounded-3 border border-2 border-black bg-white content-2 p-3 pt-1">
                {lastOpen >= 0 ? (
                  <div className="form-floating form-forget pb-1 mt-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      rows={5}
                      maxLength={5000}
                      onChange={changeState.questions}
                      value={modul.questions}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Pertanyaan</label>
                  </div>
                ) : (
                  <div>...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blurting;
