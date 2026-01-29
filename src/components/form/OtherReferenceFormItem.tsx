import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OtherReferenceFormItem = () => {
  const [mainOption, setMainOption] = useState<string>("");
  const [subOption, setSubOption] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");

  return (
    <FormField
      name="reference"
      render={({ field }) => {
        // Construct the full reference value from selections
        const updateFieldValue = (main: string, sub: string, custom: string) => {
          let value = main;
          if (sub) {
            value += ` - ${sub}`;
          }
          if (custom) {
            value += `: ${custom}`;
          }
          field.onChange(value);
        };

        return (
          <FormItem className="w-full space-y-3">
            <span className="nunito-sans-light text-sm text-[--primary-teal-dark] text-start">
              How did you hear about us?
            </span>
            
            {/* Main dropdown */}
            <FormControl>
              <Select
                value={mainOption}
                onValueChange={(value) => {
                  setMainOption(value);
                  setSubOption("");
                  setCustomText("");
                  updateFieldValue(value, "", "");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ad">Ad</SelectItem>
                  <SelectItem value="Vet">Vet</SelectItem>
                  <SelectItem value="Rescue/Shelter/Adoption Center">
                    Rescue/Shelter/Adoption Center
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>

            {/* Sub-options for Ad */}
            {mainOption === "Ad" && (
              <FormControl>
                <Select
                  value={subOption}
                  onValueChange={(value) => {
                    setSubOption(value);
                    setCustomText("");
                    updateFieldValue(mainOption, value, "");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select ad source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}

            {/* Custom text for Ad - Other */}
            {mainOption === "Ad" && subOption === "Other" && (
              <FormControl>
                <Input
                  placeholder="Please specify"
                  value={customText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setCustomText(text);
                    updateFieldValue(mainOption, subOption, text);
                  }}
                  className="w-full"
                />
              </FormControl>
            )}

            {/* Sub-option for Vet */}
            {mainOption === "Vet" && (
              <FormControl>
                <Input
                  placeholder="Type the name of your veterinarian office"
                  value={customText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setCustomText(text);
                    updateFieldValue(mainOption, "", text);
                  }}
                  className="w-full"
                />
              </FormControl>
            )}

            {/* Sub-option for Rescue/Shelter/Adoption Center */}
            {mainOption === "Rescue/Shelter/Adoption Center" && (
              <FormControl>
                <Input
                  placeholder="Type the name of your rescue/shelter/adoption center"
                  value={customText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setCustomText(text);
                    updateFieldValue(mainOption, "", text);
                  }}
                  className="w-full"
                />
              </FormControl>
            )}

            {/* Sub-options for Other */}
            {mainOption === "Other" && (
              <FormControl>
                <Select
                  value={subOption}
                  onValueChange={(value) => {
                    setSubOption(value);
                    setCustomText("");
                    updateFieldValue(mainOption, value, "");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A friend recommended PIPA Broker">
                      A friend recommended PIPA Broker
                    </SelectItem>
                    <SelectItem value="I found PIPA Broker while searching">
                      I found PIPA Broker while searching
                    </SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            )}

            {/* Custom text for Other - Other */}
            {mainOption === "Other" && subOption === "Other" && (
              <FormControl>
                <Input
                  placeholder="Please specify"
                  value={customText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setCustomText(text);
                    updateFieldValue(mainOption, subOption, text);
                  }}
                  className="w-full"
                />
              </FormControl>
            )}

            <FormMessage className="text-center" />
          </FormItem>
        );
      }}
    />
  );
};

export default OtherReferenceFormItem;
