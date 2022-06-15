import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { deleteSeedPacket, getSeedPacketById } from "../Data/SeedPackets";

export default function SeedPacketDetails() {
    const [item, setItem] = useState({});
    const { key } = useParams();
    const nav = useNavigate();

    const handleDelete = (e) => {
        e.preventDefault();
        deleteSeedPacket(item.id).then(() => {
                nav('/');
            })
        };

    useEffect(() => {
        let isMounted = true;
        if(isMounted) {
            getSeedPacketById(key).then(setItem);
        };
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="details-container">
            <div className="details">
                <div className="information">
                    <div className="text">
                        <h1 className="item-name">{item.name}</h1>
                        <div className="desc"><strong>Germination Requirements: </strong>{item.germReq}</div>
                        <br />
                        <div className="desc"><strong>Spacing: </strong>{item.spacing}</div>
                        <br />
                        <div className="desc"><strong>Height: </strong>{item.height}</div>
                        <br />
                        <div className="desc"><strong>Notes: </strong>{item.notes}</div>
                    </div>
                    <div className="detail-img"><img src={item.imgUrl} /></div>
                </div>
                <div className="buttons">
                    <button type="button" className="delete btn" onClick={(e) => handleDelete(e)}>Delete</button>
                    <Link to={`/edit/${item.id}`} type="button" className="edit btn">Edit</Link>
                </div>
            </div>
        </div>
    )
};
