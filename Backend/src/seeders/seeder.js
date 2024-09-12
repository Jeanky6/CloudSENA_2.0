const bcrypt = require("bcrypt");
const loginSchema = require("../database/models/login.model");
const rolSchema = require("../database/models/roles.model");
const connect = require("../libs/mongoose");

const crearRoles = async () => {
  const count = await rolSchema.estimatedDocumentCount();
  if (count > 0) return;

  const roles = ["aprendiz", "gestor", "admin", "superadmin", "user"];

  for (const roleName of roles) {
    const role = new rolSchema({ name: roleName });
    await role.save();
  }
  console.log("Roles creados exitosamente");
};

const crearAdmin = async () => {
  try {
    await crearRoles();

    const usuarioAdmin = await loginSchema.findOne({
      email: "admin@example.com",
    });
    if (!usuarioAdmin) {
      const contraseñaHashed = await bcrypt.hash("adminpassword", 8);

      const rolAdmin = await rolSchema.findOne({ name: "admin" });

      const nuevoAdmin = new loginSchema({
        email: "admin@example.com",
        password: contraseñaHashed,
        nombre: "Usuario Admin",
        documento: "123456789",
        ficha: [],
        gestor: [],
        rol: [rolAdmin._id],
      });

      await nuevoAdmin.save();
      console.log("Usuario administrador creado exitosamente");
    } else {
      console.log("El usuario administrador ya existe");
    }
  } catch (error) {
    console.error("Error al crear el usuario administrador:", error);
  }
};

crearAdmin();
