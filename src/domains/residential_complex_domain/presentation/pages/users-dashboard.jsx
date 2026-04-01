import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const USERS = [
  { id: 1, name: "Valentina Torres", email: "v.torres@empresa.co", role: "Admin", status: "Activo", joined: "12 Ene 2024", avatar: "https://i.pravatar.cc/40?img=1", department: "Tecnología" },
  { id: 2, name: "Camilo Ríos", email: "c.rios@empresa.co", role: "Editor", status: "Activo", joined: "8 Feb 2024", avatar: "https://i.pravatar.cc/40?img=3", department: "Marketing" },
  { id: 3, name: "Daniela Mejía", email: "d.mejia@empresa.co", role: "Viewer", status: "Inactivo", joined: "3 Mar 2024", avatar: "https://i.pravatar.cc/40?img=5", department: "Finanzas" },
  { id: 4, name: "Sebastián Gómez", email: "s.gomez@empresa.co", role: "Editor", status: "Activo", joined: "20 Mar 2024", avatar: "https://i.pravatar.cc/40?img=7", department: "Ventas" },
  { id: 5, name: "Laura Castillo", email: "l.castillo@empresa.co", role: "Admin", status: "Pendiente", joined: "1 Abr 2024", avatar: "https://i.pravatar.cc/40?img=9", department: "RRHH" },
  { id: 6, name: "Andrés Muñoz", email: "a.munoz@empresa.co", role: "Viewer", status: "Activo", joined: "15 Abr 2024", avatar: "https://i.pravatar.cc/40?img=11", department: "Tecnología" },
  { id: 7, name: "Isabella Ramírez", email: "i.ramirez@empresa.co", role: "Editor", status: "Activo", joined: "2 May 2024", avatar: "https://i.pravatar.cc/40?img=13", department: "Marketing" },
  { id: 8, name: "Felipe Herrera", email: "f.herrera@empresa.co", role: "Viewer", status: "Inactivo", joined: "18 May 2024", avatar: "https://i.pravatar.cc/40?img=15", department: "Operaciones" },
];

const STATUS_STYLES = {
  Activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactivo: "bg-slate-100 text-slate-500 border-slate-200",
  Pendiente: "bg-amber-50 text-amber-700 border-amber-200",
};

const STATUS_DOT = {
  Activo: "bg-emerald-500",
  Inactivo: "bg-slate-400",
  Pendiente: "bg-amber-400",
};

const ROLE_STYLES = {
  Admin: "bg-violet-50 text-violet-700 border-violet-200",
  Editor: "bg-blue-50 text-blue-700 border-blue-200",
  Viewer: "bg-slate-50 text-slate-600 border-slate-200",
};

const stats = [
  { label: "Total Usuarios", value: "8", sub: "+2 este mes", icon: "👥" },
  { label: "Activos", value: "5", sub: "62.5% del total", icon: "✅" },
  { label: "Administradores", value: "2", sub: "Acceso completo", icon: "🔐" },
  { label: "Pendientes", value: "1", sub: "Requiere acción", icon: "⏳" },
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function UsersDashboard() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected] = useState([]);

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || u.status === statusFilter;
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchStatus && matchRole;
  });

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((u) => u.id));

  return (
    <div className="min-h-screen bg-[#f8f8f6] font-sans">
      {/* Topbar */}
      <header className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">U</span>
          </div>
          <span className="font-semibold text-slate-800 tracking-tight text-sm hidden sm:block">UserPanel</span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="text-xs hidden sm:flex gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-50">
            <span>↓</span> Exportar
          </Button>
          <Button size="sm" className="text-xs bg-slate-900 hover:bg-slate-800 text-white gap-1.5">
            <span>+</span> Nuevo usuario
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Usuarios</h1>
          <p className="text-sm text-slate-400 mt-0.5">Gestiona el acceso y los roles de tu equipo</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <Card key={s.label} className="border-slate-100 shadow-none bg-white rounded-xl">
              <CardContent className="pt-5 pb-4 px-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{s.label}</p>
                    <p className="text-3xl font-bold text-slate-900 mt-1 leading-none">{s.value}</p>
                    <p className="text-xs text-slate-400 mt-1.5">{s.sub}</p>
                  </div>
                  <span className="text-2xl mt-0.5">{s.icon}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtros */}
        <Card className="border-slate-100 shadow-none bg-white rounded-xl">
          <CardContent className="px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                <Input
                  placeholder="Buscar por nombre, email o área..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-slate-50 border-slate-200 text-sm focus:bg-white transition-colors"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-slate-50 border-slate-200 text-sm">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-36 bg-slate-50 border-slate-200 text-sm">
                  <SelectValue placeholder="Rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los roles</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selected.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                <span className="text-xs text-slate-500">{selected.length} seleccionados</span>
                <Button size="sm" variant="outline" className="text-xs h-7 border-red-200 text-red-600 hover:bg-red-50">Eliminar</Button>
                <Button size="sm" variant="outline" className="text-xs h-7 border-slate-200 text-slate-600 hover:bg-slate-50">Cambiar rol</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tabla — desktop */}
        <Card className="border-slate-100 shadow-none bg-white rounded-xl overflow-hidden hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-slate-100">
                <TableHead className="w-10 pl-5">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 accent-slate-900 cursor-pointer"
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                  />
                </TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Usuario</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Área</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rol</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Estado</TableHead>
                <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Ingresó</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 text-slate-400 text-sm">
                    Sin resultados para tu búsqueda
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow
                    key={user.id}
                    className={`border-slate-50 hover:bg-slate-50/60 transition-colors ${selected.includes(user.id) ? "bg-slate-50" : ""}`}
                  >
                    <TableCell className="pl-5">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 accent-slate-900 cursor-pointer"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-slate-100">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="text-xs bg-slate-100 text-slate-600">{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-slate-800 leading-tight">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">{user.department}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${ROLE_STYLES[user.role]}`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[user.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-400">{user.joined}</TableCell>
                    <TableCell className="pr-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                            <span className="text-base leading-none">⋯</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 text-sm">
                          <DropdownMenuLabel className="text-xs text-slate-400">Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Editar usuario</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Cambiar rol</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="px-6 py-3 border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              {filtered.length} de {USERS.length} usuarios
            </p>
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-xs border-slate-200 text-slate-500" disabled>← Anterior</Button>
              <Button size="sm" variant="outline" className="h-7 text-xs border-slate-200 text-slate-500" disabled>Siguiente →</Button>
            </div>
          </div>
        </Card>

        {/* Cards — mobile */}
        <div className="md:hidden space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-12 text-slate-400 text-sm">Sin resultados para tu búsqueda</p>
          ) : (
            filtered.map((user) => (
              <Card key={user.id} className="border-slate-100 shadow-none bg-white rounded-xl">
                <CardContent className="px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-10 w-10 border border-slate-100 shrink-0">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs bg-slate-100 text-slate-600">{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{user.department}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-slate-400">
                          <span className="text-base">⋯</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 text-sm">
                        <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_STYLES[user.status]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />
                      {user.status}
                    </span>
                    <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full border ${ROLE_STYLES[user.role]}`}>
                      {user.role}
                    </span>
                    <span className="text-xs text-slate-400 ml-auto">{user.joined}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
          <p className="text-center text-xs text-slate-400 pt-2">{filtered.length} de {USERS.length} usuarios</p>
        </div>
      </main>
    </div>
  );
}
