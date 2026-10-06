"use client";

import { useMemo, useState } from "react";
import { PrinterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_LABEL_SIZE,
  LABEL_SIZES,
  PriceTagPreview,
  labelSizeToConfig,
  printPriceTag,
} from "@/features/price-tag";

const sizeItems = Object.fromEntries(
  LABEL_SIZES.map((size) => [size.id, size.label]),
);

export function PriceTagGenerator() {
  const [sizeId, setSizeId] = useState(DEFAULT_LABEL_SIZE.id);
  const [imei, setImei] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [condition, setCondition] = useState("");
  const [printing, setPrinting] = useState(false);
  const [printError, setPrintError] = useState<string | null>(null);

  const config = useMemo(
    () =>
      labelSizeToConfig(
        LABEL_SIZES.find((size) => size.id === sizeId) ?? DEFAULT_LABEL_SIZE,
      ),
    [sizeId],
  );

  const tag = {
    imei: imei.trim(),
    modelNo: modelNo.trim(),
    condition: condition.trim() || undefined,
    config,
  };
  const canPrint = Boolean(tag.imei && tag.modelNo);

  const handlePrint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPrint || printing) return;
    setPrinting(true);
    setPrintError(null);
    try {
      await printPriceTag(tag);
    } catch {
      setPrintError("Couldn't generate the price tag. Please try again.");
    } finally {
      setPrinting(false);
    }
  };

  return (
    <form
      onSubmit={handlePrint}
      className="grid w-full max-w-4xl content-start items-start gap-4 md:grid-cols-2"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Inputs</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Size (inches)</Label>
            <Select
              items={sizeItems}
              value={sizeId}
              onValueChange={(value) => value && setSizeId(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LABEL_SIZES.map((size) => (
                  <SelectItem key={size.id} value={size.id}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="imei">IMEI Number</Label>
            <Input
              id="imei"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="354879049278269"
              value={imei}
              onChange={(e) => setImei(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="modelNo">Model No</Label>
            <Input
              id="modelNo"
              type="text"
              placeholder="1235A571B"
              value={modelNo}
              onChange={(e) => setModelNo(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="condition">Condition</Label>
            <Input
              id="condition"
              type="text"
              placeholder="e.g. Like New, Minor Scratches"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <PriceTagPreview {...tag} />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="self-start"
              disabled={!canPrint || printing}
            >
              <PrinterIcon />
              {printing ? "Preparing…" : "Print"}
            </Button>
            {!canPrint ? (
              <p className="text-xs text-muted-foreground">
                Enter an IMEI and Model No to print.
              </p>
            ) : null}
            {printError ? (
              <p className="text-xs text-destructive">{printError}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
