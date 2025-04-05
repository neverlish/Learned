
import { Box, Button, Grid, Space, Text, Title } from "@mantine/core";
import { useState } from "react";
import PointSelect from "~/components/Point/Select";

export default function Shop() {
  const point = 1000;
  const [selected, setSelected] = useState(2000);
  return (
    <Box
      sx={{
        padding: "0 50px",
        paddingTop: "50px",
        width: "calc(100% - 100px)",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <Title>포인트 구매하기</Title>
      <Text>{point}포인트 보유</Text>
      <Space h="xl" />
      <Grid columns={4}>
        <Grid.Col span={1}>
          <PointSelect
            value={2000}
            is_select={selected === 2000}
            onClick={() => setSelected(2000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={5000}
            is_select={selected === 5000}
            onClick={() => setSelected(5000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={10000}
            is_select={selected === 10000}
            onClick={() => setSelected(10000)}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <PointSelect
            value={30000}
            is_select={selected === 30000}
            onClick={() => setSelected(30000)}
          />
        </Grid.Col>
      </Grid>
      <Space h="xl" />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          sx={{ width: "150px" }}
        >
          구매하기
        </Button>
      </Box>
    </Box>
  );
}