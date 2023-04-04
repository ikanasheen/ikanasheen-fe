import { Children, useRef, useState } from "react";
import { FormGroupModel, FormRef, BgsForm, BgsGroupForm, BgsTabPanel, BgsTabs } from "@andrydharmawan/bgs-component";
import { credential, mounted } from "lib";
import DrawerLayout, { DrawerRenderProps } from "shared/layout/drawer-layout";
import VisitHelper from "helper/VisitHelper";
import SalesAgentHelper from "helper/SalesAgentHelper";
import PartnerHelper from "helper/PartnerHelper";
import Image from "components/file/components/image";
import { FileProps } from "models";
import "./index.scss"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AgentJourneyPlanDetail({ title, mode, id }: DrawerRenderProps) {
    const formRef = useRef<FormRef>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const actionCode = id ? "update" : "create";

    const form: FormGroupModel = {
        apperance: "filled",
        showIcon: true,
        actionCode,
        showLabelShrink: true,
        item: {
            main: {
                spacing: 3,
                items: [
                    !!id ? "visitId|label.text=Nomor Kunjungan|label.icon=key|editorOptions.disabled=true" : null,
                    {
                        dataField: "salesAgent.id",
                        editorType: "select",
                        label: {
                            text: "Sales Agent",
                            icon: "tree"
                        },
                        editorOptions: {
                            allowClear: true,
                            mode: "popup",
                            helper: (data) => SalesAgentHelper.retrieve(data),
                            displayExpr: "salesName",
                            valueExpr: "id",
                            modalOptions: {
                                width: "85%"
                            },
                            tableOptions: {
                                showIndexing: true,
                                allowSearching: {
                                    fullWidth: true
                                },
                                columns: [
                                    `salesName|caption=Nama Sales|allowFiltering|width=160|icon=user`,
                                    `salesCategory.salesCategoryName|caption=Kategori Sales|allowFiltering|width=160|icon=tree`,
                                    `phoneNumber|icon=phone|caption=Nomor Telepon|allowFiltering|width=160`,
                                    `email|caption=Email|allowFiltering|width=160|icon=mail`,
                                    {
                                        icon: "image",
                                        caption: "Foto",
                                        width: 140,
                                        className: "img-container",
                                        // template: ({ photoProfiles = [] }) => Children.toArray(photoProfiles.map((data: FileProps) => <Image {...data} showFull className="br-3" />))
                                    },
                                ]
                            },
                        },
                        validationRules: ["required"]
                    },
                    `subjectName|label.text=Subjek|validationRules=required`,
                    {
                        itemType: "group",
                        colCount: 3,
                        items: [
                            `datePlanIn|colSpan=2|label.text=Tanggal Rencana Awal|editorType=date|validationRules`,
                            `timePlanIn|label.text=Waktu Mulai|editorType=date|editorOptions.mode=time|validationRules`,
                        ]
                    },
                    {
                        itemType: "group",
                        colCount: 3,
                        items: [
                            `datePlanOut|colSpan=2|label.text=Tanggal Rencana Akhir|editorType=date|validationRules`,
                            `timePlanOut|label.text=Waktu Akhir|editorType=date|editorOptions.mode=time|validationRules`,
                        ]
                    },
                    {
                        dataField: "partner.id",
                        editorType: "select",
                        label: {
                            text: "Partner",
                            icon: "tree"
                        },
                        editorOptions: {
                            helper: data => PartnerHelper.retrieve(data),
                            displayExpr: "partnerName",
                            valueExpr: "partnerId",
                            search: "partnerName",
                            parameter: () => {
                                const { territory } = credential.storage.get("user") || {}

                                return {
                                    ...territory?.id && {
                                        filter: {
                                            "city.territory.id": territory.id
                                        }
                                    }
                                }
                            }
                        },
                        validationRules: ["required"]
                    }
                ]
            },
        }
    }

    mounted(() => {
        if (id) {
            setLoading(true)
            VisitHelper.detail(id, ({ status, data }) => {
                setLoading(false)
                if (mode === "detail") formRef.current?.disabled(true)
                if (status) {
                    formRef.current?.updateData(data);
                }
            })
        }
    })

    return <BgsGroupForm
        {...form}
        ref={formRef}
        render={group => <DrawerLayout
            title={<><b>{title}</b></>}
            noPadding
        >
            <BgsTabs className="tabs-mod">
                <BgsTabPanel title="Detail Informasi">
                    
                <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Informasi</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BgsForm name="main" {...group} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Tanggapan Partner</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BgsForm name="main" {...group} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Foto Kunjungan</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BgsForm name="main" {...group} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Informasi Produk</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <BgsForm name="main" {...group} />
                        </AccordionDetails>
                    </Accordion>


                </BgsTabPanel>
                <BgsTabPanel title="Hasil Kunjungan">
                    {loading}
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Accordion 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <BgsForm name="main" {...group} />
                </BgsTabPanel>
            </BgsTabs>
        </DrawerLayout>}
    />
}