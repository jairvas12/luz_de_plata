"use strict";
function setError(input, message) {
  if (!input) return false;
  input.classList.toggle("invalido", !!message);
  input.classList.toggle("valido", !message && !!input.value);
  const box = input.closest(".campo")?.querySelector(".error-campo");
  if (box) box.textContent = message || "";
  return !message;
}
function validarEmail(input, required = true) {
  const v = input.value.trim();
  if (required && !v) return setError(input, "El correo es requerido.");
  if (v.length > 100) return setError(input, "Máximo 100 caracteres.");
  if (v && !LP.allowedEmail(v)) return setError(input, "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.");
  return setError(input, "");
}
function validarPassword(input, required = true) {
  const v = input.value;
  if (required && !v) return setError(input, "La contraseña es requerida.");
  if (v && (v.length < 4 || v.length > 10)) return setError(input, "Debe tener entre 4 y 10 caracteres.");
  return setError(input, "");
}
function validarTexto(input, {
  required = true, max = 100, label = "Este campo"
} = {
}) {
  const v = input.value.trim();
  if (required && !v) return setError(input, `${label} es requerido.`);
  if (max && v.length > max) return setError(input, `Máximo ${max} caracteres.`);
  return setError(input, "");
}
function validarNumero(input, {
  required = true, min = 0, integer = false, label = "Valor"
} = {
}) {
  const raw = input.value;
  if (required && raw === "") return setError(input, `${label} es requerido.`);
  if (raw !== "" && !Number.isFinite(Number(raw))) return setError(input, `${label} debe ser numérico.`);
  const n = Number(raw);
  if (raw !== "" && n < min) return setError(input, `${label} debe ser mayor o igual a ${min}.`);
  if (raw !== "" && integer && !Number.isInteger(n)) return setError(input, `${label} debe ser un número entero.`);
  return setError(input, "");
}
function limpiarRun(run) {
  return (run || "").replace(/[.\-]/g, "").toUpperCase();
}
function runValido(run) {
  const r = limpiarRun(run);
  if (!/^[0-9]{6,8}[0-9K]$/.test(r)) return false;
  const body = r.slice(0, -1), dv = r.slice(-1);
  let sum = 0, m = 2;
  for (let i = body.length - 1;
  i >= 0;
  i--) {
    sum += Number(body[i]) * m;
    m = m === 7 ? 2 : m + 1;
  }
  const res = 11 - (sum % 11);
  const calc = res === 11 ? "0" : res === 10 ? "K" : String(res);
  return calc === dv;
}
function validarRun(input) {
  const r = limpiarRun(input.value);
  input.value = r;
  if (!r) return setError(input, "El RUN es requerido.");
  if (r.length < 7 || r.length > 9) return setError(input, "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion.");
  if (!runValido(r)) return setError(input, "El RUN no es válido.");
  return setError(input, "");
}
function validarCampoAutomatico(el) {
  if (!el || el.type === "checkbox" || el.type === "submit" || el.type === "button") return true;
  const name = el.name || "";
  const required = el.required;
  if (name === "run") return validarRun(el);
  if (name === "email") return validarEmail(el, required);
  if (name === "password") return validarPassword(el, required);
  if (name === "confirmPassword") {
    const pass = el.form?.querySelector('[name="password"]');
    if (required && !el.value) return setError(el, "Debes confirmar la contraseña.");
    if (el.value && pass && el.value !== pass.value) return setError(el, "Las contraseñas no coinciden.");
    return setError(el, "");
  }
  if (["price", "stock", "criticalStock"].includes(name)) {
    return validarNumero(el, {
      required, min: Number(el.min || 0), integer: name !== "price", label: name === "price" ? "Precio" : name === "stock" ? "Stock" : "Stock crítico"
    });
  }
  if (name === "code") {
    const ok = validarTexto(el, {
      required: true, max: null, label: "Código"
    });
    if (ok && el.value.trim().length < 3) return setError(el, "El código requiere mínimo 3 caracteres.");
    return ok;
  }
  const label = (el.closest(".campo")?.querySelector("label")?.textContent || "Campo").replace("*", "").trim();
  const max = el.maxLength > 0 ? el.maxLength : null;
  return validarTexto(el, {
    required, max, label
  });
}
function attachRealtime(form) {
  form.querySelectorAll("input,select,textarea").forEach(el => {
    el.addEventListener("blur", () => validarCampoAutomatico(el));
    el.addEventListener("change", () => validarCampoAutomatico(el));
    el.addEventListener("input", () => {
      if (el.classList.contains("invalido")) validarCampoAutomatico(el);
    });
  });
}
window.Validador = {
  setError, validarEmail, validarPassword, validarTexto, validarNumero, validarRun, runValido, validarCampoAutomatico, attachRealtime
};
