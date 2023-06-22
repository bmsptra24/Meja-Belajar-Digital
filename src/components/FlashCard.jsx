import "../styles/Flashcard.css";
import { fetchDataRealtime, newKey, updateData } from "../Store/Database";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Store/Firebase";
import { useEffect, useRef, useState } from "react";
import {
  BsTrash,
  BsPlusLg,
  BsPlayFill,
  BsFillArrowRightSquareFill,
  BsFillArrowLeftSquareFill,
  BsArrowClockwise,
} from "react-icons/bs";

// add new note
const addCardModule = async (user, setCards, key = newKey("flashcard")) => {
  const template = {
    question: "",
    answer: "",
  };
  const keyCard = await newKey("card");

  setCards((e) => {
    return [...e, [keyCard, template]];
  });
  await updateData(
    ["users/" + user.uid + "/flashcard/" + key + "/cards/" + keyCard],
    template
  );
};

// remove a module card
const removeModuleCard = async (user, data, lastOpen) => {
  const key = data[lastOpen][0];
  updateData(["users/" + user.uid + "/flashcard/" + key], null);
};

const Note = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState([]); // all data flashcard
  const [title, setTitle] = useState(""); // a note was selected
  const [cards, setCards] = useState([]); // a note was selected
  const [lastOpen, setLastOpen] = useState(0);
  const [currentKeyCard, setCurrentKeyCard] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isSeeAnswer, setIsSeeAnswer] = useState(false);
  const [checkPoint, setCheckPoint] = useState(-1);
  const refTitle = useRef(null);

  // get data from database
  useEffect(() => {
    fetchDataRealtime(`users/${user.uid}/flashcard`, (snapshot) => {
      setData(Object.entries(snapshot).map((e) => e));
    });
  }, [user.uid]);

  // change state
  const changeState = {
    title: (event) => {
      handleUpdate("title", event.target.value);
    },
    question: (event, dbCardKey) => {
      handleCardUpdate(dbCardKey, "question", event.target.value);
    },
    answer: (event, dbCardKey) => {
      handleCardUpdate(dbCardKey, "answer", event.target.value);
    },
  };

  const handleUpdate = (key, value) => {
    if (lastOpen !== undefined) {
      setTitle(value);
      updateData(
        ["users/" + user.uid + "/flashcard/" + data[lastOpen][0] + "/" + key],
        value
      );
    }
  };

  const handleCardUpdate = (dbCardKey, cardProperty, value) => {
    if (lastOpen !== undefined) {
      setCards((prev) => {
        return prev.map((e) => {
          if (e[0] === dbCardKey) {
            e[1][cardProperty] = value;
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
            "/" +
            cardProperty,
        ],
        value
      );
    }
  };

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
      data[lastOpen][1].title !== undefined
        ? setTitle(data[lastOpen][1].title)
        : setTitle("");
      if (data[lastOpen][1].cards !== undefined) {
        setCards(Object.entries(data[lastOpen][1].cards));
      } else {
        setCards([]);
      }
      setCurrentKeyCard(data[lastOpen][0]);
    }
  }, [lastOpen]);

  const handleClickRefTitle = () => {
    refTitle.current.focus();
  };

  return (
    <div className="regular-size shadow">
      <div className="regular-size position-relative">
        <div className=" align-items-center row d-flex justify-content-center p-3 ps-4 pe-4">
          {!isPlay && (
            <>
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
                              style={
                                ({ cursor: "pointer" }, { minHeight: "35px" })
                              }
                              onClick={() => {
                                data.map((e, index) => {
                                  if (idx === index && idx !== data.length) {
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
                  title="Add flashcard"
                  className="icon"
                  onClick={async () => {
                    addCardModule(user, setCards);
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
                      <div
                        title="Delete flashcard"
                        onClick={() => {
                          // jika menghapus elemen terakhir dan data > 1
                          if (data.length - 2 === lastOpen) {
                            updateData(
                              [
                                "users/" +
                                  user.uid +
                                  "/flashcard/" +
                                  "lastOpen",
                              ],
                              lastOpen - 1
                            );
                          }
                          removeModuleCard(user, data, lastOpen);
                        }}
                      >
                        <BsTrash style={{ fontSize: "22px" }} />
                      </div>
                      <div className="d-flex align-items-center ">
                        <div
                          title="Add card"
                          className="me-2"
                          onClick={() => {
                            addCardModule(user, setCards, currentKeyCard);
                          }}
                        >
                          <BsPlusLg style={{ fontSize: "x-large" }} />
                        </div>
                        <div
                          title="Start flashcard"
                          onClick={() => {
                            setIsPlay((e) => !e);
                          }}
                        >
                          <BsPlayFill style={{ fontSize: "x-large" }} />
                        </div>
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
                      {cards !== null &&
                        cards.map((e, idx) => {
                          return (
                            <div
                              key={idx}
                              className="d-flex justify-content-between w-100 mt-2"
                            >
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
                                  changeState.question(event, e[0]);
                                }}
                                value={e[1].question}
                              ></textarea>
                              <textarea
                                className="form-control border-dark-subtle border border-1 w-50 ms-2"
                                style={{ height: "20vh" }}
                                placeholder="note"
                                id="floatingTextarea2"
                                rows={5}
                                maxLength={20000}
                                onChange={(event) => {
                                  changeState.answer(event, e[0]);
                                }}
                                value={e[1].answer}
                              ></textarea>
                              <BsTrash
                                className="mt-1 ms-2"
                                onClick={() => {
                                  cards.map((e, idxCard) => {
                                    if (idxCard === idx) {
                                      updateData(
                                        "users/" +
                                          user.uid +
                                          "/flashcard/" +
                                          data[lastOpen][0] +
                                          "/cards/" +
                                          e[0],
                                        null
                                      );
                                      setCards((e) =>
                                        e.filter((_, idx) => idx !== idxCard)
                                      );
                                    }
                                  });
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ) : (
                  <div>...</div>
                )}
              </div>
            </>
          )}
          {isPlay && (
            <>
              <div className="d-flex w-100 justify-content-center flex-column align-items-center rounded-3 border border-2 border-black bg-white content-1 p-3 pt-2">
                <div>
                  {!isStart && (
                    <div
                      className="btn"
                      onClick={() => {
                        setCheckPoint(0);
                        setIsStart((e) => !e);

                        // generate random number
                        // const randomnumbertemp = await shuffleArray(
                        //   generateNumberArray(cards.length)
                        // );
                        // await setRandomNumbers(randomnumbertemp);
                        // setRandomNumber(
                        //   randomNumbers && randomNumbers[checkPoint] - 1
                        // );
                        // console.log(randomNumber);
                        // console.log(cards[randomNumbers[0]-1][1].question);
                        // setRandomNumbers(
                        //   shuffleArray(generateNumberArray(cards.length))
                        // );
                        // console.log({ randomNumbers });
                      }}
                    >
                      <p className="fs-1 fw-bolder mx-4 mt-2">START</p>
                    </div>
                  )}
                  {isStart && (
                    <div>
                      {!isSeeAnswer ? (
                        <p className="fs-3 mx-4 mt-2">
                          {cards &&
                            checkPoint !== -1 &&
                            cards[checkPoint][1].question}
                        </p>
                      ) : (
                        <p className="fs-3 mx-4 mt-2">
                          {cards &&
                            checkPoint !== -1 &&
                            cards[checkPoint][1].answer}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {isStart && (
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "-10vh" }}
          >
            <BsFillArrowLeftSquareFill
              className="fs-1 me-4"
              onClick={() => {
                if (checkPoint > 0) {
                  if (isSeeAnswer) {
                    setIsSeeAnswer((e) => !e);
                  }
                  setCheckPoint((e) => e - 1);
                }

                // setRandomNumber(randomNumbers[checkPoint] - 1);
                // console.log(cards[randomNumber][1].answer);
              }}
            />
            <BsArrowClockwise
              className="fs-1 me-4"
              onClick={() => setIsSeeAnswer((e) => !e)}
            />
            <BsFillArrowRightSquareFill
              className="fs-1"
              onClick={() => {
                if (checkPoint < cards.length - 1) {
                  if (isSeeAnswer) {
                    setIsSeeAnswer((e) => !e);
                  }
                  setCheckPoint((e) => e + 1);
                }
                if (checkPoint >= cards.length - 1) {
                  setIsStart((e) => !e);
                  setIsPlay((e) => !e);
                }

                // setRandomNumber(randomNumbers[checkPoint] - 1);
                // console.log(cards[randomNumber][1].answer);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
