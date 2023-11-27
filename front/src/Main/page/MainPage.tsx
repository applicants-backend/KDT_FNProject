import { Link } from "react-router-dom";
import LeftPage from "./LeftPage";
import MiddlePage from "./MiddlePage";
import RightPage from "./RightPage";

export default function MainPage () {

    return (
        <>
            <LeftPage/>
            <MiddlePage/>
            <RightPage/>
        </>
    )
}