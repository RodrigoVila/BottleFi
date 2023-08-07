import { MouseEvent, useState } from "react";
import { DashboardItem } from "./components/DashboardItem";
import { DashboardActions } from "./components/DashboardActions";
import { DashboardOverview } from "./components/DashboardOverview";

export const Dashboard = () => {
  const [isQRModalShown, setShowQRModal] = useState(false);
  const [tokenURI, setTokenURI] = useState("");

  const parseDate = (epoch: string) => {
    const date = new Date(parseInt(epoch) * 1000).toString();
    const sliced = date.slice(4, 15);
    return sliced;
  };

  const toggleShowQRModal = () => setShowQRModal(!isQRModalShown);

  const handleModal = (tokenID: string) => {
    const url = `/token/${tokenID}`;
    setTokenURI(url);
    toggleShowQRModal();
  };

  return (
    <section className="w-full h-full flex flex-col justify-between">
      <DashboardActions />
      <DashboardOverview />
    </section>
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
