import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function formatearFecha(fecha) {
  if (!fecha) return '—'

  // Asegura que tenga formato ISO completo
  const iso = fecha.includes('Z') ? fecha : fecha + 'Z'
  const f = new Date(iso)

  return isNaN(f) ? 'Fecha inválida' : f.toLocaleDateString()
}

export default function Home() {
  const [estudiante, setEstudiantes] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('estudiante').select('*')
      console.log('DATA:', data);
      console.log('ERROR:', error);
      console.log('VERSION APP 1');
      if (error) console.error('Error:', error)
      else setEstudiantes(data)
    }
    fetchData()
  }, [])

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Lista de Estudiantes</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Fecha Nacimiento</th>
          </tr>
        </thead>
        <tbody>
          {estudiante.map(c => (            
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombres}</td>
              <td>{c.apellidos}</td>
              <td>{formatearFecha(c.fecha_Nacimiento)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )

}
















