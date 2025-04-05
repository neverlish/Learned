import { Box, Text } from "@mantine/core";

interface IPointSelect {
  value: number;
  is_select: boolean;
  onClick: () => void;
}

export default function PointSelect({
  value,
  is_select,
  onClick,
}: IPointSelect) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        border: is_select ? "1px solid #000" : "1px solid #eee",
        cursor: "pointer",
        "&:hover": {
          border: "1px solid #000",
        },
      }}
    >
      <Text sx={{ fontSize: "20px", fontWeight: "bold" }}>{value}P</Text>
    </Box>
  );
}