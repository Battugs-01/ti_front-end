import Khan from "assets/government/img/khan.png";
import Khas from "assets/government/img/khas.png";
import Golomt from "assets/government/img/golomt.png";
import Wallet from "assets/government/img/wallet.png";
import GovBank from "assets/government/img/govBank.png";
import Trade from "assets/government/img/trade.png";

type BankType = {
  bankName?: String;
};

export const Bank: React.FC<BankType> = ({ bankName }) => {
  switch (bankName) {
    case "Khan":
      return (
        <div>
          <img src={Khan} />
        </div>
      );
    case "khas_bank":
      return (
        <div>
          <img src={Khas} />
        </div>
      );
    case "Golomt":
      return (
        <div>
          <img src={Golomt} />
        </div>
      );
    case "GovBank":
      return (
        <div>
          <img src={GovBank} />
        </div>
      );
    case "Trade":
      return (
        <div>
          <img src={Trade} />
        </div>
      );
    default:
      return (
        <div>
          <img src={Wallet} />
        </div>
      );
  }
};
