import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type ActionsMenuProps = {
  userId: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const ActionsMenu = ({ onDelete, onEdit }: ActionsMenuProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button size="icon" variant="ghost">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>
      <DropdownMenuItem onClick={onDelete}>Eliminar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
