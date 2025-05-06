"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
  Open: number;
  InProgress: number;
  Closed: number;
}

const IssueChart = ({ Open, InProgress, Closed }: Props) => {
  const data = [
    { label: "Open", value: Open },
    { label: "InProgress", value: InProgress },
    { label: "Closed", value: Closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--violet-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
