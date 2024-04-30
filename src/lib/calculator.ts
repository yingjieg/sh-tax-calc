import {
  DEFAULT_HOUSING_FUND_RATE,
  getTaxRate,
  HOUSING_FUND_BASE,
  SOCIAL_INSURANCE_CONFIG,
  TAX_THRESHOLD,
} from "@/lib/config";

class Calculator {
  private totalIncome = 0;
  private lastPaidTax = 0;

  private _housingFundRate = DEFAULT_HOUSING_FUND_RATE;
  private _supplementaryHousingFundRate = 0;
  private _specialAdditionalDeductions = 0;
  private _base = 0;

  set housingFundRate(value: number) {
    this._housingFundRate = value;
  }

  set supplementaryHousingFundRate(value: number) {
    this._supplementaryHousingFundRate = value;
  }

  set base(val: number) {
    const [min, max] = SOCIAL_INSURANCE_CONFIG.contribution_base;

    if (val < min) {
      this._base = min;
    } else if (val > max) {
      this._base = max;
    } else {
      this._base = val;
    }
  }

  set specialAdditionalDeductions(value: number) {
    this._specialAdditionalDeductions = value;
  }

  public calc(salary: number) {
    this.base = salary;

    const employeeSocialInsurance = this.getSocialInsurance("employee");
    const employerSocialInsurance = this.getSocialInsurance("employer");
    const housingFund = this.getHousingFund(salary, this._housingFundRate);
    const supplementaryHousingFund = this.getHousingFund(
      salary,
      this._supplementaryHousingFundRate
    );

    const taxableSalary =
      salary -
      housingFund -
      this._specialAdditionalDeductions -
      TAX_THRESHOLD -
      employeeSocialInsurance.total;

    const tax = this.getPersonalIncomeTax(taxableSalary);

    return {
      employeeSocialInsurance,
      employerSocialInsurance,
      housingFund,
      supplementaryHousingFund,
      tax,
      salary,
    };
  }

  private getSocialInsurance(role: "employee" | "employer") {
    const idx = role === "employee" ? 0 : 1;
    const endowment = SOCIAL_INSURANCE_CONFIG.endowment_insurance[idx];
    const medical = SOCIAL_INSURANCE_CONFIG.medical_insurance[idx];
    const unemployment = SOCIAL_INSURANCE_CONFIG.unemployment_insurance[idx];
    const employmentInjury =
      SOCIAL_INSURANCE_CONFIG.employment_injury_insurance[idx];

    const results = [endowment, medical, unemployment, employmentInjury].map(
      val => parseFloat(((this._base * val) / 100).toFixed(2))
    );

    return {
      endowmentInsurance: results[0],
      medicalInsurance: results[1],
      unemploymentInsurance: results[2],
      employmentInjuryInsurance: results[3],
      maternityInsurance: results[4],
      total: parseFloat(results.reduce((acc, val) => acc + val, 0).toFixed(2)),
    };
  }

  private getHousingFund(salary: number, rate: number) {
    let base = salary;
    const [min, max] = HOUSING_FUND_BASE;
    if (salary < min) {
      base = min;
    } else if (salary > max) {
      base = max;
    }

    return Math.floor((base * rate) / 100);
  }

  private getPersonalIncomeTax(taxableSalary: number) {
    if (taxableSalary < 0) {
      return 0;
    }

    this.totalIncome += taxableSalary;

    const [rate, deduction] = getTaxRate(this.totalIncome)!;

    const tax = parseFloat((this.totalIncome * rate - deduction).toFixed(2));

    const currentPaidTax = tax - this.lastPaidTax;

    this.lastPaidTax = tax;

    return parseFloat(currentPaidTax.toFixed(2));
  }
}

export default Calculator;
