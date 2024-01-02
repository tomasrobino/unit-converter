import exchangeBlack from './exchangeBlack.svg';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <div className='headerGroup'>
          <img src={exchangeBlack} alt="" className='headerImg'/>
          <p className='title'>unit converter</p>
        </div>
      </div>
      <Main/>
      <div className='footer'>
        <a href='' className='footerElem'>Terms of service</a>
        <a href='' className='footerElem'>Privacy policy</a>
      </div>
    </div>
  );
}

export default App;
