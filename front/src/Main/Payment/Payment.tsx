import PaymentCon from "./PaymentCon";
import PaymentData from "./PaymentData";
import PaymentHistory from "./PaymentHistory";



export default function Payment() {
    return(
        <>
            <PaymentCon></PaymentCon>
            <PaymentHistory></PaymentHistory>
            <PaymentData></PaymentData>
        </>
    )
}