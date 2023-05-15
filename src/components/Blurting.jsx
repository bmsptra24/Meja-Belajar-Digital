import { useEffect, useState } from "react";
import "../styles/Blurting.css";
import { newKey, timestamp, updateData, writeNewData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import plus from "../assets/icon/plus.png";
import "../styles/Icon.css";
import { useRef } from "react";

// const data = {
//   lastOpen: 0,
//   moduls: {
//     key1: {
//       title: "Metode Blurting",
//       date: "11/05/2023",
//       remembered:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nemo praesentium fugit consectetur saepe tempore ex ad cumque ab fugiat doloribus molestias, animi corrupti dolorum eligendi perferendis iste natus voluptate, ducimus sunt. Quisquam inventore deserunt nisi perspiciatis dignissimos sint sunt id rem minima expedita, voluptatem maxime itaque molestiae, ab ratione quam architecto. Voluptates deserunt, eos ratione assumenda veritatis magni minima qui similique fugit cumque. Rerum eius recusandae mollitia. Corrupti, laborum cumque doloremque ad quidem, eveniet sunt commodi, maiores quod sint nemo saepe ex dolores totam quis. Doloribus, veniam repellendus similique incidunt sapiente expedita ipsa, laboriosam aut recusandae impedit ut ratione!",
//       forgotten:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto repudiandae id, maxime a minus dignissimos in itaque tempora vel quas adipisci corporis sit modi est. Minus eveniet dolores magni!",
//       questions: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit"],
//     },
//     key2: {
//       title: "Cara masak ubi",
//       date: "11/05/2023",
//       remembered:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nemo praesentium fugit consectetur saepe tempore ex ad cumque ab fugiat doloribus molestias, animi corrupti dolorum eligendi perferendis iste natus voluptate, ducimus sunt. Quisquam inventore deserunt nisi perspiciatis dignissimos sint sunt id rem minima expedita, voluptatem maxime itaque molestiae, ab ratione quam architecto. Voluptates deserunt, eos ratione assumenda veritatis magni minima qui similique fugit cumque. Rerum eius recusandae mollitia. Corrupti, laborum cumque doloremque ad quidem, eveniet sunt commodi, maiores quod sint nemo saepe ex dolores totam quis. Doloribus, veniam repellendus similique incidunt sapiente expedita ipsa, laboriosam aut recusandae impedit ut ratione!",
//       forgotten:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto repudiandae id, maxime a minus dignissimos in itaque tempora vel quas adipisci corporis sit modi est. Minus eveniet dolores magni!",
//       questions: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit"],
//     },
//   },
// };

// get data
// const getDataModul = (user, setData) => {
//   let data = DataRealtime(`users/${user.uid}/moduls`);
//   // console.log(data);
//   data = Object.entries(data).map((e, ind) => {
//     return e;
//   });
//   setData(data);

// let data = await getDataUser(user)
//   .then((data) => {
//     return data.moduls;
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// data = Object.entries(data).map((e, ind) => {
//   return e;
// });
// setData(data);
// };

// function for switch between data after menu modul clicked
// const switchData = async (user, setData, idxNext) => {
//   const [lastOpen, title, date, remembered, forgotten, questions] =
//     await getDataModul(user);
//   // updateLastOpen()
//   // update state
//   setData([lastOpen, title, date, remembered, forgotten, questions]);
//   return lastOpen, title, date, remembered, forgotten, questions;
// };

// writeNewModul
const writeNewModul = (user) => {
  const data = {
    title: "Metode Blurting",
    date: "11/05/2023",
    remembered:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nemo praesentium fugit consectetur saepe tempore ex ad cumque ab fugiat doloribus molestias, animi corrupti dolorum eligendi perferendis iste natus voluptate, ducimus sunt. Quisquam inventore deserunt nisi perspiciatis dignissimos sint sunt id rem minima expedita, voluptatem maxime itaque molestiae, ab ratione quam architecto. Voluptates deserunt, eos ratione assumenda veritatis magni minima qui similique fugit cumque. Rerum eius recusandae mollitia. Corrupti, laborum cumque doloremque ad quidem, eveniet sunt commodi, maiores quod sint nemo saepe ex dolores totam quis. Doloribus, veniam repellendus similique incidunt sapiente expedita ipsa, laboriosam aut recusandae impedit ut ratione!",
    forgotten:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto repudiandae id, maxime a minus dignissimos in itaque tempora vel quas adipisci corporis sit modi est. Minus eveniet dolores magni!",
    questions: "",
  };
  updateData(["users/" + user.uid + "/moduls/" + "lastOpen"], 2);
  writeNewData(user, data, "moduls");
};

// realtime databe
const DataRealtime = (path, callback) => {
  const transferData = (snapshot) => {
    // console.log("work");
    callback(snapshot);
  };

  const dbRef = ref(getDatabase(), path);
  onValue(dbRef, (snapshot) => {
    let result = Object.entries(snapshot.val()).map((e, ind) => {
      return e;
    });
    transferData(result);
  });
};

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
  console.log("data berhasil dibuat");
};

