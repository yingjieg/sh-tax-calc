import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DEFAULT_HOUSING_FUND_RATE,
  DEFAULT_SALARY,
  MINIMUM_INCOME,
} from "../../lib/config";

const formSchema = z.object({
  salary: z
    .number({ coerce: true, message: "should be number" })
    .min(MINIMUM_INCOME, { message: "should be > 2690" }),
  specialDeduction: z.number({ coerce: true, message: "should be number" }),
  housingFundRate: z.number({ coerce: true }),
  supplementaryHousingFundRate: z.number({ coerce: true }),
});

export type FormInputs = z.infer<typeof formSchema>;

type Props = {
  onSubmit: (data: FormInputs) => void;
};

function BasicForm({ onSubmit }: Props) {
  const form = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: DEFAULT_SALARY,
      specialDeduction: 0,
      housingFundRate: DEFAULT_HOUSING_FUND_RATE,
      supplementaryHousingFundRate: 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="salary"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Salary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="specialDeduction"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special Deduction</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="housingFundRate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Housing Fund Rate</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="7">7%</SelectItem>
                  <SelectItem value="6">6%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          name="supplementaryHousingFundRate"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplementary Housing Fund Rate</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={`${field.value}`}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="4">4%</SelectItem>
                  <SelectItem value="3">3%</SelectItem>
                  <SelectItem value="2">2%</SelectItem>
                  <SelectItem value="1">1%</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default BasicForm;
