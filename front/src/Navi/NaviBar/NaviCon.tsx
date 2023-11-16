import NaviCompo from "./NaviCompo"

export default function NaviCon () {
    return (
        <div>
            <NaviCompo name="업무" root="work"></NaviCompo>
            <NaviCompo name="근태" root="attendance"></NaviCompo>
            <NaviCompo name="급여" root="payment"></NaviCompo>
        </div>
    )
}