"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";


export default function Preview() {

    const cardRef = useRef(null);
    const [cardData, setCardData] = useState(undefined);

    const downloadCard = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current);
            const link = document.createElement("a");
            link.download = "id-card.png";
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    const reactToPrintFn = useReactToPrint({ contentRef: cardRef });

    useEffect(() => {
        const data = localStorage.getItem("cardData")
        setCardData(JSON.parse(data));
    }, [])

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto space-y-6">
                <div className="flex gap-4 justify-center mb-8">
                    <Button onClick={downloadCard} className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                    </Button>
                    <Button onClick={reactToPrintFn} className="flex items-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print
                    </Button>
                </div>

                <Card
                    ref={cardRef}
                    className="p-6 bgimage shadow-lg print:shadow-none max-w-sm flex gap-3"
                >
                    <div className="w-1/3">
                        <img src={cardData?.image} alt="ID Photo" className="object-cover mx-auto" />
                    </div>

                    <div className="w-2/3 px-4 flex flex-col">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{cardData?.name}</h2>
                            <p className="text-md text-black">
                                <span>पिता : </span>
                                <span>{cardData?.fatherName}</span>
                            </p>
                            <p className="text-black text-md">
                                <span>माता : </span>
                                <span>{cardData?.motherName}</span>
                            </p>
                        </div>
                        <div>
                        <p className="text-black text-md">
                                <span>पता : </span>
                                <span>{cardData?.address}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-black text-md">
                                <span>मोबाइल : </span>
                                <span>{cardData?.mobileNumber1}</span>
                            </p>
                            <p className="text-black text-md">
                                <span>मोबाइल : </span>
                                <span>{cardData?.mobileNumber2}</span>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
