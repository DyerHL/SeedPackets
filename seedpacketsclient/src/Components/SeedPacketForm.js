import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addSeedPacket, updateSeedPacket } from "../Data/SeedPackets";
import PropTypes from 'prop-types';

const uid = sessionStorage.getItem("uid");

const initialState = {
    name: '',
    imgUrl: '',
    weeksBeforeFrost: 0,
    harvestDays: 0,
    plantingDate: null,
    germReq: '',
    spacing: '',
    height: '',
    notes: '',
    userUid: uid,
};

export default function SeedPacketForm({ editItem }) {
    const [formInput, setFormInput] = useState(initialState);
    const navigation = useNavigate();

    useEffect(() => {
        if(editItem.id) {
            setFormInput({
                name: editItem.name,
                imgUrl: editItem.imgUrl,
                weeksBeforeFrost: Number(editItem.weeksBeforeFrost),
                harvestDays: Number(editItem.harvestDays),
                plantingDate: Date(editItem.plantingDate),
                germReq: editItem.germReq,
                spacing: editItem.spacing,
                height: editItem.height,
                notes: editItem.notes,
                userUid: editItem.userUid
            });
        } else {
            setFormInput(initialState);
        }
    }, [editItem]);

    const handleChange = (e) => {
        setFormInput((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    };

    const resetForm = () => {
        setFormInput(initialState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editItem.id) {
            updateSeedPacket(editItem.id, formInput).then(() => {
                resetForm();
                navigation('/');
            });
        } else {
            addSeedPacket({ ...formInput, uid}).then(() => {
                resetForm();
                navigation('/');
            });
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" id="name" className="form-input" value={formInput.name || ''} onChange={handleChange} placeholder="Plant Name"/>
            </div>
            <div className="form-group">
                <input type="text" id="imgUrl" className="form-input" value={formInput.imgUrl || ''} onChange={handleChange} placeholder="Image URL"/>
            </div>
            <div className="form-group">
                <input type="number" id="weeksBeforeFrost" className="form-input" value={formInput.weeksBeforeFrost || ''} onChange={handleChange} placeholder="Weeks Before Last Frost Date"/>
            </div>
            <div className="form-group">
                <input type="number" id="harvestDays" className="form-input" value={formInput.harvestDays || ''} onChange={handleChange} placeholder="Days Until Maturity"/>
            </div>
            <div className="form-group">
                <input type="date" id="plantingDate" className="form-input" value={formInput.plantingDate || ''} onChange={handleChange} placeholder="Planting Date"/>
            </div>
            <div className="form-group">
                <input type="text" id="germReq" className="form-input" value={formInput.germReq || ''} onChange={handleChange} placeholder="Germination Requirements"/>
            </div>
            <div className="form-group">
                <input type="text" id="spacing" className="form-input" value={formInput.spacing || ''} onChange={handleChange} placeholder="Spacing"/>
            </div>
            <div className="form-group">
                <input type="text" id="height" className="form-input" value={formInput.height || ''} onChange={handleChange} placeholder="Height"/>
            </div>
            <div className="form-group">
                <input type="text" id="notes" className="form-input" value={formInput.notes || ''} onChange={handleChange} placeholder="Notes"/>
            </div>
            <input type="submit" className='form-btn' value="Submit" />
        </form>
        </>
    )
}

SeedPacketForm.propTypes = {
    editItem: PropTypes.shape(PropTypes.obj).isRequired,
    user: PropTypes.shape(PropTypes.obj).isRequired   
};
