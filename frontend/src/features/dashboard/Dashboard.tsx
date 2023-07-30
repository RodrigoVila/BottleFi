import { MouseEvent, useState } from "react";
import { DashboardItem } from "./components/DashboardItem";

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
    <section className="flex flex-col items-center w-full h-full p-6 justify-evenly">
      <DashboardItem
        id="Section1"
        className="hover:bg-[rgba(205,4,4,0.3)] hover:border-opacityRed"
      >
        bbbb db db db Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Fugiat officia dicta facilis molestiae numquam excepturi repellat
        voluptatum molestias dolorem itaque, aliquam ad. Nostrum laudantium
        ipsum, sit veniam officia numquam atque non possimus error quia,
        sapiente deleniti, similique magnam culpa dolore.,
      </DashboardItem>
      <DashboardItem
        id="Section2"
        className="hover:bg-[rgba(249,74,41,0.3)] hover:border-opacityOrange flex flex-col gap-2"
      >
        <div className="w-full px-2 border-2 border-white">Token A</div>
        <div className="w-full px-2 border-2 border-white">Token B</div>
        <div className="w-full px-2 border-2 border-white">Token C</div>
      </DashboardItem>
      <DashboardItem
        id="Section3"
        className="hover:bg-[rgba(252,226,42,0.3)] hover:border-opacityYellow"
      >
        cjkcjckjkjck lorem dolor sit amet, consectetur adipisicing elit.
        Deleniti inventore ullam numquam incidunt unde voluptatem ea, iste saepe
        voluptatum hic animi doloribus aliquam corporis similique minima qu
      </DashboardItem>
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
