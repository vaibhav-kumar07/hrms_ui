import { Label } from "../../../components/common/Label";
import { ILeave } from "../../../components/types/leave";

export default function LeaveItem({ LeaveItem }: { LeaveItem: ILeave }) {
    return (
        <section className="flex justify-around py-3">
            <Label className="">{LeaveItem.name}</Label>
            <Label className="">{`${LeaveItem.date}`}</Label>
        </section>
    );
}
