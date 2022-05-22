export default function EditSeedPacket() {
    const [editItem, setEditItem] = useState({});
    const { key } = useParams();
  
    useEffect(() => {
     getSingleSeedPacket(key).then(setEditItem);
    }, []);

    return (
        <>
            <h1>Edit Seed Packet</h1>
            <div>
                <SeedPacketForm editItem={editItem} />
            </div>
        </>
    )
};
