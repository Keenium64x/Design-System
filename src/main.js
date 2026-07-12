import "../node_modules/frappe-gantt/dist/frappe-gantt.css"
import "./styles/index.css"

const renderBootstrapError = (error) => {
  const appElement = document.querySelector("#app")
  if (!appElement) return

  appElement.innerHTML = `
    <main class="bootstrap-error">
      <p>Catalogue bootstrap failed</p>
      <h1>${error instanceof Error ? error.message : String(error)}</h1>
      <pre>${error instanceof Error ? error.stack ?? "" : ""}</pre>
    </main>
  `
}

window.addEventListener("error", (event) => renderBootstrapError(event.error ?? event.message))
window.addEventListener("unhandledrejection", (event) => renderBootstrapError(event.reason))

Promise.all([import("vue"), import("./App.vue")])
  .then(([{ createApp }, { default: App }]) => createApp(App).mount("#app"))
  .catch(renderBootstrapError)
