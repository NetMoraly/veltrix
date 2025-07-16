export default function PrimaryButton({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full rounded-xl py-3 px-6 font-semibold text-base text-white
        bg-gradient-to-r from-[#34ace4] to-[#b44cff]
        hover:from-[#34ace4]/80 hover:to-[#b44cff]/80
        transition-all duration-200 shadow-md hover:shadow-xl
        focus:outline-none focus:ring-2 focus:ring-[#b44cff]/40
        active:scale-98
        ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>Загрузка...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}