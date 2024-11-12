import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import React from "react";

interface MasterDropdownProps {
  selectedMaster: string | null;
  onChange: (masterId: string) => void;
}

export const MasterDropdown: React.FC<MasterDropdownProps> = ({
  selectedMaster,
  onChange,
}) => {
  const masters = [
    { id: "1", name: "Maestro 1" },
    { id: "2", name: "Maestro 2" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="h-12 w-12">
        <Button>
          <Settings2 className="h-12 w-12" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Maestro a visualizar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedMaster ?? ""}
          onValueChange={onChange}
        >
          {masters.map((master) => (
            <DropdownMenuRadioItem key={master.id} value={master.id}>
              {master.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
