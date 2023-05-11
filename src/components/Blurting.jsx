import { useState } from "react";
import "../styles/Blurting.css";

const data = {
  lastOpen: 0,
  moduls: {
    key1: {
      title: "Metode Blurting",
      date: "11/05/2023",
      remembered:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nemo praesentium fugit consectetur saepe tempore ex ad cumque ab fugiat doloribus molestias, animi corrupti dolorum eligendi perferendis iste natus voluptate, ducimus sunt. Quisquam inventore deserunt nisi perspiciatis dignissimos sint sunt id rem minima expedita, voluptatem maxime itaque molestiae, ab ratione quam architecto. Voluptates deserunt, eos ratione assumenda veritatis magni minima qui similique fugit cumque. Rerum eius recusandae mollitia. Corrupti, laborum cumque doloremque ad quidem, eveniet sunt commodi, maiores quod sint nemo saepe ex dolores totam quis. Doloribus, veniam repellendus similique incidunt sapiente expedita ipsa, laboriosam aut recusandae impedit ut ratione!",
      forgotten:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto repudiandae id, maxime a minus dignissimos in itaque tempora vel quas adipisci corporis sit modi est. Minus eveniet dolores magni!",
      questions: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit"],
    },
    key2: {
      title: "Cara masak ubi",
      date: "11/05/2023",
      remembered:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid, nemo praesentium fugit consectetur saepe tempore ex ad cumque ab fugiat doloribus molestias, animi corrupti dolorum eligendi perferendis iste natus voluptate, ducimus sunt. Quisquam inventore deserunt nisi perspiciatis dignissimos sint sunt id rem minima expedita, voluptatem maxime itaque molestiae, ab ratione quam architecto. Voluptates deserunt, eos ratione assumenda veritatis magni minima qui similique fugit cumque. Rerum eius recusandae mollitia. Corrupti, laborum cumque doloremque ad quidem, eveniet sunt commodi, maiores quod sint nemo saepe ex dolores totam quis. Doloribus, veniam repellendus similique incidunt sapiente expedita ipsa, laboriosam aut recusandae impedit ut ratione!",
      forgotten:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum architecto repudiandae id, maxime a minus dignissimos in itaque tempora vel quas adipisci corporis sit modi est. Minus eveniet dolores magni!",
      questions: ["Lorem ipsum dolor sit amet.", "Lorem ipsum dolor sit"],
    },
  },
};

// get data
const getDataModul = (key, idxNext) => {};

// function for switch between data after menu modul clicked
const switchData = async (setData, key, idxNext) => {
  const data = await "fetch data";
  const [lastOpen, title, date, remembered, forgotten, questions] = [
    idxNext, // is the index from the element get clicked
    data.moduls.key.title,
    data.moduls.key.date,
    data.moduls.key.remembered,
    data.moduls.key.forgotten,
    data.moduls.key.questions,
  ];
  // updateLastOpen()
  // update state
  setData([lastOpen, title, date, remembered, forgotten, questions]);
  return lastOpen, title, date, remembered, forgotten, questions;
};

const Blurting = () => {
  const [data, setData] = useState([getDataModul(key, index)]);

  return (
    <div className="full-size shadow">
      <div className="full-size">
        <div className="container">
          <div className="row d-flex justify-content-between p-3">
            <div className="col-2 rounded-3 border border-2 border-black bg-white-dark content-1 p-2">
              {}
              <div
                className="bg-white px-2 py-1 rounded-3 border border-2 border-dark"
                onClick={() => {
                  switchData(setData);
                }}
              >
                {data.moduls.key1.title}
              </div>
            </div>
            <div className="col rounded-3 border border-2 border-black bg-white content-1 ms-2 p-3 pt-2">
              <div className="d-flex justify-content-between mb-3 pb-1 border-bottom">
                <div className="fw-bolder">Hal yang diingat</div>
                <div>20/04/2023</div>
              </div>
              <div className="fs-4">{data.moduls.key1.title}</div>
              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                maiores ea commodi ratione, error distinctio expedita harum
                dolorum ipsa, at esse quam unde itaque laboriosam quasi fugit
                autem hic enim! Laudantium alias excepturi soluta, fuga
                accusantium minus nisi maiores ipsa? Necessitatibus omnis quas
                atque accusantium laudantium. Odit, velit corrupti vitae veniam
                incidunt adipisci laborum cupiditate, nihil suscipit quasi
                exercitationem facere voluptates blanditiis? Placeat, dolores
                neque quo animi itaque, hic deserunt consectetur corrupti amet
                ipsum vero aliquid nemo tempora in aliquam sequi, aut tempore
                assumenda recusandae. Fugit, architecto ex totam ipsa rerum quam
                voluptatem modi molestiae sapiente, neque nam officia accusamus.
              </div>
            </div>
            <div className="col-4 content-1 p-0 d-flex justify-content-between flex-column ms-2">
              <div className=" rounded-3 border border-2 border-black bg-white content-2 p-3 pt-1">
                <div>
                  <div className="fw-bolder pb-1 border-bottom mb-2">
                    Hal yang dilupa
                  </div>
                  <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam blanditiis voluptatibus illum, consequuntur ducimus
                    quam, nostrum sapiente quidem esse quos neque facere laborum
                    harum quisquam officiis dolores, magnam error mollitia.
                  </div>
                </div>
              </div>
              <div className=" rounded-3 border border-2 border-black bg-white content-2 p-3 pt-1">
                <div className="fw-bolder pb-1 border-bottom mb-2">
                  Pertanyaan
                </div>
                <div>
                  1. Lorem ipsum dolor sit amet.
                  <br />
                  2. Lorem ipsum dolor sit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blurting;
