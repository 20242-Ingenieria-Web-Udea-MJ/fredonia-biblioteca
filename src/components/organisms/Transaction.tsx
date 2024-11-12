// src/pages/transactions.tsx
import React, { useState } from "react";
import { MasterDropdown } from "../molecules/masters/MasterDropdown";
import { TransactionTable } from "../molecules/masters/TransactionTable";
import AddTransactionDialog from "../molecules/masters/AddTransactionDialog";
import { BalanceChart } from "../molecules/charts/BalanceChart";
import { BookAIcon } from "lucide-react";

const TransactionsPage: React.FC = () => {
  const [selectedMaster, setSelectedMaster] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleMasterChange = (masterId: string) => {
    setSelectedMaster(masterId);
  };

  const handleAddTransactionSuccess = () => {
    // Logica para refrescar la tabla hacer fetch de los datos o actualizar el estado local
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 justify-center items-center">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-tl from-primary to-emerald-950 bg-clip-text text-center">
          Gestión de Transacciones <BookAIcon />
        </h1>
        <MasterDropdown
          selectedMaster={selectedMaster}
          onChange={handleMasterChange}
        />
      </div>

      {/* Tabla de movimientos */}
      {selectedMaster && <TransactionTable />}

      <AddTransactionDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleAddTransactionSuccess}
        masterName={selectedMaster}
      />

      {selectedMaster && <BalanceChart />}
    </div>
  );
};

export default TransactionsPage;
