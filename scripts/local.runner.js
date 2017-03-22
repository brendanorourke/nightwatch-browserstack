#!/usr/bin/env node

const Nightwatch = require('nightwatch')
const browserstack = require('browserstack-local')
let bsLocal

const startLocalBrowserstack = (localBrowserstackInstance) => {
  localBrowserstackInstance.start({ 'key': process.env.BROWSERSTACK_ACCESS_KEY, 'force': true }, (error) => {
    if (error) {
      throw error
    } else {
      Nightwatch.cli( (argv) => {
        Nightwatch.CliRunner(argv)
          .setup(null, () => {
            localBrowserstackInstance.stop( () => {} )
          })
          .runTests(() => {
            localBrowserstackInstance.stop( () => {} )
          })
      })
    }
  })
}

try {
  process.mainModule.filename = './node_modules/.bin/nightwatch'
  Nightwatch.bs_local = bsLocal = new browserstack.Local()
  startLocalBrowserstack(bsLocal)
} catch (err) {
  console.log('There was an error while starting the test runner:\n\n')
  process.stderr.write(err.stack + '\n')
  process.exit(2)
}
