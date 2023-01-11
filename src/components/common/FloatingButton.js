function FloatingButton({ icon, className, onClick }) {
  return (
    <button
      className={`rounded-full h-[68px] w-[68px] flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

export default FloatingButton;
