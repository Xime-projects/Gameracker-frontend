import React, { useEffect, useState } from "react";
import { getGames } from "../services/gamesAPI";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Estadisticas(){
  const [games, setGames] = useState([]);

  useEffect(()=>{ (async ()=>{ try{ const data = await getGames(1,1000); // cargar todo para estadisticas
    setGames(data.games || data);
  }catch(e){console.error(e);} })(); }, []);

  const grouped = ["Jugando","Completado","Pendiente","Abandonado"].map(status => ({
    estado: status,
    count: (games || []).filter(g => g.estado === status).length
  }));

  const hours = (games || [])
    .map(g => ({ name: g.nombre, horas: g.horasJugadas || 0 }))
    .sort((a,b)=>b.horas - a.horas)
    .slice(0,10);

  return (
    <div className="container">
      <h3>Estadísticas</h3>
      <div style={{height:300}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={grouped}>
            <XAxis dataKey="estado" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h4>Top horas jugadas</h4>
      <div>
        {hours.map(h => <div key={h.name}>{h.name} — {h.horas} hrs</div>)}
      </div>
    </div>
  );
}