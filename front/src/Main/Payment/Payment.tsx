import PaymentCon from "./PaymentCon";
import PaymentData from "./PaymentData";
import PaymentHistory from "./PaymentHistory";



export default function Payment() {
    return(
        <div>
            <PaymentCon></PaymentCon>
            <PaymentHistory></PaymentHistory>
            <PaymentData></PaymentData>
        </div>
    )
}