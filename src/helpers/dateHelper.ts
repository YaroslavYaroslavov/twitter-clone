const adultAge = 18;

export const checkIfValidYearPassed = (day: number, month: number, year: number) => {
  const inputDate = new Date(year, month, day);
  const currentDate = new Date();

  inputDate.setFullYear(inputDate.getFullYear() + adultAge);

  return currentDate >= inputDate;
};

export const monthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const isLeap = (year: number): boolean => {
  const divisibleBy4 = year % 4 === 0;
  const notDivisibleBy100 = year % 100 !== 0;
  const divisibleBy400 = year % 400 === 0;

  return (divisibleBy4 && notDivisibleBy100) || divisibleBy400;
};

export const getMonthDaysArray = (selectedYear: number) => {
  return [31, isLeap(selectedYear) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

export const monthIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const getDaysArray = (month: number, selectedYear: number): number[] => {
  const monthDaysArray = getMonthDaysArray(selectedYear);

  const resultArray = [];
  for (let i = monthDaysArray[month]; i >= 1; i--) {
    resultArray.push(i);
  }
  return resultArray;
};
export const getYearsArray = (minYear: number): number[] => {
  const currentYear = new Date().getUTCFullYear();
  const yearsArray: number[] = [];
  for (let year = currentYear; year >= minYear; year--) {
    yearsArray.push(year);
  }
  return yearsArray;
};
