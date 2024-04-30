export const DEFAULT_HOUSING_FUND_RATE = 7;

export const TAX_THRESHOLD = 5000;

export const MINIMUM_INCOME = 2690;

export const DEFAULT_SALARY = 8000;

export const SOCIAL_INSURANCE_CONFIG = {
  contribution_base: [7310, 36549],
  endowment_insurance: [8, 16],
  medical_insurance: [2, 10],
  unemployment_insurance: [0.5, 0.5],
  employment_injury_insurance: [0, 0.16],
};

export const HOUSING_FUND_BASE = [2590, 36549];

export function getTaxRate(totalIncome: number) {
  if (totalIncome < 36000) {
    return [0.03, 0];
  }

  if (totalIncome >= 36000 && totalIncome < 144000) {
    return [0.1, 2520];
  }

  if (totalIncome >= 144000 && totalIncome < 300000) {
    return [0.2, 16920];
  }

  if (totalIncome >= 300000 && totalIncome < 420000) {
    return [0.25, 31920];
  }

  if (totalIncome >= 420000 && totalIncome < 660000) {
    return [0.3, 52920];
  }

  if (totalIncome >= 660000 && totalIncome < 960000) {
    return [0.35, 85920];
  }

  if (totalIncome >= 960000) {
    return [0.45, 181920];
  }
}
