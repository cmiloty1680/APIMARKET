import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormUpdateHive = ({ hiveData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id_Hive: "",
    des_Hive: "",
    est_Hive: "",
    numCua_Hive: 0,
    numAlz_Hive: 0,
  });

  useEffect(() => {
    if (hiveData) {
      setFormData({
        id_Hive: hiveData.id_Hive || "",
        des_Hive: hiveData.des_Hive || "",
        est_Hive: hiveData.est_Hive || "",
        numCua_Hive: hiveData.numCua_Hive || 0,
        numAlz_Hive: hiveData.numAlz_Hive || 0,
      });
    }
  }, [hiveData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate({
        ...formData,
        numCua_Hive: parseInt(formData.numCua_Hive, 10) || 0,
        numAlz_Hive: parseInt(formData.numAlz_Hive, 10) || 0,
      });
      onClose();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="des_Hive">Descripción</Label>
            <Input
              id="des_Hive"
              value={formData.des_Hive}
              onChange={(e) =>
                setFormData({ ...formData, des_Hive: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="est_Hive">Estado</Label>
            <Input
              id="est_Hive"
              value={formData.est_Hive}
              onChange={(e) =>
                setFormData({ ...formData, est_Hive: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numCua_Hive">Número de Cuadros</Label>
            <Input
              id="numCua_Hive"
              type="number"
              value={formData.numCua_Hive}
              onChange={(e) =>
                setFormData({ ...formData, numCua_Hive: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numAlz_Hive">Número de Alzas</Label>
            <Input
              id="numAlz_Hive"
              type="number"
              value={formData.numAlz_Hive}
              onChange={(e) =>
                setFormData({ ...formData, numAlz_Hive: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Actualizar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormUpdateHive;
