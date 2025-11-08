import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { registrosAPI, vehiculosAPI } from '../../api';
import { Toast } from 'primereact/toast';

const ListaRegistros = () => {
  const [registros, setRegistros] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [registro, setRegistro] = useState({
    vehiculo: '',
    motorista: '',
    fecha: new Date(),
    hora: '',
    kilometraje: 0,
    tipo: 'entrada'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [filtros, setFiltros] = useState({ fecha: '', vehiculo: '', motorista: '' });
  const toast = React.useRef(null);

  const tiposRegistro = [
    { label: 'Entrada', value: 'entrada' },
    { label: 'Salida', value: 'salida' }
  ];

  useEffect(() => {
    cargarRegistros();
    cargarVehiculos();
  }, []);

  const cargarRegistros = async () => {
    try {
      const response = await registrosAPI.getAll();
      setRegistros(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los registros' });
    }
  };

  const cargarVehiculos = async () => {
    try {
      const response = await vehiculosAPI.getAll();
      setVehiculos(response.data.map(v => ({ label: `${v.marca} ${v.modelo} - ${v.placa}`, value: v._id })));
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
    }
  };

  const guardarRegistro = async () => {
    try {
      const dataToSend = {
        ...registro,
        fecha: registro.fecha.toISOString().split('T')[0]
      };

      if (isEditing) {
        await registrosAPI.update(registro._id, dataToSend);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado' });
      } else {
        await registrosAPI.create(dataToSend);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro creado' });
      }
      cargarRegistros();
      setDisplayDialog(false);
      resetForm();
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: error.response?.data?.mensaje || 'Error al guardar' });
    }
  };

  const eliminarRegistro = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este registro?')) {
      try {
        await registrosAPI.delete(id);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado' });
        cargarRegistros();
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el registro' });
      }
    }
  };

  const resetForm = () => {
    setRegistro({
      vehiculo: '',
      motorista: '',
      fecha: new Date(),
      hora: '',
      kilometraje: 0,
      tipo: 'entrada'
    });
  };

  const abrirNuevo = () => {
    resetForm();
    setIsEditing(false);
    setDisplayDialog(true);
  };

  const editarRegistro = (registro) => {
    setRegistro({
      ...registro,
      vehiculo: registro.vehiculo._id,
      fecha: new Date(registro.fecha)
    });
    setIsEditing(true);
    setDisplayDialog(true);
  };

  const vehiculoTemplate = (rowData) => {
    return rowData.vehiculo ? `${rowData.vehiculo.marca} ${rowData.vehiculo.modelo} - ${rowData.vehiculo.placa}` : '';
  };

  const fechaTemplate = (rowData) => {
    return new Date(rowData.fecha).toLocaleDateString();
  };

  const tipoTemplate = (rowData) => {
    return <span className={rowData.tipo === 'entrada' ? 'p-tag p-tag-success' : 'p-tag p-tag-danger'}>{rowData.tipo}</span>;
  };

  const accionesTemplate = (rowData) => {
    return (
      <div>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editarRegistro(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => eliminarRegistro(rowData._id)} />
      </div>
    );
  };

  return (
    <div className="p-4">
      <Toast ref={toast} />
      <div className="card">
        <h2>Gestión de Registros (Entradas/Salidas)</h2>
        <Button label="Nuevo Registro" icon="pi pi-plus" onClick={abrirNuevo} className="p-mb-3" />
        
        <DataTable value={registros} responsiveLayout="scroll" paginator rows={10}>
          <Column field="vehiculo" header="Vehículo" body={vehiculoTemplate} sortable></Column>
          <Column field="motorista" header="Motorista" sortable></Column>
          <Column field="fecha" header="Fecha" body={fechaTemplate} sortable></Column>
          <Column field="hora" header="Hora" sortable></Column>
          <Column field="kilometraje" header="Kilometraje" sortable></Column>
          <Column field="tipo" header="Tipo" body={tipoTemplate} sortable></Column>
          <Column body={accionesTemplate} header="Acciones" style={{ width: '150px' }}></Column>
        </DataTable>
      </div>

      <Dialog header={isEditing ? 'Editar Registro' : 'Nuevo Registro'} visible={displayDialog} style={{ width: '450px' }} onHide={() => setDisplayDialog(false)}>
        <div className="p-fluid">
          <div className="p-field p-mb-3">
            <label htmlFor="vehiculo">Vehículo</label>
            <Dropdown id="vehiculo" value={registro.vehiculo} options={vehiculos} onChange={(e) => setRegistro({ ...registro, vehiculo: e.value })} placeholder="Seleccione un vehículo" />
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="motorista">Motorista</label>
            <InputText id="motorista" value={registro.motorista} onChange={(e) => setRegistro({ ...registro, motorista: e.target.value })} />
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="fecha">Fecha</label>
            <Calendar id="fecha" value={registro.fecha} onChange={(e) => setRegistro({ ...registro, fecha: e.value })} dateFormat="yy-mm-dd" />
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="hora">Hora</label>
            <InputText id="hora" value={registro.hora} onChange={(e) => setRegistro({ ...registro, hora: e.target.value })} placeholder="HH:MM" />
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="kilometraje">Kilometraje</label>
            <InputNumber id="kilometraje" value={registro.kilometraje} onValueChange={(e) => setRegistro({ ...registro, kilometraje: e.value })} />
          </div>
          <div className="p-field p-mb-3">
            <label htmlFor="tipo">Tipo</label>
            <Dropdown id="tipo" value={registro.tipo} options={tiposRegistro} onChange={(e) => setRegistro({ ...registro, tipo: e.value })} />
          </div>
          <Button label="Guardar" icon="pi pi-check" onClick={guardarRegistro} />
        </div>
      </Dialog>
    </div>
  );
};

export default ListaRegistros;