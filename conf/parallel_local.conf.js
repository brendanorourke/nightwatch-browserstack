module.exports = (function(settings) {

  const selenium = {
    'start_process': false,
    'host': 'hub-cloud.browserstack.com',
    'port': 80
  }

  const commonCapabilities = {
    'build': 'nightwatch-browserstack',
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'acceptSslCerts': true,
    'browserstack.debug': true,
    'browserstack.local': true
  }

  const testWorkers = {
    'enabled': false,
    'workers': 'auto'
  }

  const testSettings = {
    default: {},
    chrome: {
      desiredCapabilities: {
        browser: 'chrome',
        browserName: 'Chrome',
        browser_version: '56.0',
        os: 'Windows',
        os_version: '7',
        resolution: '1024x768'
      }
    },
    firefox: {
      desiredCapabilities: {
        browser: 'firefox',
        browserName: 'Firefox',
        browser_version: '51.0',
        os: 'Windows',
        os_version: '7',
        resolution: '1024x768'
      }
    },
    safari: {
      desiredCapabilities: {
        browser: 'safari',
        browserName: 'Safari',
        browser_version: '9.1',
        os: 'OS X',
        os_version: 'El Capitan',
        resolution: '1024x768'
      }
    },
    ie: {
      desiredCapabilities: {
        browser: 'internet explorer',
        browserName: 'IE',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '7',
        resolution: '1024x768'
      }
    }
  }

  for (const profile in testSettings) {
    testSettings[profile]['selenium_host'] = selenium.host
    testSettings[profile]['selenium_port'] = selenium.port
    testSettings[profile]['desiredCapabilities'] = testSettings[profile]['desiredCapabilities'] || {}
    for (const capability in commonCapabilities) {
      testSettings[profile]['desiredCapabilities'][capability] = testSettings[profile]['desiredCapabilities'][capability] || commonCapabilities[capability]
    }
  }

  settings.selenium = selenium
  settings.test_workers = testWorkers
  settings.test_settings = testSettings
  return settings

})(require('../nightwatch.json'))
