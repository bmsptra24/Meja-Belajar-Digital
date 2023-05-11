import "../styles/Blurting.css";

const data = {
  title: "",
};

const Blurting = () => {
  return (
    <div className="full-size shadow">
      <div className="full-size">
        <div className="container">
          <div className="row d-flex justify-content-between p-3">
            <div className="col-2 rounded-3 border border-2 border-black bg-white-dark content-1 p-3 pt-1">
              <div>Metode Blurting</div>
            </div>
            <div className="col rounded-3 border border-2 border-black bg-white content-1 ms-2 p-3 pt-2">
              <div className="">20/04/2023</div>
              <div>Hal yang diingat</div>
              <div>Metode Blurting</div>
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
                <div className="">
                  <div className="">Hal yang dilupa</div>
                  <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ullam blanditiis voluptatibus illum, consequuntur ducimus
                    quam, nostrum sapiente quidem esse quos neque facere laborum
                    harum quisquam officiis dolores, magnam error mollitia.
                  </div>
                </div>
              </div>
              <div className=" rounded-3 border border-2 border-black bg-white content-2 p-3 pt-1">
                <div className="">Pertanyaan</div>
                <div className="">
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
