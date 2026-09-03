import { Propuestas } from "../models/propuesta.model.js";



// 1. Crear propuesta agropecuaria
export const crearPropuesta = async (req, res) => {
  try {
    const { titulo, sector, problematica } = req.body;
    const solicitanteId = req.user.id; // Obtenido del token

    if (!titulo || !sector || !problematica) {
      return res.status(400).json({
        ok: false,
        msg: 'Los campos titulo, sector y problematica son obligatorios.',
      });
    }

    const nuevaPropuesta = await Propuestas.create({
      titulo,
      sector,
      problematica,
      solicitanteId,
      estado: 'PENDIENTE',
    });

    return res.status(201).json({
      ok: true,
      msg: 'Propuesta agropecuaria registrada exitosamente.',
      data: nuevaPropuesta,
    });
  } catch (error) {
    console.error('Error en crearPropuesta:', error);
    return res.status(500).json({ ok: false, msg: 'Error interno al registrar la propuesta.' });
  }
};

// 2. Obtener solicitudes para el CIT
export const obtenerPendientesCIT = async (req, res) => {
  try {
    const pendientes = await Propuestas.findAll({
      where: { estado: 'PENDIENTE' },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      ok: true,
      total: pendientes.length,
      data: pendientes,
    });
  } catch (error) {
    console.error('Error en obtenerPendientesCIT:', error);
    return res.status(500).json({ ok: false, msg: 'Error al consultar propuestas.' });
  }
};

// 3. Revisión y resolución del evaluador CIT
export const dictaminarPropuestaCIT = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, justificacion } = req.body;
    const citRevisorId = req.user.id;

    // Validación de entrada
    if (!['APROBADO', 'RECHAZADO'].includes(decision)) {
      return res.status(400).json({
        ok: false,
        msg: 'La decisión debe ser "APROBADO" o "RECHAZADO".',
      });
    }

    if (!justificacion || justificacion.trim().length < 15) {
      return res.status(400).json({
        ok: false,
        msg: 'Se requiere una justificación técnica de al menos 15 caracteres.',
      });
    }

    const propuesta = await Propuestas.findByPk(id);

    if (!propuesta) {
      return res.status(404).json({ ok: false, msg: 'Propuesta no encontrada.' });
    }

    if (propuesta.estado !== 'PENDIENTE') {
      return res.status(409).json({
        ok: false,
        msg: `La propuesta ya fue dictaminada previamente con estado: ${propuesta.estado}.`,
      });
    }

    // Actualización de estado y firma del revisor
    propuesta.estado = decision;
    propuesta.citJustificacion = justificacion.trim();
    propuesta.citRevisorId = citRevisorId;
    propuesta.citFechaRevision = new Date();

    await propuesta.save();

    return res.status(200).json({
      ok: true,
      msg: `Propuesta evaluada exitosamente como ${decision}.`,
      data: propuesta,
    });
  } catch (error) {
    console.error('Error en dictaminarPropuestaCIT:', error);
    return res.status(500).json({ ok: false, msg: 'Error al procesar el dictamen.' });
  }
};
