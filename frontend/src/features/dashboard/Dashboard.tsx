import { useEffect, useState } from "react";

import { useNFTContract } from "@hooks";
import { Token } from "@types";

export const Dashboard = () => {
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const { getTokens } = useNFTContract();

  useEffect(() => {
    const fetchTokens = async () => {
      const tokens = await getTokens();
      if (tokens) setTokens(tokens);
    };
    fetchTokens();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-2xl text-white min-h-[500px] glass-alt border-glass rounded-xl">
      <div className="flex w-full pt-4 pb-2 pl-3">
        <h3 className="text-2xl tex-bold">Dashboard</h3>
      </div>
      <div className="flex flex-col">
        <table>
          <thead className="border-b-2 rounded-b-none border-glass">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Mint Date</th>
              <th>Validity</th>
              <th>QR</th>
            </tr>
          </thead>
          <tbody>
            {tokens?.map((token) => {
              const { id, image, name, description, mintedAt, isValid } = token;
              return (
                <tr
                  key={`${id}-${mintedAt}`}
                  className="h-20 text-center border-b-[1px] border-b-glass"
                >
                  <td className="w-24 h-24">
                    <img
                      src={image}
                      alt="Token"
                      className="w-full h-full bg-center bg-cover"
                    />
                  </td>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{mintedAt}</td>
                  <td>{isValid ? "Valid" : "Invalid"}</td>
                  <td>
                    <a href={`http://localhost:5173/tokens?${id}`}>
                      See validity
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
