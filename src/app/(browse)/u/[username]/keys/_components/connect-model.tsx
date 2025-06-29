'use client'

import { useState, useTransition, useRef, ElementRef } from "react";
import { IngressInput } from "livekit-server-sdk";
import { createIngress } from "../../../../../../../actions/ingress";

import {toast } from "sonner"

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP;

interface RadioButtonProps {
  onSelectionChange?: (value: string) => void;
}

export const ConnectModel = ({ onSelectionChange }: RadioButtonProps) => {

  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransistion] = useTransition();

  

  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

 const [selectedValue, setSelectedValue] = useState<string>('')

  const handleChange = (value: string) => {
    setSelectedValue(value)
    onSelectionChange?.(value)
    setIngressType(value);
  }



  const onSubmit = () => {
    startTransistion(() => {
      createIngress(parseInt(ingressType))
      .then(() => toast.success("Ingress created"))
      .catch(() => toast.error("Something went wrong"))
    });
  }
    return (

            <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose an option:</h3>

      <div className="space-y-2">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="radioGroup"
            value={RTMP}
            checked={selectedValue === 'RTMP'}
            onChange={(e) => handleChange(e.target.value)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <span className="">RTMP</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="radioGroup"
            value={WHIP}
            checked={selectedValue === 'WHIP'}
            onChange={(e) => handleChange(e.target.value)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
          />
          <span className="">WHIP</span>
        </label>
      </div>

      {selectedValue && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-blue-800">Selected: {selectedValue}</p>
        </div>
      )}

      <button disabled onClick={onSubmit}
    className="h-15 w-full p-2 bg-black rounded-xl hover:bg-gray-900">Generate</button>
    </div>
    )
}