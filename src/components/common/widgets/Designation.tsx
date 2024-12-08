import { IProfile, positions } from "../../../components/types/profile";

export default function DesignationWidget({ rowData }: { rowData: IProfile }) {
    // Find the label that matches the position value from rowData.position
    const positionLabel = positions.find(
        (position) => position.value === rowData.position,
    )?.label;

    return <div>{positionLabel ? positionLabel : "ALL"}</div>;
}
