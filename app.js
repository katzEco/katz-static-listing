const exp = require('express')
const serve = require('serve-index')

require('dotenv').config()

const ngrok = require('@ngrok/ngrok')
;(async function () {
  // Establish connectivity
  const listener = await ngrok.connect({
    addr: process.env.PORT,
    authtoken_from_env: true,
  })

  // Output ngrok url to console
  console.log(`Ingress established at: ${listener.url()}`)
})()

const app = exp()

let static

if (!process.env.STATIC_BASE) {
  static = process.env.STATIC_PATH
} else {
  static = `${__dirname}${process.env.STATIC_PATH}`
}

app.use(exp.static(static))

app.use(
  serve(static, __dirname, {
    template: `${__dirname}/template.html`,
    icons: true,
  })
)

app.listen(process.env.PORT, () => {
  console.log('server started @ http://localhost:' + process.env.PORT)
})
