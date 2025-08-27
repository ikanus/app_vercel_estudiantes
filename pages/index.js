import { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { supabase } from '../lib/supabase'

function formatearFecha(fecha) {
  if (!fecha) return '—'

  // Asegura que tenga formato ISO completo
  const iso = fecha.includes('T') && !fecha.includes('Z') ? fecha + 'Z' : fecha
  const timestamp = Date.parse(iso)

  if (isNaN(timestamp)) return 'Fecha inválida'

  const f = new Date(timestamp)
  return f.toLocaleDateString()
}

function formatSupabaseDateWithFns(isoString) {
      return format(new Date(isoString), 'MMMM d, yyyy');
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
    console.log('Renderizando tabla...')
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
          {estudiante.map(c => {
            console.log('Tipo:', typeof c.fecha_Nacimiento, '| Valor:', c.fecha_Nacimiento)

            return (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombres}</td>
              <td>{c.apellidos}</td>
              <td>{formatSupabaseDateWithFns(c.fecha_Nacimiento)}</td>
            </tr>  
            )
          }
           )}
        </tbody>
      </table>
    </main>
  )

}




