import {
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableFooter,
  TableHead,
  TableHeader,
} from "@/components/ui/table";

export type MonthlyIncomeDedution = {
  employeeSocialInsurance: {
    employmentInjuryInsurance: number;
    endowmentInsurance: number;
    maternityInsurance: number;
    medicalInsurance: number;
    unemploymentInsurance: number;
    total: number;
  };
  employerSocialInsurance: {
    employmentInjuryInsurance: number;
    endowmentInsurance: number;
    maternityInsurance: number;
    medicalInsurance: number;
    unemploymentInsurance: number;
    total: number;
  };
  housingFund: number;
  supplementaryHousingFund: number;
  tax: number;
  salary: number;
};

type Props = {
  data: MonthlyIncomeDedution;
};

function IncomeDedutionTable({ data }: Props) {
  const {
    employeeSocialInsurance,
    employerSocialInsurance,
    salary,
    housingFund,
    supplementaryHousingFund,
    tax,
  } = data;

  const left = (
    salary -
    employeeSocialInsurance.total -
    housingFund -
    supplementaryHousingFund -
    tax
  ).toFixed(2);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Person</TableHead>
          <TableHead>Company</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          {/* 养老 */}
          <TableCell className="font-medium">endowment Insurance</TableCell>
          <TableCell>{employeeSocialInsurance.endowmentInsurance}</TableCell>
          <TableCell>{employerSocialInsurance.endowmentInsurance}</TableCell>
        </TableRow>

        <TableRow>
          {/* 医疗 */}
          <TableCell className="font-medium">medical Insurance</TableCell>
          <TableCell>{employeeSocialInsurance.medicalInsurance}</TableCell>
          <TableCell>{employerSocialInsurance.medicalInsurance}</TableCell>
        </TableRow>

        <TableRow>
          {/* 失业 */}
          <TableCell className="font-medium">unemployment Insurance</TableCell>
          <TableCell>{employeeSocialInsurance.unemploymentInsurance}</TableCell>
          <TableCell>{employerSocialInsurance.unemploymentInsurance}</TableCell>
        </TableRow>

        <TableRow>
          {/* 工伤 */}
          <TableCell className="font-medium">employment Injury</TableCell>
          <TableCell>
            {employeeSocialInsurance.employmentInjuryInsurance}
          </TableCell>
          <TableCell>
            {employerSocialInsurance.employmentInjuryInsurance}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">house fund</TableCell>
          <TableCell>{housingFund}</TableCell>
          <TableCell>{housingFund}</TableCell>
        </TableRow>

        {supplementaryHousingFund > 0 && (
          <TableRow>
            <TableCell className="font-medium">
              supplementary housing fund
            </TableCell>
            <TableCell>{supplementaryHousingFund}</TableCell>
            <TableCell>{supplementaryHousingFund}</TableCell>
          </TableRow>
        )}

        <TableRow>
          <TableCell className="font-medium">tax</TableCell>
          <TableCell>{tax}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="text-right">
            Left: {left}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default IncomeDedutionTable;
