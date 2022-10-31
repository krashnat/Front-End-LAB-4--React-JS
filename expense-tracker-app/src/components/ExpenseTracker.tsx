import React from "react"
import { ChangeEvent, Component, FormEvent} from "react"
import { pushDataToJsonServer } from "../services/menu"


type Props = {
    onSuccess : any,
    onClose : any
}

type State = {
    product : string,
    price : number,
    payeeName : string,
    setDate : string
}


class ExpenseTracker extends Component<Props, State> {

    constructor (props : Props) {
        super(props)
        this.state = {
            product : "",
            price : 0,
            payeeName : "",
            setDate : this.setDefaultDate()
        }

        this.setProduct = this.setProduct.bind(this);
        this.setPrice = this.setPrice.bind(this);
        this.setPayee = this.setPayee.bind(this);
        this.loggedDate = this.loggedDate.bind(this);
    }

    setDefaultDate = () => {
        const today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    setPayee = (event : ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName : event.target.value
        })
    }

    setProduct = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product : event.target.value
        })
    }

    setPrice = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price : parseInt(event.target.value)
        })
    }

    loggedDate = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            setDate : event.target.value,
        })
    }

    submitHandler = async (event : FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        const finalData = {
            ...this.state
        }
        const data = await pushDataToJsonServer(finalData);
        this.props.onSuccess();
    }


    render() {

        const formelement = (

            <>
                <div className="addForm-div">
                    <header>
                        <h1>Add New Item</h1>
                        <p><span>Read the below instructions before proceeding:</span><br /> Make sure you fill all the fileds where * is provided</p>
                    </header>

                    <form onSubmit={this.submitHandler}>
                        <article>
                            <p>Name</p>
                            <select name="Name" id="name" value={this.state.payeeName} onChange={this.setPayee} required>
                                <option value="" defaultChecked>Choose</option>
                                <option value="Rahul">Rahul</option>
                                <option value="Ramesh">Ramesh</option>
                            </select>
                        </article>

                        <article>
                            <p>Product purchased</p>
                            <input type="text" value={this.state.product} onChange={this.setProduct} required/>
                        </article>

                        <article>
                            <p>Price</p>
                            <input type="number" value={this.state.price} onChange={this.setPrice} required/>
                        </article>

                        <article>
                            <p>Date</p>
                            <input type="date" value={this.state.setDate} onChange={this.loggedDate} required/>
                        </article>

                        <button className="form-button" type="button" onClick={this.props.onClose}>Close</button>
                        <button className="form-button">Submit</button>
                    </form>
                    <br/><br/>
                </div>
            </>

        );

        return formelement;
    }

}

export default ExpenseTracker;
