import RegiSelectBox from "./RegiSelectBox";

export default function RegiContainer () {
    return (
        <div>
            <RegiSelectBox Usertype={"근로자"} img={"/Img/WorkerImg.jpeg"}></RegiSelectBox>
            <RegiSelectBox Usertype={"사업자"} img={"/Img/CompanyImg.jpeg"}></RegiSelectBox>
        </div>
    )
}