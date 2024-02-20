"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";

interface BreadCrumbItem {
  name: string;
  href: string;
}

const BreadCrumbs = ({ items }: { items: BreadCrumbItem[] }) => {
  return (
    <Breadcrumbs underline="hover">
      {items.map((item, index) => (
        <BreadcrumbItem key={index} href={item.href}>
          {item.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
