import { BgsButton, BgsForm, bgsSnackbar, ModalFunc } from "@andrydharmawan/bgs-component";
import { useEffect, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/Download";
import { api } from "config";
// import { credential } from "lib";
import CloseIcon from '@mui/icons-material/Close';
import "./index.scss";
import moment from "moment";

export interface ContentFileProps {
    data: {
        id: string;
        fileExtention: string;
        fileName: string;
        fileSize: number;
        modul?: string;
        originalName: string;
        file?: File;
    }
    modalOptions: ModalFunc;
}

export default function ContentFile({ data, modalOptions }: ContentFileProps) {
    const { id, fileName, originalName, file } = data;
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingDownload, setLoadingDownload] = useState<boolean>(false);
    const [url, setUrl] = useState<string | undefined>();

    useEffect(() => {
        setLoading(true)
        if (typeof id === "number") {
            fetch(`${api.file}${fileName}`, {
                headers: {
                    // Authorization: `Bearer ${credential.storage.get("token")}`
                }
            }).then(async image => {
                const imageBlog = await image.blob()
                setLoading(false)
                const imageURL = URL.createObjectURL(imageBlog)
                setUrl(imageURL)
            });
        }
        else if (file) {
            file2Base64(file).then(url => {
                setLoading(false)
                setUrl(url)
            })
        }
        console.log(loading, "loading")
    }, [id, fileName]);

    const sizeFormat = (size: number = 0) => {
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i) as any).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
    };

    const download = async () => {
        try {
            if (!url) {
                bgsSnackbar({ message: "Image error" })
                return;
            }
            let imageURL: any;
            setLoadingDownload(true)
            if (typeof id === "number") {
                const image = await fetch(url);
                const imageBlog = await image.blob()
                imageURL = URL.createObjectURL(imageBlog)
            }
            else {
                imageURL = url;
            }
            setLoadingDownload(false)

            const link = document.createElement("a")
            link.href = imageURL
            link.download = originalName;
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link);
        } catch (error) {

        }
    }
    const file2Base64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString() || '');
            reader.onerror = error => reject(error);
        })
    }

    return <>
        <div className="p-4 position-relative">
            <div className="row">
                {/* <div className="col-md-8">
                    <div className="position-relative w-100 max-hg-360 hg-360 border rounded" style={{ backgroundColor: "#eee" }}>
                        {loading
                            ? <div className="d-flex flex-column align-items-center justify-content-center w-100 min-hg-360">
                                <BgsSpinner size={50} className="mb-2" />
                                Loading
                            </div>
                            : (url
                                ? <iframe src={url} style={{
                                    position: "absolute",
                                    inset: 0,
                                    boxSizing: "border-box",
                                    padding: 0,
                                    border: "none",
                                    margin: "auto",
                                    display: "block",
                                    width: 0,
                                    height: 0,
                                    minWidth: "100%",
                                    maxWidth: "100%",
                                    minHeight: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain"
                                }} />
                                : null)}
                    </div>
                </div> */}
                <div className="col-md-12 position-relative">
                    <BgsForm formData={data} colCount={2} items={[{
                        dataField: "fileName",
                        editorType: "label",
                        colSpan: 2,
                        label: {
                            text: "File Name"
                        }
                    }, {
                        dataField: "fileSize",
                        editorOptions: {
                            renderTemplate: value => <span>{sizeFormat(value)}</span>
                        },
                        editorType: "label"
                    }, 
                    "fileExtention|editorType=label",
                    {
                        
                        dataField: "createdOn",
                        colSpan: 2,
                        editorOptions: {
                            renderTemplate: value => <span>{moment(value).format("DD MMM YYYY HH:mm")}</span>
                        },
                        editorType: "label"
                    }
                    ]} />
                    <BgsButton loading={loadingDownload} onClick={download} className="w-100 hg-65" sx={{ position: "absolute", bottom: 0, right: 0 }}><CloudDownloadIcon className="me-2" /> Download</BgsButton>
                </div>
            </div>
            <BgsButton className="close-modal" variant="icon" onClick={() => modalOptions.hide()}><CloseIcon /></BgsButton>
        </div>
    </>
}