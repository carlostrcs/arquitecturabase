const modelo = require("./modelo.js");

describe('El sistema', function() {
  let sistema;
  beforeEach(function() {
  sistema=new modelo.Sistema();
  });

  it('inicialmente no hay usuarios', function() {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
  });

  it('agregar usuario', ()=> {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(1);
    expect(usuarioActivo.activo).toBe(true)
  });

  it('usuario activo', ()=> {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(1);
    expect(usuarioActivo.activo).toBe(true)
  });

  it('eliminar usuario', ()=> {
    let numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
    sistema.agregarUsuario("Pepe");
    let usuarioActivo = sistema.usuarioActivo("Pepe");
    numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(1);
    expect(usuarioActivo.activo).toBe(true)
    sistema.eliminarUsuario("Pepe");
    usuarioActivo = sistema.usuarioActivo("Pepe");
    numeroUsuarios = sistema.numeroUsuarios();
    expect(numeroUsuarios.num).toEqual(0);
    expect(usuarioActivo.activo).toBe(false)
  });
    
  it('obtener usuarios', ()=>{
    expect(sistema.usuarios).toBe(sistema.obtenerUsuarios());
  });

})