// remove a module
const removeModul = async (user, data, lastOpen) => {
  const key = data[lastOpen][0];
  updateData(["users/" + user.uid + "/moduls/" + key], null);
  console.log("modul berhasil dihapus");
};

const Blurting = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]);
  // 0: (2) ['-NVD3c6X_lwBx_pcVxye', {…}]
  // 1: (2) ['-NVD3c6X_lwBx_pcVxyf', {…}]
  // 2: (2) ['-NVD3c6b_tIoQ1Yra0Nt', {…}]
  // 3: (2) ['lastOpen', 2]

  const [modul, setModul] = useState([]);
  const [lastOpen, setLastOpen] = useState(0);
  const [remembered, setRemembered] = useState("");
  const [forget, setForget] = useState("");
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState("");
  const refTitle = useRef(null);

  // change state
  const changeState = {
    title: (event) => {
      if (lastOpen !== undefined) {
        setModul((prev) => {
          prev.title = event.target.value;
          return prev;
        });
        updateData(
          ["users/" + user.uid + "/moduls/" + data[lastOpen][0] + "/title"],
          event.target.value
        );
      }
    },
    remembered: (event) => {
      if (lastOpen !== undefined) {
        setModul((prev) => {
          prev.remembered = event.target.value;
          return prev;
        });
        updateData(
          [
            "users/" +
              user.uid +
              "/moduls/" +
              data[lastOpen][0] +
              "/remembered",
          ],
          event.target.value
        );
      }
    },
    forget: (event) => {
      setForget(event.target.value);
      if (lastOpen !== undefined) {
        setModul((prev) => {
          console.log(prev);
          prev.forgotten = event.target.value;
          return prev;
        });
        updateData(
          ["users/" + user.uid + "/moduls/" + data[lastOpen][0] + "/forgotten"],
          event.target.value
        );
      }
    },
    questions: (event) => {
      setQuestion(event.target.value);
      if (lastOpen !== undefined) {
        setModul((prev) => {
          console.log(prev);
          prev.questions = event.target.value;
          return prev;
        });
        updateData(
          ["users/" + user.uid + "/moduls/" + data[lastOpen][0] + "/questions"],
          event.target.value
        );
      }
    },
  };

  const handleClickRefTitle = () => {
    refTitle.current.focus();
  };

  useEffect(() => {
    DataRealtime(`users/${user.uid}/moduls`, (snapshot) => {
      setData(snapshot);
    });
  }, []);

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
                            {e[1].title}
                          </div>
                        );
                      }
                    })
                  : "Tidak ada modul..."}
              </div>
              <div
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
              </div>
            </div>
            <div className="col rounded-3 border border-2 border-black bg-white content-1 ms-2 p-3 pt-2">
              {lastOpen >= 0 ? (
                <div>
                  <div className="d-flex justify-content-between mb-3 pb-1 border-bottom">
                    <div>{modul.date}</div>
                    {/* {modul.length > 1 ? ( */}
                    <div
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </div>
                    {/* // ) : null} */}
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
                    <label for="floatingTextarea2">Hal yang diingat</label>
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
                      onChange={changeState.forget}
                      value={modul.forgotten}
                      maxLength={10000}
                      rows={5}
                    ></textarea>
                    <label for="floatingTextarea2">Hal yang diingat</label>
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
                    <label for="floatingTextarea2">Pertanyaan</label>
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
