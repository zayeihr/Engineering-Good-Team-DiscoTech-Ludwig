import React, { useState } from 'react';
import axios from 'axios';

function SpeakerSelect() {
    const [formData, setFormData] = useState({
        docfile: '',
        gender: '',
        acc: '',
        scriptdir: '',
        wavdir: '',
        numspeakers: 1,
        outdir: ''
    });
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5001/speaker_select', formData);
            setResponse(res.data.message);
        } catch (error) {
            console.error("There was an error selecting the speakers!", error);
        }
    };

    return (
        <div>
            <h1>Select Speakers</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="docfile" placeholder="Docfile" onChange={handleChange} />
                <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
                <input type="text" name="acc" placeholder="Accent" onChange={handleChange} />
                <input type="text" name="scriptdir" placeholder="Script Directory" onChange={handleChange} />
                <input type="text" name="wavdir" placeholder="Wav Directory" onChange={handleChange} />
                <input type="number" name="numspeakers" placeholder="Number of Speakers" onChange={handleChange} />
                <input type="text" name="outdir" placeholder="Output Directory" onChange={handleChange} />
                <button type="submit">Select</button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default SpeakerSelect;
