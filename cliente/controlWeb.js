function ControlWeb(){
    this.mostrarAgregarUsuario = ()=>{
        let cadena = `
        <div id="mAU" class="form-group">
        <label for="usr">Email:</label>
        <input type="text" class="form-control" id="email" placeholder="Introduce un email">
        <button id="btnAU" type="submit" class="btn btn-primary mt-2">Submit</button>
        </div>
        `;
        $("#au").append(cadena);
        $("#btnAU").on("click",function(){ 
            let email = $("#email").val();
            rest.agregarUsuario(email);
            $("#mAU").remove();

        })
    }
}
