import { createReadStream } from "fs";

export default function HomeCity({ user }) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
      getSeedPacketsByUid(uid).then(setCards);
    }, []);

    return (
        <>
            <h1>Home</h1>
            <div className="cards">            
                {card.map((card) => (
                    <SeedPacket user={user} key={card.id} setCards={setCards} />
                ))}
            </div>
        </>
    )
}
