angular.module('zenith').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/dist/templates/accordion/accordion.template.html',
    "<div class=\"accordion\">\n" +
    "    <a href=\"\" ng-click=\"ctrl.toggleAccordion()\" class=\"accordion-title\">\n" +
    "        <header ng-bind=\"ctrl.title\" class=\"accordion-header\"></header>\n" +
    "        <span class=\"accordion-icon\">\n" +
    "        \t<svg class=\"icon m-size-16 m-va-text-top\" >\n" +
    "                <use xlink:href=\"#chevron-down-16\" ng-hide=\"ctrl.show\" />\n" +
    "                <use xlink:href=\"#chevron-up-16\"   ng-show=\"ctrl.show\" />\n" +
    "            </svg>\n" +
    "        </span>\n" +
    "    </a>\n" +
    "    <div class=\"accordion-body\" ng-show=\"ctrl.show\" ng-transclude></div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/accordion/tests/reports/1-.-accordion.gspec.html',
    "<html>\n" +
    "    <head>\n" +
    "        <title>Galen Reports</title>\n" +
    "        <meta charset=\"utf-8\" />\n" +
    "        <link rel=\"stylesheet\" type=\"text/css\" href=\"report.css\"></link>\n" +
    "        <script src=\"jquery-1.11.2.min.js\"></script>\n" +
    "        <script src=\"handlebars-v2.0.0.js\"></script>\n" +
    "        <script src=\"galen-report.js\"></script>\n" +
    "        <script>\n" +
    "var reportData = {\r" +
    "\n" +
    "  \"testId\" : \"1-.-accordion.gspec\",\r" +
    "\n" +
    "  \"name\" : \".\\\\accordion.gspec\",\r" +
    "\n" +
    "  \"report\" : {\r" +
    "\n" +
    "    \"nodes\" : [ {\r" +
    "\n" +
    "      \"name\" : \"Simple check\",\r" +
    "\n" +
    "      \"status\" : \"info\",\r" +
    "\n" +
    "      \"nodes\" : [ {\r" +
    "\n" +
    "        \"name\" : \"WebDriverException: Failed to connect to binary FirefoxBinary(C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\firefox.exe) on port 7055; process output follows: \\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\nBuild info: version: 'unknown', revision: 'unknown', time: 'unknown'\\nSystem info: host: 'gsvechnikov2-spb', ip: '10.9.3.107', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_91'\\nDriver info: driver.version: FirefoxDriver\",\r" +
    "\n" +
    "        \"status\" : \"error\",\r" +
    "\n" +
    "        \"time\" : 1480676645424,\r" +
    "\n" +
    "        \"stacktrace\" : \"org.openqa.selenium.WebDriverException: Failed to connect to binary FirefoxBinary(C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\firefox.exe) on port 7055; process output follows: \\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\nBuild info: version: 'unknown', revision: 'unknown', time: 'unknown'\\nSystem info: host: 'gsvechnikov2-spb', ip: '10.9.3.107', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_91'\\nDriver info: driver.version: FirefoxDriver\\r\\n\\tat org.openqa.selenium.firefox.internal.NewProfileExtensionConnection.start(NewProfileExtensionConnection.java:125)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.startClient(FirefoxDriver.java:271)\\r\\n\\tat org.openqa.selenium.remote.RemoteWebDriver.<init>(RemoteWebDriver.java:119)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:216)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:211)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:128)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.getDriver(SeleniumBrowserFactory.java:95)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.createLocalBrowser(SeleniumBrowserFactory.java:89)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.openBrowser(SeleniumBrowserFactory.java:65)\\r\\n\\tat com.galenframework.runner.GalenBasicTestRunner.runTest(GalenBasicTestRunner.java:73)\\r\\n\\tat com.galenframework.tests.GalenBasicTest.execute(GalenBasicTest.java:55)\\r\\n\\tat com.galenframework.TestRunnable.runTest(TestRunnable.java:75)\\r\\n\\tat com.galenframework.TestRunnable.run(TestRunnable.java:101)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)\\r\\n\\tat java.lang.Thread.run(Unknown Source)\\r\\nCaused by: org.openqa.selenium.firefox.NotConnectedException: Unable to connect to host 127.0.0.1 on port 7055 after 45000 ms. Firefox console output:\\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\r\\n\\tat org.openqa.selenium.firefox.internal.NewProfileExtensionConnection.start(NewProfileExtensionConnection.java:113)\\r\\n\\t... 15 more\\r\\n\",\r" +
    "\n" +
    "        \"type\" : \"node\"\r" +
    "\n" +
    "      } ],\r" +
    "\n" +
    "      \"time\" : 1480676599251,\r" +
    "\n" +
    "      \"type\" : \"node\"\r" +
    "\n" +
    "    } ]\r" +
    "\n" +
    "  }\r" +
    "\n" +
    "};\n" +
    "        </script>\n" +
    "        <script>\n" +
    "\n" +
    "            $(function () {\n" +
    "                var galenReport = createGalenReport();\n" +
    "                galenReport.render(\"main\", reportData);\n" +
    "            });\n" +
    "        </script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "        <script id=\"report-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <ul class=\"report-nodes\">\n" +
    "            {{#each report.nodes}}\n" +
    "                {{renderNode this}}\n" +
    "            {{/each}}\n" +
    "            </ul>\n" +
    "        </script>\n" +
    "        <script id=\"report-node-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "                <span class=\"report-time\">{{formatReportTime time}}</span>\n" +
    "                <a class=\"expand-link node-expand-button node-status-{{status}} contains-children-{{hasChildElements nodes}} collapsed\" href=\"#\">{{status}}</a>\n" +
    "                <div class=\"node-name node-status-{{status}}\">{{name}}</div>\n" +
    "                {{#if extras}}\n" +
    "                    {{renderNodeExtras extras}}\n" +
    "                {{/if}}\n" +
    "                {{#if stacktrace}}\n" +
    "                    <div class=\"stacktrace\">{{stacktrace}}</div>\n" +
    "                {{/if}}\n" +
    "                {{#if attachments}}\n" +
    "                    <ul class=\"report-node-attachments\">\n" +
    "                        {{#each attachments}}\n" +
    "                            <li>\n" +
    "                                <a class=\"icon-sprite-before node-attachment\" href=\"{{this}}\">{{this}}</a>\n" +
    "                            </li>\n" +
    "                        {{/each}}\n" +
    "                    </ul>\n" +
    "                {{/if}}\n" +
    "                <div class=\"node-details expand-container\">\n" +
    "                    {{#if nodes}}\n" +
    "                        <ul class=\"report-nodes\">\n" +
    "                            {{#each nodes}}\n" +
    "                                {{renderNode this}}\n" +
    "                            {{/each}}\n" +
    "                        </ul>\n" +
    "                    {{/if}}\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </script>\n" +
    "        <script id=\"report-node-text-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "                <div class=\"node-simple-text\">\n" +
    "                    {{name}}\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </script>\n" +
    "        <script id=\"report-layout-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "                <span class=\"report-time\">{{formatReportTime time}}</span>\n" +
    "                <a class=\"expand-link node-expand-button node-status-label node-status-info contains-children-true collapsed\" href=\"#\">LAYOUT</a>\n" +
    "                <div class=\"node-name\">{{name}}</div>\n" +
    "                <div class=\"node-horizontal-menu\" data-layout-id=\"{{layoutId}}\"><a class=\"layout-heatmap-link\" href=\"#\">Heat Map</a></div>\n" +
    "                <div class=\"node-details expand-container\">\n" +
    "                    {{renderSublayout this}}\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </script>\n" +
    "        <script id=\"report-layout-sublayout-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <div class=\"layout-report\" data-layout-id=\"{{layoutId}}\" {{#if screenshot}}data-screenshot=\"{{screenshot}}\"{{/if}}>\n" +
    "                <ul class=\"layout-sections\">\n" +
    "                    {{#each sections}}\n" +
    "                        {{renderLayoutSection this}}\n" +
    "                    {{/each}}\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "        <script id=\"report-layout-section-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "                <a class=\"layout-section icon-sprite-before expand-link contains-children-true\" href=\"#\" title=\"{{place.filePath}}#{{place.lineNumber}}\">{{name}}</a>\n" +
    "                <div class=\"layout-details expand-container\">\n" +
    "                    {{#if sections}}\n" +
    "                        <ul class=\"layout-sections\">\n" +
    "                        {{#each sections}}\n" +
    "                            {{renderLayoutSection this}}\n" +
    "                        {{/each}}\n" +
    "                        </ul>\n" +
    "                    {{/if}}\n" +
    "                    {{#if objects}}\n" +
    "                        <ul class=\"layout-objects\">\n" +
    "                            {{#each objects}}\n" +
    "                                {{renderLayoutObject this}}\n" +
    "                            {{/each}}\n" +
    "                        </ul>\n" +
    "                    {{/if}}\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </script>\n" +
    "\n" +
    "        <script id=\"report-layout-object-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "                <a class=\"layout-object icon-sprite-before expand-link contains-children-true\" href=\"#\">{{name}}</a>\n" +
    "                <ul class=\"layout-checks expand-container\">\n" +
    "                    {{#each specs}}\n" +
    "                        {{renderLayoutCheck this}}\n" +
    "                    {{/each}}\n" +
    "                    {{#each specGroups}}\n" +
    "                    <li>\n" +
    "                        <a class=\"layout-specgroup icon-sprite-before expand-link contains-children-true\" href=\"#\">{{name}}</a>\n" +
    "                        <ul class=\"layout-checks expand-container\">\n" +
    "                            {{#each specs}}\n" +
    "                                {{renderLayoutCheck this}}\n" +
    "                            {{/each}}\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                    {{/each}}\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </script>\n" +
    "        <script id=\"report-layout-check-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <li>\n" +
    "            <a class=\"layout-check icon-sprite-before layout-check-status-{{status}}\" href=\"#\"\n" +
    "                data-highlight-objects=\"{{commaSeparated highlight}}\"\n" +
    "                title=\"{{place.filePath}}#{{place.lineNumber}}\"\n" +
    "                >{{name}}</a>\n" +
    "\n" +
    "                {{#if errors}}\n" +
    "                    <div class=\"layout-check-error-message\">\n" +
    "                        {{#if imageComparison}}\n" +
    "                        <a class=\"image-comparison-link\"\n" +
    "                            data-actual-image=\"{{imageComparison.actualImage}}\"\n" +
    "                            data-expected-image=\"{{imageComparison.expectedImage}}\"\n" +
    "                            data-map-image=\"{{imageComparison.comparisonMapImage}}\"\n" +
    "                            href=\"#\">Show image comparison</a>\n" +
    "                        {{/if}}\n" +
    "                        <div class=\"layout-check-error-message-text\">\n" +
    "                            <ul>\n" +
    "                            {{#each errors}}\n" +
    "                                <li>{{this}}</li>\n" +
    "                            {{/each}}\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                {{/if}}\n" +
    "\n" +
    "                {{#if subLayout}}\n" +
    "                {{renderSublayout subLayout}}\n" +
    "                {{/if}}\n" +
    "            </li>\n" +
    "        </script>\n" +
    "        <script id=\"screenshot-popup-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <div class=\"screenshot-canvas\">\n" +
    "                {{#if screenshot}}\n" +
    "                <img src=\"{{screenshot}}\"/>\n" +
    "                {{else}}\n" +
    "                <div class=\"empty-screenshot\" style=\"width: {{width}}; height: {{height}};\"></div>\n" +
    "                {{/if}}\n" +
    "                {{#each objects}}\n" +
    "                <div class=\"canvas-rect\" style=\"left: {{area.left}}px; top: {{area.top}}px; width: {{area.width}}px; height: {{area.height}}px; {{#if drawBorder}}border-color: {{color}};{{else}}border:none;{{/if}}{{#if fillBackground}}background: {{color}};{{else}}background:none;{{/if}}\">\n" +
    "                    <div class=\"canvas-rect-wrapper\">\n" +
    "                        <div class=\"canvas-rect-hint\" style=\"background: {{color}};\">{{name}}</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                {{/each}}\n" +
    "            </div>\n" +
    "        </script>\n" +
    "        <script id=\"image-comparison-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <div class=\"image-comparison image-comparison-layout-{{layout}}\">\n" +
    "                <div class=\"actual-image\">\n" +
    "                    <h5>Actual</h5>\n" +
    "                    <img src=\"{{actual}}\"/>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"expected-image\">\n" +
    "                    <h5>Expected</h5>\n" +
    "                    <img src=\"{{expected}}\"/>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"comparison-map\">\n" +
    "                    <h5>Comparison map</h5>\n" +
    "                    <img src=\"{{map}}\"/>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "        <script id=\"node-extras-tpl\" type=\"text/x-handlebars-template\">\n" +
    "            <div class=\"node-extras\">\n" +
    "                <a class=\"node-extras\" href=\"#\">extras</a>\n" +
    "                <div class=\"node-extras-content\">\n" +
    "                    <table class=\"node-extras-table\">\n" +
    "                        <tbody>\n" +
    "                        {{#each this}}\n" +
    "                        <tr>\n" +
    "                            <td><label>{{@key}}</label></td>\n" +
    "                            {{#ifCond type 'text'}}\n" +
    "                            <td>{{value}}</td>\n" +
    "                            {{/ifCond}}\n" +
    "                            {{#ifCond type 'link'}}\n" +
    "                            <td><a href=\"{{value}}\">{{value}}</a></td>\n" +
    "                            {{/ifCond}}\n" +
    "                            {{#ifCond type 'image'}}\n" +
    "                            <td><a href=\"{{value}}\"><img src=\"{{value}}\"/></a></td>\n" +
    "                            {{/ifCond}}\n" +
    "                        </tr>\n" +
    "                        {{/each}}\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div id=\"menu\">\n" +
    "            <ul>\n" +
    "                <li><a href=\"report.html\">Back to Test Overview</a></li>\n" +
    "                <li><a class=\"menu-op-expand-all\" href=\"#\">Expand All</a></li>\n" +
    "                <li><a class=\"menu-op-collapse-all\" href=\"#\">Collapse All</a></li>\n" +
    "                <li><a class=\"menu-op-expand-errors\" href=\"#\">Expand Errors</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <h2>.\\accordion.gspec</h2>\n" +
    "        <div id=\"main\"></div>\n" +
    "        <div id=\"screen-shadow\"></div>\n" +
    "        <div id=\"popup\" class=\"popup\">\n" +
    "            <div class=\"popup-wrapper\">\n" +
    "                <a class=\"popup-close-link\" href=\"#\">close</a>\n" +
    "                <div class=\"popup-content\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"notification\" class=\"notification\">\n" +
    "            <div class=\"notification-wrapper\">\n" +
    "                <a class=\"notification-close-link\" href=\"#\">close</a>\n" +
    "                <div class=\"notification-summary\"></div>\n" +
    "                <div class=\"notification-message\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </body>\n" +
    "</html>\n"
  );


  $templateCache.put('/dist/templates/accordion/tests/reports/report.html',
    "<html>\n" +
    "    <head>\n" +
    "        <title>Galen Reports</title>\n" +
    "        <meta charset=\"utf-8\" />\n" +
    "        <link rel=\"stylesheet\" type=\"text/css\" href=\"report.css\"></link>\n" +
    "        <link rel=\"stylesheet\" type=\"text/css\" href=\"tablesorter.css\"></link>\n" +
    "        <script src=\"jquery-1.11.2.min.js\"></script>\n" +
    "        <script src=\"handlebars-v2.0.0.js\"></script>\n" +
    "        <script src=\"tablesorter.js\"></script>\n" +
    "        <script src=\"galen-report.js\"></script>\n" +
    "        <script>\n" +
    "var reportData = {\r" +
    "\n" +
    "  \"tests\" : [ {\r" +
    "\n" +
    "    \"name\" : \".\\\\accordion.gspec\",\r" +
    "\n" +
    "    \"startedAt\" : 1480676599248,\r" +
    "\n" +
    "    \"endedAt\" : 1480676645486,\r" +
    "\n" +
    "    \"failed\" : true,\r" +
    "\n" +
    "    \"statistic\" : {\r" +
    "\n" +
    "      \"passed\" : 0,\r" +
    "\n" +
    "      \"errors\" : 1,\r" +
    "\n" +
    "      \"warnings\" : 0,\r" +
    "\n" +
    "      \"total\" : 1\r" +
    "\n" +
    "    },\r" +
    "\n" +
    "    \"testId\" : \"1-.-accordion.gspec\",\r" +
    "\n" +
    "    \"exceptionMessage\" : \"WebDriverException: Failed to connect to binary FirefoxBinary(C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\firefox.exe) on port 7055; process output follows: \\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\nBuild info: version: 'unknown', revision: 'unknown', time: 'unknown'\\nSystem info: host: 'gsvechnikov2-spb', ip: '10.9.3.107', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_91'\\nDriver info: driver.version: FirefoxDriver\",\r" +
    "\n" +
    "    \"exceptionStacktrace\" : \"org.openqa.selenium.WebDriverException: Failed to connect to binary FirefoxBinary(C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\firefox.exe) on port 7055; process output follows: \\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\nBuild info: version: 'unknown', revision: 'unknown', time: 'unknown'\\nSystem info: host: 'gsvechnikov2-spb', ip: '10.9.3.107', os.name: 'Windows 10', os.arch: 'amd64', os.version: '10.0', java.version: '1.8.0_91'\\nDriver info: driver.version: FirefoxDriver\\r\\n\\tat org.openqa.selenium.firefox.internal.NewProfileExtensionConnection.start(NewProfileExtensionConnection.java:125)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.startClient(FirefoxDriver.java:271)\\r\\n\\tat org.openqa.selenium.remote.RemoteWebDriver.<init>(RemoteWebDriver.java:119)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:216)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:211)\\r\\n\\tat org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:128)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.getDriver(SeleniumBrowserFactory.java:95)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.createLocalBrowser(SeleniumBrowserFactory.java:89)\\r\\n\\tat com.galenframework.browser.SeleniumBrowserFactory.openBrowser(SeleniumBrowserFactory.java:65)\\r\\n\\tat com.galenframework.runner.GalenBasicTestRunner.runTest(GalenBasicTestRunner.java:73)\\r\\n\\tat com.galenframework.tests.GalenBasicTest.execute(GalenBasicTest.java:55)\\r\\n\\tat com.galenframework.TestRunnable.runTest(TestRunnable.java:75)\\r\\n\\tat com.galenframework.TestRunnable.run(TestRunnable.java:101)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)\\r\\n\\tat java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)\\r\\n\\tat java.lang.Thread.run(Unknown Source)\\r\\nCaused by: org.openqa.selenium.firefox.NotConnectedException: Unable to connect to host 127.0.0.1 on port 7055 after 45000 ms. Firefox console output:\\n,\\\"syncGUID\\\":\\\"kMZ1FwyySZ6D\\\",\\\"location\\\":\\\"app-global\\\",\\\"version\\\":\\\"48.0.2\\\",\\\"type\\\":\\\"theme\\\",\\\"internalName\\\":\\\"classic/1.0\\\",\\\"updateURL\\\":null,\\\"updateKey\\\":null,\\\"optionsURL\\\":null,\\\"optionsType\\\":null,\\\"aboutURL\\\":null,\\\"icons\\\":{\\\"32\\\":\\\"icon.png\\\",\\\"48\\\":\\\"icon.png\\\"},\\\"iconURL\\\":null,\\\"icon64URL\\\":null,\\\"defaultLocale\\\":{\\\"name\\\":\\\"Default\\\",\\\"description\\\":\\\"The default theme.\\\",\\\"creator\\\":\\\"Mozilla\\\",\\\"homepageURL\\\":null,\\\"contributors\\\":[\\\"Mozilla Contributors\\\"]},\\\"visible\\\":true,\\\"active\\\":true,\\\"userDisabled\\\":false,\\\"appDisabled\\\":false,\\\"descriptor\\\":\\\"C:\\\\\\\\Program Files (x86)\\\\\\\\Mozilla Firefox\\\\\\\\browser\\\\\\\\extensions\\\\\\\\{972ce4c6-7e08-4474-a285-3208198ce6fd}.xpi\\\",\\\"installDate\\\":1478184454139,\\\"updateDate\\\":1478184454139,\\\"applyBackgroundUpdates\\\":1,\\\"skinnable\\\":true,\\\"size\\\":21905,\\\"sourceURI\\\":null,\\\"releaseNotesURI\\\":null,\\\"softDisabled\\\":false,\\\"foreignInstall\\\":false,\\\"hasBinaryComponents\\\":false,\\\"strictCompatibility\\\":true,\\\"locales\\\":[],\\\"targetApplications\\\":[{\\\"id\\\":\\\"{ec8030f7-c20a-464f-9b0e-13a3a9e97384}\\\",\\\"minVersion\\\":\\\"48.0.2\\\",\\\"maxVersion\\\":\\\"48.0.2\\\"}],\\\"targetPlatforms\\\":[],\\\"seen\\\":true}\\r\\n1480676600077\\taddons.xpi\\tDEBUG\\tgetModTime: Recursive scan of {972ce4c6-7e08-4474-a285-3208198ce6fd}\\r\\n1480676600078\\tDeferredSave.extensions.json\\tDEBUG\\tSave changes\\r\\n1480676600078\\taddons.xpi\\tDEBUG\\tUpdating database with changes to installed add-ons\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tUpdating add-on states\\r\\n1480676600078\\taddons.xpi-utils\\tDEBUG\\tWriting add-ons list\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\e10srollout@mozilla.org.xpi\\r\\n1480676600081\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on e10srollout@mozilla.org version 1.1\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\firefox@getpocket.com.xpi\\r\\n1480676600082\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on firefox@getpocket.com version 1.0.4\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tRegistering manifest for C:\\\\Program Files (x86)\\\\Mozilla Firefox\\\\browser\\\\features\\\\loop@mozilla.org.xpi\\r\\n1480676600083\\taddons.xpi\\tDEBUG\\tCalling bootstrap method startup on loop@mozilla.org version 1.4.4\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: XPIProvider\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tProvider finished startup: LightweightThemeManager\\r\\n1480676600099\\taddons.manager\\tDEBUG\\tStarting provider: GMPProvider\\r\\n1480676600108\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: GMPProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tStarting provider: PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PluginProvider\\r\\n1480676600109\\taddons.manager\\tDEBUG\\tProvider finished startup: PluginProvider\\r\\n1480676600110\\taddons.manager\\tDEBUG\\tCompleted startup sequence\\r\\n1480676600328\\taddons.manager\\tDEBUG\\tStarting provider: <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for <unnamed-provider>\\r\\n1480676600329\\taddons.manager\\tDEBUG\\tProvider finished startup: <unnamed-provider>\\r\\n1480676600330\\tDeferredSave.extensions.json\\tDEBUG\\tStarting write\\r\\n1480676600498\\taddons.repository\\tDEBUG\\tNo addons.json found.\\r\\n1480676600499\\tDeferredSave.addons.json\\tDEBUG\\tSave changes\\r\\n1480676600501\\tDeferredSave.addons.json\\tDEBUG\\tStarting timer\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tStarting provider: PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tRegistering shutdown blocker for PreviousExperimentProvider\\r\\n1480676600530\\taddons.manager\\tDEBUG\\tProvider finished startup: PreviousExperimentProvider\\r\\n1480676600533\\tDeferredSave.extensions.json\\tDEBUG\\tWrite succeeded\\r\\n1480676600534\\taddons.xpi-utils\\tDEBUG\\tXPI Database saved, setting schema version preference to 17\\r\\n1480676600551\\tDeferredSave.addons.json\\tDEBUG\\tStarting write\\r\\n1480676600560\\tDeferredSave.addons.json\\tDEBUG\\tWrite succeeded\\r\\n\\r\\n\\tat org.openqa.selenium.firefox.internal.NewProfileExtensionConnection.start(NewProfileExtensionConnection.java:113)\\r\\n\\t... 15 more\\r\\n\",\r" +
    "\n" +
    "    \"failed\" : true,\r" +
    "\n" +
    "    \"duration\" : 46238\r" +
    "\n" +
    "  } ]\r" +
    "\n" +
    "};\n" +
    "\n" +
    "        </script>\n" +
    "        <script>\n" +
    "            $(function () {\n" +
    "                var galenReport = createGalenTestOverview();\n" +
    "                galenReport.renderTestsTable(\"tests-table\", reportData);\n" +
    "                galenReport.renderGroupsTable(\"groups-table\", reportData);\n" +
    "\n" +
    "                window.onhashchange = function () {\n" +
    "                    galenReport.handleHash(window.location.hash.substr(1));\n" +
    "                };\n" +
    "\n" +
    "                galenReport.handleHash(window.location.hash.substr(1));\n" +
    "            });\n" +
    "        </script>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "\n" +
    "\n" +
    "        <div class=\"tests-overview\">\n" +
    "            <h2>Galen Test Report</h2>\n" +
    "            <div class=\"tabs\">\n" +
    "                <a class=\"tab tab-tests\" href=\"#tests\">Tests</a>\n" +
    "                <a class=\"tab tab-groups\" href=\"#groups\">Groups</a>\n" +
    "            </div>\n" +
    "            <div id=\"tests-table\">\n" +
    "            </div>\n" +
    "            <div id=\"groups-table\">\n" +
    "            </div>\n" +
    "\n" +
    "            <script id=\"tests-table-tpl\" type=\"text/x-handlebars-template\">\n" +
    "                <table class=\"tests tablesorter\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Test</th>\n" +
    "                            <th>Passed</th>\n" +
    "                            <th>Failed</th>\n" +
    "                            <th>Warnings</th>\n" +
    "                            <th>Total</th>\n" +
    "                            <th>Groups</th>\n" +
    "                            <th>Started</th>\n" +
    "                            <th>Duration</th>\n" +
    "                            <th></th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                        {{#each tests}}\n" +
    "                        <tr data-groups=\"{{groups}}\">\n" +
    "                            <td class=\"suite-link\">\n" +
    "                                <a href=\"{{testId}}.html\">{{name}}</a>\n" +
    "                            </td>\n" +
    "                            <td class=\"status passed\">{{statistic.passed}}</td>\n" +
    "                            <td class=\"status failed\">{{statistic.errors}}</td>\n" +
    "                            <td class=\"status warnings\">{{statistic.warnings}}</td>\n" +
    "                            <td class=\"status total\">{{statistic.total}}</td>\n" +
    "                            <td class=\"tags\">{{formatGroupsPretty groups}}</td>\n" +
    "                            <td class=\"time\">{{formatDateTime startedAt}}</td>\n" +
    "                            <td class=\"time\">{{formatDurationHumanReadable duration}}</td>\n" +
    "                            <td class=\"progressbar\">\n" +
    "                                {{renderProgressBar statistic}}\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        {{/each}}\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </script>\n" +
    "            <script id=\"groups-table-tpl\" type=\"text/x-handlebars-template\">\n" +
    "                <table class=\"groups tablesorter\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th>Group</th>\n" +
    "                            <th>Passed</th>\n" +
    "                            <th>Failed</th>\n" +
    "                            <th>Tests</th>\n" +
    "                            <th></th>\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                        {{#each this}}\n" +
    "                        <tr>\n" +
    "                            <td class=\"group-link\">\n" +
    "                                <a href=\"#tests|grouped|{{name}}\">{{name}}</a>\n" +
    "                            </td>\n" +
    "                            <td class=\"status passed\">{{passed}}</td>\n" +
    "                            <td class=\"status failed\">{{failed}}</td>\n" +
    "                            <td class=\"status total\">{{tests}}</td>\n" +
    "                            <td class=\"progressbar\">\n" +
    "                                {{renderGroupsProgressBar this}}\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        {{/each}}\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </script>\n" +
    "        </div>\n" +
    "    </body>\n" +
    "</html>\n"
  );


  $templateCache.put('/dist/templates/audioplayer/audioplayer.template.html',
    "<div>\r" +
    "\n" +
    "    <audio>\r" +
    "\n" +
    "        Your browser does not support the audio element.\r" +
    "\n" +
    "    </audio>\r" +
    "\n" +
    "    <div class=\"audioplayer pr\" ng-class=\"{'is-dark':isDark}\" >\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-hide=\"!showLoading && ctrl.isLoaded\" class=\"m-text-center\"\r" +
    "\n" +
    "             style=\"position: absolute;height: 54px;width:432px;top:-1px;left: -1px;\r" +
    "\n" +
    "                background-color:#fff;opacity: 0.6;padding:4px 0 0;z-index:100;\">\r" +
    "\n" +
    "            <z-spinner ng-hide=\"ctrl.hasError\" style=\"margin-left: 180px;\"></z-spinner>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <!-- light scheme -->\r" +
    "\n" +
    "        <div ng-if=\"!isDark\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn-playback-control cursor-pointer fl\"\r" +
    "\n" +
    "                    ng-hide=\"ctrl.isPlaying\" ng-click=\"ctrl.api.play()\"\r" +
    "\n" +
    "                    ng-mousedown = \"ctrl.isPlaybackButtonPressed=true\"\r" +
    "\n" +
    "                    ng-mouseup   = \"ctrl.isPlaybackButtonPressed=false\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\"\r" +
    "\n" +
    "                     ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 0 : 1}\">\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                        <g id=\"shadow\">\r" +
    "\n" +
    "                            <filter id=\"blurMe\">\r" +
    "\n" +
    "                                <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\r" +
    "\n" +
    "                            </filter>\r" +
    "\n" +
    "                            <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"#cecece\" filter=\"url(#blurMe)\" />\r" +
    "\n" +
    "                        </g>\r" +
    "\n" +
    "                        <g id=\"Player\">\r" +
    "\n" +
    "                            <circle fill=\"#FFFFFF\" stroke=\"#CECECE\" stroke-miterlimit=\"10\" cx=\"20\" cy=\"20\" r=\"19\" />\r" +
    "\n" +
    "                            <path fill=\"#939393\" d=\"M16 12l11.1 7.9-11.1 8.1z\" />\r" +
    "\n" +
    "                        </g>\r" +
    "\n" +
    "                    </svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\"\r" +
    "\n" +
    "                    ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 1 : 0}\">\r" +
    "\n" +
    "                    <svg xmlns=\" http />/www.w3.org/2000/svg\" width=\"42\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                        <g id=\"shadow\">\r" +
    "\n" +
    "                            <filter id=\"blurMe\">\r" +
    "\n" +
    "                                <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\r" +
    "\n" +
    "                            </filter>\r" +
    "\n" +
    "                            <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"#cecece\" filter=\"url(#blurMe)\" />\r" +
    "\n" +
    "                        </g>\r" +
    "\n" +
    "                        <g id=\"Player\">\r" +
    "\n" +
    "                            <circle fill=\"#FFFFFF\" stroke=\"#CECECE\" stroke-miterlimit=\"10\" cx=\"20\" cy=\"20\" r=\"19\" />\r" +
    "\n" +
    "                            <path fill=\"#4F4F4F\" d=\"M16 12l11.1 7.9-11.1 8.1z\" />\r" +
    "\n" +
    "                        </g>\r" +
    "\n" +
    "                    </svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn-playback-control cursor-pointer fl\" style=\"margin: 7px 0 7px 16px;\"\r" +
    "\n" +
    "                ng-show=\"ctrl.isPlaying\" ng-click=\"ctrl.api.pause()\"\r" +
    "\n" +
    "                ng-mousedown = \"ctrl.isPlaybackButtonPressed=true\"\r" +
    "\n" +
    "                ng-mouseup   = \"ctrl.isPlaybackButtonPressed=false\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\"\r" +
    "\n" +
    "                     ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 0 : 1}\">\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"shadow\">\r" +
    "\n" +
    "                        <filter id=\"blurMe\">\r" +
    "\n" +
    "                           <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\r" +
    "\n" +
    "                        </filter>\r" +
    "\n" +
    "                        <circle cx=\"20\" cy=\"20\" r=\"19\" fill=\"#cecece\" filter=\"url(#blurMe)\" />\r" +
    "\n" +
    "                    </g>\r" +
    "\n" +
    "                    <g id=\"Player\"><circle fill=\"#FFFFFF\" stroke=\"#CECECE\" stroke-miterlimit=\"10\" cx=\"20\" cy=\"20\" r=\"19\"/>\r" +
    "\n" +
    "                        <path fill=\"#939393\" d=\"M14 14h4v12h-4zM22 14h4v12h-4z\"/></g>\r" +
    "\n" +
    "                    </svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\"\r" +
    "\n" +
    "                     ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 1 : 0}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"42\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"shadow\">\r" +
    "\n" +
    "                        <filter id=\"blurMe\">\r" +
    "\n" +
    "                           <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"2\" />\r" +
    "\n" +
    "                        </filter>\r" +
    "\n" +
    "                        <circle cx=\"20\"  cy=\"20\" r=\"19\" fill=\"#cecece\" filter=\"url(#blurMe)\" />\r" +
    "\n" +
    "                    </g>\r" +
    "\n" +
    "                    <g id=\"Player\"><circle fill=\"#FFFFFF\" stroke=\"#CECECE\" stroke-miterlimit=\"10\" cx=\"20\" cy=\"20\" r=\"19\"/>\\<path fill=\"#4F4F4F\" d=\"M14 14h4v12h-4zM22 14h4v12h-4z\"/></g></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div ng-if=\"isDark\">\r" +
    "\n" +
    "            <button class=\"btn-playback-control cursor-pointer fl\" ng-hide=\"ctrl.isPlaying\" ng-click=\"ctrl.api.play()\" ng-mousedown = \"ctrl.isPlaybackButtonPressed=true\"\r" +
    "\n" +
    "                ng-mouseup   = \"ctrl.isPlaybackButtonPressed=false\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\" ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 0 : 1}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"43\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"Player\">\r" +
    "\n" +
    "                    <circle fill=\"#4C4C4C\" cx=\"20\" cy=\"20\" r=\"19\"/><path fill=\"#FFFFFF\" d=\"M16 12l11.1 7.9-11.1 8.1z\"/></g></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\" ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 1 : 0}\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"43\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"Player\"><circle fill=\"#4C4C4C\" cx=\"20\" cy=\"20\" r=\"19\"/><path fill=\"#939393\" d=\"M16 12l11.1 7.9-11.1 8.1z\"/></g></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <button class=\"btn-playback-control cursor-pointer fl\" ng-show=\"ctrl.isPlaying\" ng-click=\"ctrl.api.pause()\" ng-mousedown = \"ctrl.isPlaybackButtonPressed=true\"\r" +
    "\n" +
    "                ng-mouseup   = \"ctrl.isPlaybackButtonPressed=false\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\" ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 0 : 1}\">\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"43\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"Player\"><circle fill=\"#4C4C4C\" cx=\"20\" cy=\"20\" r=\"19\"/><path fill=\"#FFFFFF\" d=\"M14 14h4v12h-4zM22 14h4v12h-4z\"/></g></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"svg-wrap\" ng-style=\"{'opacity': ctrl.isPlaybackButtonPressed ? 1 : 0}\">\r" +
    "\n" +
    "                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"43\" height=\"42\" viewBox=\"0 0 42 42\">\r" +
    "\n" +
    "                    <g id=\"Player\"><circle fill=\"#4C4C4C\" cx=\"20\" cy=\"20\" r=\"19\"/><path fill=\"#939393\" d=\"M14 14h4v12h-4zM22 14h4v12h-4z\"/></g></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"fl cursor-pointer  audio-progress\" style=\"width: 160px;margin: 25px 0 25px 16px;\" ng-mousedown=\"ctrl.api.refreshTrackPosition($event)\">\r" +
    "\n" +
    "            <div class=\"audio-bar\" ng-style=\"{'width' : ctrl.playPercent + '%'}\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"fl\" style=\"margin: 20px 0 20px 8px;\">\r" +
    "\n" +
    "            <span ng-hide=\"ctrl.hasError\" ng-bind=\"ctrl.currentTimeFormatted\" class=\"time-item\"></span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"cursor-pointer audio-progress fr\" style=\"width:64px;margin:25px 16px 25px 8px;\"\r" +
    "\n" +
    "            ng-mousedown =\"ctrl.api.refreshVolume($event)\">\r" +
    "\n" +
    "            <div class=\"audio-bar\" ng-style=\"{'width' : ctrl.volumePercent + '%'}\"></div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"fr\" style=\"margin: 16px 0;\"\r" +
    "\n" +
    "            ng-mousedown = \"ctrl.isVolumeButtonPressed=true\"\r" +
    "\n" +
    "            ng-mouseup   = \"ctrl.isVolumeButtonPressed=false\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div class=\"cursor-pointer volume-speaker\" ng-class=\"{'is-pressed': ctrl.isVolumeButtonPressed}\"\r" +
    "\n" +
    "             ng-show=\"ctrl.volumePercent\" ng-click=\"ctrl.api.mute()\">\r" +
    "\n" +
    "                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"\r" +
    "\n" +
    "                    ><path d=\"M12 4l-6.5 5h-4.5v6h4.5l6.5 5zM21.3 11.8c0-2.9-1.4-5.5-3.7-7.1l.9-1.2c2.6 1.9 4.2 4.9 4.2 8.3s-1.7 6.4-4.2 8.3l-.9-1.2c2.3-1.6 3.7-4.2 3.7-7.1zM17.9 11.8c0-1.8-.9-3.5-2.3-4.4l.9-1.2c1.8 1.2 2.9 3.3 2.9 5.6s-1.2 4.4-2.9 5.6l-.9-1.2c1.4-1 2.3-2.6 2.3-4.4zM14.5 11.8c0-.8-.4-1.4-1.1-1.7l.9-1.2c1 .6 1.6 1.7 1.6 2.9s-.6 2.3-1.6 2.9l-.9-1.2c.6-.3 1.1-1 1.1-1.7z\"/></svg>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"cursor-pointer volume-speaker\" ng-show=\"!ctrl.volumePercent\" ng-click=\"ctrl.api.unmute()\"\r" +
    "\n" +
    "                ng-class=\"{'is-pressed': ctrl.isVolumeButtonPressed}\">\r" +
    "\n" +
    "                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 4l-6.5 5h-4.5v6h4.5l6.5 5zM22.7 8.5l-1.2-1.2-3.5 3.5-3.5-3.5-1.2 1.2 3.5 3.5-3.5 3.5 1.2 1.2 3.5-3.5 3.5 3.5 1.2-1.2-3.5-3.5z\"/></svg>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"audioplayer-error\" ng-if=\"ctrl.hasError\">\r" +
    "\n" +
    "        {{ctrl.errorMessage}}\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/calendar/calendar.template.html',
    "<div>\n" +
    "    <div class=\"calendar\">\n" +
    "        <nav class=\"calendar-nav\">\n" +
    "            <div class=\"calendar-nav-prev\">\n" +
    "                <button type=\"button\" class=\"btn m-link p0\" ng-click=\"ctrl.moveMonth(-1)\"\n" +
    "                        ng-disabled=\"ctrl.disableButton(-1)\">\n" +
    "                    <svg class=\"icon m-size-16 m-va-middle\">\n" +
    "                        <use xlink:href=\"#chevron-back-16\"/>\n" +
    "                    </svg>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "            <div class=\"calendar-nav-selects\">\n" +
    "                <select ng-model=\"ctrl.selectedMonth\">\n" +
    "                    <option ng-value=\"month\" ng-repeat=\"month in ctrl.availableMonth track by $index\">{{month}}</option>\n" +
    "                </select>\n" +
    "                <select ng-model=\"ctrl.selectedYear\">\n" +
    "                    <option ng-value=\"year\" ng-repeat=\"year in ctrl.availableYears track by $index\">{{year}}</option>\n" +
    "                </select>\n" +
    "            </div>\n" +
    "            <div class=\"calendar-nav-next\">\n" +
    "                <button type=\"button\" class=\"btn m-link p0\" ng-click=\"ctrl.moveMonth(1)\"\n" +
    "                        ng-disabled=\"ctrl.disableButton(1)\">\n" +
    "                    <svg class=\"icon m-size-16 m-va-middle\">\n" +
    "                        <use xlink:href=\"#chevron-forward-16\"/>\n" +
    "                    </svg>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </nav>\n" +
    "        <table class=\"calendar-table\">\n" +
    "            <tr class=\"calendar-week-days\">\n" +
    "                <td>SU</td>\n" +
    "                <td>MO</td>\n" +
    "                <td>TU</td>\n" +
    "                <td>WE</td>\n" +
    "                <td>TH</td>\n" +
    "                <td>FR</td>\n" +
    "                <td>SA</td>\n" +
    "            </tr>\n" +
    "            <tr ng-repeat=\"row in ctrl.rows\">\n" +
    "                <td class=\"calendar-table-day\" ng-repeat=\"date in row track by $index\">\n" +
    "                    <button type=\"button\" ng-if=\"date!==null\" class=\"btn m-link calendar-table-day-button\"\n" +
    "                            ng-click=\"ctrl.selectDate(date)\" ng-class=\"{'m-active': ctrl.isActiveDate(date),'today': ctrl.isToday(date)}\"\n" +
    "                            ng-disabled=\"!ctrl.isDisabledDate(date)\">{{ date | date : 'd' }}</button>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </div>\n" +
    "    <div ng-transclude=\"block\"></div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/dist/templates/charges/charges.template.html',
    "﻿<div class=\"charges\" >\r" +
    "\n" +
    "    <div class=\"charges-wrapper\">\r" +
    "\n" +
    "        <div class=\"charges-wording\" ng-show=\"ctrl.data.topWordings\" ng-repeat=\"wording in ctrl.data.topWordings\">\r" +
    "\n" +
    "            {{wording}}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"charges-totals\" ng-hide=\"ctrl.data.IsChargeEmpty\">\r" +
    "\n" +
    "            <h4 class=\"charges-totals-header\">Totals</h4>\r" +
    "\n" +
    "            <table class=\"charges-totals-table\">\r" +
    "\n" +
    "              <tbody>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <td>Fees to be charged now<span ng-show=\"ctrl.data.Vat > 0\"> (including <b>VAT @{{ ctrl.data.Vat }}%</b> of <b>{{ ctrl.data.VatPaymentValue }}</b>)</span>:</td>\r" +
    "\n" +
    "                    <td class=\"charges-totals-table-sum text-right\"><b>{{ ctrl.data.Amount }}</b></td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <td>Charge to monthly bill starting next month:</td>\r" +
    "\n" +
    "                    <td class=\"charges-totals-table-sum text-right\"><b>{{ ctrl.data.DeltaMonthlyAmount }}</b></td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                </tbody>\r" +
    "\n" +
    "                <tfoot>\r" +
    "\n" +
    "                  <tr ng-repeat=\"wording in ctrl.data.totalsWordings\">\r" +
    "\n" +
    "                    <td colspan=\"2\">\r" +
    "\n" +
    "                      <div class=\"muted mt16\">\r" +
    "\n" +
    "                          {{wording}}\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                  </tr>\r" +
    "\n" +
    "                </tfoot>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"charges-estimated\" ng-hide=\"ctrl.data.IsChargeEmpty\">\r" +
    "\n" +
    "            <table class=\"charges-estimated-table\">\r" +
    "\n" +
    "                <tr>\r" +
    "\n" +
    "                    <td>{{ ctrl.data.estimatedComment }}</td>\r" +
    "\n" +
    "                    <td class=\" text-right\"><b>{{ ctrl.data.estimatedAmount }}</b></td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "                <tfoot>\r" +
    "\n" +
    "                  <tr ng-repeat=\"wording in ctrl.data.estimatedWordings\">\r" +
    "\n" +
    "                    <td>\r" +
    "\n" +
    "                      <div class=\"muted mt8 mb8\">\r" +
    "\n" +
    "                          {{wording}}\r" +
    "\n" +
    "                      </div>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                  </tr>\r" +
    "\n" +
    "                </tfoot>\r" +
    "\n" +
    "            </table>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"charges-wording\" ng-show=\"ctrl.data.bottomWordings\" ng-repeat=\"wording in ctrl.data.bottomWordings\">\r" +
    "\n" +
    "            {{ wording }}\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        <div class=\"charges-wording\" ng-if=\"ctrl.data.admin.state\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "          <label class=\"checkbox\">\r" +
    "\n" +
    "              <input type=\"checkbox\" ng-model=\"ctrl.data.admin.value\" >\r" +
    "\n" +
    "              <span>{{ctrl.data.admin.wording}}</span>\r" +
    "\n" +
    "          </label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/confirmation/confirmation.template.html',
    "<div class=\"confirmation-wrapper\" ng-class=\"{'m-in-table': ctrl.isInTable}\">\n" +
    "  <div class=\"confirm\" ng-class=\"{'s-show' : ctrl.state }\">\n" +
    "      <div class=\"confirm-content\">\n" +
    "        <div ng-transclude></div>\n" +
    "      </div>\n" +
    "      <div class=\"confirm-buttons\">\n" +
    "        <button type=\"button\" class=\"btn m-blue\" ng-click=\"ctrl.confirmCallback();\">Confirm</button><button type=\"button\" class=\"btn\" ng-click=\"ctrl.cancelCallback();\">Cancel</button>\n" +
    "      </div>\n" +
    "    <div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/datepicker/datepicker.template.html',
    "<div>\n" +
    "    <div class=\"dropdown z-datepicker\" z-dropdown auto-close=\"disabled\"\n" +
    "         is-open=\"ctrl.calendarData.isCalendarVisible\" ng-class=\"{'disabled':ctrl.isDisabled}\"\n" +
    "         z-validate-field=\"ctrl.errors\" name=\"{{ctrl.name}}\" ng-model=\"ctrl.ngModel\"\n" +
    "         ng-attr-focus-element=\"{{'#' + ctrl.name + '-datepicker-input'}}\">\n" +
    "        <div ng-click=\"ctrl.showCalendar()\">\n" +
    "            <input ng-attr-id=\"{{ctrl.name + '-datepicker-input'}}\" class=\"form-input z-datepicker-input\" type=\"text\"\n" +
    "                   ng-model=\"ctrl.ngModel\" readonly\n" +
    "                   z-date-format=\"{{ctrl.format}}\"/>\n" +
    "            <div class=\"z-datepicker-calendar-button\">\n" +
    "                <svg class=\"icon m-size-16\">\n" +
    "                    <use xlink:href=\"#calendar\"/>\n" +
    "                </svg>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"dropdown-menu\" z-dropdown-menu style=\"left: -1px;min-width: initial;\">\n" +
    "            <z-calendar ng-model=\"ctrl.ngModel\" min-date=\"ctrl.minDate\" max-date=\"ctrl.maxDate\">\n" +
    "                <additional-block ng-transclude=\"block\"></additional-block>\n" +
    "            </z-calendar>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/dist/templates/daterange/daterange.template.html',
    "<div>\n" +
    "    <div class=\"calendar-wrap\">\n" +
    "        <z-datepicker ng-model=\"ctrl.fromDate\"\n" +
    "                      min-date=\"ctrl.minDate\"\n" +
    "                      max-date=\"ctrl.toDate\"\n" +
    "                      format=\"{{ctrl.format}}\"></z-datepicker>\n" +
    "    </div>\n" +
    "    -\n" +
    "    <div class=\"calendar-wrap\">\n" +
    "        <z-datepicker ng-model=\"ctrl.toDate\"\n" +
    "                      min-date=\"ctrl.fromDate\"\n" +
    "                      max-date=\"ctrl.maxDate\"\n" +
    "                      format=\"{{ctrl.format}}\"></z-datepicker>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/dist/templates/feedback/feedback.template.html',
    "<div class=\"feedback\">\r" +
    "\n" +
    "\t<div class=\"feedback-accordion m-right\">\r" +
    "\n" +
    "\t\t<button class=\"feedback-trigger\"  ng-click=\"ctrl.active.state = !ctrl.active.state\">\r" +
    "\n" +
    "        <span class=\"accordion-icon\">\r" +
    "\n" +
    "        \t<svg class=\"icon m-size-16 m-va-text-top m-right m-white\">\r" +
    "\n" +
    "                <use xlink:href=\"#chevron-down-16\" ng-show=\"ctrl.active.state\" />\r" +
    "\n" +
    "                <use xlink:href=\"#chevron-up-16\"   ng-hide=\"ctrl.active.state\" />\r" +
    "\n" +
    "            </svg>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "\t\t\t<span>Feedback</span>\r" +
    "\n" +
    "\t\t</button>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "\t<form class=\"feedback-content\" >\r" +
    "\n" +
    "\t\t<div class=\"feedback-form\">\r" +
    "\n" +
    "\t\t\t<textarea rows=\"7\" cols=\"25\" class=\"feedback-message j-feedback-message\" ng-model=\"ctrl.message\"></textarea>\r" +
    "\n" +
    "\t\t\t<div class=\"feedback-buttons\">\r" +
    "\n" +
    "\t\t\t\t<button class=\"btn feedback-send\" type=\"submit\" ng-click=\"ctrl.sendFeedback()\">Send Feedback</button>\r" +
    "\n" +
    "\t\t\t\t<button class=\"btn feedback-cancel\" type=\"reset\"  ng-click=\"ctrl.active.state = false\">Cancel</button>\r" +
    "\n" +
    "\t\t\t</div>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"spinner\" ng-show=\"ctrl.active.loading\"></div>\r" +
    "\n" +
    "\t\t<div class=\"s-send feedback-greeting\">\r" +
    "\n" +
    "\t\t\t<div class=\"thank\">Thank you for your feedback.</div>\r" +
    "\n" +
    "            <input class=\"btn feedback-close\" value=\"Close\" ng-click=\"ctrl.close()\">\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"s-send feedback-error\" ng-show=\"ctrl.active.error\">\r" +
    "\n" +
    "\t\t\t<div class=\"m-red\">Cannot send feedback: {{ctrl.status}}</div>\r" +
    "\n" +
    "            <input class=\"btn feedback-close\" value=\"Close\" ng-click=\"ctrl.close()\">\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t</form>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/filter-buttons-item/filter-buttons-item.template.html',
    "<button class=\"btn\" ng-click=\"ctrl.setFilter()\" ng-class=\"{'m-blue': ctrl.isActiveAccount()}\" ng-transclude></button>"
  );


  $templateCache.put('/dist/templates/filter-buttons/filter-buttons.template.html',
    "<div class=\"filter\" ng-transclude></div>"
  );


  $templateCache.put('/zenith/src/components/modal/modal.template.html',
    "<div class=\"modal-container\" ng-show=\"ctrl.isActive\">\n" +
    "    <div class=\"modal-backdrop\" ng-click=\"ctrl.clickoutsideHandler()\"></div>\n" +
    "    <div class=\"modal\" ng-style=\"{'top': ctrl.positionTop, 'transform': ctrl.positionTop ? 'translate(-50%, 0%)':'translate(-50%, -50%)'}\">\n" +
    "        <div class=\"modal-header\"  ng-class=\"ctrl.headerclass\">\n" +
    "            <button class=\"modal-close\" ng-click=\"ctrl.close()\"><svg class=\"icon m-size-16\"><use xlink:href=\"#remove-16\" /></svg></button>\n" +
    "            <h3 ng-hide=\"!ctrl.title\">{{ ctrl.title }}</h3>\n" +
    "        </div>\n" +
    "        <div class=\"modal-body\" ng-transclude ng-class=\"ctrl.bodyclass\"></div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/notification/notification.template.html',
    "<div class=\"notification\" ng-class=\"{'m-active' : ctrl.isActive}\">\n" +
    "    <div class=\"notification-body\">\n" +
    "        <div ng-transclude></div>\n" +
    "        <button type=\"button\" class=\"btn m-link p0 notification-remove\" ng-click=\"ctrl.hideNotification()\">\n" +
    "            <svg class=\"icon m-size-16\">\n" +
    "                <use xlink:href=\"#remove-16\" />\n" +
    "            </svg>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/pagination/pagination.template.html',
    "<div class=\"pagination\">\r" +
    "\n" +
    "    <span class=\"pagination-nav\">\r" +
    "\n" +
    "        <a class=\"pagination-arrow\" href=\"\" ng-click=\"ctrl.prevPage()\" ng-show=\"ctrl.start > 1\">\r" +
    "\n" +
    "            <svg class=\"icon m-size-16\"> <use xlink:href=\"#chevron-back-16\" /> </svg>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "        <span class=\"pagination-label\">\r" +
    "\n" +
    "            <span ng-show=\"ctrl.total\">{{ ctrl.start }} - {{ ctrl.end = (ctrl.limit && (ctrl.start + ctrl.limit - 1 < ctrl.total)) ? ctrl.start + ctrl.limit - 1 : ctrl.total }} of {{ ctrl.total }}</span>\r" +
    "\n" +
    "            <span ng-hide=\"ctrl.total\">{{ ctrl.start }} - {{ ctrl.start + ctrl.limit - 1 }}</span>\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "        <a class=\"pagination-arrow\" href=\"\" ng-click=\"ctrl.nextPage()\" ng-show=\"ctrl.total === undefined || ctrl.end < ctrl.total\">\r" +
    "\n" +
    "            <svg class=\"icon m-size-16\"> <use xlink:href=\"#chevron-forward-16\" /> </svg>\r" +
    "\n" +
    "        </a>\r" +
    "\n" +
    "    </span>\r" +
    "\n" +
    "    <div class=\"pagination-limit\">\r" +
    "\n" +
    "        <div class=\"dropdown\" ng-show=\"ctrl.total === undefined || ctrl.total > 10\" z-dropdown>\r" +
    "\n" +
    "            <a href=\"\" z-dropdown-toggle>\r" +
    "\n" +
    "                <span ng-show=\"ctrl.limit\">{{ ctrl.limit }} per page</span>\r" +
    "\n" +
    "                <span ng-show=\"!ctrl.limit\">All</span>\r" +
    "\n" +
    "                  <svg class=\"icon m-size-16 down\">\r" +
    "\n" +
    "                    <use xlink:href=\"#chevron-down-16\" />\r" +
    "\n" +
    "                  </svg>\r" +
    "\n" +
    "                  <svg class=\"icon m-size-16 up\">\r" +
    "\n" +
    "                    <use xlink:href=\"#chevron-up-16\" />\r" +
    "\n" +
    "                  </svg>\r" +
    "\n" +
    "            </a>\r" +
    "\n" +
    "            <ul class=\"dropdown-menu\">\r" +
    "\n" +
    "                <li ng-repeat=\"limit in ctrl.limitsArray\">\r" +
    "\n" +
    "                  <a href=\"\" class=\"dropdown-menu-item\" ng-click=\"ctrl.setLimit(limit)\">{{limit}} per page</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "                <li ng-show=\"ctrl.showAll\">\r" +
    "\n" +
    "                  <a href=\"\" class=\"dropdown-menu-item\" ng-click=\"ctrl.setLimit(false)\" ng-show=\"!ctrl.maxItemsOnPage || (ctrl.total < ctrl.maxItemsOnPage)\">Show all</a>\r" +
    "\n" +
    "                </li>\r" +
    "\n" +
    "            </ul>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/password-meter/password-meter.template.html',
    "<div class=\"password-meter f-row\">\n" +
    "\t<div class=\"popup f-col-6\">\n" +
    "\t\t<div class=\"progress {{ctrl.progress.status}}\"  >\n" +
    "\t\t\t<div class=\"bar\" ng-style=\"{'width': ctrl.progress.percent+'%'}\"></div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"progress-text {{ctrl.progress.status}}\">{{ctrl.progress.message}}</div>\n" +
    "\t\t<ul class=\"strength-options\">\n" +
    "\t\t\t<li ng-repeat=\"option in ctrl.options\" ng-class=\"{'tick': option.isVeryfied}\">{{option.description}}</li>\n" +
    "\t\t</ul>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/progress/progress.template.html',
    "<div class=\"progress\">\r" +
    "\n" +
    "    <div class=\"bar\" ng-style=\"{'width' : ctrl.completion + '%'}\" ></div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/searchbox/searchbox.template.html',
    "<div class=\"searchbox\">\r" +
    "\n" +
    "    <form method=\"post\" ng-submit=\"ctrl.setValue(ctrl.tempValue);\">\r" +
    "\n" +
    "        <div ng-show=\"ctrl.live\">\r" +
    "\n" +
    "            <div class=\"form-input-wrap\">\r" +
    "\n" +
    "                <input class=\"form-input\" type=\"text\" placeholder=\"{{ ctrl.placeholder }}\" ng-model=\"ctrl.value\" ng-disabled=\"ctrl.disabled\">\r" +
    "\n" +
    "                <i class=\"form-input-clear icon-remove-gray-16\" ng-show=\"ctrl.value.length > 0\" ng-click=\"ctrl.clearValue()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-show=\"!ctrl.live\">\r" +
    "\n" +
    "            <div class=\"form-input-wrap fl\">\r" +
    "\n" +
    "                <input class=\"form-input\" type=\"text\" placeholder=\"{{ ctrl.placeholder }}\" ng-model=\"ctrl.tempValue\" ng-disabled=\"ctrl.disabled\">\r" +
    "\n" +
    "                <i class=\"form-input-wrap-clear icon-remove-gray-16\" ng-show=\"ctrl.tempValue.length > 0\" ng-click=\"ctrl.clearValue()\"></i>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <button class=\"btn fl\" type=\"submit\">Search</button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </form>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('/dist/templates/select/select.template.html',
    "<div>\n" +
    "    <div class=\"z-select-container\" ng-class=\"{'disabled':ctrl.isDisabled}\" name=\"{{ctrl.name}}\"\n" +
    "         ng-model=\"ctrl.ngModel \" style=\"width: 100%;\"\n" +
    "         z-validate-field=\"ctrl.errors\" ng-attr-focus-element=\"{{'#' + ctrl.name + '-select-input'}}\">\n" +
    "        <div class=\"z-select-field-content\" ng-click=\"ctrl.openOptions()\">\n" +
    "            <div ng-show=\"ctrl.ngModel .length > 0\">\n" +
    "                <div class=\"z-select-match\" ng-repeat=\"item in ctrl.ngModel  track by $index\">\n" +
    "            <span class=\"z-select-match-item\">\n" +
    "                <span class=\"mr20\">{{ item.name }}</span>\n" +
    "                <button ng-disabled=\"ctrl.isDisabled\" type=\"button\" class=\"btn m-link z-select-match-clear\"\n" +
    "                        ng-click=\"ctrl.removeItem(this)\">\n" +
    "\t\t\t\t    <svg class=\"icon m-size-16 \">\n" +
    "\t\t\t\t\t\t<use xlink:href=\"#remove-small-16\"/>\n" +
    "\t\t\t\t    </svg>\n" +
    "\t\t\t    </button>\n" +
    "            </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <input ng-attr-id=\"{{ctrl.name + '-select-input'}}\" ng-disabled=\"ctrl.isDisabled\" type=\"text\" ng-model=\"ctrl.search\" ng-keydown=\"ctrl.keyControl($event)\"\n" +
    "                   class=\"z-select-input\" ng-trim=\"false\"\n" +
    "                   ng-style=\"ctrl.calcInputStyle()\" ng-focus=\"ctrl.inputFocused = true\"\n" +
    "                    placeholder=\"{{ctrl.searchPlaceholder()}}\"/>\n" +
    "        </div>\n" +
    "        <nav class=\"z-select-field-controls\">\n" +
    "            <button ng-disabled=\"ctrl.isDisabled\" tabindex=\"-1\" type=\"button\" class=\"btn m-link p0\" ng-click=\"ctrl.toggleOptions()\">\n" +
    "                <svg class=\"icon m-size-16 vat\">\n" +
    "                    <use xlink:href=\"{{ctrl.labelPath}}\"/>\n" +
    "                </svg>\n" +
    "            </button>\n" +
    "            <button ng-disabled=\"ctrl.isDisabled\" tabindex=\"-1\" type=\"button\" class=\"btn m-link p0 z-select-controls-clear\"\n" +
    "                    ng-if=\"ctrl.showRemoveAllButton()\"\n" +
    "                    ng-click=\"ctrl.removeAllItems()\">\n" +
    "                <svg class=\"icon m-size-16 vat\">\n" +
    "                    <use xlink:href=\"#remove-small-16\"/>\n" +
    "                </svg>\n" +
    "            </button>\n" +
    "        </nav>\n" +
    "        <div class=\"wrapper\" ng-show=\"ctrl.show\">\n" +
    "            <div class=\"z-select-options\" ng-style=\"{'max-height': 28 * ctrl.maxRows}\">\n" +
    "                <div class=\"z-option-spinner\" ng-show=\"ctrl.noData()\" ng-if=\"ctrl.spinner\">\n" +
    "                    <z-spinner size=\"24\"></z-spinner>\n" +
    "                </div>\n" +
    "                <div class=\"z-option\" ng-click=\"ctrl.select(item)\" ng-repeat=\"item in ctrl.filteredItems()\"\n" +
    "                     ng-class=\"{'z-selected': ctrl.checkSel(item), 'z-highlighted': ctrl.preselect(item),'disabled-option':item[ctrl.disabledProp]}\"\n" +
    "                     inject-sub-component=\"option\" ng-if=\"!ctrl.useNgIf && ctrl.show\"\n" +
    "                     ng-hide=\"ctrl.noData()\"></div>\n" +
    "                <div ng-show=\"ctrl.filteredItems().length==0 && !ctrl.noData()\" inject-sub-component=\"exception\"\n" +
    "                     ng-if=\"ctrl.transcludePresent('exception')\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"select-more\" tabindex=\"-1\" inject-sub-component=\"button\" ng-if=\"ctrl.transcludePresent('button')\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/dist/templates/slide-panel/slide-panel.template.html',
    "<div class=\"slide-panel-container\" ng-class=\"{'m-active': ctrl.isActive}\">\n" +
    "    <div class=\"slide-panel-backdrop\"></div>\n" +
    "    <div class=\"slide-panel\" ng-style=\"{'width': ctrl.width}\">\n" +
    "        <header class=\"slide-panel-header\">\n" +
    "            <button class=\"modal-close\" ng-click=\"ctrl.hidePanel()\"><svg class=\"icon m-size-16\"><use xlink:href=\"#remove-16\" /></svg></button>\n" +
    "            <h3 class=\"slide-panel-header-title\">{{ ctrl.title }}</h3>\n" +
    "        </header>\n" +
    "        <div class=\"slide-panel-body\">\n" +
    "            <div class=\"slide-panel-body-content\" ng-transclude>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/spinner/spinner.template.html',
    "<svg ng-attr-width='{{ctrl.size}}' ng-attr-height='{{ctrl.size}}' xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\" ng-style=\"{'vertical-align': ctrl.valign}\"\r" +
    "\n" +
    "     preserveAspectRatio=\"xMidYMid\" class=\"uil-default\">\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(0 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0s' repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(30 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.08333333333333333s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(60 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.16666666666666666s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(90 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.25s' repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(120 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.3333333333333333s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(150 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.4166666666666667s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(180 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5s' repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(210 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.5833333333333334s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(240 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.6666666666666666s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(270 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.75s' repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(300 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.8333333333333334s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "    <rect x='25' y='25' width='12' height='12' rx='12' ry='12' fill='#6d6d6d'\r" +
    "\n" +
    "          transform='rotate(330 50 50) translate(0 -20)'>\r" +
    "\n" +
    "        <animate attributeName='opacity' from='1' to='0' dur='1s' begin='0.9166666666666666s'\r" +
    "\n" +
    "                 repeatCount='indefinite'/>\r" +
    "\n" +
    "    </rect>\r" +
    "\n" +
    "</svg>"
  );


  $templateCache.put('/dist/templates/tabset/tab.template.html',
    "<a href=\"\" ng-class=\"{active: active, disabled: disabled}\" ng-click=\"select()\" z-tab-title-transclude>{{title}}</a>"
  );


  $templateCache.put('/dist/templates/tabset/tabset.template.html',
    "<div class=\"tabs\">\n" +
    "    <nav class=\"tabs-header\" ng-transclude></nav>\n" +
    "    <div class=\"tabs-content\">\n" +
    "        <div class=\"tabs-item\"\n" +
    "             ng-repeat=\"tab in tabs\"\n" +
    "             ng-class=\"{active: tab.active}\"\n" +
    "             z-tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/dist/templates/th/th.template.html',
    "<div>\n" +
    "    <span ng-if=\"!ctrl.sort\" href=\"\" ng-transclude></span>\n" +
    "    <a ng-if=\"ctrl.sort\" href=\"\" class=\"table-sort\" ng-click=\"ctrl.sortColumn(ctrl.key);\" ng-transclude></a>\n" +
    "\t<div class=\"table-icons\"  ng-if=\"ctrl.sort && ctrl.getSortKey() == ctrl.key\">\n" +
    "        <span ng-if=\"ctrl.sortDesc\">\n" +
    "             <svg class=\"icon m-size-16 \">\n" +
    "                <use xlink:href=\"#sorting-down-16\"/>\n" +
    "            </svg>\n" +
    "        </span>\n" +
    "        <span ng-if=\"!ctrl.sortDesc\">\n" +
    "            <svg class=\"icon m-size-16 \">\n" +
    "                <use xlink:href=\"#sorting-up-16\"/>\n" +
    "            </svg>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('/dist/templates/tour-slider/tour-slider-step.template.html',
    "<div class=\"tour-step\" ng-show=\"ctrl.showSlide\" ng-transclude><z-spinner size=\"16\"></z-spinner></div>\r" +
    "\n"
  );


  $templateCache.put('/dist/templates/tour-slider/tour-slider.template.html',
    "<div class=\"tour-container\">\r" +
    "\n" +
    "    <div class=\"tour-content\" ng-transclude></div>\r" +
    "\n" +
    "    <div class=\"tour-controls\">\r" +
    "\n" +
    "        <div class=\"tour-nav\">\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn m-default tour-skip pa\" ng-click=\"ctrl.skipTour()\" ng-if=\"ctrl.onSkip\">Skip tour</button>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn m-link tour-arrow vat pr10\" ng-click=\"ctrl.prevStep()\"\r" +
    "\n" +
    "                    ng-disabled=\"ctrl.currentIndex===0\"><svg class=\"icon m-size-24\"> <use xlink:href=\"#back-24\" /></svg>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "            <div class=\"tour-counter lh24 vat\">{{ctrl.currentIndex + 1}} of {{ctrl.stepList.length}}</div>\r" +
    "\n" +
    "            <button type=\"button\" class=\"btn m-link tour-arrow vat pl10\" ng-click=\"ctrl.nextStep()\"\r" +
    "\n" +
    "                    ng-disabled=\"ctrl.stepList.length == ctrl.currentIndex + 1\"><svg class=\"icon m-size-24\"> <use xlink:href=\"#next-24\" /></svg>\r" +
    "\n" +
    "            </button>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

  $templateCache.put('/zenith/src/components/validation/validation.template.html',
    "<div class=\"validation\" ng-show=\"show\">\r" +
    "\n" +
    "    <i></i>\r" +
    "\n" +
    "    <span ng-transclude></span>\r" +
    "\n" +
    "</div>"
  );

}]);
