import PaymentCon from "./PaymentCon";
import PaymentData from "./PaymentData";
import PaymentHistory from "./PaymentHistory";
import "./scss/PaymentAllParent.scss";


export default function Payment() {
    return(
        <div className="Paymentbody">
            <div className="PaymentConWrap">
                <PaymentCon></PaymentCon>
            </div>
            <div className="PaymentListAndData">
            <PaymentHistory></PaymentHistory>
            <PaymentData></PaymentData>
            </div>
        </div>
    )
}