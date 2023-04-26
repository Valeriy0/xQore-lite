import React from "react"

 const LevelsPage = () => {

  const Lvls = [
    {
      title: "1",
      desc: "0.018",
      buttom: "Activate - Reg",
    },
    {
      title: "2",
      desc: "0.024",
      buttom: "Activate",
    },
    {
      title: "3",
      desc: "0.033",
      buttom: "Activate",
    },
    {
      title: "4",
      desc: "0.046",
      buttom: "Activate",
    },
    {
      title: "5",
      desc: "0.062",
      buttom: "Activate",
    },
    {
      title: "6",
      desc: "0.088",
      buttom: "Activate",
    },
    {
      title: "7",
      desc: "0.125",
      buttom: "Activate",
    },
    {
      title: "8",
      desc: "0.175",
      buttom: "Activate",
    },
    {
      title: "9",
      desc: "0.245",
      buttom: "Activate",
    },
    {
      title: "10",
      desc: "0.345",
      buttom: "Activate",
    },
    {
      title: "11",
      desc: "0.455",
      buttom: "Activate",
    },
    {
      title: "12",
      desc: "0.644",
      buttom: "Activate",
    }
  ]


  return (
      <div className="w-full h-screen bg-[#18191A] flex items-center justify-center sm:h-full sm:p-2 ">
        <div className="flex flex-wrap w-[950px] w-full items-center justify-center ">
          {Lvls.map((item) => (
            <button className="w-[180px] sm:w-[160px] sm:h-[95px] h-[170px] bg-[#4A69F6] rounded-[20px] m-2 flex flex-col items-center justify-between p-2 border border-3 border-[#3A3A3B] ">
              <div className="flex flex-row justify-between w-full p-1">
                <span className="text-xl font-bold">{item.title} <span className="text-sm font-medium">lvl</span></span>
                <span className="text-xl font-bold">{item.desc} <span className="text-sm font-medium">bnb</span></span>
              </div>
              <button className="bg-[#3A3A3B] rounded-[15px] px-5 text-white w-full h-[40px] font-normal  ">
                <span className="font-semibold sm:text-sm">{item.buttom}</span>
              </button>
            </button>
          ))}
          </div>    

      </div>
  );
};

export default LevelsPage;
