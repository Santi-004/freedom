import React, { useMemo, useState } from 'react';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

const FormularioPago = ({ onSubmit, total }) => {
  const [tipoTarjeta, setTipoTarjeta] = useState('visa');
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');
  const [cvv, setCvv] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [provincia, setProvincia] = useState('');
  const [cp, setCp] = useState('');
  const [pais, setPais] = useState('Argentina');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const meses = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const anios = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 15 }, (_, i) => String(start + i));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numero || !nombre || !mes || !anio || !cvv || !direccion || !ciudad || !provincia || !cp || !pais) return;
    const payload = {
      tipoTarjeta,
      numero: numero.replace(/\s+/g, ''),
      nombre,
      expiracion: `${mes}/${anio}`,
      cvv,
      direccion: { direccion, ciudad, provincia, cp, pais },
      contacto: { email, telefono },
      total,
    };
    if (onSubmit) onSubmit(payload);
  };

  const formatearNumero = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 19);
    const grupos = digits.match(/.{1,4}/g) || [];
    return grupos.join(' ');
  };

  return (
    <form className="container py-4 px-3 md:py-6 md:px-6 bg-Azul rounded-2xl " onSubmit={handleSubmit}>
      <div className="mb-3">
        <h5 className="mb-2 text-xl font-bold text-black">Método de pago</h5>
        <div className="d-flex flex-wrap gap-2 gap-md-3">
          <label className={`border border-black rounded px-3 py-2 d-flex align-items-center gap-2 flex-grow-1 bg-white hover:bg-AzulClaro/40 cursor-pointer ${tipoTarjeta === 'visa' ? 'border-primary ring-2 ring-Azul' : 'border-secondary-subtle'}`}
                 role="button">
            <input type="radio" name="tipoTarjeta" value="visa" className="form-check-input me-2" checked={tipoTarjeta === 'visa'} onChange={() => setTipoTarjeta('visa')} />
            <FaCcVisa size={28} />
            <span>Visa</span>
          </label>
          <label className={`border border-black rounded px-3 py-2 d-flex align-items-center gap-2 flex-grow-1 bg-white hover:bg-AzulClaro/40 cursor-pointer ${tipoTarjeta === 'mastercard' ? 'border-primary ring-2 ring-Azul' : 'border-secondary-subtle'}`}
                 role="button">
            <input type="radio" name="tipoTarjeta" value="mastercard" className="form-check-input me-2" checked={tipoTarjeta === 'mastercard'} onChange={() => setTipoTarjeta('mastercard')} />
            <FaCcMastercard size={28} />
            <span>Mastercard</span>
          </label>
          <label className={`border border-black rounded px-3 py-2 d-flex align-items-center gap-2 flex-grow-1 bg-white hover:bg-AzulClaro/40 cursor-pointer ${tipoTarjeta === 'naranjax' ? 'border-primary ring-2 ring-Azul' : 'border-secondary-subtle'}`}
                 role="button">
            <input type="radio" name="tipoTarjeta" value="naranjax" className="form-check-input me-2" checked={tipoTarjeta === 'naranjax'} onChange={() => setTipoTarjeta('naranjax')} />
            <FaCreditCard size={28} />
            <span>NaranjaX</span>
          </label>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Número de tarjeta</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste"
            placeholder="0000 0000 0000 0000"
            value={numero}
            onChange={(e) => setNumero(formatearNumero(e.target.value))}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Nombre del titular</label>
          <input
            type="text"
            autoComplete="cc-name"
            className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste"
            placeholder="Como figura en la tarjeta"
            value={nombre}
            maxLength={100}
            onChange={(e) =>
              setNombre(
                e.target.value
                  .replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, "")
                  .slice(0, 100)
              )
            }
            required
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <label className="form-label">Mes</label>
          <select className="form-select !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={mes} onChange={(e) => setMes(e.target.value)} required>
            <option value="" disabled>MM</option>
            {meses.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <label className="form-label">Año</label>
          <select className="form-select !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={anio} onChange={(e) => setAnio(e.target.value)} required>
            <option value="" disabled>AAAA</option>
            {anios.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">CVV</label>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste"
            placeholder="3 o 4 dígitos"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            required
          />
        </div>
      </div>

      <hr className="my-4" />

      <h5 className="mb-3 text-xl font-bold text-black">Dirección de facturación</h5>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Dirección</label>
          <input type="text" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" placeholder="Calle y número" value={direccion} maxLength={120} onChange={(e) => setDireccion(e.target.value.slice(0,120))} required />
        </div>
        <div className="col-12 col-sm-6">
          <label className="form-label">Ciudad</label>
          <input type="text" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={ciudad} maxLength={60} onChange={(e) => setCiudad(e.target.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, "").slice(0,60))} required />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <label className="form-label">Provincia</label>
          <input type="text" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={provincia} maxLength={60} onChange={(e) => setProvincia(e.target.value.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, "").slice(0,60))} required />
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <label className="form-label">Código Postal</label>
          <input type="text" inputMode="numeric" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={cp} maxLength={10} onChange={(e) => setCp(e.target.value.replace(/\D/g, "").slice(0,10))} required />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">País</label>
          <select className="form-select !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" value={pais} onChange={(e) => setPais(e.target.value)} required>
            <option value="Argentina">Argentina</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Chile">Chile</option>
            <option value="Brasil">Brasil</option>
            <option value="Paraguay">Paraguay</option>
          </select>
        </div>
      </div>

      <hr className="my-4" />

      <h5 className="mb-3 text-xl font-bold text-black">Contacto</h5>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" placeholder="tu@email.com" value={email} maxLength={100} onChange={(e) => setEmail(e.target.value.slice(0,100))} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Teléfono</label>
          <input type="tel" className="form-control !border-2 !border-AzulCeleste rounded-md focus:!ring-AzulCeleste focus:!border-AzulCeleste" placeholder="011 1234 5678" value={telefono} maxLength={20} onChange={(e) => setTelefono(e.target.value.replace(/[^0-9+\-()\s]/g, "").slice(0,20))} />
        </div>
      </div>

      {typeof total === 'number' && (
        <div className="mt-4 border border-black rounded-xl overflow-hidden bg-AzulClaro" role="region" aria-label="Resumen de total a pagar"> 
          <div className="bg-Azul text-white px-4 py-2 text-sm font-bold">Total a pagar</div>
          <div className="px-4 py-3 d-flex justify-content-between align-items-center">
            <span className="text-gray-700">Monto</span>
            <span className="text-2xl fw-extrabold text-black">${total.toLocaleString('es-AR')}</span>
          </div>
        </div>
      )}

      <div className="mt-4">
        <button type="submit" className= "bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[700px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Pagar</button>
      </div>
    </form>
  );
};

export default FormularioPago;

