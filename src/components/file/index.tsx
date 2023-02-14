import { bgsModal } from "@andrydharmawan/bgs-component";
import ContentFile from "./components/content";

export interface ShowFileProps {
    id: string;
    fileExtention: string;
    fileName: string;
    fileSize: number;
    modul?: string;
    originalName: string;
}

export default function showFile(data: ShowFileProps) {
    bgsModal({
        width: "100%",
        maxWidth: 900,
        className: "modal-image",
        render: e => {
            return <ContentFile data={data} modalOptions={e} />
        }
    })
}