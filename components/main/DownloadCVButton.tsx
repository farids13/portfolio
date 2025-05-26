"use client";

import React from "react";
import Button from "../ui/Button";

const DownloadCVButton = () => {
  return <Button className="w-1/2 py-5 mt-10 " onClick={() => console.log('Download CV')}>DOWNLOAD MY CV</Button>;
};

export default DownloadCVButton;