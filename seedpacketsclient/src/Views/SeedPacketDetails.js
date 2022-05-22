import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function SeedPacketDetails() {
    const [editItem, setEditItem] = useState();
    const { key } = useParams();
    //need handle delete function and details button will be a link to datails route

    useEffect(() => {
       getSeedPacketById(key).then(setEditItem);
    }, []);

    return (
        <>
            <h1>Seed Packet Details</h1>
            <h2>Name</h2>
            <div>image</div>
            <div>
                <p>Germination Requirements</p>
                <p>Spacing</p>
                <p>Height</p>
                <p>Notes</p>
            </div>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
        </>
    )
};
