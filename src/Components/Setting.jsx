import { auth, deleteUserAccount, resetPassword } from "../Store/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchDataRealtime, updateData } from "../Store/Database";
import { BsPerson, BsCheckLg } from "react-icons/bs";
import { VscSymbolColor } from "react-icons/vsc";
import CloseButton from "./CloseButton";
import { useState, useEffect } from "react";
import { images } from "../Store/Background";
import { BiLogOutCircle } from "react-icons/bi";
import { signOutBtn } from "../Store/Firebase";

const Setting = () => {
  const [user] = useAuthState(auth);

  const [account, setAccount] = useState(true);
  const [themes, setThemes] = useState(false);
  const [config, setConfig] = useState({});
  const [inputNewName, setInputNewName] = useState("");

  // get data from database
  useEffect(() => {
    if (user) {
      fetchDataRealtime(`users/${user.uid}/config`, (snapshot) => {
        setConfig(snapshot);
      });
    }
  }, [user]);

  const hideAll = () => {
    setAccount(false);
    setThemes(false);
  };

  const handleTaskbar = (value, category) => {
    updateData(["users/" + user.uid + "/config/taskbar/" + category], value);
  };

  const handleTheme = (value) => {
    updateData(["users/" + user.uid + "/config/theme"], value);
  };

  const handleColor = (value) => {
    updateData(["users/" + user.uid + "/config/color"], value);
  };

  const handleBackground = (value) => {
    updateData(["users/" + user.uid + "/config/background"], value);
  };

  const handleInput = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <>
      <div className="absolute z-50 w-full h-full bg-slate-950/50"></div>
      <div className="absolute z-50 w-8/12 h-9/10 flex">
        {/* menu */}
        <div className="w-64 h-full bg-slate-100 border-r-2 rounded-s-xl flex flex-col">
          <div className="border-b-2 p-5">
            <p className="text-xl font-bold ">Setting</p>
          </div>
          <div className="py-5 px-3 flex flex-col justify-between grow">
            <div className="flex flex-col gap-2">
              <div
                className={
                  "flex gap-3 items-center hover:bg-slate-300/50 py-2 px-2 rounded-lg transition-all ease-in-out " +
                  (account
                    ? "bg-slate-300/50 text-blue-600 cursor-default"
                    : "cursor-pointer")
                }
                onClick={() => {
                  hideAll();
                  setAccount(true);
                }}
              >
                <BsPerson className="text-xl mt-px" />
                <p>My Account</p>
              </div>

              <div
                className={
                  "flex gap-3 items-center hover:bg-slate-300/50 py-2 px-2 rounded-lg transition-all ease-in-out " +
                  (themes
                    ? "bg-slate-300/50 text-blue-600 cursor-default"
                    : "cursor-pointer")
                }
                onClick={() => {
                  hideAll();
                  setThemes(true);
                }}
              >
                <VscSymbolColor className="text-xl mt-px" />
                <p>Themes</p>
              </div>
            </div>
            <button
              className="border-slate-400 hover:bg-slate-200 hover:shadow-sm border-2 flex gap-2 items-center text-slate-700 text-sm py-2 px-3 rounded hover:border-slate-500 transition-all ease-in-out"
              onClick={() => {
                signOutBtn();
              }}
            >
              <BiLogOutCircle className="text-xl" />
              <p>Logout</p>
            </button>
          </div>
        </div>
        {/* describe */}
        <div className="w-full h-full rounded-e-xl bg-slate-50">
          <div className="border-b-2 p-5 relative flex justify-between items-center">
            <p className="text-xl font-bold invisible">Setting</p>
            <CloseButton />
          </div>
          <div className="p-5 h-[85%] overflow-y-scroll">
            {/* my account */}
            {account && (
              <div className="flex flex-col gap-10">
                <div>
                  {/* nama */}
                  <div>
                    <p className="font-bold">Name</p>
                    <p className="text-xs mt-1 mb-2.5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="border-2 border-slate-300 px-2 py-1 rounded focus:border-blue-500 focus:outline-none"
                      value={inputNewName}
                      onChange={(event) => handleInput(event, setInputNewName)}
                    />
                  </div>

                  <button
                    className="bg-blue-500 mt-5 text-slate-50 text-sm py-2 px-3 rounded hover:bg-blue-600 transition-all ease-in-out"
                    onClick={() => {
                      updateData(
                        ["users/" + user.uid + "/config/name"],
                        inputNewName
                      ).then(alert("Data berhasil disimpan!"));
                    }}
                  >
                    Simpan Perubahan
                  </button>
                </div>

                {/* password */}
                <div>
                  <p className="font-bold">Password</p>
                  <p className="text-xs mt-1 mb-2.5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <button
                    className="bg-blue-500 text-slate-50 text-sm py-2 px-3 rounded hover:bg-blue-600 transition-all ease-in-out"
                    onClick={() => {
                      if (
                        confirm("Are you sure want to change your password?")
                      ) {
                        const email = prompt("Type your email:");
                        if (email) {
                          resetPassword(email);
                        }
                      }
                    }}
                  >
                    Ganti Kata Sandi
                  </button>
                </div>

                {/* account removal */}
                <div>
                  <p className="font-bold">Penghapusan Akun</p>
                  <p className="text-xs mt-1 mb-2.5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="flex gap-3">
                    <button
                      className="bg-red-500 text-slate-50 text-sm py-2 px-3 rounded hover:bg-red-600 transition-all ease-in-out"
                      onClick={() => {
                        if (
                          confirm("Are you sure want to delete your account?")
                        ) {
                          if (
                            confirm("All your data will remove. Are you sure?")
                          ) {
                            deleteUserAccount();
                          }
                        }
                      }}
                    >
                      Hapus Akun
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* themes */}
            {themes && (
              <div className="flex flex-col gap-10">
                {/* taskbar */}
                <div>
                  <p className="font-bold">Taskbar</p>
                  <p className="text-xs mt-1 mb-3">
                    Pilih aplikasi yang ingin kamu tampilkan di Taskbar.
                  </p>

                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Todolist</p>
                    </div>
                    <div className="flex items-center">
                      {config.taskbar.todolist ? "On" : "Off"}
                      <input
                        type="checkbox"
                        name="app"
                        className="ml-3 w-5 h-5"
                        id="app"
                        checked={config.taskbar.todolist}
                        onChange={
                          () =>
                            handleTaskbar(!config.taskbar.todolist, "todolist")
                          // setConfig((prev)=>{
                          //   ...prev
                          // })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Notes</p>
                    </div>
                    <div className="flex items-center">
                      {config.taskbar.notes ? "On" : "Off"}
                      <input
                        type="checkbox"
                        name="app"
                        className="ml-3 w-5 h-5"
                        id="app"
                        checked={config.taskbar.notes}
                        onChange={() =>
                          handleTaskbar(!config.taskbar.notes, "notes")
                        }
                        // onClick={() => {
                        // updateData(["users/" + user.uid + "/config"], {
                        //   name: "your name",
                        //   taskbar: {
                        //     todolist: false,
                        //     notes: false,
                        //     blurting: true,
                        //     flashcard: true,
                        //     feynman: true,
                        //   },
                        //   darkTheme: true,
                        //   color: "blue",
                        //   background: 0,
                        // });
                        // }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Bluriting</p>
                    </div>
                    <div className="flex items-center">
                      {config.taskbar.blurting ? "On" : "Off"}
                      <input
                        type="checkbox"
                        name="app"
                        className="ml-3 w-5 h-5"
                        id="app"
                        checked={config.taskbar.blurting}
                        onChange={() =>
                          handleTaskbar(!config.taskbar.blurting, "blurting")
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Flashcard</p>
                    </div>
                    <div className="flex items-center">
                      {config.taskbar.flashcard ? "On" : "Off"}
                      <input
                        type="checkbox"
                        name="app"
                        className="ml-3 w-5 h-5"
                        id="app"
                        checked={config.taskbar.flashcard}
                        onChange={() =>
                          handleTaskbar(!config.taskbar.flashcard, "flashcard")
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Feynman</p>
                    </div>
                    <div className="flex items-center">
                      {config.taskbar.feynman ? "On" : "Off"}
                      <input
                        type="checkbox"
                        name="app"
                        className="ml-3 w-5 h-5"
                        id="app"
                        checked={config.taskbar.feynman}
                        onChange={() =>
                          handleTaskbar(!config.taskbar.feynman, "feynman")
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* themes */}
                <div>
                  <p className="font-bold">Tema</p>
                  <p className="text-xs mt-1 mb-3">
                    Pilih mode terang atau gelap.
                  </p>
                  <div className="flex justify-between p-3 px-5 bg-slate-200/70 mt-1">
                    <div className="">
                      <p>Pilih mode mu</p>
                    </div>
                    <select
                      name="mode"
                      id="mode"
                      className="p-1 rounded-lg bg-transparent outline-none"
                      value={config.theme}
                      onChange={(event) => {
                        handleTheme(event.target.value);
                      }}
                    >
                      <option value="light">Terang</option>
                      <option value="dark">Gelap</option>
                    </select>
                  </div>
                </div>

                {/* colors */}
                <div>
                  <p className="font-bold">Colors</p>
                  <p className="text-xs mt-1 mb-3">
                    Pilih warna aksen yang kamu suka.
                  </p>
                  <div className="flex gap-3">
                    {["red", "yellow", "green", "blue", "purple"].map(
                      (element, idx) => {
                        return (
                          <button
                            key={idx}
                            className={`bg-${element}-500 w-10 h-10 rounded flex justify-center items-center ${
                              config.color === element
                                ? " ring-2 ring-slate-300"
                                : ""
                            }`}
                            onClick={() => handleColor(element)}
                          >
                            {config.color === element && (
                              <BsCheckLg className="text-4xl text-slate-50" />
                            )}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* background */}
                <div>
                  <p className="font-bold">Background</p>
                  <p className="text-xs mt-1 mb-3">
                    Pilih background yang kamu suka.
                  </p>
                  <div>
                    {/* gambar 1 */}
                    <div className="flex gap-2 flex-wrap">
                      {images &&
                        images.map((img, idx) => {
                          return (
                            <img
                              key={idx}
                              src={img}
                              alt="wallpaper"
                              className={
                                "w-52 rounded" +
                                (config.background === idx
                                  ? " ring-4 ring-blue-500 shadow"
                                  : "")
                              }
                              onClick={() => handleBackground(idx)}
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Setting;
