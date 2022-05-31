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
        <>
            <h1>Seed Packet Details</h1>
            <h2>Name {item.name}</h2>
            <div>image {item.imgUrl}</div>
            <div>
                <p>Germination Requirements {item.germReg}</p>
                <p>Spacing {item.spacing}</p>
                <p>Height {item.height}</p>
                <p>Notes {item.notes}</p>
            </div>
            <button type="button" onClick={(e) => handleDelete(e)}>Delete</button>
            <Link to={`/edit/${item.id}`} type="button" >Edit</Link>
        </>
    )
};
