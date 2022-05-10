import { MenuItem, TextField } from "@mui/material";
import React from "react";

interface IProps {
  data: Definitions.IField[];
  onChange: (fieldName: string, text: string) => void;
}

const Field = (props: IProps) => {
  const { data, onChange } = props;
  return (
    <>
      {data.map((val, index) => {
        const { fieldName, type, options, value } = val;
        return (
          <TextField
            key={index}
            placeholder={fieldName}
            label={fieldName}
            value={value}
            style={{ margin: 8 }}
            type={"text"}
            multiline={type === "multiline"}
            select={type === "select"}
            onChange={(event) =>
              onChange(fieldName, event.target.value as string)
            }
            rows={type === "multiline" ? 5 : 1}
          >
            {options &&
              options.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
          </TextField>
        );
      })}
    </>
  );
};

export default Field;
