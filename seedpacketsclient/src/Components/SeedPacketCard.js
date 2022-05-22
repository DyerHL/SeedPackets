import { Link } from "react-router-dom";
import { getFrostDateById } from "../Data/FrostDate";

export default function SeedPacketCard ({ card, user }) {
    const frostId = user.FrostDateId;
    const frostDate = getFrostDateById(frostId);
    const weeksBeforeFrost = card.weeksBeforeFrost;

    Date.prototype.addDays = function(days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

    const sowDate = frostDate.addDays(-(weeksBeforeFrost * 7));
    return (
        <>
        <div className="seed-card">
            <div>{card.name}</div>
            <div>
                <img src={card.imgUrl} />
            </div>
            <div>{sowDate}</div>
            <Link to={`/details/${card.id}`} type='button'>Plant Details</Link>
        </div>
        </>
    )
}
