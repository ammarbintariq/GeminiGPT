import user_icon from "./assets/images/user_icon.png";
import gallary_icon from "./assets/images/gallary_icon.png";
import mic_icon from "./assets/images/mic_icon.png";
import send_icon from "./assets/images/send_icon.png";
import blub_icon from "./assets/images/blub_icon.png";
import bracket_icon from "./assets/images/bracket_icon.png";
import gemini_icon from "./assets/images/gemini_icon.png";
import { useContext } from "react";
import { memo, useState } from "react";
import { context } from "./ContexApi.jsx";
import ReactMarkdown from "react-markdown";

const CardData = [
  {
    id: 1,
    detail: "Give me a few creative ideas for my next project",
    image: blub_icon,
  },
  { id: 2, detail: "Explain a difficult topic in simple words", image: gemini_icon },
  { id: 3, detail: "Help me understand a piece of code", image: bracket_icon },
  { id: 4, detail: "Help me brainstorm an image to create", image: gallary_icon },
];



const MainBar = () => {
  const { onSend,setPreviousPrompts ,setRecentPrompts, isLoading, result, recentPrompts,inputValue,setInputValue } = useContext(context);



const handleCardClick  =async (prompt) => {
    setPreviousPrompts((prev) => [...prev, prompt])
     setRecentPrompts(prompt);
     setInputValue(prompt)
    await onSend(prompt);
  };


const handleKeyChange = (event) =>{
  if(event.key === "Enter"){
    event.preventDefault();
    onSend();
  }
};


  return (
    <main className="relative  flex h-screen min-w-0 flex-1 flex-col px-[clamp(20px,5vw,68px)] py-6 max-[760px]:px-6 max-[760px]:py-5 max-[480px]:px-[14px] max-[480px]:py-[15px]">
      <header className="flex min-h-12 items-center justify-between">
        <p className="m-0 text-[22px] font-bold tracking-[-0.04em]  max-[480px]:text-[19px]">
          Gemini
        </p>
        <img
          src={user_icon}
          alt=""
          className="h-[60px] w-[60px] rounded-full border-2 border-ui-surface object-cover shadow-[0_4px_14px_var(--ui-shadow)] transition-transform duration-150 hover:-translate-y-0.5 max-[480px]:h-[42px] max-[480px]:w-[42px]"
        />
      </header>

    <>
      {recentPrompts.length > 0
      ?<div className="flex  flex-1 flex-col gap-[30px] overflow-y-auto py-[30px] max-[760px]:gap-[20px] max-[760px]:py-[20px] max-[480px]:gap-[15px] max-[480px]:py-[15px]"> 
        <div className="title conversation-user flex items-center gap-5">
          <img src={user_icon} alt=""  className="h-15 w-15 rounded-[50%]"/>
          <p>{recentPrompts} </p>
        </div>
        <div className="content title conversation-response flex gap-5">
          <img src={gemini_icon} alt="" className="h-15 w-15 rounded-[50%]"/>
          {isLoading ? <div className="flex items-center"><p>Gemini is thinking... </p></div> : <div className="mb-19"><ReactMarkdown>{result}</ReactMarkdown></div>}
          
        </div>


      </div> 
      : <section className="flex flex-1 flex-col items-center justify-center gap-[34px] pb-[90px] max-[760px]:gap-6 max-[760px]:pb-[130px]">
        <div className="w-[70%] max-[760px]:w-[88%] max-[480px]:w-[96%]">
          <p className="m-0 text-[clamp(24px,3.3vw,38px)] font-semibold leading-[1.35] tracking-[-0.045em] ">
            <span className="mb-1 inline-block text-[clamp(38px,5.2vw,58px)] font-bold tracking-[-0.06em] text-ui-accent">
              Hi Ammar
            </span>
            <br /> How I Can Help You
          </p>
        </div>

        <div className="grid min-h-[148px] w-[70%] grid-cols-4 gap-[13px] overflow-visible p-0 max-[760px]:w-[88%] max-[760px]:grid-cols-2 max-[480px]:w-[96%] max-[480px]:gap-[9px]">
          {CardData.map((item) => (
            <div
              key={item.id}
              onClick={() =>handleCardClick(item.detail)}
              className="suggestion-card relative flex min-h-[142px] cursor-pointer flex-col gap-2 rounded-[19px] border border-ui-border p-[18px_16px] shadow-[0_7px_22px_var(--ui-shadow)] transition-all duration-200 hover:-translate-y-1 hover:border-ui-accent hover:shadow-[0_12px_27px_var(--ui-shadow)] max-[480px]:min-h-[125px] max-[480px]:rounded-[15px] max-[480px]:p-[13px_11px]"
            >
              <p className="m-0 text-[13px] font-semibold leading-[1.55] max-[480px]:text-[11px]">
                {item.detail}
              </p>
              <img
                src={item.image}
                alt=""
                className="theme-invert absolute bottom-2 right-2 h-7 w-7 object-contain opacity-55"
              />
            </div>
          ))}
        </div>
      </section>

      }
      

      
    </>

      

      

      <footer className="absolute bottom-[0px] left-0  flex w-full flex-col items-center justify-center gap-[10px] p-[10px_0]">
        <div 
        
        
        className="flex w-[70%] items-center justify-between gap-2 rounded-[13px] border border-ui-border bg-ui-surface p-[10px_14px] max-[760px]:w-[88%] max-[480px]:w-[96%]"> 
          <input 
          onKeyDown={handleKeyChange}
          type="text" 
          placeholder="Enter here "
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="flex flex-1 outline-none bg-ui-surface  text-ui-text placeholder:text-ui-muted "
          />
          <div className="flex items-center gap-2">
            
            <img src={gallary_icon} alt="" className="theme-invert h-7 w-7 object-contain cursor-pointer" />
            <img src={mic_icon} alt="" className="theme-invert h-7 w-7 object-contain cursor-pointer" />
            <img src={send_icon}  alt="" className="theme-invert h-7 w-7 object-contain cursor-pointer" onClick={() => onSend()} />
          </div>
        </div>
        
        <p className="m-0 text-center text-[10px] text-ui-muted max-[480px]:text-[9px]">
          gemini can make mistake
        </p>
      </footer>
    </main>
  );
};

export default MainBar;
