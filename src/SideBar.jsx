import menu_icon from "./assets/images/menu_icon.png";
import plus_icon from "./assets/images/plus_icon.png";
import message_icon from "./assets/images/message_icon.png";
import question_icon from "./assets/images/question_icon.png";
import setting_icon from "./assets/images/setting_icon.png";
import { useState, useContext } from "react";
import { context } from "./ContexApi.jsx";

const SideBar = () => {
  const {
    isDark,
    toggleDarkMode,
    previousPrompts,
    setPreviousPrompts,
    setRecentPrompts,
    onSend,
  } = useContext(context);
  const [extended, setExtended] = useState(true);

  function handleNewChat() {
    setRecentPrompts("");
  }

  const handlepreviousPrompt = async (prompt) => {
    setRecentPrompts(prompt);
    await onSend(prompt);
  };

  const handleDelete = (index) => {
    setPreviousPrompts((prompt) => prompt.filter((_, i) => i !== index));
  };

  return (
    <aside
      className={`z-10 sideBar flex min-h-screen shrink-0 flex-col gap-4 overflow-hidden border-r border-ui-border bg-ui-surface text-ui-text
         p-[18px_12px] transition-[width,flex-basis] duration-[220ms] max-[760px]:p-[16px_8px] max-[480px]:p-[14px_5px] ${
           extended
             ? "w-64 max-[760px]:w-[230px] max-[480px]:absolute max-[480px]:w-[min(230px,calc(100vw_-_58px))] max-[480px]:shadow-[12px_0_30px_rgba(45,50,84,0.13)]"
             : "w-[88px] max-[760px]:w-[68px] max-[480px]:w-[58px]"
         }`}
    >
      <img
        src={menu_icon}
        alt="Toggle sidebar"
        className="theme-invert m-[5px_8px_26px] h-10 w-10 cursor-pointer rounded-[14px] p-[9px] opacity-[0.68] transition-all duration-150 hover:bg-ui-hover hover:opacity-100 max-[480px]:ml-[3px]"
        onClick={() => setExtended(!extended)}
      />

      <div className="flex-1">
        <div
          onClick={() => handleNewChat()}
          className="m-[0_0_22px] flex min-h-[46px] w-auto cursor-pointer items-center justify-center gap-5 rounded-2xl border border-ui-border bg-ui-accent-soft p-[10px_14px] text-ui-accent shadow-[0_5px_16px_var(--ui-shadow)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_var(--ui-shadow)]"
        >
          <img src={plus_icon} alt="" className="h-7 w-7 object-contain" />
          {extended && <h1 className="text-[13px] font-semibold">New Chat</h1>}
        </div>

        {extended && (
          <div className="mt-6">
            <h1 className="m-[24px_8px_12px] text-[13px] font-bold tracking-[0.04em] text-ui-muted">
              Recent Chat
            </h1>
            {previousPrompts.length > 0 ? (
              previousPrompts.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className=" flex min-w-0 cursor-pointer items-center  rounded-xl  text-ui-text transition-colors duration-150"
                >
                  <div onClick={() => handlepreviousPrompt(item)}
                    className="m-[4px_0] flex min-w-0 cursor-pointer items-center gap-5 rounded-xl p-[10px] text-ui-text transition-colors duration-150 hover:bg-ui-hover hover:text-ui-accent">
                    <img
                    src={message_icon}
                    alt=""
                    className="theme-invert h-7 w-7 shrink-0 object-contain"
                  />
                  <p
                    key={index}
                    className="overflow-hidden text-ellipsis whitespace-nowrap text-xs"
                  >
                    {item.slice(0, 25)} ...
                  </p>

                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    aria-label={`Delete ${item}`}
                    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ui-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18m-2 0-.9 14H5.9L5 6m4 0V4h6v2m-5 4v6m4-6v6" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-ui-muted">No Recent Chat</p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 border-t border-ui-border pt-3">
        <div
          onClick={toggleDarkMode}
          className="m-0 flex min-h-[42px] cursor-pointer items-center gap-5 rounded-[13px] p-2 text-ui-muted transition-colors duration-150 hover:bg-ui-hover hover:text-ui-accent"
        >
          <button
            type="button"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 ${
              isDark === "light"
                ? "bg-indigo-100 text-indigo-700 shadow-[0_2px_10px_rgba(79,70,229,0.22)] hover:bg-indigo-200"
                : "bg-amber-300/15 text-amber-300 shadow-[0_2px_12px_rgba(251,191,36,0.24)] hover:bg-amber-300/25"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDark === "light" ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.2 15.1A8.4 8.4 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            )}
          </button>
          {extended && (
            <h1 className="text-[13px] font-semibold">
              {isDark === "light" ? "Dark" : "Light"}
            </h1>
          )}
        </div>
        <div className="m-0 flex min-h-[42px] cursor-pointer items-center gap-5 rounded-[13px] p-2 text-ui-muted transition-colors duration-150 hover:bg-ui-hover hover:text-ui-accent">
          <img
            src={question_icon}
            alt=""
            className="theme-invert h-7 w-7 object-contain"
          />
          {extended && <h1 className="text-[13px] font-semibold">Help</h1>}
        </div>
        <div className="m-0 flex min-h-[42px] cursor-pointer items-center gap-5 rounded-[13px] p-2 text-ui-muted transition-colors duration-150 hover:bg-ui-hover hover:text-ui-accent">
          <img
            src={setting_icon}
            alt=""
            className="theme-invert h-7 w-7 object-contain"
          />
          {extended && <h1 className="text-[13px] font-semibold">Setting</h1>}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
