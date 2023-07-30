export const Sidebar = () => {
  return (
    <nav
      className="pl-1 pr-4 glass"
    >
      <ul className="flex flex-col w-full gap-4 p-4 m-0 list-none">
        <label className="">Tokens</label>
        <li
          className={`text-base cursor-pointer`}
        >
          <a href="/dashboard">
            Add
          </a>
        </li>
        <li
          className={`text-base cursor-pointer`}
        >
          <a href="/tokens">
            Edit
          </a>
        </li>
        <li
          className={`text-base cursor-pointer`}
        >
          <a href="#">
            Delete
          </a>
        </li>
      </ul>
    </nav>
  );
};
