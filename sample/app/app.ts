/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config";
import * as app from 'application';
import {Page} from 'ui/page';
import {WebView} from 'ui/web-view';
import * as frame from 'ui/frame'
import {Observable} from 'data/observable';

app.start({ moduleName: 'main-page' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
