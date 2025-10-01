"use client";

import React from "react";
import Button from "../ui/Button";

const DownloadCVButton = () => {
  return <Button className="w-1/2 py-5 mt-10 " onClick={() => window.open('https://drive.google.com/drive/folders/1fkEb2hWAqIyl_Rjfvsdcz7bNGrXpxaE1?usp=sharing')}>DOWNLOAD MY CV</Button>;
};

export default DownloadCVButton;