const Home = () => {
  return (
    <div className="h-screen bg-[#F6F6F9] relative">
      <button
        className="bg-black py-[10px] px-[18px] rounded-[25px] flex items-center absolute bottom-[29px] right-[16px]"
      >
        <span className="material-icons text-white text-[24px]">mic</span>
        <span className="text-white text-[14px] ml-[3px]">녹음하기</span>
      </button>
    </div>
  );
};

export default Home;