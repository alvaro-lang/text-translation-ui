import './App.css';
import AuthButton from './components/AuthButton';
import Home from './pages/Home';

function App() {
  return (
    <div id="App">
      <header className='header'>
        <img className='page-logo' src='page_logo.png' alt='Page logo'></img>
        <AuthButton text='Authentication'/>
      </header>
      <Home/>
      
    </div>
  );
}

export default App;
