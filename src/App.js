import React from 'react';
import './App.css';
import {IoIosArrowDown, IoIosArrowUp, IoIosPause, IoIosPlay, IoIosUndo} from 'react-icons/io';

const audioLink = "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3";
const audioRef = React.createRef();

class App extends React.Component {

  interval = null;

  constructor(props){
    super(props);

    this.state = {
      brk: 5,
      ses: 25,
      timeLeft: 25,
      sec: 0,
      timerRunning: false,
      lbl: 'Session',
      breakToggle: false
    };

    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.timer = this.timer.bind(this);
  }

   timer(){

    let min = this.state.timeLeft;
    let second = this.state.sec;

    //session time or break time has ended
    if(this.state.timeLeft===0 && second===0){
      if(!this.state.breakToggle){
        audioRef.current.play(); //play audio
        min = this.state.brk; //set it to break
        this.setState({
          lbl: 'Break',
          breakToggle: true
      })
      }
      else{
        audioRef.current.play(); //play audio
        min = this.state.ses; //set it to session
        this.setState({
          lbl: 'Session',
          breakToggle: false
      })
    }
    }

    if(second===0){
      second=59;
      min--;
    }
    else{
     second--;
    }

    this.setState({
      timeLeft: min,
      sec: second,
      timerRunning: true
    });
  }

  increaseBreak(){
    if(this.state.brk+1>60){
      return;
    }
    this.setState({
      brk: this.state.brk+1
    })
  }

  decreaseBreak(){
    if(this.state.brk-1<=0){
      return;
    }
    this.setState({
      brk: this.state.brk-1
    })
  }

  increaseSession(){
    if(this.state.ses+1>60){
      return;
    }
    this.setState({
      ses: this.state.ses+1,
      timeLeft: this.state.timeLeft+1
    })
  }

  decreaseSession(){
    if(this.state.ses-1<=0){
      return;
    }
    this.setState({
      ses: this.state.ses-1,
      timeLeft: this.state.timeLeft-1
    })
  }

  handleReset(){
    clearInterval(this.interval);
    this.setState({
      brk: 5,
      ses: 25,
      timeLeft: 25,
      sec: 0,
      timerRunning: false,
      lbl: 'Session'
    });
  }

  handlePlay(){
    if(this.state.timerRunning){
        //timer is running and button is clicked so its pause
        this.setState({
          timerRunning: false
        });
        clearInterval(this.interval);
        return;
    }

    //start interval every 1 second
    this.interval = setInterval(this.timer,1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {
  return (
    <div id="App">
      <h1 id="heading">25+5 Clock</h1>

      <div id="wrapper">
        <div id="break">
          <h2 id="break-label">Break Length</h2>
          <div id="container">
            <h3 id="break-length">{this.state.brk}</h3>
            <button id="break-decrement" onClick={() => this.decreaseBreak()} className='control'><IoIosArrowDown /></button>
            <button id="break-increment" onClick={() => this.increaseBreak()} className='control'><IoIosArrowUp /></button>
          </div>
        </div>
        <div id="timer">
          <h2 id="timer-label">{this.state.lbl}</h2>
          <h1 id="time-left">{this.state.timeLeft<10?'0'+this.state.timeLeft:this.state.timeLeft}:{this.state.sec<10?'0'+this.state.sec:this.state.sec}</h1>
          <button id="start_stop" onClick={() => this.handlePlay()} className='control1'><IoIosPlay /><IoIosPause /></button>
          <button id="reset" className='control1' onClick={() => this.handleReset()}><IoIosUndo /></button>
          <audio ref={audioRef} id='beep' src={audioLink} type='audio/mpeg' />
        </div>
        <div id="session">
          <h2 id="session-label">Session Length</h2>
          <div id="container">
            <h3 id="session-length">{this.state.ses}</h3>
            <button id="session-decrement" onClick={() => this.decreaseSession()} className='control'><IoIosArrowDown /></button>
            <button id="session-increment" onClick={() => this.increaseSession()} className='control'><IoIosArrowUp /></button>
          </div>
        </div>
      </div>
    </div>
  );
  }
}

export default App;