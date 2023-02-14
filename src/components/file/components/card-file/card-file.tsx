import AttachFileIcon from "@mui/icons-material/AttachFile";
import showFile from "components/file";

export interface CardFileProps {
    attachment?: FileList[];
}

interface FileList {
    id: string;
    fileExtention: string;
    fileName: string;
    fileSize: number;
    modul?: string;
    originalName: string;
}

export default function CardFile({ attachment = [] }: CardFileProps) {
    return <span>
        {attachment.map((item, index) => item ? <div tabIndex={0} key={index} className="action-hover d-flex align-items-center border br-10 p-1 ps-2 pe-2" onClick={() => showFile(item)}>
            <AttachFileIcon className="fs-14 me-1" color="success" sx={{ transform: "rotate(50deg)" }} /> <span className="text-truncate">{item.originalName}</span>
        </div> : null)}
    </span>
}