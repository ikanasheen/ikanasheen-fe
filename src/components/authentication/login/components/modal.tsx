import { bgsModal } from "@andrydharmawan/bgs-component";
import FormLoginComponent from "./form-login";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import configureStore, { ConfigureStore, storeDispatch } from "store";
import Footer from "shared/footer";

interface ModalLoginProps {
    data?: any;
}

export default function modalLogin({ data }: ModalLoginProps | undefined = {}) {
    const { reLogin }: ConfigureStore = configureStore.getState();
    if (reLogin) return;
    storeDispatch({ reLogin: true });
    bgsModal({
        width: 500,
        closeOnOutside: false,
        isBlur: true,
        render: () => {
            const onSuccess = () => {
                setTimeout(() => window.location.reload(), 300)
            }

            return <Box className="p-5 pdt-10 pdb-20">
                <Box className="d-flex flex-column align-items-center justify-content-center">
                    <Box className="position-relative wt-190 hg-71">
                        <img src={`/assets/img/logo/${process.env.REACT_APP_LOGO}`} alt="CRESA" className="img-full" />
                    </Box>
                </Box>
                <Alert severity="error" className="mt-4 mb-4">Your session has expired. Please log in to continue where you left off</Alert>
                <FormLoginComponent
                    accessFrom={"session-expired"}
                    title={"session-expired"}
                    onSuccess={onSuccess}
                    data={data} menuCode={""} />
                <Box className="text-center mt-3">
                    <Footer white={false} />
                </Box>
            </Box>
        }
    })
}