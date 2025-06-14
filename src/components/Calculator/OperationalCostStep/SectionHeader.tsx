
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <CardHeader className="bg-gradient-to-r from-abaccus-primary to-abaccus-secondary text-white pb-4">
      <CardTitle className="text-xl font-medium">
        {title}
      </CardTitle>
    </CardHeader>
  );
};

export default SectionHeader;
