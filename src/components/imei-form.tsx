"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ImeiForm() {
  const router = useRouter();
  const [imei, setImei] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [condition, setCondition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imei.trim() || !modelNo.trim()) return;
    const params = new URLSearchParams({
      imei: imei.trim(),
      modelNo: modelNo.trim(),
      ...(condition.trim() && { condition: condition.trim() }),
    });
    router.push(`/print?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-md h-full">
      <CardHeader>
        <CardTitle className="text-xl">Generate Price Tag</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <Button type="submit" className="mt-2 w-full">
            Generate Tag
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
