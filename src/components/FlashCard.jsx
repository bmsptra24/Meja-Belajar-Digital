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
import { RxHamburgerMenu } from "react-icons/rx";

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
  const [isListCardsClicked, setIsListCardsClicked] = useState(false);
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
    <div className="lg:h-5/6 lg:w-4/5 xl:w-3/5 h-full w-full lg:border-2 border-slate-800 rounded-xl lg:bg-blue-300">
      <div className="h-full w-full lg:mt-3 lg:ml-3 lg:p-3 lg:border-2 border-slate-800 rounded-xl lg:bg-blue-400">
        <div className="flex h-full flex-col lg:flex-row overflow-scroll lg:overflow-hidden">
          {!isPlay && (
            <>
              <div
                className={
                  "bg-slate-50 lg:bg-blue-50 w-screen lg:w-1/5 py-3 pl-3 rounded-xl lg:border-2 border-slate-800 lg:flex flex-col justify-between h-full z-10 lg:h-auto absolute lg:static " +
                  (isListCardsClicked === true
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
                              key={"note-" + idx}
                              className={`${
                                idx === lastOpen
                                  ? "bg-slate-50 border-2 border-blue-300 drop-shadow-lg"
                                  : "bg-slate-200 border-2 border-blue-50 hover:border-slate-300 hover:bg-slate-300"
                              } px-2 py-1 rounded-lg mb-1`}
                              style={
                                ({ cursor: "pointer" }, { minHeight: "35px" })
                              }
                              onClick={() => {
                                setIsListCardsClicked((e) => !e);
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
                <div className="w-full flex justify-end lg:justify-start pr-3 lg:pr-0 h-1/10 lg:h-auto items-center">
                  <div
                    title="Add flashcard"
                    className="icon transition ease-out bg-blue-200 hover:bg-blue-300 border-2 border-blue-500 text-2xl"
                    onClick={async () => {
                      setIsListCardsClicked(false);
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
                    <BsPlusLg />
                  </div>
                </div>
              </div>
              <div className="rounded-lg lg:border-2 border-slate-800 bg-slate-50 lg:bg-blue-50 ml-0 lg:ml-2 p-3 pt-2 grow flex flex-col">
                {lastOpen >= 0 ? (
                  <>
                    <div className="flex justify-between mb-3 pb-1 border-b-2">
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
                        <BsTrash className="hover:text-red-700 cursor-pointer transition ease-out text-xl" />
                      </div>
                      {!isListCardsClicked && (
                        <div
                          className="visible lg:hidden text-xl hover:text-slate-400 absolute left-10 right-10 flex justify-center"
                          onClick={() => {
                            setIsListCardsClicked((e) => !e);
                          }}
                        >
                          <RxHamburgerMenu />
                        </div>
                      )}
                      <div className="flex align-items-center ">
                        <div
                          title="Add card"
                          className="me-2"
                          onClick={() => {
                            addCardModule(user, setCards, currentKeyCard);
                          }}
                        >
                          <BsPlusLg className="hover:text-slate-400 cursor-pointer transition ease-out text-2xl" />
                        </div>
                        <div
                          title="Start flashcard"
                          onClick={() => {
                            setIsPlay((e) => !e);
                          }}
                        >
                          <BsPlayFill className="hover:text-slate-400 cursor-pointer transition ease-out text-2xl" />
                        </div>
                      </div>
                    </div>

                    <textarea
                      autoFocus
                      spellCheck={false}
                      className="resize-none transition ease-in-out bg-slate-50 lg:bg-blue-50 focus:outline-none focus:border-none rounded-lg p-3 h-16 text-2xl"
                      placeholder="title"
                      maxLength={44}
                      rows={5}
                      onChange={changeState.title}
                      value={title}
                      ref={refTitle}
                    ></textarea>

                    <div className="overflow-y-scroll h-full">
                      {cards !== null &&
                        cards.map((e, idx) => {
                          return (
                            <div
                              key={idx}
                              className="flex justify-between w-100 mt-2"
                            >
                              <div className="me-2 pt-2 flex">
                                <p>{idx + 1}</p>
                              </div>
                              <textarea
                                className="form-control p-2 hover:shadow-lg transition ease-out border-slate-300 focus:outline-none focus:border-slate-400 focus:shadow-md border-2 w-50 mr-1 h-44 grow rounded-md"
                                spellCheck={false}
                                placeholder="question"
                                rows={5}
                                maxLength={20000}
                                onChange={(event) => {
                                  changeState.question(event, e[0]);
                                }}
                                value={e[1].question}
                              ></textarea>
                              <textarea
                                className="form-control p-2 hover:shadow-lg transition ease-out border-slate-300 focus:outline-none focus:border-slate-400 focus:shadow-md border-2 w-50 ms-1 h-44 grow rounded-md"
                                spellCheck={false}
                                placeholder="answer"
                                rows={5}
                                maxLength={20000}
                                onChange={(event) => {
                                  changeState.answer(event, e[0]);
                                }}
                                value={e[1].answer}
                              ></textarea>
                              <BsTrash
                                className="mt-1 ml-2 hover:text-red-700 cursor-pointer transition ease-out"
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
                  </>
                ) : (
                  <div>...</div>
                )}
              </div>
            </>
          )}
          {isPlay && (
            <>
              <div className="flex w-full h-full relative justify-center flex-col items-center rounded-xl border-none mb-1 lg:border-2 border-slate-800 bg-slate-50 lg:bg-blue-50 p-3 pt-2">
                <>
                  {!isStart && (
                    <div
                      className="transition ease-in-out bg-blue-300 p-3 rounded-lg px-6 hover:bg-blue-400 cursor-pointer"
                      onClick={() => {
                        setCheckPoint(0);
                        setIsStart(true);

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
                      <p className="font-bold text-3xl">START</p>
                    </div>
                  )}
                  {isStart && (
                    <>
                      <p className="absolute top-3 left-4 font-bold text-slate-500">
                        No. {checkPoint + 1} |{" "}
                        {isSeeAnswer ? "Answer" : "Question"}
                      </p>
                      <div className="grow flex justify-center items-center text-center">
                        {!isSeeAnswer ? (
                          <p className="text-lg mx-4 mt-2">
                            {cards &&
                              checkPoint !== -1 &&
                              cards[checkPoint][1].question}
                          </p>
                        ) : (
                          <p className="text-lg mx-4 mt-2">
                            {cards &&
                              checkPoint !== -1 &&
                              cards[checkPoint][1].answer}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center mb-5 lg:mb-auto">
                        <BsFillArrowLeftSquareFill
                          className="text-3xl text-slate-400 hover:text-slate-500 hover:shadow-md cursor-pointer transition ease-out"
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
                          className="text-3xl text-slate-400 hover:text-slate-500 hover:shadow-md cursor-pointer transition ease-out mx-7"
                          onClick={() => setIsSeeAnswer((e) => !e)}
                        />
                        <BsFillArrowRightSquareFill
                          className="text-3xl text-slate-400 hover:text-slate-500 hover:shadow-md cursor-pointer transition ease-out"
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
                    </>
                  )}
                </>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
