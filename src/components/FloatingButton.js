function FloatingButton({ icon, className, onClick, hasShadow }) {
  return (
    <div className="relative">
      {hasShadow && (
        <div className="bg-grey-1 rounded-full h-[68px] w-[68px] absolute left-[-15px]"></div>
      )}
      <button
        className={`rounded-full h-[68px] w-[68px] flex justify-center items-center z-10 relative ${className}`}
        onClick={onClick}
      >
        {icon}
      </button>
    </div>
  );
}

export default FloatingButton;
