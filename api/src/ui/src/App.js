import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
    const [localSales, setLocalSales] = useState("");
    const [foreignSales, setForeignSales] = useState("");
    const [averageSale, setAverageSale] = useState("");
    const [fcamaraCommission, setFcamaraCommission] = useState(0);
    const [competitorCommission, setCompetitorCommission] = useState(0);

    const calculate = async (e) => {
        e.preventDefault(); 

        const requestData = {
            localSalesCount: Number(localSales),
            foreignSalesCount: Number(foreignSales),
            averageSaleAmount: Number(averageSale),
        };

        if (requestData.localSalesCount < 0 || requestData.foreignSalesCount < 0) {
            alert("Sales counts cannot be negative.");
            return;
        }

        if (requestData.averageSaleAmount <= 0) {
            alert("Average sale amount must be greater than zero.");
            return;
        }

        try {
            const response = await fetch("https://localhost:5000/api/Commision/Calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch commission data.");
            }

            const data = await response.json();
            setFcamaraCommission(data.fCamaraCommissionAmount);
            setCompetitorCommission(data.competitorCommissionAmount);
        } catch (error) {
            console.error("Error:", error);
            alert("Error fetching data!");
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg p-4 w-50 text-center">
                <h2 className="mb-3 text-primary">
                    <i className="bi bi-calculator-fill"></i> Commission Calculator
                </h2>
                <form onSubmit={calculate} className="text-start">
                    {[
                        { label: "Local Sales Count", value: localSales, setter: setLocalSales },
                        { label: "Foreign Sales Count", value: foreignSales, setter: setForeignSales },
                        { label: "Average Sale Amount", value: averageSale, setter: setAverageSale }
                    ].map(({ label, value, setter }, i) => (
                        <div className="mb-3" key={i}>
                            <label className="form-label">{label}</label>
                            <input type="number" className="form-control" value={value} onChange={(e) => setter(e.target.value)} required />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary w-100 shadow-sm">Calculate <i className="bi bi-arrow-right-circle"></i></button>
                </form>

                <div className="mt-4 p-3 bg-light border rounded">
                    <h4 className="text-success"><i className="bi bi-cash-stack"></i> Results</h4>
                    <p><strong>FCamara:</strong> ${fcamaraCommission.toFixed(2)}</p>
                    <p><strong>Competitor:</strong> ${competitorCommission.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );

}

export default App;
