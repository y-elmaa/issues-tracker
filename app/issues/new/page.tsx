'use client'
import React from "react";


import dynamic from "next/dynamic";
import IssueFormLoding from "./loading";

const IssueForm =dynamic(
  ()=>
  import ('@/app/issues/_components/IssueForm'),
  {ssr : false,
    loading:()=><IssueFormLoding/>
    
  }
);

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
