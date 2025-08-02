import React from "react";

interface YearProps {
  year: number | string;
}

const Year = ({ year }: YearProps) => {
  const yearNumber = typeof year === "string" ? parseInt(year) : year;

  return (
    <p>
      {new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
      }).format(new Date(yearNumber, 0))}{" "}
      {}
    </p>
  );
};

export default React.memo(Year);
