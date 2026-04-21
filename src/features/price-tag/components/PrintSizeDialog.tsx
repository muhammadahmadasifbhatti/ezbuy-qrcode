"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const INCHES_TO_MM = 25.4;

interface PrintSizeDialogProps {
  open: boolean;
  onConfirm: (widthMm: number, heightMm: number) => void;
  onCancel: () => void;
}

export function PrintSizeDialog({
  open,
  onConfirm,
  onCancel,
}: PrintSizeDialogProps) {
  const [unit, setUnit] = useState<"mm" | "inches">("mm");
  const [width, setWidth] = useState("62");
  const [height, setHeight] = useState("26");

  const handleConfirm = () => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    const widthMm = unit === "inches" ? w * INCHES_TO_MM : w;
    const heightMm = unit === "inches" ? h * INCHES_TO_MM : h;
    onConfirm(widthMm, heightMm);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Size</DialogTitle>
          <DialogDescription>
            Choose the dimensions for your price tag.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <Label>Unit</Label>
            <Select
              value={unit}
              onValueChange={(val) => setUnit(val as "mm" | "inches")}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">Millimeters (mm)</SelectItem>
                <SelectItem value="inches">Inches (in)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="tag-width">Width ({unit})</Label>
              <Input
                id="tag-width"
                type="number"
                min="1"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <Label htmlFor="tag-height">Height ({unit})</Label>
              <Input
                id="tag-height"
                type="number"
                min="1"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleConfirm} className="w-full sm:w-auto">
            Print
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
