import logo from './logo.svg';
import './App.css';

function calculate(){
  // Get calculation from the backend
  // Update results area
}

function App() {

  const totalFcamaraCommission = 50;
  const totalCompetitorCommission = 10;
  return (
    <div className="App">
      <header className="App-header">
        <div>
        </div>
        <form action={calculate}>
          <label for="localSalesCount">Local Sales Count</label>  
          <input name="localSalesCount" /><br />

          <label for="foreignSalesCount">Foreign Sales Count</label>  
          <input name="foreignSalesCount" /><br />
          
          <label for="averageSaleAmount">Average Sale Amount</label>  
          <input name="averageSaleAmount" /><br />

          <button type="submit">Calculate</button>
        </form>
      </header>

      <div>
        <h3>Results</h3>
        <p>Total FCamara commission: {totalFcamaraCommission}</p>
        <p>Total FCamara commission: {totalCompetitorCommission}</p>
      </div>
    </div>
  );
}

export default App;
