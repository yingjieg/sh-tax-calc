"use client";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Calculator from "@/lib/calculator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import IncomeDedutionTable, {
  MonthlyIncomeDedution,
} from "./components/IncomeDedutionTable";
import BasicForm, { FormInputs } from "./components/BasicForm";

export default function Home() {
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyIncomeDedution[]>(
    []
  );

  console.log(monthlyRecords);

  const handleSubmit: SubmitHandler<FormInputs> = data => {
    const calc = new Calculator();
    calc.specialAdditionalDeductions = data.specialDeduction;
    calc.housingFundRate = data.housingFundRate;
    calc.supplementaryHousingFundRate = data.supplementaryHousingFundRate;

    const records = [];
    for (let i = 0; i < 12; i++) {
      const result = calc.calc(data.salary);
      records.push(result);
    }

    setMonthlyRecords(records);
  };

  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex min-h-screen flex-col items-center justify-between w-[768px]">
      <div className="p-6 w-full">
        <BasicForm onSubmit={handleSubmit} />
      </div>

      <div className="p-6 w-full">
        {monthlyRecords.map((record, idx) => (
          <Card key={idx} className="mb-3">
            <CardHeader>
              <CardDescription>{getYearMonth(idx)}</CardDescription>
            </CardHeader>
            <CardContent className="flex sm:flex-nowrap flex-wrap">
              <IncomeDedutionTable data={record} />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

function getYearMonth(monthIdx: number) {
  const currentYear = new Date().getFullYear();
  const month = (monthIdx + 1).toString().padStart(2, "0");

  return `${currentYear}-${month}`;
}
