// src/components/organisms/AddTransactionDialog.tsx
import React, { useState } from "react";

interface AddTransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  masterName: string | null;
}

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  masterName,
}) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Aquí iría la lógica para agregar el movimiento en la base de datos
      setMessage("Movimiento creado exitosamente.");
      onSuccess();
      onClose();
    } catch (error) {
      setMessage(`Hubo un error al crear el movimiento. ${error ?? ""}`);
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl mb-4">Agregar Movimiento para {masterName}</h2>
        <select className="w-full mb-4 p-2 border rounded">
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>
        <input
          type="number"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full mb-4 p-2 border rounded"
        />
        {message && <p className="text-center mb-4">{message}</p>}
        <div className="flex justify-between">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Crear movimiento"}
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddTransactionDialog;
