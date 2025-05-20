import Header from "@/components/Header";
import { useState } from "react";

const Recorder = () => {
  const [state, setState] = useState<"recording" | "paused" | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  return (
    <div className="h-screen bg-white flex flex-col">
      <Header title="녹음하기" />
      <div className="flex flex-1 flex-col items-center pt-[211px]">
        {state === "recording" ? (
          <button className="w-[120px] h-[120px] rounded-[80px] bg-[#1A1A1A]">
            <span className="material-icons text-white text-[70px]">mic</span>
          </button>
        ) : state === "paused" ? (
          <button className="w-[120px] h-[120px] rounded-[80px] bg-[#1A1A1A]">
            <span className="material-icons text-white text-[70px]">pause</span>
          </button>
        ) : (
          <button className="w-[120px] h-[120px] rounded-[80px] bg-[#1A1A1A]">
            <span className="material-icons text-[#09CC7F] text-[70px]">
              mic
            </span>
          </button>
        )}
        <p
          className={`mt-[42px] text-[20px] font-[600] ${
            state === "recording" || state === "paused"
              ? "text-[#303030]"
              : "text-[#AEAEB2]"
          }`}
        >
          00:00
        </p>
        {state === "recording" && (
          <button className="mt-[42px] bg-[#1A1A1A] rounded-[27px] px-[42px] py-[16px] items-center flex">
            <span className="material-icons text-white text-[20px]">pause</span>
            <span className="ml-[4px] text-[15px] text-white font-[600]">
              일시 정지
            </span>
          </button>
        )}
        {(state === "recording" || state === "paused") && (
          <button
            className={`${
              state === "paused" ? "mt-[42px]" : "mt-[16px]"
            } bg-[#09CC7F] rounded-[27px] px-[42px] py-[16px] items-center flex`}
          >
            <span className="material-icons text-white text-[20px]">check</span>
            <span className="ml-[4px] text-[15px] text-white font-[600]">
              저장 하기
            </span>
          </button>
        )}
        {toastVisible && (
          <div className="absolute bottom-[21px] flex border-[1.5px] border-[#09CC7F] w-[358px] py-[13px] px-[17px] rounded-[6px] bg-[#F9FEFF]">
            <span className="material-icons text-[#00DDA8] text-[24px]">
              check
            </span>
            <p className="ml-[7px] text-[15px] font-[600] text-[#4A4A4A]">
              저장이 완료되었습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recorder;
