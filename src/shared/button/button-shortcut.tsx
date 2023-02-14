import { BgsButton } from "@andrydharmawan/bgs-component";
import { useKeyPress } from "lib";
import { CombinationTypeModel } from "models";
import { useEffect, useState } from "react";

interface OnClickButtonProps {
    loading: (value: boolean) => void;
}

export interface ButtonShorcutComponentProps {
    label: string;
    keyCode: string | number;
    variant?: 'text' | 'outlined' | 'contained' | 'icon';
    combination?: CombinationTypeModel | CombinationTypeModel[];
    onClick: (prop: OnClickButtonProps) => void;
}

const ButtonShorcutComponent = ({ label, keyCode, combination, onClick, variant = "outlined" }: ButtonShorcutComponentProps) => {
    const keyPress = useKeyPress(keyCode, combination);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (keyPress && !loading) defaultClick();
    }, [keyPress]);

    const defaultClick = () => {
        onClick({ loading: (value) => setLoading(value) });
    };

    return (
        <BgsButton variant={variant} loading={loading} onClick={defaultClick}>
            {label} {keyCode && <span className="ms-1 fw-700">({keyCode})</span>}
        </BgsButton>
    );
};

export default ButtonShorcutComponent;