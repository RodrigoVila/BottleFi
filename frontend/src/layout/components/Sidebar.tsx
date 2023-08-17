import { Link } from "react-router-dom";

export const Sidebar = () => {
  const itemStyle =
    "text-base cursor-pointer hover:font-bold transition-all duration-300";
  return (
    <nav className="pl-1 pr-4 min-w-[180px]">
      <ul className="flex flex-col w-full p-4 m-0 list-none gap-7">
        <li className={itemStyle}>
          <Link to="/how">How it works</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/tokens/add">Add Token</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/tokens/transfer">Transfer Token</Link>
        </li>
        <li className={itemStyle}>
          <Link to="/tokens/sell">Sell Token</Link>
        </li>
      </ul>
    </nav>
  );
};
