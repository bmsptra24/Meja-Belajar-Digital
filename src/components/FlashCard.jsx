import "../styles/Flashcard.css";
import { newKey, updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { BsTrash, BsPlusLg } from "react-icons/bs";

// add new note
const addCard = async (user, currentKeyCard, setCurrentKeyCard) => {
  const template = {
    question: "",
    answer: "",
  };
  const key = newKey("flashcard");
  if (!currentKeyCard) {
    currentKeyCard = newKey("card");
    setCurrentKeyCard(currentKeyCard);
  }
  updateData(
    ["users/" + user.uid + "/flashcard/" + key + "/cards/" + currentKeyCard],
    template
  );
};

// realtime databe
const DataRealtime = (path, callback) => {
  const transferData = (snapshot) => {
    callback(snapshot);
  };
  const dbRef = ref(getDatabase(), path);
  onValue(dbRef, (snapshot) => {
    if (snapshot.val()) {
      let result = Object.entries(snapshot.val()).map((e) => {
        return e;
      });
      transferData(result);
    }
  });
};

// remove a module card
const removeModuleCard = async (user, data, lastOpen) => {
  const key = data[lastOpen][0];
  updateData(["users/" + user.uid + "/flashcard/" + key], null);
  // console.log("modul berhasil dihapus");
};

// remove a card
// const removeCard = async (user, data, lastOpen, prevCards, idx) => {
//   // remove the card
//   const temp = prevCards.splice(idx, 1);

//   const key = data[lastOpen][0];
//   updateData(["users/" + user.uid + "/flashcard/" + key], temp);
//   // console.log("modul berhasil dihapus");
// };

const Note = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]); // all data flashcard
  const [note, setNote] = useState([]); // a note was selected
  const [title, setTitle] = useState([]); // a note was selected
  const [cards, setCards] = useState([]); // a note was selected
  const [idxCard, setIdxCards] = useState([]); // a note was selected
  const [lastOpen, setLastOpen] = useState(0);
  const [currentKeyCard, setCurrentKeyCard] = useState();
  const refTitle = useRef(null);
  // change state
  const changeState = {
    title: (event) => {
      if (lastOpen !== undefined) {
        // setNote((prev) => {
        //   prev.title = event.target.value;
        //   return prev;
        // });
        setTitle(event.target.value);
        updateData(
          ["users/" + user.uid + "/flashcard/" + data[lastOpen][0] + "/title"],
          event.target.value
        );
      }
    },
    question: (event, dbCardKey) => {
      if (lastOpen !== undefined) {
        // setNote((prev) => {
        //   prev.text = event.target.value;
        //   return prev;
        // });
        setCards((prev) => {
          return prev.map((e, idx) => {
            if (e[0] === dbCardKey) {
              e[1] = event.target.value;
            }
            return e;
          });
        });
        updateData(
          [
            "users/" +
              user.uid +
              "/flashcard/" +
              data[lastOpen][0] +
              "/cards/" +
              dbCardKey +
              "/question",
          ],
          event.target.value
        );
      }
    },
  };

  // get data from database
  useEffect(() => {
    DataRealtime(`users/${user.uid}/flashcard`, (snapshot) => {
      setData(snapshot);
    });
  }, []);
  // console.log(currentKeyCard);
  // set last open data for navigate in first modul
  useEffect(() => {
    if (data.length > 1) {
      setLastOpen(data[data.length - 1][1]);
      if (lastOpen >= 0 && data.length !== 0) {
        setCards(Object.entries(data[lastOpen][1].cards));
      }
    } else {
      setLastOpen(-1);
    }
  }, [data]);

  // set the note
  useEffect(() => {
    if (lastOpen >= 0 && data.length !== 0) {
      // setNote(data[lastOpen][1]);
      setTitle(data[lastOpen][1].title);
    }
  }, [lastOpen]);
  console.log(cards);
  const handleClickRefTitle = () => {
    refTitle.current.focus();
  };

  const Card = ({ idx, question, answer, dbCardKey }) => (
    <div className="d-flex justify-content-between w-100 mt-2">
      <div className="me-2 pt-2 d-flex">
        <p>{idx + 1}</p>
      </div>
      <textarea
        className="form-control border-dark-subtle border border-1 w-50 me-2"
        placeholder="note"
        style={{ height: "20vh" }}
        id="floatingTextarea2"
        rows={5}
        maxLength={20000}
        onChange={(event) => {
          changeState.question(event, dbCardKey);
        }}
        value={question}
      ></textarea>
      <textarea
        className="form-control border-dark-subtle border border-1 w-50 ms-2"
        style={{ height: "20vh" }}
        placeholder="note"
        id="floatingTextarea2"
        rows={5}
        maxLength={20000}
        onChange={(event) => {
          changeState.answer(event, dbCardKey);
        }}
        value={answer}
      ></textarea>
      <BsTrash className="mt-1 ms-2" />
    </div>
  );

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
                                // update curent card key
                                setCurrentKeyCard(e[0]);

                                // update last open
                                updateData(
                                  [
                                    "users/" +
                                      user.uid +
                                      "/flashcard/" +
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
              className="icon"
              onClick={async () => {
                addCard(user, currentKeyCard, setCurrentKeyCard);
                if (lastOpen >= 0) {
                  // jika data masih ada maka:
                  await updateData(
                    ["users/" + user.uid + "/flashcard/" + "lastOpen"],
                    data.length - 1
                  );
                } else {
                  // jika tidak ada data:
                  await updateData(
                    ["users/" + user.uid + "/flashcard/" + "lastOpen"],
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
                    onClick={() => {
                      // jika menghapus elemen terakhir dan data > 1
                      if (data.length - 2 === lastOpen) {
                        updateData(
                          ["users/" + user.uid + "/flashcard/" + "lastOpen"],
                          lastOpen - 1
                        );
                      }
                      removeModuleCard(user, data, lastOpen);
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
                    value={title}
                    ref={refTitle}
                  ></textarea>
                </div>
                <div className="overflow-scroll" style={{ height: "55vh" }}>
                  {cards.map((e, idx) => {
                    return (
                      <Card
                        idx={idx}
                        question={e[1].question}
                        answer={e[1].answer}
                        key={idx}
                        dbCardKey={e[0]}
                      />
                    );
                  })}
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
