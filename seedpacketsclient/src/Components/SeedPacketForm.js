import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { addSeedPacket, getSeedPacketsByUid, updateSeedPacket } from "../Data/SeedPackets";
import PropTypes from 'prop-types';
import { getFrostDateById } from "../Data/FrostDate";

const uid = sessionStorage.getItem("uid");

const initialState = {
    name: '',
    imgUrl: '',
    weeksBeforeFrost: 0,
    harvestDays: 0,
    // plantingDate: null,
    germReq: '',
    spacing: '',
    height: '',
    notes: '',
    userUid: '',
};

export default function SeedPacketForm({ editItem, user }) {
    const [formInput, setFormInput] = useState(initialState);
    const navigation = useNavigate();

    useEffect(() => {
        if(editItem) {
            setFormInput({
                id: editItem.id,
                name: editItem.name,
                imgUrl: editItem.imgUrl,
                weeksBeforeFrost: Number(editItem.weeksBeforeFrost),
                harvestDays: Number(editItem.harvestDays),
                // plantingDate: Date(editItem.plantingDate),
                germReq: editItem.germReq,
                spacing: editItem.spacing,
                height: editItem.height,
                notes: editItem.notes,
                userUid: editItem.userUid
            });
        } else {
            setFormInput({
                name: '',
                imgUrl: '',
                weeksBeforeFrost: 0,
                harvestDays: 0,
                // plantingDate: null,
                germReq: '',
                spacing: '',
                height: '',
                notes: '',
                userUid: user.uid,
            });
        };
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
        if (editItem) {
            updateSeedPacket(editItem.id, formInput).then(() => {
                resetForm();
                navigation('/');
            });
        } else {
            addSeedPacket({ ...formInput }).then(console.log).then(() => {
                resetForm();
                navigation('/');
            });
        }
    };

    return (
        <div className="form-container">
            <h1>{editItem ? (`Edit SeedPacket`) : (`Create a Seed Packet`)}</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='form-label' htmlFor="name">
                        {editItem ? (`Name:`) : (``)}
                    </label>
                    <br />
                    <input type="text" id="name" className="form-input" value={formInput.name || ''} onChange={handleChange} placeholder="Plant Name"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="imgUrl">
                        {editItem ? (`Image Url:`) : (``)}
                    </label>
                    <br />
                    <input type="text" id="imgUrl" className="form-input" value={formInput.imgUrl || ''} onChange={handleChange} placeholder="Image URL"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="weeksBeforeFrost">
                        {editItem ? (`Weeks Before Frost Date:`) : (``)}
                    </label>
                    <br />
                    <input type="number" id="weeksBeforeFrost" className="form-input" value={formInput.weeksBeforeFrost || ''} onChange={handleChange} placeholder="Weeks Before Last Frost Date"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="harvestDays">
                        {editItem ? (`Days to Maturity:`) : (``)}
                    </label>
                    <br />
                    <input type="number" id="harvestDays" className="form-input" value={formInput.harvestDays || ''} onChange={handleChange} placeholder="Days Until Maturity"/>
                </div>
                {/* <div className="form-group">
                    <label className='form-label' htmlFor="plantingDate">
                        Planting Date
                    </label>
                    <input type="date" id="plantingDate" className="form-input" value={formInput.plantingDate || ''} onChange={handleChange} placeholder="Planting Date"/>
                </div> */}
                <div className="form-group">
                    <label className='form-label' htmlFor="germReq">
                        {editItem ? (`Germination Requirements:`) : (``)}
                    </label>
                    <br />
                    <input type="text" id="germReq" className="form-input" value={formInput.germReq || ''} onChange={handleChange} placeholder="Germination Requirements"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="spacing">
                        {editItem ? (`Spacing:`) : (``)}
                    </label>
                    <br />
                    <input type="text" id="spacing" className="form-input" value={formInput.spacing || ''} onChange={handleChange} placeholder="Spacing"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="height">
                        {editItem ? (`Height:`) : (``)}
                    </label>
                    <br />
                    <input type="text" id="height" className="form-input" value={formInput.height || ''} onChange={handleChange} placeholder="Height"/>
                </div>
                <div className="form-group">
                    <label className='form-label' htmlFor="notes">
                        {editItem ? (`Notes:`) : (``)}
                    </label>
                    <br />
                    <textarea rows="8" type="text" id="notes" className="form-input" value={formInput.notes || ''} onChange={handleChange} placeholder="Notes"/>
                </div>
                <button type="submit" className='form-btn' value="Submit">{editItem ? (`Update`) : (`Add`)}</button>
            </form>
        </div>
    )
}

SeedPacketForm.propTypes = {
    editItem: PropTypes.shape(PropTypes.obj),
    user: PropTypes.shape(PropTypes.obj).isRequired   
};
