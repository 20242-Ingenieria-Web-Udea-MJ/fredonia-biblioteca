import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Simulando datos de libros (Maestros) y movimientos
const sampleBooks = [
  { id: 1, title: "Libro A" },
  { id: 2, title: "Libro B" },
];

const sampleTransactions = [
  { id: "1", date: "2024-11-09", quantity: 5, user: "Usuario A" },
  { id: "2", date: "2024-11-10", quantity: -3, user: "Usuario B" },
];

interface Transaction {
  id: string;
  date: string;
  quantity: number;
  user: string;
}

export const TransactionTable = () => {
  const [selectedBook, setSelectedBook] = useState(sampleBooks[0]);
  const [transactions, setTransactions] =
    useState<Transaction[]>(sampleTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [movementType, setMovementType] = useState<"DEVOLUCION" | "PRESTAMO">(
    "DEVOLUCION"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Función para simular la creación de un movimiento
  const handleCreateTransaction = async () => {
    setIsLoading(true);
    try {
      // Aquí se debería realizar la llamada al backend para registrar el movimiento en la base de datos
      const newTransaction: Transaction = {
        id: (transactions.length + 1).toString(),
        date: new Date().toISOString().split("T")[0],
        quantity: movementType === "DEVOLUCION" ? quantity : -quantity,
        user: "Usuario en sesión",
      };

      setTransactions([...transactions, newTransaction]);
      setIsDialogOpen(false); // Cierra el diálogo
    } catch (error) {
      console.error("Error creando el movimiento", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="px-7">
        <CardTitle>Gestión de Transacciones de Inventario</CardTitle>
        <CardDescription>
          Movimientos para el Maestro seleccionado
        </CardDescription>

        {/* Dropdown para seleccionar el Maestro */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>{selectedBook.title}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sampleBooks.map((book) => (
              <DropdownMenuItem
                key={book.id}
                onClick={() => setSelectedBook(book)}
              >
                {book.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">ID Movimiento</TableHead>
              <TableHead className="text-center">Fecha</TableHead>
              <TableHead className="text-center">Cantidad</TableHead>
              <TableHead className="text-center">Usuario</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Botón para agregar movimiento */}
        <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
          Agregar movimiento
        </Button>

        {/* Diálogo para agregar movimiento */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Agregar Movimiento - {selectedBook.title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Label>Tipo de Movimiento</Label>
              <Select
                value={movementType}
                onValueChange={(value) =>
                  setMovementType(value as "DEVOLUCION" | "PRESTAMO")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el rol del usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PRESTAMO">PRESTAMO</SelectItem>
                  <SelectItem value="DEVOLUCION">DEVOLUCION</SelectItem>
                </SelectContent>
              </Select>

              <Label>Cantidad</Label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateTransaction} disabled={isLoading}>
                  {isLoading ? "Guardando..." : "Crear movimiento"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
