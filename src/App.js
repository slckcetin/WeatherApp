import './App.css';
import WeatherApp from './components';
import { WeatherProvider } from './context/WeatherContext';



function App() {
  return (
    <div className="app">
   <WeatherProvider>
        <WeatherApp />
      </WeatherProvider>
      </div>
  );
}
export default App;