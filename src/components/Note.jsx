import "../styles/Note.css";
import { fetchDataRealtime, newKey, updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { useEffect, useRef, useState } from "react";
import { BsTrash, BsPlusLg } from "react-icons/bs";

// add new note
const addNote = async (user) => {
  const template = {
    title: "",
    text: "",
  };
  const key = newKey("notes");
  updateData(["users/" + user.uid + "/notes/" + key], template);
};

// remove a note
const removeNote = async (user, data, lastOpen) => {
  const key = data[lastOpen][0];
  updateData(["users/" + user.uid + "/notes/" + key], null);
  // console.log("modul berhasil dihapus");
};

const Note = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]); // all data notes
  const [note, setNote] = useState([]); // a note was selected
  const [lastOpen, setLastOpen] = useState(0);
  const refTitle = useRef(null);

  // change state
  const changeState = {
    title: (event) => {
      handleChange("title", event.target.value);
    },
    text: (event) => {
      handleChange("text", event.target.value);
    },
  };

  const handleChange = (key, value) => {
    if (lastOpen !== undefined) {
      setNote((prev) => {
        prev[key] = value;
        return prev;
      });
      updateData(
        ["users/" + user.uid + "/notes/" + data[lastOpen][0] + "/" + key],
        value
      );
    }
  };

  // get data from database
  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/notes`, (snapshot) => {
      setData(Object.entries(snapshot || {}).map((entry) => entry));
    });
  }, [user.uid]);

  // set last open data for navigate in first modul
  useEffect(() => {
    if (data.length > 1) {
      setLastOpen(data[data.length - 1][1]);
    } else {
      setLastOpen(-1);
    }
  }, [data]);

  // set the note
  useEffect(() => {
    if (lastOpen >= 0 && data.length !== 0) {
      setNote(data[lastOpen][1]);
    }
  }, [lastOpen]);

  const handleClickRefTitle = () => {
    refTitle.current.focus();
  };

  // console.log(note.text);
  return (
    <div className="regular-size shadow">
      <div className="regular-size">
        <div className="row d-flex justify-content-between p-3 ps-4 pe-4">
          <div className="d-flex justify-content-between flex-column col-3 rounded-3 border border-2 border-black bg-white-dark content-1 p-2">
            <div>
              {lastOpen >= 0
                ? data.map((e, idx) => {
                    if (idx !== data.length - 1) {
                      return (
                        <div
                          key={"note-" + idx}
                          className={`${
                            idx === lastOpen
                              ? "bg-white-clicked"
                              : "bg-white-unclicked"
                          } px-2 py-1 rounded-3 border border-2 border-dark mb-1`}
                          style={({ cursor: "pointer" }, { minHeight: "35px" })}
                          onClick={() => {
                            data.map((e, index) => {
                              if (idx === index && idx !== data.length) {
                                updateData(
                                  [
                                    "users/" +
                                      user.uid +
                                      "/notes/" +
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
              title="Add note"
              className="icon"
              onClick={async () => {
                addNote(user);
                if (lastOpen >= 0) {
                  // jika data masih ada maka:
                  await updateData(
                    ["users/" + user.uid + "/notes/" + "lastOpen"],
                    data.length - 1
                  );
                } else {
                  // jika tidak ada data:
                  await updateData(
                    ["users/" + user.uid + "/notes/" + "lastOpen"],
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
                  <div></div>
                  <div
                    title="Delete note"
                    onClick={() => {
                      // jika menghapus elemen terakhir dan data > 1
                      if (data.length - 2 === lastOpen) {
                        updateData(
                          ["users/" + user.uid + "/notes/" + "lastOpen"],
                          lastOpen - 1
                        );
                      }
                      removeNote(user, data, lastOpen);
                    }}
                  >
                    <BsTrash style={{ fontSize: "22px" }} />
                  </div>
                </div>

                <div>
                  <textarea
                    autoFocus
                    className="form-control fs-4 mb-1"
                    placeholder="title"
                    maxLength={44}
                    id="floatingTextarea2"
                    rows={5}
                    onChange={changeState.title}
                    value={note.title}
                    ref={refTitle}
                  ></textarea>
                </div>
                <div className="form-remembered">
                  <textarea
                    className="form-control"
                    placeholder="note"
                    id="floatingTextarea2"
                    rows={5}
                    maxLength={20000}
                    onChange={changeState.text}
                    value={note.text}
                  ></textarea>
                </div>
              </div>
            ) : (
              <div>...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
