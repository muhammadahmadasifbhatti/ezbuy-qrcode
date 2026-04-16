"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STYLE_ID = "print-dimensions";

function injectPrintStyles(w: number, h: number, unit: string) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = [
    `@page { size: ${w}${unit} ${h}${unit} !important; margin: 0 !important; }`,
    `@media print {`,
    `  [data-slot="dialog-overlay"],`,
    `  [data-slot="dialog-content"] { display: none !important; }`,
    `}`,
  ].join("\n");
  document.head.appendChild(style);
}

function removePrintStyles() {
  document.getElementById(STYLE_ID)?.remove();
}

export function PrintSettingsDialog() {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<string>("in");
  const [width, setWidth] = useState("2.4");
  const [height, setHeight] = useState("1.5");

  const handlePrint = useCallback(() => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return;

    injectPrintStyles(w, h, unit);
    window.print();
    removePrintStyles();
    setOpen(false);
  }, [width, height, unit]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button size="sm" className="mt-4 print:hidden" />}
      >
        Print
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Print Settings</DialogTitle>
          <DialogDescription>
            Set the page dimensions for printing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label>Unit</Label>
            <Select value={unit} onValueChange={(v) => v && setUnit(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">Millimeters (mm)</SelectItem>
                <SelectItem value="in">Inches (in)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="print-width">Width ({unit})</Label>
              <Input
                id="print-width"
                type="number"
                min="1"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="print-height">Height ({unit})</Label>
              <Input
                id="print-height"
                type="number"
                min="1"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handlePrint}>Print</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
