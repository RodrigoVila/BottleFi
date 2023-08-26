import { useWallet } from "@hooks";

export const Dashboard = () => {
  const {handleConnect} = useWallet()
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl p-6 text-white min-h-[500px] glass-alt border-glass">
      {" "}
      No tokens listed. Click on "Add Token" add them here.
      <button onClick={handleConnect}>Handle connect</button>
    </div>
  );
};
/* {tokens.map((token) => {
  return (
      <Product
          key={token.id}
          id={token.id}
          name={token.name}
          description={token.description}
          uri={token.uri}
          mintedAt={parseDate(token.mintedAt)}
          onClick={() =>
              handleModal(token.id)
          }
      />
  );
})} */
