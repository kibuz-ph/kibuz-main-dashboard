import React, { useState } from "react";

export default function ResidentialManager() {

  const [towers, setTowers] = useState([
    {
      id: 1,
      name: "Torre 1",
      description: "Principal",
      apartments: [
        {
          id: 1,
          floor: 1,
          reference: "101",
          users: []
        }
      ]
    }
  ]);

  const [selectedTowerId, setSelectedTowerId] = useState(1);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedApartmentId, setSelectedApartmentId] = useState(null);

  const [modal, setModal] = useState(null);

  const [towerForm, setTowerForm] = useState({
    name: "",
    description: ""
  });

  const [apartmentForm, setApartmentForm] = useState({
    floor: "",
    reference: ""
  });

  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    category: "Propietario"
  });

  const selectedTower = towers.find(t => t.id === selectedTowerId);

  const floors = [
    ...new Set(selectedTower?.apartments.map(a => a.floor))
  ].sort();

  const apartments = selectedTower?.apartments.filter(
    a => a.floor === selectedFloor
  );

  const selectedApartment = apartments?.find(
    a => a.id === selectedApartmentId
  );

  function addTower() {

    setTowers([
      ...towers,
      {
        id: Date.now(),
        name: towerForm.name,
        description: towerForm.description,
        apartments: []
      }
    ]);

    setTowerForm({ name: "", description: "" });
    setModal(null);
  }

  function addApartment() {

    setTowers(
      towers.map(t => {
        if (t.id !== selectedTowerId) return t;

        return {
          ...t,
          apartments: [
            ...t.apartments,
            {
              id: Date.now(),
              floor: Number(apartmentForm.floor),
              reference: apartmentForm.reference,
              users: []
            }
          ]
        };
      })
    );

    setApartmentForm({ floor: "", reference: "" });
    setModal(null);
  }

  function addUser() {

    setTowers(
      towers.map(t => {
        if (t.id !== selectedTowerId) return t;

        return {
          ...t,
          apartments: t.apartments.map(a => {
            if (a.id !== selectedApartmentId) return a;

            return {
              ...a,
              users: [
                ...a.users,
                {
                  id: Date.now(),
                  ...userForm
                }
              ]
            };
          })
        };
      })
    );

    setUserForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      category: "Propietario"
    });

    setModal(null);
  }

  return (
    <div style={{display:"flex",gap:20,padding:20}}>

      {/* TORRES */}
      <div style={{flex:1,border:"1px solid #ddd",padding:20}}>

        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3>Torres</h3>
          <button onClick={()=>setModal("tower")}>+ Torre</button>
        </div>

        <div style={{display:"flex",gap:10,marginTop:10}}>
          {towers.map(t=>(
            <div
              key={t.id}
              onClick={()=>{
                setSelectedTowerId(t.id)
                setSelectedFloor(null)
                setSelectedApartmentId(null)
              }}
              style={{
                padding:"6px 12px",
                cursor:"pointer",
                background:t.id===selectedTowerId?"orange":"#eee"
              }}
            >
              {t.name}
            </div>
          ))}
        </div>

        <h4 style={{marginTop:20}}>Pisos</h4>

        {floors.map(f=>(
          <div
            key={f}
            onClick={()=>{
              setSelectedFloor(f)
              setSelectedApartmentId(null)
            }}
            style={{
              padding:8,
              cursor:"pointer",
              background:f===selectedFloor?"#dde8ff":"#f5f5f5",
              marginTop:4
            }}
          >
            Piso {f}
          </div>
        ))}

      </div>

      {/* APARTAMENTOS */}
      <div style={{flex:1,border:"1px solid #ddd",padding:20}}>

        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3>Apartamentos</h3>
          {selectedTower && (
            <button onClick={()=>setModal("apartment")}>
              + Apartamento
            </button>
          )}
        </div>

        {apartments?.map(a=>(
          <div
            key={a.id}
            onClick={()=>setSelectedApartmentId(a.id)}
            style={{
              padding:10,
              border:"1px solid #eee",
              marginTop:10,
              cursor:"pointer",
              background:a.id===selectedApartmentId?"#e9f0ff":"white"
            }}
          >
            Apt {a.reference}
          </div>
        ))}

      </div>

      {/* USUARIOS */}
      <div style={{flex:1,border:"1px solid #ddd",padding:20}}>

        <div style={{display:"flex",justifyContent:"space-between"}}>
          <h3>Usuarios</h3>
          {selectedApartment && (
            <button onClick={()=>setModal("user")}>
              + Usuario
            </button>
          )}
        </div>

        {selectedApartment?.users.map(u=>(
          <div
            key={u.id}
            style={{
              padding:10,
              border:"1px solid #eee",
              marginTop:8
            }}
          >
            <b>{u.first_name} {u.last_name}</b>
            <div>{u.category}</div>
            <div>{u.email}</div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {modal && (
        <div style={{
          position:"fixed",
          top:0,left:0,right:0,bottom:0,
          background:"rgba(0,0,0,0.4)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}>
          <div style={{background:"white",padding:20,width:300}}>

            {modal==="tower" && (
              <>
                <h3>Crear Torre</h3>

                <input
                  placeholder="Nombre"
                  value={towerForm.name}
                  onChange={(e)=>setTowerForm({...towerForm,name:e.target.value})}
                />

                <input
                  placeholder="Descripción"
                  value={towerForm.description}
                  onChange={(e)=>setTowerForm({...towerForm,description:e.target.value})}
                />

                <button onClick={addTower}>Guardar</button>
              </>
            )}

            {modal==="apartment" && (
              <>
                <h3>Crear Apartamento</h3>

                <input
                  placeholder="Piso"
                  value={apartmentForm.floor}
                  onChange={(e)=>setApartmentForm({...apartmentForm,floor:e.target.value})}
                />

                <input
                  placeholder="Referencia"
                  value={apartmentForm.reference}
                  onChange={(e)=>setApartmentForm({...apartmentForm,reference:e.target.value})}
                />

                <button onClick={addApartment}>Guardar</button>
              </>
            )}

            {modal==="user" && (
              <>
                <h3>Crear Usuario</h3>

                <input
                  placeholder="Nombre"
                  value={userForm.first_name}
                  onChange={(e)=>setUserForm({...userForm,first_name:e.target.value})}
                />

                <input
                  placeholder="Apellido"
                  value={userForm.last_name}
                  onChange={(e)=>setUserForm({...userForm,last_name:e.target.value})}
                />

                <input
                  placeholder="Email"
                  value={userForm.email}
                  onChange={(e)=>setUserForm({...userForm,email:e.target.value})}
                />

                <input
                  placeholder="Teléfono"
                  value={userForm.phone}
                  onChange={(e)=>setUserForm({...userForm,phone:e.target.value})}
                />

                <select
                  value={userForm.category}
                  onChange={(e)=>setUserForm({...userForm,category:e.target.value})}
                >
                  <option>Propietario</option>
                  <option>Residente</option>
                  <option>Arrendatario</option>
                </select>

                <button onClick={addUser}>Guardar</button>
              </>
            )}

            <button
              style={{marginTop:10}}
              onClick={()=>setModal(null)}
            >
              Cerrar
            </button>

          </div>
        </div>
      )}

    </div>
  );
}