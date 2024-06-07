import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UploadZip from './components/UploadZip';
import SpeakerSelect from './components/SpeakerSelect';
import TrainTTS from './components/TrainTTS';

function App() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li><Link to="/">Upload ZIP</Link></li>
                        <li><Link to="/speaker-select">Speaker Select</Link></li>
                        <li><Link to="/train-tts">Train TTS</Link></li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/" exact component={UploadZip} />
                    <Route path="/speaker-select" component={SpeakerSelect} />
                    <Route path="/train-tts" component={TrainTTS} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
