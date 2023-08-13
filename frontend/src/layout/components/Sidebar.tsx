export const Sidebar = () => {
  const itemStyle = "text-base cursor-pointer hover:font-bold transition-all duration-300"
  return (
    <nav
      className="pl-1 pr-4 min-w-[180px]"
    >
      <ul className="flex flex-col w-full gap-10 p-4 m-0 list-none">
      <li
          className={itemStyle}
        >
          <a href="/howitworks">
            How it works
          </a>
        </li>
        <li
          className={itemStyle}
        >
          <a href="/dashboard">
            Dashboard
          </a>
        </li>
        <li
          className={itemStyle}
        >
          <a href="/tokens/add">
            Add Token
          </a>
        </li>
        <li
          className={itemStyle}
        >
          <a href="/tokens/transfer">
            Transfer Token
          </a>
        </li>
        <li
          className={itemStyle}
        >
          <a href="/tokens/sell">
            Sell Token
          </a>
        </li>

      </ul>
    </nav>
  );
};
