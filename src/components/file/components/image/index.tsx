import Skeleton from "@mui/material/Skeleton";
import { api } from "config";
// import { credential } from "lib";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import showFile from "components/file";
import "./index.scss";

interface ImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    sx?: React.CSSProperties;
    showFull?: boolean;
    id: string;
    fileExtention: string;
    fileName: string;
    fileSize: number;
    modul?: string;
    originalName: string;
    size?: "sm" | "md" | "lg" | "xlg"
}

export interface ImageRefProps {
    url: string;
}

const Image = forwardRef(({ id, fileName, sx, showFull, size = "sm", ...others }: ImageProps, ref: ForwardedRef<ImageRefProps>) => {
    const [url, setUrl] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useImperativeHandle(ref, () => ({
        url
    }));

    useEffect(() => {
        setLoading(true)

        fetch(`${api.bantuan.download}${id}`, {
            headers: {
                // Authorization: `Bearer ${credential.storage.get("token")}`
            }
        }).then(async image => {
            const imageBlog = await image.blob()
            setLoading(false)
            const imageURL = URL.createObjectURL(imageBlog)
            setUrl(imageURL)
        });

    }, []);

    return <>
        {loading
            ? <Skeleton variant="rectangular" animation="wave" className={`skeleton-img ${others.className || ""} ${size}`} style={{
                ...others.style,
                ...sx,
            }} />
            : <div className={`thumb thumb-${size}`}><img
                src={url}
                alt={fileName}
                {...others}
                onClick={(e) => {
                    if(showFull){
                        e.stopPropagation()
                        showFile({ id, fileName, ...others }) 
                    }
                }}
                className={`img-default ${showFull ? "img-hover" : ""} ${others.className || ""}`}
                style={{
                    ...others.style,
                    ...sx,
                }}
            /></div>}
    </>
})

export default Image;