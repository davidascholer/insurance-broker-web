/**
 * Helper function to map a deductible filter option to it's coorresponding Kanguro deductible amount
 * @param deductible - The deductible filter option
 * @returns The corresponding Kanguro deductible amount
 */
export function mapFilterOptionToKanguroDeductible(deductible: number): number {
  if (deductible === 100) return 200;
  else if (deductible === 500) return 700;
  else if (deductible === 750) return 1000;
  else if (deductible === 1000) return 1000;
  else return 500; // Default
}
