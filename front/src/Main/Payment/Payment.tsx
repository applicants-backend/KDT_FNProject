import PaymentCon from "./PaymentCon";
import PaymentData from "./PaymentData";
import PaymentHistory from "./PaymentHistory";



export default function Payment() {
    return(
        <div className="">
            <div className="">
                <PaymentCon></PaymentCon>
            </div>
            
            <PaymentHistory></PaymentHistory>
            <PaymentData></PaymentData>
        </div>
    )
}