import { useCallback } from "react";
import { IconButton, MenuItem, Stack, Tooltip } from "@mui/material";
import { DotsVertical } from "mdi-material-ui";
import { DropDown } from "mui-form-hook";
import * as XLSX from "../../utils/xlsx";

/**
 * 数据导出
 */
export const doExport = (data: any[], bookType: XLSX.BookType = "xlsx") => {
  let ws = XLSX.utils.aoa_to_sheet(
    data.map((item: any) => {
      return Object.keys(item)
        .filter((key) => Object.hasOwn(item, key))
        .map((key) => item[key]);
    })
  );
  XLSX.utils.sheet_add_aoa(ws, [Object.keys(data[0])], {
    origin: "A1",
  });
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "页一");
  XLSX.writeFile(wb, "导出文件." + bookType, { bookType: "csv" });
};

const defaultBookTypes: XLSX.BookType[] = [
  "xlsx",
  "xlsm",
  "xlsb",
  "xls",
  "xla",
  "biff8",
  "biff5",
  "biff2",
  "xlml",
  "ods",
  "fods",
  "csv",
  "txt",
  "sylk",
  "slk",
  "html",
  "dif",
  "rtf",
  "prn",
  "eth",
  "dbf",
  "numbers",
];

export interface ExportMoreProps {
  data: any[];
  bookTypes?: XLSX.BookType[];
}

/**
 * 数据快捷导出,支持多种导出类型
 *
 * @param {ExportMoreProps} {
 *   data,
 *   bookTypes = defaultBookTypes,
 * }
 * @return {*}
 */
export const DataExportMore = ({
  data,
  bookTypes = defaultBookTypes,
}: ExportMoreProps) => {
  const keys = bookTypes.map((key) => ({
    key,
    onClick: () => doExport(data, key),
  }));

  return (
    <DropDown
      target={({ open, handleOpen }) => (
        <Tooltip title="更多导出">
          <IconButton onClick={handleOpen}>
            <DotsVertical />
          </IconButton>
        </Tooltip>
      )}
      downContent={({ handleClose }) => (
        <Stack sx={{ p: 1 }}>
          {keys.map((option) => (
            <MenuItem
              key={option.key}
              onClick={() => {
                option.onClick();
                handleClose();
              }}
            >
              {option.key}
            </MenuItem>
          ))}
        </Stack>
      )}
    />
  );
};
