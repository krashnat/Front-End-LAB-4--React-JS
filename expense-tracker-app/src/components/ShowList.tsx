import React, { useEffect, useState } from "react";
import DataList from "../model/DataList";
import { getDataFromJsonServer } from "../services/menu";
import ExpenseTracker from "./ExpenseTracker"


function ShowList() {

    const [items, setItems] = useState<DataList[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [sum, setSum] = useState<number | null>();
    const [rahulSpent, setRahulSpent] = useState<number>(0);
    const [rameshSpent, setRameshSpent] = useState<number>(0);
    const [addForm, setAddForm] = useState<boolean>(false);


    useEffect(() => {
        const fetchMenu = async () => {

            try {
                const data = await getDataFromJsonServer();
                setItems(data);
                setSum(data.reduce((result, record) =>  result = result + record.price , 0 ));

                // get amount spent by users separately
                let rahulAmount = 0;
                let rameshAmount = 0;
                
                data.map ( record => (
                        record.payeeName === "Rahul" ? (rahulAmount += record.price) : (rameshAmount += record.price)
                    )
                )
                setRahulSpent(rahulAmount);
                setRameshSpent(rameshAmount);
            }
            catch (error : any) {
                setError(error);
                console.log(error);
            }

        }
        fetchMenu();
    }, [addForm])


    const successClose = () => {
        setAddForm(false);
    }


    //JSX code for showList - expense tracker
    const renderForm = (

        <div className="showlist">

            <table className="expense-grid">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Product Purchased</th>
                        <th>Price</th>
                        <th>Payee</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items && 
                            ( items.map ( ( user, id ) => (                        
                                        <tr key={id} >
                                            <td className="table-date">{user.setDate}</td>
                                            <td className="table-product">{user.product}</td>
                                            <td className="table-price">{user.price}</td>
                                            <td className={`table-payee ${user.payeeName}`}>{user.payeeName}</td>
                                        </tr>
                                    )
                                )
                            )
                    }
                </tbody>
            </table>

            <button className="btn-add" onClick={() => setAddForm(true)}>Add</button>
            {
                addForm && (
                    <div className="form">
                        <ExpenseTracker onSuccess={successClose} onClose={successClose}/>
                    </div>
                )
            }

            <hr/>

            <table className="total-grid">
                <tbody>
                    <tr>
                        <td className="content">Total:</td>
                        <td className="amount-value total">{sum} </td>
                    </tr>
                    <tr>
                        <td className="content">Rahul Paid:</td>
                        <td className="amount-value Rahul">{rahulSpent} </td>
                    </tr>
                    <tr>
                        <td className="content">Ramesh Paid:</td>
                        <td className="amount-value Ramesh">{rameshSpent} </td>
                    </tr>
                    <tr>
                        <td className="content to-pay" id="to-pay-user">{rahulSpent > rameshSpent ? "Pay Rahul:" : "Pay Ramesh:"} </td>
                        <td className="amount-value to-pay" id="to-pay-amount">{Math.abs((rahulSpent-rameshSpent)/2)} </td>
                    </tr>
                </tbody>
            </table>

        </div>
    );


    // rendering expense-tracker show view with data-grid
    return (
        <div className="app">
            <div className="main-content">
                <div className="title"><h1>Expense Tracker</h1></div>
                <br/>
                {renderForm}
                <br/>
            </div>
        </div>
    );

}

export default ShowList;
