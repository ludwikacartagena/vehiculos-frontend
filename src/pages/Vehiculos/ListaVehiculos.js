import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { vehiculosAPI } from '../../api';
import { Toast } from 'primereact/toast';

const ListaVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [vehiculo, setVehiculo] = useState({ marca: '', modelo: '', placa: '' });
  const [isEditing, setIsEditing] = useState(false);
  const toast = React.useRef(null);

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    try {
      const response = await vehiculosAPI.getAll();
      setVehiculos(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los vehículos' });
    }
  };

  const guardarVehiculo = async () => {
    try {
      if (isEditing) {
        await vehiculosAPI.update(vehiculo._id, vehiculo);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo actualizado' });
      } else {
        await vehiculosAPI.create(vehiculo);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo creado' });
      }
      cargarVehiculos();
      setDisplayDialog(false);
      setVehiculo({ marca: '', modelo: '', placa: '' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response?.data?.mensaje || 'Error al guardar' });
    }
  };

  const eliminarVehiculo = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este vehículo?')) {
      try {
        await vehiculosAPI.delete(id);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Vehículo eliminado' });
        cargarVehiculos();
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el vehículo' });
      }
    }
  };

  const abrirNuevo = () => {
    setVehiculo({ marca: '', modelo: '', placa: '' });
    setIsEditing(false);
    setDisplayDialog(true);
  };

  const editarVehiculo = (vehiculo) => {
    setVehiculo({ ...vehiculo });
    setIsEditing(true);
    setDisplayDialog(true);
  };

  const accionesTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editarVehiculo(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => eliminarVehiculo(rowData._id)} />
      </div>
    );
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="card">
        <h2>Gestión de Vehículos</h2>
        <Button label="Nuevo Vehículo" icon="pi pi-plus" onClick={abrirNuevo} className="p-mb-3" />
        
        <DataTable value={vehiculos} responsiveLayout="scroll" paginator rows={10}>
          <Column field="marca" header="Marca" sortable></Column>
          <Column field="modelo" header="Modelo" sortable></Column>
          <Column field="placa" header="Placa" sortable></Column>
          <Column body={accionesTemplate} header="Acciones" style={{ width: '150px' }}></Column>
        </DataTable>
      </div>

      <Dialog header={isEditing ? 'Editar Vehículo' : 'Nuevo Vehículo'} visible={displayDialog} style={{ width: '450px' }} onHide={() => setDisplayDialog(false)}>
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="marca">Marca</label>
            <InputText id="marca" value={vehiculo.marca} onChange={(e) => setVehiculo({ ...vehiculo, marca: e.target.value })} required />
          </div>
          <div className="p-field">
            <label htmlFor="modelo">Modelo</label>
            <InputText id="modelo" value={vehiculo.modelo} onChange={(e) => setVehiculo({ ...vehiculo, modelo: e.target.value })} required />
          </div>
          <div className="p-field">
            <label htmlFor="placa">Placa</label>
            <InputText id="placa" value={vehiculo.placa} onChange={(e) => setVehiculo({ ...vehiculo, placa: e.target.value })} required />
          </div>
          <Button label="Guardar" icon="pi pi-check" onClick={guardarVehiculo} />
        </div>
      </Dialog>
    </div>
  );
};

export default ListaVehiculos;