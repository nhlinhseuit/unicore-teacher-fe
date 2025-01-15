const LoadingComponent = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="w-10 h-10 border-4 border-[#5D87FF19] border-t-[#5D87FF] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
