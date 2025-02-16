import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectCategory({ setCategory }) {
  return (
    <Select onValueChange={(value) => setCategory(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="style">Style</SelectItem>
          <SelectItem value="culture">Culture</SelectItem>
          <SelectItem value="coding">Coding</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="fashion">Fashion</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
