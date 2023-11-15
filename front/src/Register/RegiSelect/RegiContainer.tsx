import RegiSelectBox from "./RegiSelectBox";

export default function RegiContainer () {
    return (
        <div>
            <RegiSelectBox type={"근로자"} img={"/Img/WorkerImg.jpeg"}></RegiSelectBox>
            <RegiSelectBox type={"사업자"} img={"/Img/CompanyImg.jpeg"}></RegiSelectBox>
        </div>
    )
}