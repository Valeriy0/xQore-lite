import React from "react"

 const LevelsPage = () => {

  const Lvls = [
    {
      title: "1",
      desc: "0.018",
    },
    {
      title: "2",
      desc: "0.018",
    },
    {
      title: "3",
      desc: "0.018",
    },
    {
      title: "4",
      desc: "0.018",
    },
    {
      title: "5",
      desc: "0.018",
    },
    {
      title: "6",
      desc: "0.018",
    },
    {
      title: "7",
      desc: "0.018",
    },
    {
      title: "8",
      desc: "0.018",
    },
    {
      title: "9",
      desc: "0.018",
    },
    {
      title: "10",
      desc: "0.018",
    },
    {
      title: "11",
      desc: "0.018",
    },
    {
      title: "12",
      desc: "0.018",
    }
  ]


  return (
      <div className="w-full h-screen bg-[#18191A] flex items-center justify-center">

          <div className="w-[1000px] flex flex-wrap h-full ">
          {Lvls.map((item) => (
            <button className="w-[150px] h-[150px] bg-white rounded-[20px] p-9">
              <div className="p-3 flex flex-col">
                <span>{item.title} lvl</span>
                <span>{item.desc} bnb</span>
              </div>
            </button>
          ))}
          </div>

      </div>
  );
};

export default LevelsPage;
