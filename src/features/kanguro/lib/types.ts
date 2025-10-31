export type KanguroCoverageType = {
  deductible: 200 | 500 | 700 | 1000;
  reimbursementRate: 70 | 80 | 90;
  annualLimit:
    | "Unlimited"
    | "5000"
    | "8000"
    | "10000"
    | "15000"
    | "20000"
    | "30000";
};
