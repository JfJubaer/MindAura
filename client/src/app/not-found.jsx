/* eslint-disable react/react-in-jsx-scope */
"use client";
import { blueColor } from "@/lib/data/commonData";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <Box
      sx={{
        padding: "30px 0 10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Image
        src={"/not_found.svg"}
        width={400}
        alt="not_found"
        height={"200"}
      />

      <Typography variant="h6">
        Oops! The page you&apos;re looking for was not found.
      </Typography>
      <Button
        variant="outline"
        sx={{
          borderRadius: "20px",
          border: `1px solid ${blueColor}`,
          padding: "5px 30px",
        }}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </Box>
  );
}
