import CommentCon from "./CommentCon";
import WorkTodoCon from "./WorkTodoCon";

export default function WorkDetail () {
    return (
        <div className="WorkDetail">
            <WorkTodoCon></WorkTodoCon>
            <CommentCon></CommentCon>
        </div>
    )
}