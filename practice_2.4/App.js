import './CSS/App.css';
import countries from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
       <h3>Список стран мира</h3>
       <Table data={ countries } amountRows="10" />
    </div>
  );
}

export default App;