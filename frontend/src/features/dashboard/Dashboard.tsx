import { useNFTContract } from "@hooks";

export const Dashboard = () => {
  const { getTokens } = useNFTContract();

  const tokens = [
    {
      img: "sse",
      name: "name",
      description: "descr",
      validity: "validity",
      qr: "QR",
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl text-white min-h-[500px] glass-alt border-glass rounded-xl border-[1px]">
      <div className="flex w-full py-6 pl-3 border-b-2 rounded-b-none border-glass">
        <h3 className="text-2xl tex-bold">Dashboard</h3>
      </div>
      <div className="flex flex-col">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Validity</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.name} className="">
                <td className="bg-red-500">{token.img}</td>
                <td className="bg-blue-500">{token.name}</td>
                <td className="bg-orange-500">{token.description}</td>
                <td className="bg-pink-500">{token.validity}</td>
                <td className="bg-green-500">{token.qr}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={getTokens}>GetTokens</button>
      </div>
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
