'use client';

const baseClass = `
  w-full rounded-xl py-3 px-6 font-semibold text-base text-white
  border border-[#b44cff]/60 bg-white/5
  hover:bg-gradient-to-r hover:from-[#34ace4]/80 hover:to-[#b44cff]/80
  hover:text-white
  shadow-md transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-[#b44cff]/40
  active:scale-98
`;

export default function SubscribeButton({ as = 'button', className = '', ...props }) {
  const classes = `${baseClass} ${className}`;
  if (as === 'a') {
    return (
      <a
        {...props}
        className={classes}
        style={{ zIndex: 1, ...props.style }}
      >
        {props.children}
      </a>
    );
  }
  return (
    <button
      {...props}
      className={classes}
      style={{ zIndex: 1, ...props.style }}
    >
      {props.children}
    </button>
  );
}
