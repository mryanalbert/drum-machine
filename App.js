import React, { Component } from 'react';
import './App.css';
import off_btn from './img/off_btn.png'
import on_btn from './img/on_btn.png'
const data = [
    { id: 'snare', letter: 'Q', src: 'https://www.myinstants.com/media/sounds/snare.mp3' },
    { id: 'bass 1', letter: 'W', src: 'https://www.myinstants.com/media/sounds/bass-drum.mp3' },
    { id: 'bongo', letter: 'E', src: 'http://tipiwiki.free.fr/snd/Percussion(4e)2.wav' },
    { id: 'tom tom', letter: 'A', src: 'http://www.denhaku.com/r_box/sr16/sr16tom/loelectm.wav' },
    { id: 'bass 3', letter: 'S', src: 'http://billor.chsh.chc.edu.tw/sound/bass4.wav' },
    { id: 'shotgun', letter: 'D', src: 'http://david.guerrero.free.fr/Effects/ShotgunReload.wav' },
    { id: 'high hat', letter: 'Z', src: 'http://www.denhaku.com/r_box/tr707/closed.wav' },
    { id: 'drum hit', letter: 'X', src: 'http://www.masterbits.de/sc_docu/sounds1/1TM00013.MP3' },
    { id: 'laser', letter: 'C', src: 'http://www.sa-matra.net/sounds/starcontrol/Umgah-Backzip.wav'  }
  ];

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            display: "_________",
            img: false
        };

        this.handleDisplay = this.handleDisplay.bind(this);
        this.PowerOff = this.PowerOff.bind(this);
        this.PowerOn = this.PowerOn.bind(this);
    }

    handleDisplay(display)  {
        this.setState({ display })
    } 

    PowerOff() {
        this.setState({ display: "_________", img: false });
    }

    PowerOn() {
        this.setState({ img: true });
    }

    render() {
        return (
            <div className="App" id="drum-machine">
                <div className="container">
                    <div className="drumpad-components">
                        {data.map(d => (
                            <Drumpad id={d.id} letter={d.letter} src={d.src} handleDisplay={this.handleDisplay} power={this.state.img} />
                        ))}
                    </div>
                    <div className="sound-label">
                        <div>
                            { 
                                this.state.img ?
                                <img src={on_btn} alt="off button" onClick={this.PowerOff} /> :
                                <img src={off_btn} alt="off button" onClick={this.PowerOn} /> 
                            }
                        </div>
                        <div>
                            <div><h1>Sound:</h1></div>
                            <div id="display">{this.state.display}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;


class Drumpad extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }


    handleKeyDown = (e) => {
        if(e.keyCode === this.props.letter.charCodeAt()) {
            this.audio.play();
            this.props.handleDisplay(this.props.id);
        }
    }

    handleClick() {
        if (this.props.power) {
            this.audio.play();
            this.props.handleDisplay(this.props.id);
        }
        else {

        }
    }

    render() {
        return (
            <div className="drum-pad" id={this.props.id} onClick={this.handleClick}>
                <h3>{this.props.letter}</h3>
                <audio className="clip" id={this.props.letter} src={this.props.src} ref={ref => this.audio = ref}></audio>
            </div>
        );
    }
}
