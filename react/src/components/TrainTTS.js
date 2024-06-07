import React, { useState } from 'react';
import axios from 'axios';

function TrainTTS() {
    const [configPath, setConfigPath] = useState('');
    const [response, setResponse] = useState('');

    const handleChange = (e) => {
        setConfigPath(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5002/train_tts', { config_path: configPath });
            setResponse(res.data.message);
        } catch (error) {
            console.error("There was an error starting the training!", error);
        }
    };

    return (
        <div>
            <h1>Train TTS Model</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="configPath" placeholder="Config Path" onChange={handleChange} />
                <button type="submit">Train</button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default TrainTTS;
