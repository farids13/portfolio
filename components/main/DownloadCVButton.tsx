"use client";

import React from "react";
import Button from "../ui/Button";

interface DownloadCVButtonProps {
  className?: string;
}

const DownloadCVButton = ({ className = '' }: DownloadCVButtonProps) => {
  return <Button className={`${className}`} onClick={() => window.open('https://drive.google.com/drive/folders/1fkEb2hWAqIyl_Rjfvsdcz7bNGrXpxaE1?usp=sharing')}>DOWNLOAD MY CV</Button>;
};

export default DownloadCVButton;